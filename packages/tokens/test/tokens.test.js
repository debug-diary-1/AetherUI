import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const packageRoot = new URL('../', import.meta.url);
const { tokens } = await import('../src/index.ts');

test('JavaScript tokens use namespaced CSS custom properties with fallbacks', () => {
  const values = [
    ...Object.values(tokens.colors),
    ...Object.values(tokens.spacing),
    tokens.typography.fontFamily,
    ...Object.values(tokens.typography.fontSize),
    ...Object.values(tokens.borderRadius),
    ...Object.values(tokens.shadows),
    ...Object.values(tokens.transitions),
  ];

  assert.ok(values.length > 20);
  for (const value of values) {
    assert.match(value, /^var\(--ae-[\w-]+, .+\)$/);
  }
});

test('light and dark themes contain the public component token families', async () => {
  const [light, dark] = await Promise.all(
    ['light.css', 'dark.css'].map((name) => readFile(new URL(`src/${name}`, packageRoot), 'utf8')),
  );
  const requiredFamilies = [
    'button',
    'accordion',
    'checkbox',
    'radio',
    'dropdown',
    'modal',
    'alert',
    'toast',
  ];

  for (const family of requiredFamilies) {
    assert.match(light, new RegExp(`--ae-${family}-`));
    assert.match(dark, new RegExp(`--ae-${family}-`));
  }
});

test('the package exports both supported full themes', async () => {
  const manifest = JSON.parse(await readFile(new URL('package.json', packageRoot), 'utf8'));

  assert.equal(manifest.exports['./light.css'].import, './dist/light.css');
  assert.equal(manifest.exports['./dark.css'].import, './dist/dark.css');
});
