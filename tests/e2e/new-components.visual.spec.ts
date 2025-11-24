import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for 12 New Components
 * These tests catch visual bugs like incorrect rendering, escaped HTML, missing styles, etc.
 */

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-input--default');
    await page.waitForSelector('ae-input');
  });

  test('renders default state', async ({ page }) => {
    await expect(page).toHaveScreenshot('input-default.png');
  });

  test('renders with user input', async ({ page }) => {
    const input = page.getByRole('textbox');
    await input.fill('test@example.com');
    await expect(page).toHaveScreenshot('input-filled.png');
  });
});

test.describe('Select Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-select--default');
    await page.waitForSelector('ae-select');
  });

  test('renders default state', async ({ page }) => {
    await expect(page).toHaveScreenshot('select-default.png');
  });
});

test.describe('Textarea Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-textarea--default');
    await page.waitForSelector('ae-textarea');
  });

  test('renders default state', async ({ page }) => {
    await expect(page).toHaveScreenshot('textarea-default.png');
  });
});

test.describe('Badge Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-badge--primary');
    await page.waitForSelector('ae-badge');
  });

  test('renders all variants', async ({ page }) => {
    await expect(page).toHaveScreenshot('badge-variants.png');
  });
});

test.describe('Spinner Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-spinner--primary');
    await page.waitForSelector('ae-spinner');
  });

  test('renders spinner', async ({ page }) => {
    await expect(page).toHaveScreenshot('spinner-primary.png');
  });
});

test.describe('Switch Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-switch--default');
    await page.waitForSelector('ae-switch');
  });

  test('renders unchecked state', async ({ page }) => {
    await expect(page).toHaveScreenshot('switch-unchecked.png');
  });

  test('renders checked state', async ({ page }) => {
    const switchRole = page.getByRole('switch');
    await switchRole.click();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('switch-checked.png');
  });
});

test.describe('Progress Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-progress--default');
    await page.waitForSelector('ae-progress');
  });

  test('renders progress bar', async ({ page }) => {
    await expect(page).toHaveScreenshot('progress-default.png');
  });
});

test.describe('Breadcrumb Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-breadcrumb--default');
    await page.waitForSelector('ae-breadcrumb');
  });

  test('renders breadcrumb navigation', async ({ page }) => {
    await expect(page).toHaveScreenshot('breadcrumb-default.png');
  });

  test('current item has correct aria-current', async ({ page }) => {
    const currentItem = page.locator('ae-breadcrumb-item[current]');
    const li = currentItem.locator('li').first();
    await expect(li).toHaveAttribute('aria-current', 'page');
  });
});

test.describe('Pagination Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-pagination--default');
    await page.waitForSelector('ae-pagination');
  });

  test('renders pagination controls', async ({ page }) => {
    await expect(page).toHaveScreenshot('pagination-default.png');
  });
});

test.describe('Drawer Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-drawer--right');
    await page.waitForSelector('ae-drawer');
  });

  test('renders closed drawer', async ({ page }) => {
    await expect(page).toHaveScreenshot('drawer-closed.png');
  });

  test('renders open drawer', async ({ page }) => {
    const openButton = page.getByRole('button', { name: /open drawer/i });
    await openButton.click();
    await page.waitForTimeout(300); // Wait for animation
    await expect(page).toHaveScreenshot('drawer-open.png');
  });
});

test.describe('Popover Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-popover--click');
    await page.waitForSelector('ae-popover');
  });

  test('renders popover closed', async ({ page }) => {
    await expect(page).toHaveScreenshot('popover-closed.png');
  });

  test('renders popover open', async ({ page }) => {
    const trigger = page.locator('ae-popover').getByRole('button');
    await trigger.click();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('popover-open.png');
  });
});

test.describe('Menu Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-menu--default');
    await page.waitForSelector('ae-menu');
  });

  test('renders menu', async ({ page }) => {
    await expect(page).toHaveScreenshot('menu-default.png');
  });
});
