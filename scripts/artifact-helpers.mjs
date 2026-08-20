import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import ts from 'typescript';

export const compareText = (left, right) => (left < right ? -1 : left > right ? 1 : 0);

export const isLiteralPublicEvent = (event) => /^ae-[a-z0-9-]+$/.test(event.name ?? '');

export const normalizeTypeText = (type) =>
  type
    .replace(/\s+/g, ' ')
    .replace(/^\|\s*/, '')
    .trim();

const aliasPrinter = ts.createPrinter({ removeComments: true });

export const collectTypeAliases = (sourceRoot) => {
  const aliases = new Map();
  const ambiguous = new Set();
  const aliasesBySource = new Map();
  const importsBySource = new Map();

  const resolveImport = (sourcePath, specifier) => {
    if (!specifier.startsWith('.')) return undefined;
    const base = resolve(dirname(sourcePath), specifier);
    // The repo uses NodeNext-style relative imports ('./middleware.js') that
    // point at TypeScript sources, alongside extensionless ones.
    const candidates = [
      base.replace(/\.(?:js|mjs|cjs)$/, '.ts'),
      `${base}.ts`,
      base,
      resolve(base, 'index.ts'),
    ];
    for (const candidate of candidates) {
      if (candidate.endsWith('.ts') && existsSync(candidate)) return candidate;
    }
    return undefined;
  };

  const collect = (directory) => {
    const entries = readdirSync(directory, { withFileTypes: true }).sort((left, right) =>
      compareText(left.name, right.name),
    );
    for (const entry of entries) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory() && entry.name !== '__tests__') {
        collect(path);
      } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.includes('.test.')) {
        const sourceText = readFileSync(path, 'utf8');
        const source = ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true);
        const sourceAliases = new Map();
        const sourceImports = new Map();
        for (const statement of source.statements) {
          if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
            const importedSource = resolveImport(path, statement.moduleSpecifier.text);
            const bindings = statement.importClause?.namedBindings;
            if (importedSource && bindings && ts.isNamedImports(bindings)) {
              for (const element of bindings.elements) {
                sourceImports.set(element.name.text, {
                  name: element.propertyName?.text ?? element.name.text,
                  source: importedSource,
                });
              }
            }
            continue;
          }
          if (!ts.isTypeAliasDeclaration(statement)) continue;
          const name = statement.name.text;
          // Print through the TypeScript printer so comments are dropped and
          // the text is canonical; then collapse layout whitespace. Comparing
          // the normalized text (instead of stripping all whitespace) keeps
          // whitespace inside string literals significant, so 'no wrap' and
          // 'nowrap' correctly count as divergent aliases.
          const type = normalizeTypeText(
            aliasPrinter.printNode(ts.EmitHint.Unspecified, statement.type, source),
          );
          sourceAliases.set(name, type);
          if (ambiguous.has(name)) continue;
          const existing = aliases.get(name);
          if (existing && existing !== type) {
            aliases.delete(name);
            ambiguous.add(name);
            continue;
          }
          aliases.set(name, type);
        }
        aliasesBySource.set(path, sourceAliases);
        importsBySource.set(path, sourceImports);
      }
    }
  };

  collect(sourceRoot);
  aliases.aliasesBySource = aliasesBySource;
  aliases.importsBySource = importsBySource;
  return aliases;
};

export const resolveTypeAlias = (type, aliases, seen = new Set(), sourcePath) => {
  const name = type.trim();
  const normalizedSource = sourcePath ? resolve(sourcePath) : undefined;
  const localAlias = normalizedSource && aliases.aliasesBySource?.get(normalizedSource)?.get(name);
  const imported = normalizedSource && aliases.importsBySource?.get(normalizedSource)?.get(name);
  const importedAlias =
    imported && aliases.aliasesBySource?.get(imported.source)?.get(imported.name);
  const alias = localAlias ?? importedAlias ?? aliases.get(name);
  const aliasSource = localAlias ? normalizedSource : importedAlias ? imported.source : undefined;
  const seenKey = `${aliasSource ?? 'global'}:${name}`;
  if (!alias || seen.has(seenKey)) return normalizeTypeText(type);
  seen.add(seenKey);
  return resolveTypeAlias(alias, aliases, seen, aliasSource);
};

export const collectPublicTypeExports = (entryPath) => {
  const program = ts.createProgram([entryPath], {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2022,
  });
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(entryPath);
  const moduleSymbol = source && checker.getSymbolAtLocation(source);
  if (!moduleSymbol) return new Set();
  return new Set(checker.getExportsOfModule(moduleSymbol).map((symbol) => symbol.getName()));
};
