# AetherUI Theme Migration Automation Scripts

This directory contains automation tools to help systematically fix hardcoded color issues across all AetherUI components.

## Overview

These scripts help you:

1. Analyze components for hardcoded colors
2. Check theme variable definitions
3. Generate theme integration tests
4. Guide you through the complete migration process

## Scripts

### 1. `migrate-component-theme.sh` (Main Script)

**The complete guided migration tool.** Use this to walk through the entire process step-by-step.

```bash
./scripts/migrate-component-theme.sh accordion
```

This interactive script:

- Analyzes hardcoded colors
- Checks theme variable definitions
- Generates theme tests
- Guides you through manual fixes
- Runs tests and verification

**When to use:** Starting a new component migration

---

### 2. `analyze-component-theme.sh`

Analyzes a component and identifies all hardcoded colors that need to be fixed.

```bash
./scripts/analyze-component-theme.sh accordion
```

**Output:**

- List of all hardcoded colors found
- Specific line numbers and files
- Suggested fixes for each issue
- Summary of total issues

**When to use:** Quick analysis or re-checking after fixes

---

### 3. `check-theme-variables.sh`

Checks if all CSS variables used in a component are defined in both `light.css` and `dark.css`.

```bash
./scripts/check-theme-variables.sh accordion
```

**Output:**

- Status of each variable (✅ complete, ⚠️ partial, ❌ missing)
- List of variables to add to each theme file
- Example format for adding variables

**When to use:** Before removing fallbacks, to ensure variables exist

---

### 4. `generate-theme-tests.sh`

Generates theme integration tests for a component.

```bash
./scripts/generate-theme-tests.sh accordion
```

**Output:**

- Creates `packages/core/src/[component]/__tests__/ae-[component].theme.test.ts`
- Tests verify CSS variable usage
- Tests check for hardcoded colors
- Tests validate theme switching

**When to use:** After fixing a component, to prevent regressions

---

## Typical Workflow

### Complete Migration for One Component

```bash
# Step 1: Run the guided migration script
./scripts/migrate-component-theme.sh accordion

# The script will guide you through:
# 1. Analyzing hardcoded colors
# 2. Checking theme variables
# 3. Adding missing variables to theme files
# 4. Generating tests
# 5. Manual fixes
# 6. Running tests
# 7. Manual verification
```

### Quick Check Workflow

```bash
# Just check if component has issues
./scripts/analyze-component-theme.sh accordion

# Check if variables are defined
./scripts/check-theme-variables.sh accordion

# Generate tests
./scripts/generate-theme-tests.sh accordion
```

## Example: Fixing the Accordion Component

```bash
# 1. Analyze the component
$ ./scripts/analyze-component-theme.sh accordion

======================================
Theme Fix Analysis: accordion
======================================

📁 Style Files Found:
  - /home/user/AetherUI/packages/core/src/accordion/styles.ts

🎨 Hardcoded Colors Found:
---
Line 21: --ae-accordion-border has fallback #e5e7eb
Line 75: --ae-accordion-header-hover-bg has fallback #f9fafb
[... more issues ...]

📊 Summary:
  Total hardcoded color issues: 16

# 2. Check if variables exist in theme files
$ ./scripts/check-theme-variables.sh accordion

📊 Variable Status:
---
  ✅ --ae-accordion-bg (in both themes)
  ✅ --ae-accordion-border (in both themes)
  [... all variables present ...]

✅ All variables are defined in both themes!

# 3. Edit the style files to remove fallbacks
# Open: packages/core/src/accordion/styles.ts
# Change:  border: var(--ae-accordion-border, 1px solid #e5e7eb);
# To:      border: var(--ae-accordion-border);

# 4. Generate and run tests
$ ./scripts/generate-theme-tests.sh accordion
$ npm run test -- ae-accordion.theme.test.ts

# 5. Verify in showcase app
$ cd packages/showcase && npm run dev
# Toggle dark mode and verify appearance

# 6. Commit
$ git add .
$ git commit -m "fix: remove hardcoded colors from accordion, use theme variables"
```

