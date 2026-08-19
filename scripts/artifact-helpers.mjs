import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';

export const compareText = (left, right) => (left < right ? -1 : left > right ? 1 : 0);

export const isLiteralPublicEvent = (event) => /^ae-[a-z0-9-]+$/.test(event.name ?? '');

export const collectTypeAliases = (sourceRoot) => {
  const aliases = new Map();

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
        for (const statement of source.statements) {
          if (!ts.isTypeAliasDeclaration(statement)) continue;
          const name = statement.name.text;
          const type = statement.type.getText(source);
          const existing = aliases.get(name);
          if (existing && existing.replace(/\s/g, '') !== type.replace(/\s/g, '')) {
            throw new Error(`Ambiguous type alias ${name} while generating public artifacts.`);
          }
          aliases.set(name, type);
        }
      }
    }
  };

  collect(sourceRoot);
  return aliases;
};

export const resolveTypeAlias = (type, aliases, seen = new Set()) => {
  const name = type.trim();
  const alias = aliases.get(name);
  if (!alias || seen.has(name)) return type;
  seen.add(name);
  return resolveTypeAlias(alias, aliases, seen);
};
