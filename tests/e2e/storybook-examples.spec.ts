import { expect, test } from '@playwright/test';

test('previews do not inject unrelated controls or request development-only scripts', async ({
  page,
}) => {
  const developmentRequests: string[] = [];
  page.on('request', (request) => {
    if (/\/(node_modules|packages\/storybook\/src)\//.test(new URL(request.url()).pathname)) {
      developmentRequests.push(request.url());
    }
  });
  await page.goto('/iframe.html?id=components-tabs--default&viewMode=story');
  await expect(page.locator('ae-tabs')).toBeVisible();
  // The legacy startup probes ran after 500ms and 1000ms.
  await page.waitForTimeout(1200);
  await expect(page.locator('body > ae-autocomplete, body > ae-combo')).toHaveCount(0);
  await expect(page.locator('#component-debug-panel')).toHaveCount(0);
  expect(developmentRequests).toEqual([]);
});

test('toast placement examples display notifications in their requested corners', async ({
  page,
}) => {
  await page.goto('/iframe.html?id=components-aetoast--placement&viewMode=story');
  for (const name of ['Top Left', 'Bottom Right']) {
    await page.getByRole('button', { name, exact: true }).click();
    const toast = page
      .locator('ae-toast')
      .filter({ hasText: `${name} Toast` })
      .last();
    await expect(toast.locator('[part="toast"]')).toBeVisible();
    await expect
      .poll(async () => {
        const rect = await toast.boundingBox();
        const viewport = page.viewportSize()!;
        if (!rect) return false;
        return name === 'Top Left'
          ? rect.x < 40 && rect.y < 40
          : rect.x + rect.width > viewport.width - 40 &&
              rect.y + rect.height > viewport.height - 40;
      })
      .toBe(true);
  }
});

test('TreeView multiple-selection example actually enables multiple selection', async ({
  page,
}) => {
  await page.goto('/iframe.html?id=components-treeview--multi-select&viewMode=story');
  const tree = page.locator('#storybook-root ae-treeview');
  await expect
    .poll(() =>
      tree.evaluate(
        (element) => (element as HTMLElement & { selectionMode: string }).selectionMode,
      ),
    )
    .toBe('multiple');
  await tree.locator('[data-node-id="public"] [part="checkbox"]').click();
  await tree.locator('[data-node-id="README.md"] [part="checkbox"]').click();
  await expect(tree.locator('[data-node-id="public"]')).toHaveAttribute('aria-selected', 'true');
  await expect(tree.locator('[data-node-id="README.md"]')).toHaveAttribute('aria-selected', 'true');
});

test('TreeView empty example uses its advertised empty message', async ({ page }) => {
  await page.goto('/iframe.html?id=components-treeview--empty-and-loading&viewMode=story');
  await expect(page.getByText('No files found', { exact: true })).toBeVisible();
});

test('context-menu example opens on right-click and closes after selecting an item', async ({
  page,
}) => {
  await page.goto('/iframe.html?id=components-menu--as-context-menu&viewMode=story');
  await page.getByText('Right-click here to see the context menu').click({ button: 'right' });
  const menu = page.locator('ae-menu');
  await expect(menu).toBeVisible();
  await menu.getByText('Refresh', { exact: true }).click();
  await expect(menu).toBeHidden();
});

test('the default alert remains available after its interaction demonstration', async ({
  page,
}) => {
  await page.goto('/iframe.html?id=components-alert--default&viewMode=story');
  await page.waitForTimeout(1200);
  await expect(page.locator('#storybook-root ae-alert').locator('[part="base"]')).toBeVisible();
});

for (const example of [
  { id: 'custom-content-toast', button: 'Show Toast with Custom Content', message: 'New Message' },
  {
    id: 'variant-helper',
    button: 'Show Toast with Success Helper',
    message: 'Your payment of $199.99 has been processed.',
  },
]) {
  test(`toast ${example.id} uses the public content API`, async ({ page }) => {
    await page.goto(`/iframe.html?id=components-aetoast--${example.id}&viewMode=story`);
    await page.getByRole('button', { name: example.button }).click();
    const toast = page.locator('ae-toast').filter({ hasText: example.message });
    await expect(toast).toBeVisible();
    await toast.getByRole('button', { name: 'Close', exact: true }).click();
    await expect(toast.locator('[part="toast"]')).toHaveCount(0);
  });
}
