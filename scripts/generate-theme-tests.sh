#!/bin/bash

# Theme Test Generator
# Generates theme integration tests for a component

COMPONENT_NAME=$1
CORE_DIR="/home/user/AetherUI/packages/core/src"
COMPONENT_DIR="$CORE_DIR/$COMPONENT_NAME"
TEST_DIR="$COMPONENT_DIR/__tests__"
TEST_FILE="$TEST_DIR/ae-${COMPONENT_NAME}.theme.test.ts"

if [ -z "$COMPONENT_NAME" ]; then
    echo "Usage: $0 <component-name>"
    echo "Example: $0 accordion"
    exit 1
fi

if [ ! -d "$COMPONENT_DIR" ]; then
    echo "Error: Component directory not found: $COMPONENT_DIR"
    exit 1
fi

# Create test directory if it doesn't exist
mkdir -p "$TEST_DIR"

# Get component class name (capitalize first letter)
COMPONENT_CLASS="Ae$(echo "$COMPONENT_NAME" | sed 's/^\(.\)/\U\1/')"

# Find the main component file
MAIN_FILE=$(find "$COMPONENT_DIR" -name "ae-${COMPONENT_NAME}.ts" | head -1)

if [ ! -f "$MAIN_FILE" ]; then
    echo "Warning: Could not find main component file ae-${COMPONENT_NAME}.ts"
    echo "Using default component name..."
fi

