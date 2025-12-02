import { test, expect, FrameLocator } from '@playwright/test';

// Helper to get Storybook preview iframe
function getStorybookFrame(page: import('@playwright/test').Page): FrameLocator {
  return page.frameLocator('#storybook-preview-iframe');
}

test.describe('Combo Component - Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-combo--basic');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-combo').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders default state correctly', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const combo = frame.locator('ae-combo');
    await expect(combo).toBeVisible();
    await expect(page).toHaveScreenshot('combo-default.png');
  });

  test('renders dropdown with filtered items', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const input = frame.getByRole('combobox');
    await input.fill('app');
    await page.waitForTimeout(300); // Wait for dropdown animation

    // Verify dropdown is visible
    const listbox = frame.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    await expect(page).toHaveScreenshot('combo-filtered.png');
  });

  test('highlights matched text correctly', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const input = frame.getByRole('combobox');
    await input.fill('app');

    // Verify highlight element exists and is NOT escaped HTML
    const option = frame.getByRole('option', { name: /Apple/i });
    await expect(option).toBeVisible();

    // Critical test: Ensure highlight is rendered as HTML, not text
    const highlight = option.locator('.highlight');
    await expect(highlight).toBeVisible();
    await expect(highlight).toHaveText('App');

    // Verify no escaped HTML characters in the option
    const innerHTML = await option.innerHTML();
    expect(innerHTML).toContain('<span class="highlight"');
    expect(innerHTML).not.toContain('&lt;span');
    expect(innerHTML).not.toContain('&gt;');

    await expect(page).toHaveScreenshot('combo-highlighted.png');
  });

  test('renders with open dropdown', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const input = frame.getByRole('combobox');
    await input.click();
    await page.waitForTimeout(200);

    const listbox = frame.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    await expect(page).toHaveScreenshot('combo-open.png');
  });

  test('renders selected state', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const input = frame.getByRole('combobox');
    await input.fill('ban');

    const option = frame.getByRole('option', { name: /Banana/i });
    await option.click();
    await page.waitForTimeout(200);

    await expect(input).toHaveValue('Banana');
    await expect(page).toHaveScreenshot('combo-selected.png');
  });
});
