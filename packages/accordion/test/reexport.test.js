import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const packageRoot = new URL('../', import.meta.url);

test('the compatibility package delegates to the canonical core accordion', async () => {
  const source = await readFile(new URL('src/index.ts', packageRoot), 'utf8');

  assert.match(source, /from '@aetherui\/core\/accordion'/);
  assert.match(source, /AeAccordion/);
  assert.match(source, /AeAccordionItem/);
  assert.match(source, /defineAeAccordion/);
});

test('the package exposes only its built public entry point', async () => {
  const manifest = JSON.parse(await readFile(new URL('package.json', packageRoot), 'utf8'));

  assert.deepEqual(manifest.files, ['dist']);
  assert.equal(manifest.exports['.'].import, './dist/index.js');
  assert.equal(manifest.exports['.'].types, './dist/index.d.ts');
  assert.equal(manifest.dependencies['@aetherui/core'], 'workspace:^');
});
