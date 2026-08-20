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

test('CI and publish workflows execute the release-contract guards', async () => {
  for (const workflowPath of ['.github/workflows/ci.yml', '.github/workflows/publish.yml']) {
    const workflow = await read(workflowPath);
    const steps = workflowJobs(workflow).flatMap((job) => job.steps);
    assert.match(
      steps.find((step) => step.name === 'Run release contract tests')?.body ?? '',
      /run: pnpm test:release-contracts/,
      `${workflowPath} must run the release contract tests`,
    );
    assert.match(
      steps.find((step) => step.name === 'Typecheck generated React declarations')?.body ?? '',
      /run: pnpm typecheck:react/,
      `${workflowPath} must typecheck the generated React declarations`,
    );
    assert.match(
      steps.find((step) => step.name === 'Verify generated agent artifacts')?.body ?? '',
      /run: pnpm check:agent-artifacts/,
      `${workflowPath} must verify the generated agent artifacts`,
    );
  }
});

test('the React declaration typecheck runs against real React typings', async () => {
  const config = JSON.parse(await read('scripts/tsconfig.react-types.json'));
  assert.ok(
    config.compilerOptions.types.includes('react'),
    'typecheck:react must resolve @types/react, not a hand-rolled shim',
  );
  const manifest = JSON.parse(await read('package.json'));
  assert.ok(manifest.devDependencies['@types/react'], 'missing @types/react devDependency');
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
