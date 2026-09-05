import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { chromium, expect } from '@playwright/test';
import { build } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));
const packages = ['tokens', 'core', 'accordion', 'datatable', 'agent', 'mcp'];
let directory;
let browser;

before(async () => {
  directory = await mkdtemp(join(tmpdir(), 'aetherui-consumer-'));
  const tarballs = join(directory, 'tarballs');
  await mkdir(tarballs);
  const dependencies = {};
  for (const name of packages) {
    const packageRoot = join(root, 'packages', name);
    const manifest = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'));
    execFileSync('pnpm', ['pack', '--pack-destination', tarballs], {
      cwd: packageRoot,
      stdio: 'pipe',
    });
    dependencies[manifest.name] = `file:./tarballs/aetherui-${name}-${manifest.version}.tgz`;
  }
  const core = JSON.parse(await readFile(join(root, 'packages/core/package.json'), 'utf8'));
  const workspace = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  const localPackages = { ...dependencies };
  dependencies.react = core.devDependencies.react;
  dependencies['react-dom'] = core.devDependencies['react-dom'];
  await writeFile(
    join(directory, 'package.json'),
    JSON.stringify({
      name: 'aetherui-consumer-smoke',
      private: true,
      type: 'module',
      packageManager: workspace.packageManager,
      dependencies,
      pnpm: { overrides: localPackages },
    }),
  );
  // Install as a consumer without the repository's dependency overrides. Local
  // tarballs replace unpublished internal packages; everything else uses npm.
  execFileSync(
    'pnpm',
    ['install', '--prefer-offline', '--ignore-scripts', '--no-frozen-lockfile'],
    {
      cwd: directory,
      stdio: 'inherit',
    },
  );
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  if (directory) await rm(directory, { recursive: true, force: true });
});

async function consumer(t, source, repetitions = 1, markup = '<main id="surface"></main>') {
  const entry = join(directory, 'entry.tsx');
  await writeFile(entry, source);
  const result = await build({
    root: directory,
    configFile: false,
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': JSON.stringify('production') },
    esbuild: { jsx: 'automatic' },
    build: {
      write: false,
      minify: true,
      lib: { entry, name: 'Consumer', formats: ['iife'] },
    },
  });
  const output = (Array.isArray(result) ? result[0] : result).output;
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  t.after(async () => {
    await page.close();
    assert.deepEqual(errors, [], 'consumer must not throw browser errors');
  });
  await page.setContent(markup);
  for (const asset of output.filter(
    (item) => item.type === 'asset' && item.fileName.endsWith('.css'),
  )) {
    await page.addStyleTag({ content: String(asset.source) });
  }
  for (let run = 0; run < repetitions; run += 1) {
    await page.addScriptTag({ content: output.find((item) => item.type === 'chunk').code });
  }
  return page;
}

test('the packed MCP server and validator import in Node without a DOM', () => {
  execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `
      import assert from 'node:assert/strict';
      import { createAetherUiMcpServer } from '@aetherui/mcp';
      import { validateAgentUi } from '@aetherui/agent';
      assert.equal(typeof createAetherUiMcpServer, 'function');
      assert.equal(validateAgentUi({version: '1', root: {component: 'ae-alert'}}).ok, true);
    `,
    ],
    { cwd: directory, stdio: 'pipe' },
  );
});

