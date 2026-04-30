# Storybook Lit Integration Fix

## Problem

When running Storybook with Lit components, we encountered errors related to imports:

```
Could not read from file: /packages/storybook/.storybook/lit-shim.js/directive-helpers.js
```

This is caused by the way Vite processes imports from built files, particularly when they import `lit/decorators.js` and other lit modules.

## Solution Approach

We've implemented a multi-layer approach to solve this issue:

### 1. Package-Based Direct Imports

The most reliable solution is to import components directly from package exports instead of using the decorator pattern. This bypasses the lit/decorators.js import issues completely.

- `source-components.js` - Uses dynamic imports from package exports
- Each component is imported directly as a module

### 2. Simplified Vite Configuration

We've simplified the Vite configuration to avoid complex module resolution:

- Using a clean external Vite config override with proper paths
- Direct aliases to node_modules lit packages
- Specific aliases for problematic imports like lit/decorators.js

### 3. Browser-Based Fallbacks

Mutliple fallback mechanisms have been added:

- Runtime component registration status checks
- Browser-side dynamic imports if module imports fail
- Debug tools in preview-head.html and preview-body.html

## How to Use

1. Start Storybook normally with `nx run storybook:storybook`
2. The system will automatically try multiple approaches to register components
3. If you see missing components in the UI:
   - Check the browser console for specific errors
   - Use the component debug panel (appears if components are missing)
   - Click "Force Register" if needed

## Debugging

If you continue to see issues:

1. Check browser console for specific error messages
2. Look for the component debug panel at the bottom right of the screen
3. Check which components are failing to register
4. Try modifying vite.config.override.js to add/update aliases for problematic imports

## File Changes

The following files have been modified or created:

1. `main.js` - Fixed syntax error and simplified Vite configuration
2. `vite.config.override.js` - Added direct aliases for lit and its subpackages
3. `register-components.js` - Simplified to use direct package imports
4. `source-components.js` - Updated to use package exports
5. `preview.js` - Added source component fallback loading
6. `preview-head.html` - Added runtime component registration checks
7. `preview-body.html` - Added component debug panel and force register button

## Future Improvements

For a more permanent solution, consider one of these approaches:

1. Update the build process to inline lit decorators in the output files
2. Create a custom Vite plugin to properly handle lit/decorators.js imports
3. Update component registration to avoid runtime imports entirely
