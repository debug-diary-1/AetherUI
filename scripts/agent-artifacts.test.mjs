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
