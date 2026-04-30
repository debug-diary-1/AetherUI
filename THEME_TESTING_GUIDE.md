# Theme Testing Guide for AetherUI

## Overview

This guide outlines the standards and practices for ensuring all AetherUI components properly integrate with the theme system and work correctly in both light and dark modes.

## Audit Results Summary

**Date:** November 25, 2025

- **Total Components:** 25
- **Components with Hardcoded Colors:** 23 (92%)
- **Clean Components:** 2 (8%) - button, tabs

### The Problem

Most components use CSS variables with hardcoded fallback values that don't adapt to dark mode:

```css
/* ❌ WRONG - Hardcoded fallback */
color: var(--ae-tabs-active-color, #4f46e5);

/* ✅ CORRECT - No fallback or theme-aware fallback */
color: var(--ae-tabs-active-color);
```

## Theme Integration Requirements

### 1. CSS Variable Usage

**NEVER use hardcoded color fallbacks** in component styles:

```css
/* ❌ BAD EXAMPLES */
border: var(--ae-accordion-border, 1px solid #e5e7eb);
color: var(--ae-checkbox-disabled-text-color, #9ca3af);
background: var(--ae-button-bg-primary, #4f46e5);

/* ✅ GOOD EXAMPLES */
border: var(--ae-accordion-border);
color: var(--ae-checkbox-disabled-text-color);
background: var(--ae-button-bg-primary);
```

**Why?** Hardcoded fallbacks prevent dark mode from working properly. The theme system defines ALL these variables in both `light.css` and `dark.css`.

### 2. Shadow and Transparency Values

Even `rgba()` and shadow values should use variables:

```css
/* ❌ BAD */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
background: rgba(255, 255, 255, 0.9);

/* ✅ GOOD */
box-shadow: var(--ae-shadow-sm);
background: var(--ae-overlay-bg);
```

### 3. Component-Specific Variables

Each component should have dedicated theme variables defined in:

- `packages/tokens/src/light.css`
- `packages/tokens/src/dark.css`

Example for a component:

```css
/* In light.css */
:root {
  --ae-mycomponent-bg: #ffffff;
  --ae-mycomponent-text: #111827;
  --ae-mycomponent-border: #e5e7eb;
  --ae-mycomponent-hover-bg: #f9fafb;
}

/* In dark.css */
:root {
  --ae-mycomponent-bg: #1f2937;
  --ae-mycomponent-text: #f9fafb;
  --ae-mycomponent-border: #374151;
  --ae-mycomponent-hover-bg: #374151;
}
```

## Testing Requirements

Every component MUST have three types of tests:

### 1. Unit Tests (Functional)

Test basic functionality, properties, events, and accessibility.

**Location:** `packages/core/src/[component]/__tests__/ae-[component].test.ts`

```typescript
describe('ae-mycomponent', () => {
  describe('Basic Functionality', () => {
    it('has correct default properties', async () => {
      const el = await fixture<AeMyComponent>(html`<ae-mycomponent></ae-mycomponent>`);
      expect(el.variant).to.equal('primary');
    });
  });

  describe('Accessibility', () => {
    it('sets correct ARIA attributes', async () => {
      // ARIA tests
    });
  });
});
```

### 2. Theme Integration Tests (Unit)

**CRITICAL:** Test that components use CSS variables without hardcoded fallbacks.

```typescript
describe('ae-mycomponent', () => {
  describe('Theme Integration', () => {
    it('uses CSS variables without hardcoded color fallbacks', async () => {
      const el = await fixture<AeMyComponent>(html`<ae-mycomponent></ae-mycomponent>`);
      const styles = el.shadowRoot?.querySelector('style');

      // Verify CSS variables are used
      expect(styles?.textContent).to.include('--ae-mycomponent-bg');
      expect(styles?.textContent).to.include('--ae-mycomponent-text');

      // Verify NO hardcoded colors (adjust these based on your theme)
      expect(styles?.textContent).to.not.include('#4f46e5'); // purple
      expect(styles?.textContent).to.not.include('#e5e7eb'); // light gray
      expect(styles?.textContent).to.not.include('#111827'); // dark gray
      expect(styles?.textContent).to.not.include('#f9fafb'); // very light gray
    });

    it('has no rgba() color fallbacks in styles', async () => {
      const el = await fixture<AeMyComponent>(html`<ae-mycomponent></ae-mycomponent>`);
      const styles = el.shadowRoot?.querySelector('style')?.textContent || '';

      // Check for rgba patterns that aren't in var() declarations
      const rgbaMatches = styles.match(/rgba\([^)]+\)/g) || [];
      const inVarDeclarations = rgbaMatches.filter((match) => {
        const context = styles.substring(
          Math.max(0, styles.indexOf(match) - 30),
          styles.indexOf(match) + 50,
        );
        return context.includes('var(');
      });

      // All rgba should be inside CSS variable fallbacks (which we want to remove)
      // or should use CSS variables
      expect(rgbaMatches.length).to.equal(inVarDeclarations.length);
    });

    it('computed styles use theme variables at runtime', async () => {
      const el = await fixture<AeMyComponent>(html`<ae-mycomponent></ae-mycomponent>`);
      await el.updateComplete;

      const baseElement = el.shadowRoot?.querySelector('[part="base"]');
      const styles = window.getComputedStyle(baseElement!);

      // Verify that actual styles are applied (they exist)
      expect(styles.backgroundColor).to.exist;
      expect(styles.color).to.exist;
    });
  });
});
```

