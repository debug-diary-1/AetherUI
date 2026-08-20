import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { collectTypeAliases, resolveTypeAlias } from './artifact-helpers.mjs';

const catalog = JSON.parse(
  await readFile(new URL('../packages/core/component-catalog.json', import.meta.url), 'utf8'),
);

test('the generated catalog contains only literal public AetherUI event names', () => {
  for (const component of catalog.components) {
    for (const event of component.events) {
      assert.match(event.name, /^ae-[a-z0-9-]+$/, `${component.tagName}: ${event.name}`);
    }
  }
});

test('select metadata stays attached to the custom element declaration', () => {
  const select = catalog.components.find((component) => component.tagName === 'ae-select');

  assert.match(select.description, /select dropdown/i);
  assert.ok(select.slots.some((slot) => slot.name === ''));
  assert.ok(select.cssParts.some((part) => part.name === 'select'));
  assert.equal(
    select.events.find((event) => event.name === 'ae-select-change').type.includes('<'),
    true,
  );
});

test('catalog property contracts match their runtime value shapes', () => {
  const property = (tagName, name) =>
    catalog.components
      .find((component) => component.tagName === tagName)
      .properties.find((entry) => entry.name === name);

  assert.match(property('ae-autocomplete', 'options').type, /\[\]$/);
  assert.doesNotMatch(property('ae-autocomplete', 'options').type, /^string\|/);
  assert.match(property('ae-textarea', 'resize').type, /'vertical'/);
  assert.match(property('ae-tooltip', 'placement').type, /'top'/);
  for (const component of catalog.components) {
    for (const entry of component.properties) {
      assert.doesNotMatch(entry.type, /[\r\n]/, `${component.tagName}.${entry.name}`);
    }
  }
});

test('React declarations exclude inferred dynamic event variable names', async () => {
  const reactTypes = await readFile(
    new URL('../packages/core/react.d.ts', import.meta.url),
    'utf8',
  );

  assert.doesNotMatch(reactTypes, /onEventName/);
  assert.doesNotMatch(
    reactTypes,
    /\?: (?:Placement|Strategy|ToastPlacement|ToastVariant|AutocompleteFilterFunction|ComboFilterFunction)\b/,
  );
  assert.match(reactTypes, /import type \{[^}]*SelectOption[^}]*\} from '\.\/dist\/index\.js';/s);
  const generator = await readFile(new URL('./generate-react-types.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(generator, /AutocompleteOption, ComboItem, SelectOption, TreeNode/);
  assert.doesNotMatch(generator, /checkOnly|--check/);
});

test('same-named divergent aliases do not crash artifact generation', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'aetherui-aliases-'));
  await mkdir(join(directory, 'one'));
  await mkdir(join(directory, 'two'));
  await writeFile(join(directory, 'one', 'types.ts'), "export type Placement = 'top';\n");
  await writeFile(join(directory, 'two', 'types.ts'), "export type Placement = 'bottom';\n");

  const aliases = collectTypeAliases(directory);
  assert.equal(aliases.has('Placement'), false);
  assert.equal(
    resolveTypeAlias('Placement', aliases, new Set(), join(directory, 'one', 'types.ts')),
    "'top'",
  );
  assert.equal(
    resolveTypeAlias('Placement', aliases, new Set(), join(directory, 'two', 'types.ts')),
    "'bottom'",
  );
});

test('generated entries use locale-independent codepoint ordering', () => {
  const compareText = (left, right) => (left < right ? -1 : left > right ? 1 : 0);
  for (const component of catalog.components) {
    const names = component.properties.map((property) => property.name);
    assert.deepEqual(names, [...names].sort(compareText), component.tagName);
  }
});

test('llms resources use deployment-base-relative links', async () => {
  const llms = await readFile(new URL('../packages/docs/public/llms.txt', import.meta.url), 'utf8');

  assert.doesNotMatch(llms, /^\s*- \/\S+/m);
  assert.match(llms, /- component-catalog\.json/);
  assert.match(llms, /- getting-started\/installation\//);
});
