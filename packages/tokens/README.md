# @aetherui-kit/tokens

Design tokens and pre-built themes for [AetherUI](https://github.com/debug-diary-1/AetherUI) components.

[![npm version](https://img.shields.io/npm/v/@aetherui-kit/tokens)](https://www.npmjs.com/package/@aetherui-kit/tokens)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @aetherui-kit/tokens
```

## Usage

Import a pre-built theme:

```typescript
// Light theme
import '@aetherui-kit/tokens/light.css';

// Dark theme
import '@aetherui-kit/tokens/dark.css';
```

Or in HTML:

```html
<link rel="stylesheet" href="node_modules/@aetherui-kit/tokens/dist/light.css">
```

## Available Themes

| Theme | Import |
|-------|--------|
| Light | `@aetherui-kit/tokens/light.css` |
| Dark | `@aetherui-kit/tokens/dark.css` |

## Customization

Override any token with CSS custom properties:

```css
@import '@aetherui-kit/tokens/light.css';

:root {
  /* Colors */
  --ae-color-primary: #0066cc;
  --ae-color-secondary: #666666;
  --ae-color-success: #28a745;
  --ae-color-warning: #ffc107;
  --ae-color-error: #dc3545;

  /* Spacing */
  --ae-spacing-sm: 0.5rem;
  --ae-spacing-md: 1rem;
  --ae-spacing-lg: 1.5rem;

  /* Typography */
  --ae-font-family: system-ui, -apple-system, sans-serif;

  /* Border Radius */
  --ae-border-radius-sm: 0.25rem;
  --ae-border-radius-md: 0.5rem;

  /* Shadows */
  --ae-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ae-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --ae-transition-fast: 150ms;
  --ae-transition-normal: 250ms;
}
```

## Token Categories

- **Colors** - Primary, secondary, success, warning, error, info
- **Spacing** - xs through xl scale
- **Typography** - Font family, sizes (xs-xl)
- **Border Radius** - sm, md, lg, full
- **Shadows** - sm, md, lg elevations
- **Transitions** - fast, normal, slow durations
- **Component tokens** - Per-component overrides (button, modal, tabs, etc.)

## JavaScript API

Tokens are also available as JavaScript values:

```typescript
import { tokens } from '@aetherui-kit/tokens';

console.log(tokens.colors.primary);  // 'var(--ae-color-primary, #0066cc)'
console.log(tokens.spacing.md);      // 'var(--ae-spacing-md, 1rem)'
```

## License

MIT