test('the README React example receives a real button activation', async (t) => {
  const readme = await readFile(join(root, 'README.md'), 'utf8');
  const example = readme.match(/### Using with React[\s\S]*?```tsx\n([\s\S]*?)```/)?.[1];
  assert.ok(example, 'missing README React example');
  const page = await consumer(
    t,
    `${example}
    import { createRoot } from 'react-dom/client';
    window.received = [];
    console.log = (...args) => window.received.push(args[0]);
    createRoot(document.querySelector('#surface')).render(<App />);
  `,
  );
  const button = page.getByRole('button', { name: 'Click me' });
  await button.focus();
  await page.keyboard.press('Enter');
  await expect.poll(() => page.evaluate(() => window.received)).toEqual(['Button clicked!']);
});

test('the README agent example renders a registered alert', async (t) => {
  const readme = await readFile(join(root, 'README.md'), 'utf8');
  const example = readme.match(/## 🤖 Agent-generated UI[\s\S]*?```ts\n([\s\S]*?)```/)?.[1];
  assert.ok(example, 'missing README agent example');
  const page = await consumer(t, example);
  await expect(page.locator('ae-alert')).toHaveText('Saved.');
  assert.equal(await page.locator('ae-alert').evaluate((element) => !!element.shadowRoot), true);
});

test('core registration remains usable when two independent bundles load all components', async (t) => {
  const page = await consumer(
    t,
    `
    import { AeInput, defineAll } from '@aetherui/core';
    defineAll();
    const input = new AeInput();
    input.label = 'Name';
    document.querySelector('#surface').append(input);
  `,
    2,
  );
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveCount(2);
  await page.getByRole('textbox', { name: 'Name' }).last().fill('Ada');
  await expect(page.locator('ae-input').last()).toHaveJSProperty('value', 'Ada');
});

test('the README vanilla example upgrades and activates its button', async (t) => {
  const readme = await readFile(join(root, 'README.md'), 'utf8');
  const example = readme.match(
    /### Using with Vanilla JavaScript[\s\S]*?```html\n([\s\S]*?)```/,
  )?.[1];
  assert.ok(example, 'missing README vanilla example');
  const script = example.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'missing module script');
  const page = await consumer(t, script, 1, example.replace(/<script[\s\S]*?<\/script>/g, ''));
  const activated = page.waitForEvent('console', (message) =>
    message.text().startsWith('Button clicked!'),
  );
  await page.getByRole('button', { name: 'Click me' }).click();
  await activated;
});

test('public packages keep implementation helpers internal', async (t) => {
  const page = await consumer(
    t,
    `
    import * as core from '@aetherui/core';
    import * as autocomplete from '@aetherui/core/autocomplete';
    import * as combo from '@aetherui/core/combo';
    import * as table from '@aetherui/datatable';
    window.exportNames = [...Object.keys(core), ...Object.keys(autocomplete), ...Object.keys(combo), ...Object.keys(table)];
  `,
  );
  const names = await page.evaluate(() => window.exportNames);
  assert.deepEqual(
    names.filter((name) => /(?:Controller|Manager)$/.test(name)),
    [],
  );
  for (const name of ['sortData', 'filterData', 'getCellValue']) {
    assert.ok(!names.includes(name), `${name} is internal`);
  }
  const manifest = JSON.parse(
    await readFile(join(directory, 'node_modules/@aetherui/core/package.json'), 'utf8'),
  );
  assert.ok(
    !Object.keys(manifest.exports).some((key) => key.includes('*')),
    'only documented subpaths are public',
  );
});

const tableExample = `
  import '@aetherui/datatable';
  const table = document.createElement('ae-datatable');
  table.data = [{id: 'b', name: 'Grace'}, {id: 'a', name: 'Ada'}];
  table.columns = [{id: 'name', field: 'name', header: 'Name', width: '200px'}];
  table.filterable = false;
  window.sorts = [];
  window.widths = [];
  table.addEventListener('ae-datatable-sort', (event) => window.sorts.push(event.detail.direction));
  table.addEventListener('ae-datatable-resize', (event) => window.widths.push(event.detail.width));
  document.querySelector('#surface').append(table);
`;

test('a bundled registration import upgrades the DataTable', async (t) => {
  const page = await consumer(t, tableExample);
  await expect(page.locator('ae-datatable-header')).toHaveText('Name');
  await expect(page.locator('ae-datatable-cell')).toHaveText(['Grace', 'Ada']);
});

test('DataTable registration is safe when two consumer bundles load it', async (t) => {
  const page = await consumer(t, tableExample, 2);
  await expect(page.locator('ae-datatable-header')).toHaveCount(2);
  await expect(page.locator('ae-datatable-cell')).toHaveText(['Grace', 'Ada', 'Grace', 'Ada']);
});

test('DataTable sorting and resizing work from the keyboard', async (t) => {
  // Retain the registration function so this test isolates keyboard behavior
  // from the independent bare-import/tree-shaking regression above.
  const page = await consumer(
    t,
    `
    import { defineDataTableElements } from '@aetherui/datatable';
    defineDataTableElements();
    ${tableExample}
  `,
  );
  const sort = page.getByRole('button', { name: 'Name', exact: true });
  await page.keyboard.press('Tab');
  await expect(sort).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('ae-datatable-cell')).toHaveText(['Ada', 'Grace']);
  await expect(page.getByRole('columnheader', { name: 'Name', exact: false })).toHaveAttribute(
    'aria-sort',
    'ascending',
  );
  await page.keyboard.press('Space');
  await expect(page.locator('ae-datatable-cell')).toHaveText(['Grace', 'Ada']);
  await page.keyboard.press('Enter');
  await expect.poll(() => page.evaluate(() => window.sorts)).toEqual(['asc', 'desc', 'none']);
  await expect(page.getByRole('columnheader', { name: 'Name', exact: false })).toHaveAttribute(
    'aria-sort',
    'none',
  );
  await page.keyboard.press('Tab');
  const resize = page.getByRole('separator', { name: 'Resize Name column' });
  await expect(resize).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowLeft');
  await expect.poll(() => page.evaluate(() => window.widths.length)).toBe(2);
  const widths = await page.evaluate(() => window.widths);
  assert.equal(widths[0] - widths[1], 10);
  await expect(resize).toHaveAttribute('aria-valuenow', String(widths[1]));
  await page.keyboard.press('Shift+ArrowRight');
  await expect(resize).toHaveAttribute('aria-valuenow', String(widths[1] + 50));
  await page.keyboard.press('Home');
  await expect(resize).toHaveAttribute('aria-valuenow', '50');
  await page.keyboard.press('ArrowLeft');
  await expect(resize).toHaveAttribute('aria-valuenow', '50');
});

