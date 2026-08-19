import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { build } from 'vite';

const packageRoot = new URL('../', import.meta.url);

test('the compatibility package delegates to the canonical core accordion', async () => {
  const source = await readFile(new URL('src/index.ts', packageRoot), 'utf8');

  assert.match(source, /from '@aetherui\/core\/accordion'/);
  assert.match(source, /AeAccordion/);
  assert.match(source, /AeAccordionItem/);
  assert.match(source, /defineAeAccordion/);
  assert.match(source, /defineAeAccordion\(\)/);
});

test('the package exposes only its built public entry point', async () => {
  const manifest = JSON.parse(await readFile(new URL('package.json', packageRoot), 'utf8'));

  assert.deepEqual(manifest.files, ['dist']);
  assert.equal(manifest.exports['.'].import, './dist/index.js');
  assert.equal(manifest.exports['.'].types, './dist/index.d.ts');
  assert.equal(manifest.dependencies['@aetherui/core'], 'workspace:^');
});

test('the published declarations keep the public package import', async () => {
  const declarations = await readFile(new URL('dist/index.d.ts', packageRoot), 'utf8');

  assert.match(declarations, /@aetherui\/core\/accordion/);
  assert.doesNotMatch(declarations, /\.\.\/\.\.\/core\/src/);
});

test('a side-effect-only consumer import retains element registration', async () => {
  const outDir = await mkdtemp(join(tmpdir(), 'aetherui-accordion-'));
  try {
    await build({
      configFile: false,
      logLevel: 'silent',
      build: {
        lib: {
          entry: new URL('fixtures/side-effect-entry.js', import.meta.url).pathname,
          formats: ['es'],
          fileName: 'consumer',
        },
        outDir,
        emptyOutDir: true,
      },
    });
    const output = await readFile(join(outDir, 'consumer.js'), 'utf8');
    assert.match(output, /ae-accordion/);
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});
