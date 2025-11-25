#!/bin/bash

# Component Theme Migration Script
# Guides you through fixing a component's theme integration

COMPONENT_NAME=$1
SCRIPT_DIR="$(dirname "$0")"
CORE_DIR="/home/user/AetherUI/packages/core/src"
COMPONENT_DIR="$CORE_DIR/$COMPONENT_NAME"

if [ -z "$COMPONENT_NAME" ]; then
    echo "========================================"
    echo "Component Theme Migration Tool"
    echo "========================================"
    echo ""
    echo "Usage: $0 <component-name>"
    echo ""
    echo "Example: $0 accordion"
    echo ""
    echo "This tool will guide you through:"
    echo "  1. Analyzing hardcoded colors"
    echo "  2. Checking theme variable definitions"
    echo "  3. Generating theme integration tests"
    echo "  4. Providing step-by-step fix instructions"
    echo ""
    exit 1
fi

if [ ! -d "$COMPONENT_DIR" ]; then
    echo "Error: Component directory not found: $COMPONENT_DIR"
    exit 1
fi

echo "========================================"
echo "Theme Migration: $COMPONENT_NAME"
echo "========================================"
echo ""
echo "This tool will analyze your component and guide you through"
echo "fixing theme integration issues."
echo ""

# Step 1: Analyze hardcoded colors
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 1: Analyzing Hardcoded Colors"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

bash "$SCRIPT_DIR/analyze-component-theme.sh" "$COMPONENT_NAME"

echo ""
read -p "Press Enter to continue to Step 2..."
echo ""

# Step 2: Check theme variables
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 2: Checking Theme Variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

bash "$SCRIPT_DIR/check-theme-variables.sh" "$COMPONENT_NAME"

echo ""
read -p "Have you added missing variables to light.css and dark.css? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "⚠️  Please add missing variables to theme files before continuing."
    echo "  Location: packages/tokens/src/light.css and dark.css"
    echo ""
    echo "Run this script again when you're ready: $0 $COMPONENT_NAME"
    exit 1
fi

echo ""
echo "Great! Moving on..."
echo ""

# Step 3: Generate theme tests
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 3: Generating Theme Integration Tests"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

TEST_FILE="$COMPONENT_DIR/__tests__/ae-${COMPONENT_NAME}.theme.test.ts"

if [ -f "$TEST_FILE" ]; then
    echo "⚠️  Theme test file already exists: $TEST_FILE"
    read -p "Overwrite existing test file? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping test generation."
    else
        bash "$SCRIPT_DIR/generate-theme-tests.sh" "$COMPONENT_NAME"
    fi
else
    bash "$SCRIPT_DIR/generate-theme-tests.sh" "$COMPONENT_NAME"
fi

echo ""
read -p "Press Enter to continue to Step 4..."
echo ""

# Step 4: Manual fix instructions
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 4: Manual Fixes Required"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Now you need to manually edit the component style files"
echo "to remove hardcoded color fallbacks."
echo ""
echo "📝 Instructions:"
echo ""
echo "1. Open style files in: $COMPONENT_DIR"
echo ""
echo "2. Find patterns like:"
echo "   color: var(--ae-$COMPONENT_NAME-text, #111827);"
echo ""
echo "3. Remove the hardcoded fallback:"
echo "   color: var(--ae-$COMPONENT_NAME-text);"
echo ""
echo "4. Save all files"
echo ""
read -p "Have you removed all hardcoded fallbacks? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Please complete the manual fixes before testing."
    echo "Use the analysis output above to find all locations."
    exit 1
fi

echo ""

# Step 5: Run tests
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 5: Running Tests"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Running theme integration tests..."
echo ""

cd /home/user/AetherUI

if [ -f "$TEST_FILE" ]; then
    npm run test -- "ae-${COMPONENT_NAME}.theme.test.ts"
    TEST_RESULT=$?

    echo ""
    if [ $TEST_RESULT -eq 0 ]; then
        echo "✅ Tests passed!"
    else
        echo "❌ Tests failed. Please review the errors above."
        echo ""
        echo "Common issues:"
        echo "  - Hardcoded colors still present in styles"
        echo "  - CSS variables not defined in theme files"
        echo "  - Typos in variable names"
        echo ""
        exit 1
    fi
else
    echo "⚠️  No theme test file found. Skipping automated tests."
fi

echo ""
read -p "Press Enter to continue to final verification..."
echo ""

# Step 6: Manual verification
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 6: Manual Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Final steps for verification:"
echo ""
echo "1. Start the showcase app:"
echo "   cd packages/showcase && npm run dev"
echo ""
echo "2. Navigate to the $COMPONENT_NAME component page"
echo ""
echo "3. Toggle between light and dark modes"
echo ""
echo "4. Verify that:"
echo "   ✓ Component colors change appropriately"
echo "   ✓ Text is readable in both modes"
echo "   ✓ Borders and backgrounds adapt correctly"
echo "   ✓ Hover/active states work in both modes"
echo ""
echo "5. If everything looks good, commit your changes:"
echo "   git add packages/core/src/$COMPONENT_NAME"
echo "   git add packages/tokens/src/light.css"
echo "   git add packages/tokens/src/dark.css"
echo "   git commit -m \"fix: remove hardcoded colors from $COMPONENT_NAME, use theme variables\""
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Migration Guide Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Reference:"
echo "  - Testing Guide: THEME_TESTING_GUIDE.md"
echo "  - Audit Report: THEME_AUDIT_FINDINGS.md"
echo "  - Example Component: packages/core/src/tabs"
echo ""