test('DataTable retains mouse sorting and resize events', async (t) => {
  const page = await consumer(t, tableExample);
  await page.getByRole('button', { name: 'Name', exact: true }).click();
  await expect(page.locator('ae-datatable-cell')).toHaveText(['Ada', 'Grace']);
  const resize = page.getByRole('separator', { name: 'Resize Name column' });
  const bounds = await resize.boundingBox();
  assert.ok(bounds);
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width / 2 + 20, bounds.y + bounds.height / 2);
  await page.mouse.up();
  await expect.poll(() => page.evaluate(() => window.widths.length)).toBe(1);
  await expect.poll(() => page.evaluate(() => window.sorts)).toEqual(['asc']);
});

test('disabled DataTable controls are absent from keyboard navigation', async (t) => {
  const page = await consumer(
    t,
    `${tableExample}
    table.sortable = false;
    table.resizable = false;
  `,
  );
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByRole('columnheader')).toHaveText('Name');
  await expect(page.getByRole('button')).toHaveCount(0);
  await expect(page.getByRole('separator')).toHaveCount(0);
});

test('DataTable sorting is stable and preserves the caller data', async (t) => {
  const page = await consumer(
    t,
    `
    import '@aetherui/datatable';
    const table = document.createElement('ae-datatable');
    table.data = [{id: 'a', score: 2}, {id: 'b', score: 1}, {id: 'c', score: 2}];
    table.columns = [{id: 'id', field: 'id', header: 'ID'}, {id: 'score', field: 'score', header: 'Score'}];
    table.filterable = false;
    document.querySelector('#surface').append(table);
  `,
  );
  await page.getByRole('button', { name: 'Score', exact: true }).click();
  await expect(page.locator('ae-datatable-cell')).toHaveText(['b', '1', 'a', '2', 'c', '2']);
  assert.deepEqual(
    await page.locator('ae-datatable').evaluate((table) => table.data.map((row) => row.id)),
    ['a', 'b', 'c'],
  );
});

test('DataTable column and global filters compose through the public interface', async (t) => {
  const page = await consumer(
    t,
    `
    import '@aetherui/datatable';
    const table = document.createElement('ae-datatable');
    table.data = [{name: 'Ada', team: 'Platform'}, {name: 'Grace', team: 'Compiler'}, {name: 'Linus', team: 'Platform'}];
    table.columns = [{id: 'name', field: 'name', header: 'Name'}, {id: 'team', field: 'team', header: 'Team'}];
    window.filters = [];
    table.addEventListener('ae-datatable-filter', (event) => window.filters.push(event.detail));
    document.querySelector('#surface').append(table);
  `,
  );
  await expect(page.locator('ae-datatable-cell')).toHaveCount(6);
  await page
    .locator('ae-datatable')
    .evaluate((table) => table.handleColumnFilter('team', 'platform'));
  await expect(page.locator('ae-datatable-cell')).toHaveText([
    'Ada',
    'Platform',
    'Linus',
    'Platform',
  ]);
  await page.getByPlaceholder('Search...').fill('ada');
  await expect(page.locator('ae-datatable-cell')).toHaveText(['Ada', 'Platform']);
  await expect
    .poll(() => page.evaluate(() => window.filters.at(-1)))
    .toEqual({ globalFilter: 'ada', filterState: [{ id: 'team', value: 'platform' }] });
});
