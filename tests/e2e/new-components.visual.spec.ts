import { test, expect, FrameLocator } from '@playwright/test';

/**
 * Visual Regression Tests for 12 New Components
 * These tests catch visual bugs like incorrect rendering, escaped HTML, missing styles, etc.
 */

// Helper to get Storybook preview iframe
function getStorybookFrame(page: import('@playwright/test').Page): FrameLocator {
  return page.frameLocator('#storybook-preview-iframe');
}

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-input--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-input').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders default state', async ({ page }) => {
    await expect(page).toHaveScreenshot('input-default.png');
  });

  test('renders with user input', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const input = frame.getByRole('textbox');
    await input.fill('test@example.com');
    await expect(page).toHaveScreenshot('input-filled.png');
  });

  test('renders in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('input-dark-mode.png');
  });

  test('has themed border styles', async ({ page }) => {
    const frame = getStorybookFrame(page);

    // Verify the input has border styling applied via CSS variables
    const borderColor = await frame.locator('ae-input').evaluate((el) => {
      const wrapper = el.shadowRoot?.querySelector('.input-wrapper');
      return wrapper ? window.getComputedStyle(wrapper).borderColor : '';
    });

    // Border color should be defined (not empty or transparent)
    expect(borderColor).toBeTruthy();
    expect(borderColor).not.toBe('transparent');
  });
});

test.describe('Select Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-select--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-select').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders default state', async ({ page }) => {
    await expect(page).toHaveScreenshot('select-default.png');
  });

  test('renders in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('select-dark-mode.png');
  });
});

test.describe('Textarea Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-textarea--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-textarea').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders default state', async ({ page }) => {
    await expect(page).toHaveScreenshot('textarea-default.png');
  });

  test('renders in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('textarea-dark-mode.png');
  });
});

test.describe('Badge Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-badge--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-badge').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders all variants', async ({ page }) => {
    await expect(page).toHaveScreenshot('badge-variants.png');
  });

  test('renders in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('badge-dark-mode.png');
  });
});

test.describe('Spinner Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-spinner--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-spinner').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders spinner', async ({ page }) => {
    await expect(page).toHaveScreenshot('spinner-primary.png');
  });

  test('renders in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('spinner-dark-mode.png');
  });

  test('has themed spinner colors', async ({ page }) => {
    const frame = getStorybookFrame(page);

    // Verify the spinner has stroke styling applied
    const stroke = await frame.locator('ae-spinner').evaluate((el) => {
      const indicator = el.shadowRoot?.querySelector('.spinner-indicator');
      return indicator ? window.getComputedStyle(indicator).stroke : '';
    });

    // Stroke should be defined
    expect(stroke).toBeTruthy();
  });
});

test.describe('Switch Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-switch--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-switch').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders unchecked state', async ({ page }) => {
    await expect(page).toHaveScreenshot('switch-unchecked.png');
  });

  test('renders checked state', async ({ page }) => {
    const frame = getStorybookFrame(page);
    // Click on the switch element directly (uses checkbox internally)
    const switchEl = frame.locator('ae-switch');
    await switchEl.click();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('switch-checked.png');
  });

  test('renders in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('switch-dark-mode.png');
  });
});

test.describe('Progress Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-progress--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-progress').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders progress bar', async ({ page }) => {
    await expect(page).toHaveScreenshot('progress-default.png');
  });

  test('renders in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('progress-dark-mode.png');
  });
});

test.describe('Breadcrumb Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-breadcrumb--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-breadcrumb').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders breadcrumb navigation', async ({ page }) => {
    await expect(page).toHaveScreenshot('breadcrumb-default.png');
  });

  test('current item has correct aria-current', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const currentItem = frame.locator('ae-breadcrumb-item[current]');
    const li = currentItem.locator('li').first();
    await expect(li).toHaveAttribute('aria-current', 'page');
  });

  test('renders in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('breadcrumb-dark-mode.png');
  });
});

test.describe('Pagination Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-pagination--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-pagination').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders pagination controls', async ({ page }) => {
    await expect(page).toHaveScreenshot('pagination-default.png');
  });

  test('renders in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('pagination-dark-mode.png');
  });
});

