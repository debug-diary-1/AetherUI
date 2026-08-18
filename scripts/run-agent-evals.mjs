#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateAgentUi } from '../packages/agent/dist/index.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cases = JSON.parse(readFileSync(resolve(root, 'docs/agents/evals/cases.json'), 'utf8'));
const accessibleNames = new Set(['label', 'ariaLabel', 'placeholder']);
const labelRequired = new Set([
  'ae-autocomplete',
  'ae-combo',
  'ae-input',
  'ae-modal',
  'ae-pagination',
  'ae-select',
  'ae-textarea',
  'ae-treeview',
]);

function collect(node, result = { components: [], actions: [] }) {
  result.components.push(node.component);
  result.actions.push(...Object.values(node.actions ?? {}));
  for (const child of node.children ?? []) {
    if (typeof child !== 'string') collect(child, result);
  }
  return result;
}

function hasAccessibleInterface(node) {
  const props = node.props ?? {};
  if (
    labelRequired.has(node.component) &&
    !Object.keys(props).some((name) => accessibleNames.has(name) && Boolean(props[name]))
  ) {
    return false;
  }
  if (
    node.component === 'ae-checkbox' &&
    !(node.children ?? []).some((child) => typeof child === 'string' && child.trim())
  ) {
    return false;
  }
  return (node.children ?? []).every(
    (child) => typeof child === 'string' || hasAccessibleInterface(child),
  );
}

const failures = [];
for (const testCase of cases) {
  const result = validateAgentUi(testCase.document, testCase.policy);
  const expected = testCase.expected;
  if (result.ok !== expected.valid) {
    failures.push(`${testCase.id}: expected valid=${expected.valid}, received ${result.ok}`);
    continue;
  }

  if (result.ok) {
    const observed = collect(result.document.root);
    for (const component of expected.components ?? []) {
      if (!observed.components.includes(component))
        failures.push(`${testCase.id}: missing component ${component}`);
    }
    for (const action of expected.actions ?? []) {
      if (!observed.actions.includes(action))
        failures.push(`${testCase.id}: missing action ${action}`);
    }
    if (expected.accessible && !hasAccessibleInterface(result.document.root)) {
      failures.push(`${testCase.id}: accessible name heuristic failed`);
    }
  } else {
    const codes = new Set(result.issues.map((issue) => issue.code));
    for (const code of expected.issueCodes ?? []) {
      if (!codes.has(code)) failures.push(`${testCase.id}: missing issue code ${code}`);
    }
  }
}

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL ${failure}`));
  process.exit(1);
}

console.log(`Agent UI evals passed: ${cases.length}/${cases.length}`);
