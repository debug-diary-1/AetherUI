import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

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
  assert.match(
    reactTypes,
    /import type \{ AutocompleteOption, ComboItem, SelectOption, TreeNode \} from '\.\/dist\/index\.js';/,
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