# Detect common hardcoded colors in the component
COMMON_HARDCODED=()
if grep -q "#4f46e5\|#4338ca" "$COMPONENT_DIR"/*.ts 2>/dev/null; then
    COMMON_HARDCODED+=("#4f46e5")
fi
if grep -q "#e5e7eb\|#d1d5db" "$COMPONENT_DIR"/*.ts 2>/dev/null; then
    COMMON_HARDCODED+=("#e5e7eb")
fi
if grep -q "#111827\|#374151" "$COMPONENT_DIR"/*.ts 2>/dev/null; then
    COMMON_HARDCODED+=("#111827")
fi
if grep -q "#f9fafb\|#f3f4f6" "$COMPONENT_DIR"/*.ts 2>/dev/null; then
    COMMON_HARDCODED+=("#f9fafb")
fi

# Find all CSS variables used
CSS_VARS=$(grep -oh "var(--ae-${COMPONENT_NAME}-[a-z-]\+)" "$COMPONENT_DIR"/*.ts 2>/dev/null | \
           sed 's/var(--/--/g' | sed 's/)//g' | sort -u)

echo "Generating theme integration tests for: $COMPONENT_NAME"
echo "  Component class: $COMPONENT_CLASS"
echo "  Test file: $TEST_FILE"
echo ""

# Generate the test file
cat > "$TEST_FILE" << EOF
import { html, fixture, expect } from '@open-wc/testing';
import { $COMPONENT_CLASS } from '../ae-${COMPONENT_NAME}.js';
import '../ae-${COMPONENT_NAME}.js';

describe('ae-${COMPONENT_NAME} - Theme Integration', () => {
  describe('CSS Variable Usage', () => {
    it('uses CSS variables without hardcoded color fallbacks', async () => {
      const el = await fixture<$COMPONENT_CLASS>(html\`<ae-${COMPONENT_NAME}>Test</ae-${COMPONENT_NAME}>\`);
      await el.updateComplete;

      const styles = el.shadowRoot?.querySelector('style');
      const styleContent = styles?.textContent || '';

      // Verify component-specific CSS variables are used
EOF

# Add checks for detected CSS variables
if [ -n "$CSS_VARS" ]; then
    echo "$CSS_VARS" | while read -r var_name; do
        cat >> "$TEST_FILE" << EOF
      expect(styleContent).to.include('$var_name');
EOF
    done
else
    cat >> "$TEST_FILE" << EOF
      // Add specific CSS variable checks here
      // expect(styleContent).to.include('--ae-${COMPONENT_NAME}-bg');
      // expect(styleContent).to.include('--ae-${COMPONENT_NAME}-color');
EOF
fi

# Add checks for common hardcoded colors
cat >> "$TEST_FILE" << EOF

      // Verify NO hardcoded colors exist
EOF

if [ ${#COMMON_HARDCODED[@]} -gt 0 ]; then
    for color in "${COMMON_HARDCODED[@]}"; do
        cat >> "$TEST_FILE" << EOF
      expect(styleContent).to.not.include('$color');
EOF
    done
else
    cat >> "$TEST_FILE" << EOF
      // Common hardcoded colors to check:
      expect(styleContent).to.not.include('#4f46e5'); // purple
      expect(styleContent).to.not.include('#e5e7eb'); // light gray
      expect(styleContent).to.not.include('#111827'); // dark text
      expect(styleContent).to.not.include('#f9fafb'); // very light gray
EOF
fi

# Continue generating the test file
cat >> "$TEST_FILE" << EOF
    });

    it('has no hardcoded rgba() fallbacks', async () => {
      const el = await fixture<$COMPONENT_CLASS>(html\`<ae-${COMPONENT_NAME}>Test</ae-${COMPONENT_NAME}>\`);
      await el.updateComplete;

      const styles = el.shadowRoot?.querySelector('style')?.textContent || '';

      // Find all rgba() usages
      const rgbaMatches = styles.match(/rgba?\([^)]+\)/g) || [];

      // Check each rgba() to ensure it's inside a CSS variable or is acceptable
      rgbaMatches.forEach(rgba => {
        const context = styles.substring(
          Math.max(0, styles.indexOf(rgba) - 50),
          Math.min(styles.length, styles.indexOf(rgba) + 50)
        );

        // If rgba is not inside var(), it's a hardcoded value
        const isInVar = context.includes('var(');

        // rgba() should only be used in CSS variable definitions or specific cases
        if (!isInVar) {
          // Check if it's a known acceptable case (like transparent or shadows)
          const isTransparent = rgba === 'rgba(0, 0, 0, 0)';
          expect(isTransparent).to.be.true;
        }
      });
    });

    it('computed styles use theme variables at runtime', async () => {
      const el = await fixture<$COMPONENT_CLASS>(html\`<ae-${COMPONENT_NAME}>Test</ae-${COMPONENT_NAME}>\`);
      await el.updateComplete;

      // Get the base element (adjust selector based on component structure)
      const baseElement = el.shadowRoot?.querySelector('[part="base"]') ||
                          el.shadowRoot?.querySelector(':host > *');

      expect(baseElement).to.exist;

      if (baseElement) {
        const styles = window.getComputedStyle(baseElement);

        // Verify that computed styles exist (they should come from CSS variables)
        // Adjust these based on what the component actually uses
        expect(styles.backgroundColor).to.exist;
        expect(styles.color).to.exist;
      }
    });
  });

  describe('Theme Switching', () => {
    it('should use theme variables that can change', async () => {
      const el = await fixture<$COMPONENT_CLASS>(html\`<ae-${COMPONENT_NAME}>Test</ae-${COMPONENT_NAME}>\`);
      await el.updateComplete;

      // This test verifies the structure is correct for theming
      // Actual theme switching is tested in E2E visual tests

      const styleElement = el.shadowRoot?.querySelector('style');
      expect(styleElement).to.exist;

      // Style content should reference CSS variables
      const styleContent = styleElement?.textContent || '';
      const hasVariables = styleContent.includes('var(--ae-');

      expect(hasVariables).to.be.true;
    });
  });

  describe('All Component Variants', () => {
    it('all variants use theme variables', async () => {
      // If component has variants, test each one
      const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];

      for (const variant of variants) {
        const el = await fixture<$COMPONENT_CLASS>(
          html\`<ae-${COMPONENT_NAME} variant="\${variant}">Test</ae-${COMPONENT_NAME}>\`
        );
        await el.updateComplete;

        const styles = el.shadowRoot?.querySelector('style')?.textContent || '';

        // Each variant should use CSS variables, not hardcoded colors
        if (styles.includes(variant)) {
          expect(styles).to.include('var(--ae-');
        }
      }
    });
  });
});
EOF

echo "✅ Theme integration test generated!"
echo ""
echo "📝 Next steps:"
echo "  1. Review and customize the generated test: $TEST_FILE"
echo "  2. Adjust selectors based on your component's structure"
echo "  3. Add variant-specific tests if needed"
echo "  4. Run: npm run test -- ae-${COMPONENT_NAME}.theme.test.ts"
echo ""
echo "💡 Tips:"
echo "  - Check the tabs component tests for reference"
echo "  - Adjust the [part=\"base\"] selector to match your component"
echo "  - Add tests for different states (hover, active, disabled, etc.)"
echo ""
