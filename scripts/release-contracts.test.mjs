import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const nestedBuildCommand = /\bpnpm(?:\s+--filter\s+\S+)?\s+(?:run\s+)?build\b/;
const namedWorkflowSteps = (workflow) =>
  Array.from(
    workflow.matchAll(/^\s{6}- name:\s*(.+)\n((?:(?!^\s{6}- ).*(?:\n|$))*)/gm),
    ([, name, body]) => ({ name, body }),
  );

test('cross-package tests declare their build dependencies in the Turbo graph', async () => {
  const turbo = JSON.parse(await read('turbo.json'));
  assert.ok(turbo.globalDependencies.includes('scripts/artifact-helpers.mjs'));
  assert.ok(turbo.globalDependencies.includes('scripts/generate-react-types.mjs'));
  for (const task of [
    '@aetherui/accordion#test',
    '@aetherui/mcp#test',
    '@aetherui/datatable#test',
  ]) {
    assert.deepEqual(turbo.tasks[task]?.dependsOn, ['^build', 'build'], task);
  }

  for (const packageName of ['accordion', 'mcp', 'datatable']) {
    const manifest = JSON.parse(await read(`packages/${packageName}/package.json`));
    assert.doesNotMatch(manifest.scripts.test, nestedBuildCommand, packageName);
  }

  for (const command of ['pnpm build', 'pnpm run build', 'pnpm --filter @aetherui/core build']) {
    assert.match(command, nestedBuildCommand);
  }
});

test('the publish workflow installs Chromium before running browser tests', async () => {
  const workflow = await read('.github/workflows/publish.yml');
  const steps = namedWorkflowSteps(workflow);
  const install = steps.findIndex((step) => step.name === 'Install Playwright browser');
  const tests = steps.findIndex((step) => step.name === 'Run tests');

  assert.ok(install >= 0, 'missing Playwright Chromium installation');
  assert.ok(install < tests, 'Playwright installation must precede tests');
  assert.match(steps[install].body, /run:\s*npx playwright install --with-deps chromium/);
});

test('CI executes the release-contract guards', async () => {
  const workflow = await read('.github/workflows/ci.yml');
  const steps = namedWorkflowSteps(workflow);
  assert.match(
    steps.find((step) => step.name === 'Run release contract tests')?.body ?? '',
    /run: pnpm test:release-contracts/,
  );
  assert.match(
    steps.find((step) => step.name === 'Typecheck generated React declarations')?.body ?? '',
    /run: pnpm typecheck:react/,
  );
});

test('agent resource links use the build-time Astro base', async () => {
  const guide = await read('packages/docs/src/content/docs/agentic-ui/generate-safely.mdx');

  assert.match(guide, /import\.meta\.env\.BASE_URL/);
  assert.doesNotMatch(guide, /\]\(\.\.\/\.\.\/(?:agent-ui|component-catalog|llms)/);
});

test('standalone accordion styles retain usable token fallbacks', async () => {
  const styles = await read('packages/core/src/accordion/styles.ts');

  for (const token of [
    '--ae-accordion-bg',
    '--ae-accordion-border',
    '--ae-accordion-divider',
    '--ae-accordion-header-hover-bg',
    '--ae-focus-ring-color',
    '--ae-accordion-panel-bg',
  ]) {
    assert.match(styles, new RegExp(`var\\(\\s*${token},\\s*[^)]`), token);
  }
});
