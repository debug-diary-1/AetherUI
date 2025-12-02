import { test, expect } from '@playwright/test';

// Skip visual regression tests until baseline screenshots are generated
// Run `pnpm test:e2e:update-snapshots` locally to generate baselines
test.describe.skip('Combo Component - Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-combo--basic');
    // Wait for Storybook to load
    await page.waitForSelector('ae-combo', { timeout: 10000 });
  });

  test('renders default state correctly', async ({ page }) => {
    const combo = page.locator('ae-combo');
    await expect(combo).toBeVisible();
    await expect(page).toHaveScreenshot('combo-default.png');
  });

  test('renders dropdown with filtered items', async ({ page }) => {
    const input = page.getByRole('combobox');
    await input.fill('app');
    await page.waitForTimeout(300); // Wait for dropdown animation

    // Verify dropdown is visible
    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    await expect(page).toHaveScreenshot('combo-filtered.png');
  });

  test('highlights matched text correctly', async ({ page }) => {
    const input = page.getByRole('combobox');
    await input.fill('app');

    // Verify highlight element exists and is NOT escaped HTML
    const option = page.getByRole('option', { name: /Apple/i });
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
    const input = page.getByRole('combobox');
    await input.click();
    await page.waitForTimeout(200);

    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    await expect(page).toHaveScreenshot('combo-open.png');
  });

  test('renders selected state', async ({ page }) => {
    const input = page.getByRole('combobox');
    await input.fill('ban');

    const option = page.getByRole('option', { name: /Banana/i });
    await option.click();
    await page.waitForTimeout(200);

    await expect(input).toHaveValue('Banana');
    await expect(page).toHaveScreenshot('combo-selected.png');
  });
});
