#!/bin/bash

# Theme Variable Checker
# Checks if all component CSS variables are defined in both light.css and dark.css

COMPONENT_NAME=$1
CORE_DIR="/home/user/AetherUI/packages/core/src"
TOKENS_DIR="/home/user/AetherUI/packages/tokens/src"
LIGHT_CSS="$TOKENS_DIR/light.css"
DARK_CSS="$TOKENS_DIR/dark.css"

if [ -z "$COMPONENT_NAME" ]; then
    echo "Usage: $0 <component-name>"
    echo "Example: $0 accordion"
    exit 1
fi

COMPONENT_DIR="$CORE_DIR/$COMPONENT_NAME"

if [ ! -d "$COMPONENT_DIR" ]; then
    echo "Error: Component directory not found: $COMPONENT_DIR"
    exit 1
fi

echo "========================================"
echo "Theme Variable Check: $COMPONENT_NAME"
echo "========================================"
echo ""

# Find all CSS variables used in component
echo "🔍 Finding CSS variables in component..."
COMPONENT_VARS=$(grep -rohE "\-\-ae-${COMPONENT_NAME}-[a-z0-9-]+" "$COMPONENT_DIR" | sort -u)

if [ -z "$COMPONENT_VARS" ]; then
    echo "  No component-specific CSS variables found."
    echo "  Checking for generic --ae- variables..."
    COMPONENT_VARS=$(grep -rohE "\-\-ae-[a-z0-9-]+" "$COMPONENT_DIR" | sort -u)
fi

if [ -z "$COMPONENT_VARS" ]; then
    echo "  ❌ No CSS variables found in component."
    exit 0
fi

TOTAL_VARS=$(echo "$COMPONENT_VARS" | wc -l)
echo "  Found $TOTAL_VARS variables"
echo ""

# Check each variable in both theme files
echo "📊 Variable Status:"
echo "---"

MISSING_LIGHT=()
MISSING_DARK=()
COMPLETE=()

while IFS= read -r var_name; do
    IN_LIGHT=$(grep -c -- "$var_name" "$LIGHT_CSS" 2>/dev/null || echo "0")
    IN_DARK=$(grep -c -- "$var_name" "$DARK_CSS" 2>/dev/null || echo "0")

    if [ "$IN_LIGHT" -gt 0 ] && [ "$IN_DARK" -gt 0 ]; then
        echo "  ✅ $var_name (in both themes)"
        COMPLETE+=("$var_name")
    elif [ "$IN_LIGHT" -gt 0 ]; then
        echo "  ⚠️  $var_name (only in light.css)"
        MISSING_DARK+=("$var_name")
    elif [ "$IN_DARK" -gt 0 ]; then
        echo "  ⚠️  $var_name (only in dark.css)"
        MISSING_LIGHT+=("$var_name")
    else
        echo "  ❌ $var_name (NOT DEFINED)"
        MISSING_LIGHT+=("$var_name")
        MISSING_DARK+=("$var_name")
    fi
done <<< "$COMPONENT_VARS"

echo ""
echo "📈 Summary:"
echo "---"
echo "  Total variables: $TOTAL_VARS"
echo "  Complete (both themes): ${#COMPLETE[@]}"
echo "  Missing from light.css: ${#MISSING_LIGHT[@]}"
echo "  Missing from dark.css: ${#MISSING_DARK[@]}"
echo ""

if [ ${#MISSING_LIGHT[@]} -eq 0 ] && [ ${#MISSING_DARK[@]} -eq 0 ]; then
    echo "✅ All variables are defined in both themes!"
    exit 0
fi

# Suggest additions
if [ ${#MISSING_LIGHT[@]} -gt 0 ]; then
    echo "🔧 Variables to add to light.css:"
    echo "---"
    for var_name in "${MISSING_LIGHT[@]}"; do
        # Try to find the variable's usage to suggest a value
        USAGE=$(grep -rn -- "$var_name" "$COMPONENT_DIR" | head -1)
        echo "  $var_name: <light-mode-value>;"
        if [ -n "$USAGE" ]; then
            echo "    Used in: $(echo "$USAGE" | cut -d: -f1 | xargs basename):$(echo "$USAGE" | cut -d: -f2)"
        fi
    done
    echo ""
fi

if [ ${#MISSING_DARK[@]} -gt 0 ]; then
    echo "🔧 Variables to add to dark.css:"
    echo "---"
    for var_name in "${MISSING_DARK[@]}"; do
        USAGE=$(grep -rn -- "$var_name" "$COMPONENT_DIR" | head -1)
        echo "  $var_name: <dark-mode-value>;"
        if [ -n "$USAGE" ]; then
            echo "    Used in: $(echo "$USAGE" | cut -d: -f1 | xargs basename):$(echo "$USAGE" | cut -d: -f2)"
        fi
    done
    echo ""
fi

echo "📝 Recommendation:"
echo "---"
echo "1. Open: $LIGHT_CSS"
echo "2. Find the /* ===== ${COMPONENT_NAME^} Component ===== */ section"
echo "3. Add missing variables with appropriate light mode values"
echo "4. Repeat for: $DARK_CSS"
echo "5. Use existing theme colors as reference (--ae-color-primary, etc.)"
echo ""

# Show example format
echo "💡 Example format:"
echo "---"
cat << 'EOF'
/* In light.css */
:root {
  /* ===== MyComponent Component ===== */
  --ae-mycomponent-bg: #ffffff;
  --ae-mycomponent-text: #111827;
  --ae-mycomponent-border: #e5e7eb;
  --ae-mycomponent-hover-bg: #f9fafb;
}

/* In dark.css */
:root {
  /* ===== MyComponent Component ===== */
  --ae-mycomponent-bg: #1f2937;
  --ae-mycomponent-text: #f9fafb;
  --ae-mycomponent-border: #374151;
  --ae-mycomponent-hover-bg: #374151;
}
EOF
echo ""
