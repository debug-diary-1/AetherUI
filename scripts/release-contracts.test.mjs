import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

// Any pnpm/turbo invocation of a build task inside the same command segment.
// Catches: `pnpm build`, `pnpm run build`, `pnpm --filter x build`,
// `pnpm -F x build`, `pnpm exec turbo build`, `turbo build`, `turbo run build`.
const nestedBuildCommand = /\b(?:pnpm|turbo)\b[^&;|\n]*\bbuild\b/;

/** Parse a workflow into jobs, each with its ordered named steps. */
const workflowJobs = (workflow) => {
  const lines = workflow.split('\n');
  const jobs = [];
  let inJobs = false;
  let current = null;
  for (const line of lines) {
    if (/^jobs:\s*$/.test(line)) {
      inJobs = true;
      continue;
    }
    if (!inJobs) continue;
    if (/^\S/.test(line) && line.trim()) {
      inJobs = false;
      current = null;
      continue;
    }
    const jobStart = line.match(/^ {2}([\w-]+):\s*$/);
    if (jobStart) {
      current = { name: jobStart[1], lines: [] };
      jobs.push(current);
      continue;
    }
    if (current) current.lines.push(line);
  }
  return jobs.map((job) => {
    const body = job.lines.join('\n');
    const steps = Array.from(
      body.matchAll(/^(\s*)- name:\s*(.+)\n((?:(?!\1- ).*(?:\n|$))*)/gm),
      ([, , name, stepBody]) => ({ name: name.trim(), body: stepBody }),
    );
    return { name: job.name, body, steps };
  });
};

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

  // The guard must catch every invocation shape, not just the canonical one.
  for (const command of [
    'pnpm build',
    'pnpm run build',
    'pnpm --filter @aetherui/core build',
    'pnpm --filter @aetherui/core run build',
    'pnpm -F @aetherui/core build',
    'pnpm exec turbo build',
    'turbo build',
    'turbo run build',
  ]) {
    assert.match(command, nestedBuildCommand, command);
  }
  for (const command of ['node --test test/', 'web-test-runner --group build-output']) {
    assert.doesNotMatch(command, nestedBuildCommand, command);
  }
});

test('the publish workflow installs Chromium before running browser tests', async () => {
  const workflow = await read('.github/workflows/publish.yml');
  // Step order only matters within a single job, so assert per job.
  const job = workflowJobs(workflow).find((candidate) =>
    candidate.steps.some((step) => step.name === 'Run tests'),
  );
  assert.ok(job, 'missing a job that runs tests');
  const install = job.steps.findIndex((step) => step.name === 'Install Playwright browser');
  const tests = job.steps.findIndex((step) => step.name === 'Run tests');

  assert.ok(install >= 0, 'missing Playwright Chromium installation');
  assert.ok(install < tests, 'Playwright installation must precede tests in the same job');
  assert.match(job.steps[install].body, /run:\s*npx playwright install --with-deps chromium/);
});

test('CI executes the release-contract guards', async () => {
  const workflow = await read('.github/workflows/ci.yml');
  const job = workflowJobs(workflow).find((candidate) =>
    candidate.steps.some((step) => step.name === 'Run release contract tests'),
  );
  assert.ok(job, 'no CI job runs the release contract tests');
  for (const [name, command] of [
    ['Run release contract tests', /run: pnpm test:release-contracts/],
    ['Typecheck generated React declarations', /run: pnpm typecheck:react/],
    ['Verify generated agent artifacts', /run: pnpm check:agent-artifacts/],
  ]) {
    assert.match(job.steps.find((step) => step.name === name)?.body ?? '', command, String(name));
  }
});

test('the publish workflow runs every guard in the job that publishes', async () => {
  const workflow = await read('.github/workflows/publish.yml');
  // Scope to the job that actually publishes: guards sitting in a separate,
  // undepended-on job would never gate a release.
  const job = workflowJobs(workflow).find((candidate) =>
    candidate.steps.some((step) => /pnpm publish/.test(step.body)),
  );
  assert.ok(job, 'no job publishes packages');

  const firstPublish = job.steps.findIndex((step) => /pnpm publish/.test(step.body));
  for (const [name, command] of [
    ['Run tests', /run: pnpm test\b/],
    ['Verify generated agent artifacts', /run: pnpm check:agent-artifacts/],
    ['Run release contract tests', /run: pnpm test:release-contracts/],
    ['Typecheck generated React declarations', /run: pnpm typecheck:react/],
  ]) {
    const index = job.steps.findIndex((step) => step.name === name);
    assert.ok(index >= 0, `publish job is missing the "${name}" step`);
    assert.match(job.steps[index].body, command, String(name));
    assert.ok(index < firstPublish, `"${name}" must run before any package is published`);
  }
});

test('the publish workflow builds the tag it was asked to publish', async () => {
  const workflow = await read('.github/workflows/publish.yml');
  const job = workflowJobs(workflow).find((candidate) =>
    candidate.steps.some((step) => /pnpm publish/.test(step.body)),
  );
  const checkout = job?.steps.find((step) => /actions\/checkout/.test(step.body));
  assert.ok(checkout, 'publish job does not check out the repository');
  assert.match(
    checkout.body,
    /ref:\s*\$\{\{\s*github\.event\.inputs\.tag\s*\|\|\s*github\.ref\s*\}\}/,
    'workflow_dispatch tag input must be checked out, otherwise the default branch is published',
  );
});

test('the React declaration typecheck runs against real React typings', async () => {
  const config = JSON.parse(await read('packages/core/tsconfig.react.json'));
  assert.ok(
    config.compilerOptions.types.includes('react'),
    'typecheck:react must resolve @types/react, not a hand-rolled shim',
  );
  const manifest = JSON.parse(await read('packages/core/package.json'));
  assert.ok(
    manifest.devDependencies['@types/react'],
    'missing @types/react devDependency on @aetherui/core',
  );
  const root = JSON.parse(await read('package.json'));
  assert.ok(
    !root.devDependencies['@types/react'],
    'keep @types/react scoped to @aetherui/core: a root dependency re-resolves the Storybook peer graph',
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
