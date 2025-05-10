# DataTable Layout Guide

This document provides guidance on handling layout issues in the AetherUI DataTable component, particularly when selection mode is enabled.

## Understanding the Layout Challenge

When the `selectable` attribute is added to the DataTable component, an additional checkbox column is automatically inserted at the beginning of the table. This can cause layout issues:

1. The checkbox column consumes space that wasn't accounted for in the original layout
2. If using fixed column widths, this can push content beyond the container
3. With multiple columns, especially those with rich content, the layout can break

## Recommended Solutions

### 1. Full-Page Responsive Container

For a responsive, full-page implementation that utilizes the entire available width:

```html
<div style="width: 100%; overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 4px;">
  <ae-datatable
    .data=${data}
    .columns=${columns}
    selectable
    ...other attributes
  ></ae-datatable>
</div>
```

#### Why This Works

1. **Responsive Width**: The `width: 100%` property makes the container fill its parent element
2. **Horizontal Overflow**: The `overflow-x: auto` property allows content to scroll horizontally on smaller screens
3. **Visual Integrity**: This approach maintains the visual integrity of all columns, including the selection checkbox
4. **Full Utilization**: Takes advantage of all available space while gracefully handling overflow

### 2. Fixed-Width Container

For cases where you need a consistent, predictable width:

```html
<div style="width: 700px; overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 4px;">
  <ae-datatable
    .data=${data}
    .columns=${columns}
    selectable
    ...other attributes
  ></ae-datatable>
</div>
```

#### Why This Works

1. **Consistent Width**: By setting a fixed width on the container (e.g., 700px), you create a consistent space for the table
2. **Horizontal Overflow**: The `overflow-x: auto` property allows content to scroll horizontally if it exceeds the container width
3. **Visual Integrity**: This approach maintains the visual integrity of all columns, including the selection checkbox

### 3. Constrained Responsive Container

For responsive layouts within a constrained area:

```html
<div style="width: 100%; max-width: 1200px; margin: 0 auto; overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 4px;">
  <ae-datatable
    .data=${data}
    .columns=${columns}
    selectable
    ...other attributes
  ></ae-datatable>
</div>
```

This approach:
1. Adapts to the available space up to a maximum width
2. Centers the table in the available space using `margin: 0 auto`
3. Provides a balanced experience across different screen sizes
4. Still maintains horizontal scrolling when needed on smaller screens

## Column Width Strategies

When selection mode is enabled, consider these approaches for column widths:

1. **Avoid Fixed Widths**: Instead of using fixed pixel widths for all columns, consider using flexible width strategies
2. **Simplified Column Structure**: Reduce the number of columns or use more compact renderers
3. **Prioritize Important Columns**: Give more space to critical columns and less to secondary ones

## Examples

See the following Storybook examples for demonstrations:

- `AeDataTableComplete.stories.js`: Shows a full-featured DataTable with selection, using a fixed-width container
- `AeDataTableWidth.stories.js`: Demonstrates different width strategies
- `DataTableFixed.stories.js`: Shows fixed column width approaches

## Testing Layout Changes

To test your layout changes with the selection mode enabled:

1. Create a test page with multiple examples
2. Try both with and without selection to see the difference
3. Test with different viewport sizes
4. Check for horizontal scrolling behavior
5. Verify all columns remain visually intact

## Best Practices

1. Always wrap DataTables in a container with `overflow-x: auto`
2. Test with selection mode both enabled and disabled
3. Consider using visual cues (badges, icons) that are space-efficient
4. Avoid having too many columns when selection is enabled
5. Test on different screen sizes to ensure responsive behavior