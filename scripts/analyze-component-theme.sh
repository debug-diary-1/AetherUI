#!/bin/bash

# Component Theme Fix Analyzer
# Analyzes a component and suggests specific fixes for hardcoded colors

COMPONENT_NAME=$1
CORE_DIR="/home/user/AetherUI/packages/core/src"
COMPONENT_DIR="$CORE_DIR/$COMPONENT_NAME"

if [ -z "$COMPONENT_NAME" ]; then
    echo "Usage: $0 <component-name>"
    echo "Example: $0 accordion"
    exit 1
fi

if [ ! -d "$COMPONENT_DIR" ]; then
    echo "Error: Component directory not found: $COMPONENT_DIR"
    exit 1
fi

echo "========================================"
echo "Theme Fix Analysis: $COMPONENT_NAME"
echo "========================================"
echo ""

# Find all style files
STYLE_FILES=$(find "$COMPONENT_DIR" -name "*styles*.ts" -o -name "*.css")

if [ -z "$STYLE_FILES" ]; then
    echo "No style files found in component directory."
    exit 0
fi

echo "📁 Style Files Found:"
echo "$STYLE_FILES" | sed 's/^/  - /'
echo ""

# Extract all hardcoded colors
echo "🎨 Hardcoded Colors Found:"
echo "---"

TEMP_REPORT=$(mktemp)

for file in $STYLE_FILES; do
    # Find hex colors
    grep -n "#[0-9a-fA-F]\{3,6\}" "$file" | while read -r line; do
        line_num=$(echo "$line" | cut -d: -f1)
        content=$(echo "$line" | cut -d: -f2-)

        # Extract the hex color
        hex_color=$(echo "$content" | grep -oE "#[0-9a-fA-F]{3,6}" | head -1)

        # Extract the CSS variable name if present
        var_name=$(echo "$content" | grep -oE "var\(--[a-z0-9-]+")

        if [ -n "$var_name" ]; then
            var_name=$(echo "$var_name" | sed 's/var(//')
            echo "Line $line_num: $var_name has fallback $hex_color"
            echo "$file:$line_num:$var_name:$hex_color" >> "$TEMP_REPORT"
        fi
    done

    # Find rgba colors
    grep -n "rgba\?([^)]\+)" "$file" | while read -r line; do
        line_num=$(echo "$line" | cut -d: -f1)
        content=$(echo "$line" | cut -d: -f2-)

        # Skip if it's in a var() declaration
        if ! echo "$content" | grep -q "var("; then
            rgba_color=$(echo "$content" | grep -oE "rgba?\([^)]+\)" | head -1)
            echo "Line $line_num: Direct rgba usage: $rgba_color"
            echo "$file:$line_num:direct:$rgba_color" >> "$TEMP_REPORT"
        fi
    done
done

echo ""
echo "📊 Summary:"
total_issues=$(wc -l < "$TEMP_REPORT")
echo "  Total hardcoded color issues: $total_issues"
echo ""

if [ "$total_issues" -eq 0 ]; then
    echo "✅ No hardcoded colors found! Component is clean."
    rm "$TEMP_REPORT"
    exit 0
fi

echo "🔧 Suggested Fixes:"
echo "---"

# Group by variable name
sort -t: -k3 "$TEMP_REPORT" | while IFS=: read -r file line_num var_name color; do
    if [ "$var_name" != "direct" ]; then
        echo "  Remove fallback from $var_name"
        echo "    File: $(basename "$file"):$line_num"
        echo "    Current: $var_name, $color)"
        echo "    Fixed:   $var_name)"
        echo ""
    else
        echo "  Replace direct color with CSS variable"
        echo "    File: $(basename "$file"):$line_num"
        echo "    Current: $color"
        echo "    Suggested: var(--ae-$COMPONENT_NAME-???)"
        echo ""
    fi
done

echo ""
echo "🔍 Required Theme Variables:"
echo "---"
echo "Check if these variables exist in both light.css and dark.css:"
echo ""

# Extract unique variable names
sort -t: -k3 "$TEMP_REPORT" | cut -d: -f3 | sort -u | while read -r var_name; do
    if [ "$var_name" != "direct" ]; then
        # Check if variable exists in theme files
        light_exists=$(grep -l "$var_name" "$CORE_DIR/../../tokens/src/light.css" 2>/dev/null)
        dark_exists=$(grep -l "$var_name" "$CORE_DIR/../../tokens/src/dark.css" 2>/dev/null)

        if [ -n "$light_exists" ] && [ -n "$dark_exists" ]; then
            echo "  ✅ $var_name (defined in both themes)"
        elif [ -n "$light_exists" ]; then
            echo "  ⚠️  $var_name (only in light.css)"
        elif [ -n "$dark_exists" ]; then
            echo "  ⚠️  $var_name (only in dark.css)"
        else
            echo "  ❌ $var_name (NOT DEFINED - needs to be added)"
        fi
    fi
done

echo ""
echo "📝 Next Steps:"
echo "---"
echo "1. Review theme files: packages/tokens/src/light.css and dark.css"
echo "2. Add any missing variables to both theme files"
echo "3. Remove hardcoded fallbacks from style files"
echo "4. Run: npm run test -- $COMPONENT_NAME"
echo "5. Manually verify in showcase app with theme toggle"
echo ""

rm "$TEMP_REPORT"
