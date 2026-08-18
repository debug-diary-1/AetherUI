import { expect, test } from '@playwright/test';

test('autocomplete filters and selects through the published Storybook surface', async ({
  page,
}) => {
  await page.goto('/iframe.html?id=components-autocomplete--basic&viewMode=story');
  const autocomplete = page.locator('ae-autocomplete');
  await expect(autocomplete).toBeVisible();

  const input = autocomplete.locator('input[role="combobox"]');
  await input.fill('Austr');
  const option = autocomplete.locator('[role="option"]', { hasText: 'Austria' });
  await expect(option).toBeVisible();
  await option.click();

  await expect(input).toHaveValue('Austria');
  await expect(input).toHaveAttribute('aria-expanded', 'false');
});

test('alert exposes its close behavior through the published Storybook surface', async ({
  page,
}) => {
  await page.goto('/iframe.html?id=components-alert--all&viewMode=story');
  const alert = page.locator('ae-alert[closable]').last();
  await expect
    .poll(() => alert.evaluate((element) => (element as HTMLElement & { open: boolean }).open))
    .toBe(true);

  await alert.locator('[part="close"]').click();

  await expect
    .poll(() => alert.evaluate((element) => (element as HTMLElement & { open: boolean }).open))
    .toBe(false);
});