### 3. Visual Regression Tests (E2E)

Test visual appearance in light and dark modes.

**Location:** `tests/e2e/new-components.visual.spec.ts`

```typescript
test.describe('MyComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mycomponent');
    await page.waitForSelector('ae-mycomponent');
  });

  test('renders in light mode', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('mycomponent-light.png');
  });

  test('renders in dark mode', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot('mycomponent-dark.png');
  });

  test('theme switching updates colors', async ({ page }) => {
    // Get light mode color
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(100);

    const lightColor = await page.locator('ae-mycomponent').evaluate((el) => {
      const baseEl = el.shadowRoot?.querySelector('[part="base"]');
      return window.getComputedStyle(baseEl!).backgroundColor;
    });

    // Get dark mode color
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(100);

    const darkColor = await page.locator('ae-mycomponent').evaluate((el) => {
      const baseEl = el.shadowRoot?.querySelector('[part="base"]');
      return window.getComputedStyle(baseEl!).backgroundColor;
    });

    // Colors should be different
    expect(lightColor).not.toBe(darkColor);
  });
});
```

## Component Development Checklist

When creating or updating a component:

- [ ] Define all color variables in `packages/tokens/src/light.css`
- [ ] Define all color variables in `packages/tokens/src/dark.css`
- [ ] Use ONLY CSS variables in component styles (NO hardcoded fallbacks)
- [ ] Write unit tests for basic functionality
- [ ] Write unit tests for theme integration
- [ ] Write visual regression tests for light/dark modes
- [ ] Manually test in showcase app with theme toggle
- [ ] Verify no hardcoded colors with: `grep -rn "#[0-9a-fA-F]" src/[component]/`

## Common Mistakes to Avoid

### Mistake 1: Using Hardcoded Fallbacks

```css
/* ❌ WRONG */
color: var(--ae-text-primary, #111827);
```

**Why it's wrong:** The fallback `#111827` is a dark color that won't change in dark mode.

**Fix:**

```css
/* ✅ CORRECT */
color: var(--ae-text-primary);
```

### Mistake 2: Hardcoded rgba() in Shadows

```css
/* ❌ WRONG */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
```

**Fix:**

```css
/* ✅ CORRECT */
box-shadow: var(--ae-shadow-sm);
```

### Mistake 3: Component-Specific Fallbacks

```css
/* ❌ WRONG */
background: var(--ae-button-bg-primary, #4f46e5);
```

**Fix:**

```css
/* ✅ CORRECT */
background: var(--ae-button-bg-primary);
```

And ensure the variable is defined in BOTH `light.css` and `dark.css`.

## Testing Commands

```bash
# Run unit tests
pnpm test

# Run theme-specific tests
pnpm test --grep "Theme Integration"

# Run visual regression tests
pnpm test:e2e

# Audit all components for hardcoded colors
bash /tmp/audit-hardcoded-colors.sh
```

## Prevention: Pre-commit Hook

Add this to `.husky/pre-commit` to catch hardcoded colors:

```bash
# Check for hardcoded colors in component files
if git diff --cached --name-only | grep -E "packages/core/src/.+\.(ts|css)$" | xargs grep -E "#[0-9a-fA-F]{3,6}|rgba?\([^)]+\)" | grep -v "@cssproperty\|/\*\|//"; then
  echo "Error: Hardcoded color values detected in components!"
  echo "Please use CSS variables from the theme system instead."
  exit 1
fi
```

## Migration Strategy

For existing components with hardcoded colors:

1. **Identify all hardcoded values** using the audit script
2. **Check if theme variables exist** in `light.css` and `dark.css`
3. **Add missing variables** to both theme files if needed
4. **Remove fallback values** from component styles
5. **Write theme integration tests**
6. **Manually verify** in showcase with theme toggle
7. **Commit changes** with descriptive message

## Example: Tabs Component (Fixed)

See `packages/core/src/tabs/` for a complete example of proper theme integration:

- ✅ No hardcoded color fallbacks
- ✅ All colors defined in theme files
- ✅ Comprehensive theme integration tests
- ✅ Visual regression tests for light/dark modes

## Resources

- **Theme Variables:** `packages/tokens/src/light.css` and `dark.css`
- **Test Template:** `packages/core/src/tabs/__tests__/ae-tabs.test.ts`
- **Visual Test Template:** `tests/e2e/new-components.visual.spec.ts` (Tabs section)
- **Audit Script:** `/tmp/audit-hardcoded-colors.sh`

## Questions?

Contact the AetherUI team or refer to existing properly-themed components like `tabs` and `button`.
