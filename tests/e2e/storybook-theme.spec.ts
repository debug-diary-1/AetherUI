import { expect, test } from '@playwright/test';

for (const theme of ['light', 'dark']) {
  test(`${theme} theme styles badges and input fields`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=components-badge--default&viewMode=story&globals=theme:${theme}`,
    );
    await expect(page.locator('ae-badge [part="base"]')).toHaveCSS(
      'background-color',
      theme === 'dark' ? 'rgb(99, 102, 241)' : 'rgb(79, 70, 229)',
    );
    for (const name of ['input', 'select', 'textarea']) {
      await page.goto(
        `/iframe.html?id=components-${name}--default&viewMode=story&globals=theme:${theme}`,
      );
      const field = page.locator(`ae-${name} [part="${name}-wrapper"]`);
      await expect(field).toHaveCSS(
        'background-color',
        theme === 'dark' ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
      );
      await expect(field).toHaveCSS('border-top-width', '1px');
      await expect(field).toHaveCSS('border-top-style', 'solid');
    }
  });
}

test('toolbar switches the active component theme in place', async ({ page }) => {
  await page.goto('/?path=/story/components-badge--all-variants');
  const badge = page
    .frameLocator('#storybook-preview-iframe')
    .locator('ae-badge [part="base"]')
    .first();
  await expect(badge).toHaveCSS('background-color', 'rgb(79, 70, 229)');
  await page
    .getByRole('button', { name: 'Global theme for components Light Theme', exact: true })
    .click();
  await page.getByText('Dark Theme', { exact: true }).last().click();
  await expect(badge).toHaveCSS('background-color', 'rgb(99, 102, 241)');
  await page
    .getByRole('button', { name: 'Global theme for components Dark Theme', exact: true })
    .click();
  await page.getByText('Light Theme', { exact: true }).last().click();
  await expect(badge).toHaveCSS('background-color', 'rgb(79, 70, 229)');
});