test.describe('Drawer Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-drawer--right');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-drawer').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders closed drawer', async ({ page }) => {
    await expect(page).toHaveScreenshot('drawer-closed.png');
  });

  test('renders open drawer', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const openButton = frame.getByRole('button', { name: /open drawer/i });
    await openButton.click();
    await page.waitForTimeout(300); // Wait for animation
    await expect(page).toHaveScreenshot('drawer-open.png');
  });

  test('renders open drawer in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);

    const openButton = frame.getByRole('button', { name: /open drawer/i });
    await openButton.click();
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('drawer-open-dark-mode.png');
  });
});

test.describe('Popover Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-popover--click-trigger');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-popover').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders popover closed', async ({ page }) => {
    await expect(page).toHaveScreenshot('popover-closed.png');
  });

  test('renders popover open', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const trigger = frame.locator('ae-popover').getByRole('button');
    await trigger.click();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('popover-open.png');
  });

  test('renders popover in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);

    const trigger = frame.locator('ae-popover').getByRole('button');
    await trigger.click();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('popover-open-dark-mode.png');
  });
});

test.describe('Menu Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-menu--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-menu').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders menu', async ({ page }) => {
    await expect(page).toHaveScreenshot('menu-default.png');
  });

  test('renders in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('menu-dark-mode.png');
  });
});

test.describe('Tabs Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-tabs--default');
    const frame = getStorybookFrame(page);
    await frame.locator('ae-tabs').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('renders tabs in light mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    // Ensure light mode is active
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(100); // Wait for theme to apply
    await expect(page).toHaveScreenshot('tabs-light-mode.png');
  });

  test('renders tabs in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    // Switch to dark mode
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100); // Wait for theme to apply
    await expect(page).toHaveScreenshot('tabs-dark-mode.png');
  });

  test('renders selected tab with correct styling in light mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(100);

    // First tab should be selected by default - wait for it to be set
    const firstTab = frame.locator('ae-tab[aria-selected="true"]').first();
    await expect(firstTab).toBeVisible();

    await expect(page).toHaveScreenshot('tabs-selected-light.png');
  });

  test('renders selected tab with correct styling in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);

    // First tab should be selected by default - wait for it to be set
    const firstTab = frame.locator('ae-tab[aria-selected="true"]').first();
    await expect(firstTab).toBeVisible();

    await expect(page).toHaveScreenshot('tabs-selected-dark.png');
  });

  test('renders tab hover state in light mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'light');
    });

    // Hover over second tab
    const secondTab = frame.locator('ae-tab').nth(1);
    await secondTab.hover();
    await page.waitForTimeout(100); // Wait for hover transition

    await expect(page).toHaveScreenshot('tabs-hover-light.png');
  });

  test('renders tab hover state in dark mode', async ({ page }) => {
    const frame = getStorybookFrame(page);
    await frame.locator('html').evaluate((el) => {
      el.setAttribute('data-theme', 'dark');
    });

    // Hover over second tab
    const secondTab = frame.locator('ae-tab').nth(1);
    await secondTab.hover();
    await page.waitForTimeout(100); // Wait for hover transition

    await expect(page).toHaveScreenshot('tabs-hover-dark.png');
  });

  test('tab has styled text', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const firstTab = frame.locator('ae-tab').first();

    // Verify the tab has text color styling
    const textColor = await firstTab.evaluate((el) => {
      const button = el.shadowRoot?.querySelector('button');
      return button ? window.getComputedStyle(button).color : '';
    });

    expect(textColor).toBeTruthy();
  });

  test('selected tab has indicator', async ({ page }) => {
    const frame = getStorybookFrame(page);
    const selectedTab = frame.locator('ae-tab[aria-selected="true"]').first();

    // Verify the selected tab has an indicator element
    const hasIndicator = await selectedTab.evaluate((el) => {
      const indicator = el.shadowRoot?.querySelector('.indicator');
      return indicator !== null;
    });

    expect(hasIndicator).toBe(true);
  });
});
