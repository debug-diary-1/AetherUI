# AetherUI Theming Guide

## Table of Contents

- [Introduction](#introduction)
- [Theming Philosophy](#theming-philosophy)
- [Getting Started](#getting-started)
- [CSS Custom Properties](#css-custom-properties)
- [Using CSS Parts](#using-css-parts)
- [Theming Strategies](#theming-strategies)
- [Pre-built Themes](#pre-built-themes)
- [Creating Custom Themes](#creating-custom-themes)
- [Headless/Unstyled Mode](#headlessunstyled-mode)
- [Brand Integration Examples](#brand-integration-examples)
- [Migration Guide](#migration-guide)
- [Advanced Techniques](#advanced-techniques)

---

## Introduction

AetherUI is built as a **headless component system**, giving you complete control over styling while providing semantic HTML structure, accessibility, and behavior out of the box.

This guide will help you understand how to theme AetherUI components to match your brand, design system, or product requirements.

---

## Theming Philosophy

AetherUI follows these principles:

1. **Separation of Logic and Style** - Components provide behavior and structure, you control the appearance
2. **Progressive Enhancement** - Use pre-built themes or build from scratch
3. **CSS-First Approach** - Standard CSS custom properties, no JavaScript required
4. **Framework Agnostic** - Works with any CSS methodology (Tailwind, CSS Modules, Styled Components, etc.)
5. **Zero Lock-in** - Full control through CSS Parts and custom properties

---

## Getting Started

### Option 1: Use a Pre-built Theme (Quickest)

```typescript
import { defineAeButton } from '@aetherui-kit/core';
import '@aetherui-kit/tokens/light.css'; // Pre-built light theme

defineAeButton();
```

```html
<ae-button variant="primary">Styled with light theme</ae-button>
```

### Option 2: Minimal Theme (Semantic Tokens Only)

```typescript
import { defineAeButton } from '@aetherui-kit/core';
import '@aetherui-kit/tokens/minimal.css'; // Only semantic tokens

defineAeButton();
```

Then customize:

```css
:root {
  --ae-color-primary: #1976d2;
  --ae-color-secondary: #424242;
  --ae-spacing-md: 1rem;
  /* Add component-specific tokens */
  --ae-button-bg-primary: var(--ae-color-primary);
  --ae-button-fg-primary: white;
}
```

### Option 3: Headless Mode (Maximum Control)

```typescript
import { defineAeButton } from '@aetherui-kit/core';
// No theme import - completely unstyled

defineAeButton();
```

```html
<ae-button unstyled class="my-custom-button">
  Fully custom styled
</ae-button>
```

```css
ae-button[unstyled]::part(base) {
  /* Your custom styles */
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
}
```

---

## CSS Custom Properties

AetherUI uses CSS custom properties (CSS variables) for theming. All properties follow the naming convention:

```
--ae-{component}-{property}-{variant?}
```

### Global Tokens

These are semantic tokens that can be used across components:

```css
/* Colors */
--ae-color-primary
--ae-color-secondary
--ae-color-success
--ae-color-warning
--ae-color-error
--ae-color-info

/* Spacing */
--ae-spacing-xs
--ae-spacing-sm
--ae-spacing-md
--ae-spacing-lg
--ae-spacing-xl

/* Typography */
--ae-font-family
--ae-font-size-xs
--ae-font-size-sm
--ae-font-size-md
--ae-font-size-lg
--ae-font-size-xl

/* Border Radius */
--ae-border-radius-sm
--ae-border-radius-md
--ae-border-radius-lg
--ae-border-radius-full

/* Shadows */
--ae-shadow-sm
--ae-shadow-md
--ae-shadow-lg

/* Transitions */
--ae-transition-fast
--ae-transition-normal
--ae-transition-slow

/* Focus Ring */
--ae-focus-ring-color
--ae-focus-ring-offset
```

### Component-Specific Tokens

Each component has its own set of CSS custom properties. See [CSS_PROPERTIES.md](./CSS_PROPERTIES.md) for a complete reference.

**Example: Button Component**

```css
/* Layout */
--ae-button-padding-x: 1rem;
--ae-button-padding-y: 0.5rem;
--ae-button-gap: 0.5rem;
--ae-button-radius: 0.375rem;

/* Primary Variant Colors */
--ae-button-bg-primary: #5e7ce2;
--ae-button-fg-primary: white;
--ae-button-border-primary: #5e7ce2;
--ae-button-bg-primary-hover: #4b69c8;

/* Secondary Variant Colors */
--ae-button-bg-secondary: #f3f4f6;
--ae-button-fg-secondary: #333333;
--ae-button-border-secondary: #d4d4d4;

/* Transitions */
--ae-button-transition-duration: 200ms;
--ae-button-transition-timing: ease;

/* Disabled State */
--ae-button-disabled-opacity: 0.6;
```

---

## Using CSS Parts

CSS Parts allow you to target specific elements inside a component's Shadow DOM from outside.

### What are CSS Parts?

```html
<!-- Inside component Shadow DOM -->
<button part="base">
  <slot name="icon" part="icon"></slot>
  <span part="label"><slot></slot></span>
</button>
```

You can style these parts from outside:

```css
/* Target the button element */
ae-button::part(base) {
  background: purple;
  border-radius: 12px;
}

/* Target the icon */
ae-button::part(icon) {
  color: gold;
  width: 24px;
}

/* Target the label */
ae-button::part(label) {
  font-weight: bold;
  text-transform: uppercase;
}
```

### Combining Parts with Attributes

```css
/* Style primary variant differently */
ae-button[variant="primary"]::part(base) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Style disabled state */
ae-button[disabled]::part(base) {
  filter: grayscale(100%);
}
```

### Common Parts Across Components

Most AetherUI components expose these standard parts:

- `base` - The root/container element
- `content` - The main content wrapper
- `icon` - Icon wrapper
- `label` - Text/label wrapper

See component-specific documentation for the complete list of parts.

---

## Theming Strategies

### Strategy 1: CSS Custom Properties Only

**Best for**: Tweaking colors, spacing, and typography

```css
:root {
  /* Override global tokens */
  --ae-color-primary: #1976d2;
  --ae-border-radius-md: 8px;

  /* Override component tokens */
  --ae-button-bg-primary: var(--ae-color-primary);
  --ae-button-radius: var(--ae-border-radius-md);
}
```

**Pros**: Simple, minimal CSS, easy to maintain
**Cons**: Limited to predefined properties

### Strategy 2: CSS Parts

**Best for**: Complete style overrides, complex designs

```css
ae-button::part(base) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

ae-button::part(base):hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}
```

**Pros**: Complete control, can override anything
**Cons**: More CSS to write, need to understand component structure

### Strategy 3: Hybrid Approach

**Best for**: Production apps with design systems

```css
/* Set global tokens */
:root {
  --ae-color-primary: #1976d2;
  --ae-border-radius-md: 8px;
}

/* Fine-tune specific components with parts */
ae-button::part(base) {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

ae-accordion-item::part(header) {
  border-left: 4px solid var(--ae-color-primary);
}
```

**Pros**: Balance of simplicity and control
**Cons**: Requires understanding both methods

### Strategy 4: Headless/Unstyled Mode

**Best for**: Complete custom styling, CSS frameworks (Tailwind)

```html
<ae-button unstyled class="btn btn-primary">
  My Custom Button
</ae-button>
```

```css
/* Use your own classes */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
```

**Pros**: Maximum flexibility, no style conflicts
**Cons**: More work, need to style everything

---

## Pre-built Themes

AetherUI provides three pre-built themes:

### Light Theme

```typescript
import '@aetherui-kit/tokens/light.css';
```

Clean, modern light theme with professional color palette.

### Dark Theme

```typescript
import '@aetherui-kit/tokens/dark.css';
```

Beautiful dark theme optimized for low-light environments.

### Minimal Theme

```typescript
import '@aetherui-kit/tokens/minimal.css';
```

Only semantic tokens - provides a foundation for custom themes without opinionated component styling.

---

## Creating Custom Themes

### Step 1: Start with Minimal Theme

```typescript
import '@aetherui-kit/tokens/minimal.css';
```

### Step 2: Define Your Brand Tokens

```css
/* your-brand-theme.css */
:root {
  /* Brand Colors */
  --brand-primary: #ff6b35;
  --brand-secondary: #004e89;
  --brand-accent: #f77f00;

  /* Map to AetherUI tokens */
  --ae-color-primary: var(--brand-primary);
  --ae-color-secondary: var(--brand-secondary);

  /* Typography */
  --ae-font-family: 'Inter', system-ui, sans-serif;

  /* Spacing Scale */
  --ae-spacing-xs: 0.25rem;
  --ae-spacing-sm: 0.5rem;
  --ae-spacing-md: 1rem;
  --ae-spacing-lg: 1.5rem;
  --ae-spacing-xl: 2rem;

  /* Border Radius */
  --ae-border-radius-sm: 0.25rem;
  --ae-border-radius-md: 0.5rem;
  --ae-border-radius-lg: 1rem;
}
```

### Step 3: Theme Component-Specific Properties

```css
/* Button */
:root {
  --ae-button-bg-primary: var(--brand-primary);
  --ae-button-fg-primary: white;
  --ae-button-bg-primary-hover: #ff5722;
  --ae-button-radius: var(--ae-border-radius-md);
  --ae-button-padding-x: 1.5rem;
  --ae-button-padding-y: 0.75rem;
}

/* Accordion */
:root {
  --ae-accordion-header-bg: white;
  --ae-accordion-header-active-bg: #f5f5f5;
  --ae-accordion-header-active-color: var(--brand-primary);
  --ae-accordion-border: 1px solid #e0e0e0;
}

/* Checkbox */
:root {
  --ae-checkbox-checked-bg: var(--brand-primary);
  --ae-checkbox-checked-border-color: var(--brand-primary);
  --ae-checkbox-size: 20px;
  --ae-checkbox-border-radius: 4px;
}
```

### Step 4: Use CSS Parts for Advanced Styling

```css
/* Add shadows to buttons */
ae-button::part(base) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

ae-button::part(base):hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Custom accordion styling */
ae-accordion::part(base) {
  border-radius: 12px;
  overflow: hidden;
}
```

---

## Headless/Unstyled Mode

### Enabling Unstyled Mode

Add the `unstyled` attribute to any component:

```html
<ae-button unstyled>Click me</ae-button>
<ae-accordion unstyled>...</ae-accordion>
<ae-checkbox unstyled>...</ae-checkbox>
```

### Styling Unstyled Components

When `unstyled` is set, components have minimal default styles. You have complete control:

```css
/* Style with custom classes */
ae-button[unstyled].my-btn::part(base) {
  /* Your styles */
}

/* Or use utility classes (Tailwind example) */
```

```html
<ae-button unstyled class="px-4 py-2 bg-blue-500 text-white rounded">
  Tailwind Styled
</ae-button>
```

### When to Use Unstyled Mode

- Integrating with existing design systems
- Using CSS frameworks like Tailwind
- Building highly custom interfaces
- Maximum performance (no default styles loaded)

---

## Brand Integration Examples

### Material Design Theme

```css
:root {
  /* Material Design 3 tokens */
  --ae-color-primary: #6750A4;
  --ae-color-secondary: #625B71;
  --ae-color-success: #6EBD2A;
  --ae-color-error: #BA1A1A;

  /* Material typography */
  --ae-font-family: 'Roboto', sans-serif;

  /* Material elevation shadows */
  --ae-shadow-sm: 0px 1px 3px rgba(0, 0, 0, 0.12);
  --ae-shadow-md: 0px 4px 8px rgba(0, 0, 0, 0.16);
  --ae-shadow-lg: 0px 8px 16px rgba(0, 0, 0, 0.20);

  /* Material button */
  --ae-button-bg-primary: var(--ae-color-primary);
  --ae-button-radius: 20px; /* Fully rounded Material buttons */
  --ae-button-padding-x: 24px;
  --ae-button-padding-y: 10px;
}

ae-button::part(base) {
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
}
```

### Bootstrap-like Theme

```css
:root {
  /* Bootstrap colors */
  --ae-color-primary: #0d6efd;
  --ae-color-secondary: #6c757d;
  --ae-color-success: #198754;
  --ae-color-warning: #ffc107;
  --ae-color-error: #dc3545;

  /* Bootstrap spacing */
  --ae-spacing-xs: 0.25rem;
  --ae-spacing-sm: 0.5rem;
  --ae-spacing-md: 1rem;
  --ae-spacing-lg: 1.5rem;

  /* Bootstrap border radius */
  --ae-border-radius-sm: 0.2rem;
  --ae-border-radius-md: 0.25rem;
  --ae-border-radius-lg: 0.3rem;

  /* Bootstrap buttons */
  --ae-button-bg-primary: var(--ae-color-primary);
  --ae-button-border-primary: var(--ae-color-primary);
  --ae-button-radius: var(--ae-border-radius-md);
}

ae-button::part(base) {
  border-width: 1px;
  border-style: solid;
  font-weight: 400;
}
```

### Apple/iOS Inspired Theme

```css
:root {
  /* iOS colors */
  --ae-color-primary: #007AFF;
  --ae-color-secondary: #8E8E93;
  --ae-color-success: #34C759;
  --ae-color-error: #FF3B30;

  /* iOS typography */
  --ae-font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;

  /* iOS spacing */
  --ae-spacing-md: 16px;

  /* iOS border radius */
  --ae-border-radius-md: 10px;

  /* iOS button */
  --ae-button-bg-primary: var(--ae-color-primary);
  --ae-button-radius: 10px;
  --ae-button-padding-x: 16px;
  --ae-button-padding-y: 8px;
}

ae-button::part(base) {
  font-weight: 600;
  font-size: 17px;
}

ae-accordion-item::part(header) {
  font-size: 17px;
  font-weight: 400;
}
```

---

## Migration Guide

### From Other UI Libraries

#### From Material-UI

```css
/* Map Material-UI theme to AetherUI */
:root {
  --ae-color-primary: #1976d2; /* theme.palette.primary.main */
  --ae-color-secondary: #dc004e; /* theme.palette.secondary.main */
  --ae-spacing-md: 8px; /* theme.spacing(1) */
  --ae-border-radius-md: 4px; /* theme.shape.borderRadius */
  --ae-font-family: 'Roboto', sans-serif; /* theme.typography.fontFamily */
}
```

#### From Bootstrap

```css
/* Map Bootstrap variables to AetherUI */
:root {
  --ae-color-primary: #0d6efd; /* $primary */
  --ae-color-secondary: #6c757d; /* $secondary */
  --ae-spacing-md: 1rem; /* $spacer */
  --ae-border-radius-md: 0.25rem; /* $border-radius */
}
```

#### From Tailwind

You can use Tailwind utility classes with unstyled mode:

```html
<ae-button unstyled class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Tailwind Button
</ae-button>
```

Or map Tailwind tokens:

```css
:root {
  --ae-color-primary: theme('colors.blue.500');
  --ae-spacing-md: theme('spacing.4');
  --ae-border-radius-md: theme('borderRadius.md');
}
```

---

## Advanced Techniques

### Dark Mode Support

```css
/* Light mode (default) */
:root {
  --ae-color-background: white;
  --ae-color-text: #1a1a1a;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --ae-color-background: #1a1a1a;
    --ae-color-text: white;
  }
}

/* Or manual toggle */
[data-theme="dark"] {
  --ae-color-background: #1a1a1a;
  --ae-color-text: white;
}
```

### Dynamic Theming with JavaScript

```typescript
// Change theme at runtime
document.documentElement.style.setProperty('--ae-color-primary', '#ff0000');

// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Generate theme from brand color
function generateTheme(primaryColor: string) {
  document.documentElement.style.setProperty('--ae-color-primary', primaryColor);
  // Calculate complementary colors, shades, etc.
}
```

### Scoped Theming

```html
<div class="marketing-section">
  <ae-button>Marketing Button</ae-button>
</div>

<div class="app-section">
  <ae-button>App Button</ae-button>
</div>
```

```css
.marketing-section {
  --ae-button-bg-primary: #ff6b35;
  --ae-button-radius: 24px;
}

.app-section {
  --ae-button-bg-primary: #004e89;
  --ae-button-radius: 4px;
}
```

### CSS Cascade Layers

```css
@layer theme {
  :root {
    --ae-color-primary: #1976d2;
  }
}

@layer components {
  ae-button::part(base) {
    /* Component-specific overrides */
  }
}
```

---

## Best Practices

### ✅ Do's

- Start with a pre-built theme and customize from there
- Use global tokens for consistency
- Leverage CSS Parts for complex styling needs
- Test in light and dark modes
- Document your custom theme tokens
- Use CSS custom properties for runtime theme switching

### ❌ Don'ts

- Don't override internal styles without using Parts
- Don't use `!important` unless absolutely necessary
- Don't hardcode colors - use tokens
- Don't forget about accessibility (contrast ratios)
- Don't style the host element directly (use Parts instead)

---

## Resources

- [CSS Properties Reference](./CSS_PROPERTIES.md) - Complete list of all CSS custom properties
- [Headless Usage Guide](./HEADLESS.md) - Deep dive into unstyled mode
- [Component Documentation](https://debug-diary-1.github.io/AetherUI/docs/) - API docs for each component
- [Storybook Examples](https://debug-diary-1.github.io/AetherUI/storybook/) - Interactive examples with different themes

---

## Getting Help

- [GitHub Discussions](https://github.com/debug-diary-1/AetherUI/discussions) - Ask questions
- [GitHub Issues](https://github.com/debug-diary-1/AetherUI/issues) - Report bugs or request features
- [Examples](../examples/) - See real-world implementations

---

**Need more help?** Check out our [brand integration examples](../examples/brand-themes/) for complete implementations of popular design systems.
