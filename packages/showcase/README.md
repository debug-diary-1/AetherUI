# @aetherui/showcase

A comprehensive kitchen sink showcase application demonstrating all AetherUI web components with custom styling in a React application.

## Overview

This package provides a live demonstration of how to integrate and style AetherUI's headless web components in a React application. It showcases:

- All 28+ AetherUI components
- Custom styling using CSS custom properties
- React integration patterns
- Component variants and states
- Real-world usage examples

## Features

- **Complete Component Coverage**: Demonstrates every component in the AetherUI library
- **Custom Styling**: Shows how to customize headless components with your own design system
- **Interactive Examples**: Live, interactive demos with state management
- **Responsive Design**: Mobile-friendly showcase with beautiful gradients
- **Developer-Friendly**: Clean, well-organized code showing best practices

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

The showcase will be available at `http://localhost:3000`

## Component Categories

### Buttons & Badges
- Button variants (primary, secondary, ghost)
- Status badges

### Form Controls
- Input fields (text, email, password, number)
- Textarea
- Checkbox
- Radio buttons
- Switch toggles
- Select dropdowns
- Combo boxes

### Navigation
- Breadcrumbs
- Menus
- Dropdowns
- Tabs
- Pagination

### Feedback & Progress
- Alerts
- Toast notifications
- Progress bars
- Spinners

### Overlays
- Modals
- Drawers
- Popovers
- Tooltips

### Data Display
- Accordion
- Tree view
- Autocomplete

## Customization

All components in this showcase use CSS custom properties for styling. See the `App.css` file for examples of how to customize:

```css
ae-button {
  --ae-button-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --ae-button-color: white;
  --ae-button-border-radius: 8px;
  --ae-button-padding: 12px 24px;
}
```

## Architecture

- **React Router**: Navigation between component showcases
- **Vite**: Fast development and optimized builds
- **TypeScript**: Type-safe component integration
- **CSS Custom Properties**: Complete styling control

## Learn More

- [AetherUI Documentation](../../README.md)
- [Component API Reference](../core/README.md)
- [Design Tokens](../tokens/README.md)