## Batch Processing

To migrate multiple components, create a simple loop:

```bash
#!/bin/bash
COMPONENTS=("accordion" "badge" "breadcrumb" "checkbox" "radio")

for comp in "${COMPONENTS[@]}"; do
  echo "=========================================="
  echo "Processing: $comp"
  echo "=========================================="

  # Analyze
  ./scripts/analyze-component-theme.sh "$comp"

  # Check variables
  ./scripts/check-theme-variables.sh "$comp"

  # Generate tests
  ./scripts/generate-theme-tests.sh "$comp"

  echo ""
  read -p "Ready to move to next component? (y/n) " -n 1 -r
  echo ""

  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    break
  fi
done
```

## Understanding the Output

### Analyze Script Output

```
Line 21: --ae-accordion-border has fallback #e5e7eb
```

- **Line 21**: Location in the file
- **--ae-accordion-border**: The CSS variable name
- **#e5e7eb**: The hardcoded fallback value to remove

### Check Variables Output

```
✅ --ae-accordion-bg (in both themes)      # Perfect - no action needed
⚠️  --ae-alert-fg-info (only in light.css)  # Add to dark.css
❌ --ae-new-var (NOT DEFINED)              # Add to both theme files
```

### Test Generation

Generated tests check:

- ✅ CSS variables are used
- ❌ Hardcoded colors are NOT present
- ✅ Computed styles work correctly
- ✅ Theme switching is possible

## Common Issues and Solutions

### Issue: "Component directory not found"

**Solution:** Make sure you use the exact component directory name:

```bash
# Correct:
./scripts/analyze-component-theme.sh accordion

# Wrong:
./scripts/analyze-component-theme.sh Accordion
./scripts/analyze-component-theme.sh ae-accordion
```

### Issue: Variables marked as missing but they exist

**Solution:** Make sure the variable name in the component matches exactly with theme files:

```css
/* Component uses: */
var(--ae-accordion-border)

/* Theme file must have: */
--ae-accordion-border: #e5e7eb;  /* Not --ae-accordion-borders (plural) */
```

### Issue: Tests fail after removing fallbacks

**Solution:**

1. Ensure all variables are defined in BOTH light.css AND dark.css
2. Check for typos in variable names
3. Make sure you removed ALL hardcoded fallbacks

### Issue: Component looks broken in showcase

**Solution:**

1. Hard refresh the page (Cmd/Ctrl + Shift + R)
2. Check browser console for CSS errors
3. Verify theme CSS is loading correctly
4. Check if you accidentally removed required fallbacks for shadows/transparency

## Testing Your Changes

After migrating a component:

```bash
# 1. Run unit tests
npm run test -- ae-[component].theme.test.ts

# 2. Run all component tests
npm run test -- packages/core/src/[component]

# 3. Start showcase app
cd packages/showcase
npm run dev

# 4. Manual checklist:
# - Component renders correctly
# - Light mode looks good
# - Dark mode looks good
# - Toggle between themes works
# - Hover states work in both themes
# - Disabled states work in both themes
```

## Contributing

When adding new automation features:

1. Follow the existing script patterns
2. Use descriptive echo statements
3. Provide helpful error messages
4. Test on multiple components
5. Update this README

## Reference

- **Theme Testing Guide:** `THEME_TESTING_GUIDE.md`
- **Audit Findings:** `THEME_AUDIT_FINDINGS.md`
- **Example Component:** `packages/core/src/tabs`
- **Theme Files:** `packages/tokens/src/light.css` and `dark.css`

## Support

If you encounter issues with these scripts:

1. Check the error message carefully
2. Review the script source code (they're well-commented)
3. Test on the tabs component (known working example)
4. Consult the theme testing guide
5. Ask for help in the AetherUI team channel

---

**Happy Migrating! 🎨**
