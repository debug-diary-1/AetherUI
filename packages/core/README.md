# @aetherui/core

A headless, framework-agnostic Web Component library built with [Lit](https://lit.dev).

[![npm version](https://img.shields.io/npm/v/@aetherui/core)](https://www.npmjs.com/package/@aetherui/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @aetherui/core @aetherui/tokens
```

## Quick Start

```typescript
import { defineAeButton, defineAeModal } from '@aetherui/core';
import '@aetherui/tokens/light.css';

// Register only the components you need
defineAeButton();
defineAeModal();
```

```html
<ae-button variant="primary">Click me</ae-button>
```

Or register all components at once:

```typescript
import { defineAll } from '@aetherui/core';

defineAll();
```

## Tree-Shakeable Imports

Import individual components for optimal bundle sizes:

```typescript
import { AeButton } from '@aetherui/core/button';
import { AeModal } from '@aetherui/core/modal';
import { AeTabs } from '@aetherui/core/tabs';
```

## Available Components

| Component    | Element             | Description                                   |
| ------------ | ------------------- | --------------------------------------------- |
| Button       | `<ae-button>`       | Action trigger with variants and sizes        |
| Modal        | `<ae-modal>`        | Dialog overlay with focus management          |
| Dropdown     | `<ae-dropdown>`     | Context menus with positioning                |
| Accordion    | `<ae-accordion>`    | Expandable content sections                   |
| Tabs         | `<ae-tabs>`         | Tab navigation with horizontal/vertical modes |
| Checkbox     | `<ae-checkbox>`     | Boolean input with indeterminate state        |
| Radio        | `<ae-radio>`        | Mutually exclusive selection                  |
| Alert        | `<ae-alert>`        | Status messages with variants                 |
| Tooltip      | `<ae-tooltip>`      | Information overlays                          |
| Toast        | `<ae-toast>`        | Temporary notifications                       |
| TreeView     | `<ae-treeview>`     | Hierarchical data display                     |
| Combo        | `<ae-combo>`        | Combo box with filtering                      |
| Autocomplete | `<ae-autocomplete>` | Auto-completing input                         |
| Input        | `<ae-input>`        | Text input field                              |
| Select       | `<ae-select>`       | Selection dropdown                            |
| Textarea     | `<ae-textarea>`     | Multi-line text input                         |
| Badge        | `<ae-badge>`        | Status indicators                             |
| Spinner      | `<ae-spinner>`      | Loading indicator                             |
| Switch       | `<ae-switch>`       | Toggle switch                                 |
| Progress     | `<ae-progress>`     | Progress indicator                            |
| Breadcrumb   | `<ae-breadcrumb>`   | Navigation breadcrumbs                        |
| Pagination   | `<ae-pagination>`   | Page navigation                               |
| Drawer       | `<ae-drawer>`       | Slide-out panel                               |
| Popover      | `<ae-popover>`      | Floating content panel                        |
| Menu         | `<ae-menu>`         | Action menu                                   |

## Theming

AetherUI is fully headless -- components ship with no visual styles by default. Use `@aetherui/tokens` for pre-built themes or bring your own CSS:

```css
@import '@aetherui/tokens/light.css';

/* Override any token */
:root {
  --ae-button-bg-primary: #0066cc;
  --ae-button-radius: 8px;
}
```

## Framework Support

Works with any framework or vanilla JavaScript:

- **React** / **Next.js**
- **Vue** / **Nuxt**
- **Angular**
- **Svelte** / **SvelteKit**
- **Vanilla JS/TS**

## Accessibility

All components are WCAG 2.1 Level AA compliant with full keyboard navigation and proper ARIA attributes.

## Documentation

- [Full Documentation](https://pallavL01.github.io/AetherUI/)
- [Storybook](https://pallavL01.github.io/AetherUI/storybook/)
- [Contributing](https://github.com/pallavL01/AetherUI/blob/main/CONTRIBUTING.md)

## License

MIT
