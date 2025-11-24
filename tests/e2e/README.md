# E2E Testing Suite

This directory contains end-to-end tests for AetherUI components using Playwright.

## 🎯 Test Types

### 1. **Visual Regression Tests**
Catch visual bugs by comparing screenshots against baselines.

**Example:** Combo component HTML rendering bug would be caught by:
```typescript
// Verifies highlight is rendered as HTML, not escaped text
const innerHTML = await option.innerHTML();
expect(innerHTML).toContain('<span class="highlight"');
expect(innerHTML).not.toContain('&lt;span');
```

### 2. **Interaction Tests**
Test user interactions like clicks, keyboard navigation, form submissions.

### 3. **Accessibility Tests**
Verify ARIA attributes, roles, and keyboard navigation.

## 🚀 Running Tests

### Run all E2E tests
```bash
pnpm test:e2e
```

### Run tests in UI mode (interactive)
```bash
pnpm test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
pnpm test:e2e:headed
```

### Update visual snapshots
```bash
pnpm test:e2e:update-snapshots
```

### Run specific test file
```bash
pnpm test:e2e combo.visual.spec.ts
```

## 📸 Visual Regression Testing

### First Time Setup
1. Run tests to generate baseline screenshots:
   ```bash
   pnpm test:e2e:update-snapshots
   ```

2. Commit the screenshots to git:
   ```bash
   git add tests/e2e/**/*.png
   git commit -m "test: add visual regression baselines"
   ```

### Updating Baselines
When you intentionally change component visuals:
```bash
pnpm test:e2e:update-snapshots
git add tests/e2e/**/*.png
git commit -m "test: update visual baselines after design change"
```

## 🧪 Writing New Tests

### Visual Test Template
```typescript
test.describe('MyComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/components-mycomponent--default');
    await page.waitForSelector('my-component');
  });

  test('renders default state', async ({ page }) => {
    await expect(page).toHaveScreenshot('mycomponent-default.png');
  });
});
```

### Interaction Test Template
```typescript
test('user can interact with component', async ({ page }) => {
  const button = page.getByRole('button');
  await button.click();

  await expect(page.getByText('Success')).toBeVisible();
  await expect(page).toHaveScreenshot('mycomponent-clicked.png');
});
```

## 🤝 CI Integration

Tests run automatically on:
- Every push to `main`
- Every pull request

CI will:
1. Run unit tests
2. Build Storybook
3. Run Storybook test runner (interaction tests)
4. Run Playwright E2E tests (visual regression)
5. Upload test reports and screenshots if tests fail

## 📊 Test Reports

After running tests locally:
```bash
npx playwright show-report
```

On CI failures:
- Check the "playwright-report" artifact
- Check the "playwright-screenshots" artifact

## 🐛 Debugging

### Debug specific test
```bash
npx playwright test --debug combo.visual.spec.ts
```

### View trace for failed test
```bash
npx playwright show-trace test-results/path/to/trace.zip
```

## 📝 Best Practices

1. **Always update baselines intentionally** - Don't auto-update without reviewing changes
2. **Keep test descriptions clear** - Describe what you're testing, not how
3. **Wait for animations** - Use `await page.waitForTimeout(300)` after animations
4. **Test critical paths first** - Focus on components that have had bugs
5. **Use meaningful screenshot names** - `component-state.png` not `test-1.png`

## 🎨 Component Coverage

### ✅ Covered
- Combo (including highlight rendering bug prevention)
- Input
- Select
- Textarea
- Badge
- Spinner
- Switch
- Progress
- Breadcrumb (including aria-current validation)
- Pagination
- Drawer
- Popover
- Menu

### 🔄 Priority for Additional Coverage
Add more tests as bugs are discovered or for critical user flows.
