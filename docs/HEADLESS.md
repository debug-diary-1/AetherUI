# Headless/Unstyled Mode Guide

## Table of Contents

- [What is Headless Mode?](#what-is-headless-mode)
- [Why Use Headless Mode?](#why-use-headless-mode)
- [Enabling Headless Mode](#enabling-headless-mode)
- [Styling Unstyled Components](#styling-unstyled-components)
- [CSS Parts in Unstyled Mode](#css-parts-in-unstyled-mode)
- [Framework Integration](#framework-integration)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)
- [Comparison: Styled vs Unstyled](#comparison-styled-vs-unstyled)

---

## What is Headless Mode?

Headless (or unstyled) mode in AetherUI provides you with **semantic HTML structure, accessibility, and behavior** without any default visual styles. You have complete control over the appearance.

### Key Characteristics

- **Zero Visual Opinions** - No colors, spacing, or typography defaults
- **Semantic HTML** - Proper element structure and ARIA attributes
- **Full Functionality** - All component behavior and logic intact
- **Maximum Flexibility** - Style with any CSS methodology

---

## Why Use Headless Mode?

### Use Cases

1. **Existing Design System** - You have an established design system and need components to match exactly
2. **CSS Frameworks** - Using Tailwind, UnoCSS, or similar utility-first frameworks
3. **Complete Customization** - Need visual designs that differ significantly from defaults
4. **Performance** - Reduce CSS bundle size by not loading default styles
5. **Brand Consistency** - Ensure perfect alignment with brand guidelines

### Benefits

✅ **Complete Control** - Every pixel under your control
✅ **No Style Conflicts** - No defaults to override
✅ **Smaller Bundle** - No default CSS loaded
✅ **Faster Development** - For teams with existing design systems
✅ **Future-Proof** - Not tied to AetherUI's design decisions

---

## Enabling Headless Mode

### Method 1: Unstyled Attribute

Add the `unstyled` attribute to any component:

```html
<ae-button unstyled>Click me</ae-button>
<ae-accordion unstyled>...</ae-accordion>
<ae-checkbox unstyled>...</ae-checkbox>
```

### Method 2: No Theme Import

Simply don't import any theme CSS:

```typescript
import { defineAeButton } from '@aetherui/core';
// No theme import - components are unstyled by default

defineAeButton();
```

### Method 3: Global Unstyled Mode

Set all components to unstyled mode:

```typescript
import { defineAll } from '@aetherui/core';

// Set global config (if you've built custom config)
defineAll();
```

```html
<!-- Add data attribute to root -->
<body data-ae-unstyled="true">
  <ae-button>Button 1</ae-button>
  <ae-button>Button 2</ae-button>
</body>
```

```css
[data-ae-unstyled="true"] ae-button,
ae-button[unstyled] {
  /* Your styles */
}
```

---

## Styling Unstyled Components

### Approach 1: CSS Parts (Recommended)

Use CSS Parts to target specific elements within the Shadow DOM:

```css
ae-button[unstyled]::part(base) {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

ae-button[unstyled]::part(base):hover {
  background: #2563eb;
}

ae-button[unstyled]::part(base):active {
  background: #1d4ed8;
}

ae-button[unstyled]::part(icon) {
  width: 1.25rem;
  height: 1.25rem;
}
```

### Approach 2: Custom Classes

Add custom classes and style them:

```html
<ae-button unstyled class="btn btn-primary">
  Click me
</ae-button>
```

```css
ae-button.btn::part(base) {
  /* Base button styles */
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

ae-button.btn-primary::part(base) {
  background: #3b82f6;
  color: white;
}

ae-button.btn-secondary::part(base) {
  background: #6b7280;
  color: white;
}
```

### Approach 3: Utility Classes (Tailwind)

While you can't apply Tailwind classes directly to Shadow DOM elements, you can use custom properties:

```html
<ae-button unstyled class="btn-blue">
  Click me
</ae-button>
```

```css
ae-button.btn-blue::part(base) {
  @apply bg-blue-500 text-white px-4 py-2 rounded font-semibold;
  @apply hover:bg-blue-600 active:bg-blue-700;
  @apply transition-colors duration-200;
}
```

Or use custom properties with Tailwind:

```css
ae-button.btn-blue::part(base) {
  background: theme('colors.blue.500');
  color: theme('colors.white');
  padding: theme('spacing.2') theme('spacing.4');
  border-radius: theme('borderRadius.DEFAULT');
}
```

---

## CSS Parts in Unstyled Mode

All components expose CSS Parts for targeting internal elements. Here's what's available:

### Button

```html
<ae-button unstyled>
  #shadow-root
    <button part="base">
      <slot name="icon" part="icon"></slot>
      <span part="label"><slot></slot></span>
    </button>
</ae-button>
```

```css
ae-button::part(base) { /* The button element */ }
ae-button::part(icon) { /* Icon wrapper */ }
ae-button::part(label) { /* Label wrapper */ }
```

### Accordion

```html
<ae-accordion-item unstyled>
  #shadow-root
    <div part="base">
      <button part="header">
        <slot name="header" part="header-content"></slot>
        <svg part="icon"></svg>
      </button>
      <div part="panel">
        <div part="panel-content">
          <slot></slot>
        </div>
      </div>
    </div>
</ae-accordion-item>
```

```css
ae-accordion-item::part(base) { /* Container */ }
ae-accordion-item::part(header) { /* Header button */ }
ae-accordion-item::part(header-content) { /* Header content slot */ }
ae-accordion-item::part(icon) { /* Expand/collapse icon */ }
ae-accordion-item::part(panel) { /* Content panel */ }
ae-accordion-item::part(panel-content) { /* Panel content wrapper */ }
```

### Checkbox

```html
<ae-checkbox unstyled>
  #shadow-root
    <label part="label">
      <input part="input" type="checkbox" />
      <span part="control">
        <svg part="icon"></svg>
      </span>
      <span part="label-text"><slot></slot></span>
    </label>
</ae-checkbox>
```

```css
ae-checkbox::part(label) { /* Label wrapper */ }
ae-checkbox::part(input) { /* Hidden input */ }
ae-checkbox::part(control) { /* Visual checkbox */ }
ae-checkbox::part(icon) { /* Checkmark icon */ }
ae-checkbox::part(label-text) { /* Label text */ }
```

For a complete reference of all parts, see [CSS_PROPERTIES.md](./CSS_PROPERTIES.md).

---

## Framework Integration

### React with Tailwind CSS

```tsx
import { defineAeButton } from '@aetherui/core';
import './button-styles.css'; // Your custom styles

defineAeButton();

function App() {
  return (
    <ae-button unstyled className="btn-primary">
      Click me
    </ae-button>
  );
}
```

```css
/* button-styles.css */
ae-button.btn-primary::part(base) {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded;
}
```

### Vue with Scoped Styles

```vue
<template>
  <ae-button unstyled class="custom-button">
    Click me
  </ae-button>
</template>

<script setup>
import { defineAeButton } from '@aetherui/core';

defineAeButton();
</script>

<style scoped>
ae-button.custom-button::part(base) {
  background: #42b983;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

ae-button.custom-button::part(base):hover {
  background: #35a372;
}
</style>
```

### Angular with Component Styles

```typescript
import { Component } from '@angular/core';
import { defineAeButton } from '@aetherui/core';

defineAeButton();

@Component({
  selector: 'app-root',
  template: `
    <ae-button unstyled class="primary-btn">
      Click me
    </ae-button>
  `,
  styles: [`
    ae-button.primary-btn::part(base) {
      background: #1976d2;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      border: none;
    }
  `]
})
export class AppComponent {}
```

### Svelte

```svelte
<script>
  import { defineAeButton } from '@aetherui/core';

  defineAeButton();
</script>

<ae-button unstyled class="custom-btn">
  Click me
</ae-button>

<style>
  :global(ae-button.custom-btn::part(base)) {
    background: #ff3e00;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 600;
  }

  :global(ae-button.custom-btn::part(base):hover) {
    background: #e63900;
  }
</style>
```

---

## Complete Examples

### Example 1: Custom Button with Gradient

```html
<ae-button unstyled class="gradient-button">
  <svg slot="icon" width="20" height="20" viewBox="0 0 20 20">
    <path fill="currentColor" d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z"/>
  </svg>
  Gradient Button
</ae-button>
```

```css
ae-button.gradient-button::part(base) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  border: none;
  font-weight: 700;
  font-size: 1.125rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

ae-button.gradient-button::part(base):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

ae-button.gradient-button::part(base):active {
  transform: translateY(0);
}

ae-button.gradient-button::part(icon) {
  width: 20px;
  height: 20px;
}
```

### Example 2: Material Design Checkbox

```html
<ae-checkbox unstyled class="md-checkbox">
  Accept terms and conditions
</ae-checkbox>
```

```css
ae-checkbox.md-checkbox::part(label) {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

ae-checkbox.md-checkbox::part(input) {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

ae-checkbox.md-checkbox::part(control) {
  width: 18px;
  height: 18px;
  border: 2px solid #5f6368;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  position: relative;
  flex-shrink: 0;
}

ae-checkbox.md-checkbox::part(input):checked ~ ae-checkbox.md-checkbox::part(control) {
  background: #1a73e8;
  border-color: #1a73e8;
}

ae-checkbox.md-checkbox::part(icon) {
  color: white;
  width: 12px;
  height: 12px;
}

ae-checkbox.md-checkbox::part(label-text) {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #202124;
}
```

### Example 3: Glassmorphism Accordion

```html
<ae-accordion unstyled class="glass-accordion">
  <ae-accordion-item unstyled class="glass-item">
    <span slot="header">Section 1</span>
    <p>Content for section 1</p>
  </ae-accordion-item>
</ae-accordion>
```

```css
ae-accordion.glass-accordion::part(base) {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

ae-accordion-item.glass-item::part(header) {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.25rem 1.5rem;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

ae-accordion-item.glass-item::part(header):hover {
  background: rgba(255, 255, 255, 0.15);
}

ae-accordion-item.glass-item[open]::part(header) {
  background: rgba(255, 255, 255, 0.2);
}

ae-accordion-item.glass-item::part(panel) {
  background: rgba(255, 255, 255, 0.05);
}

ae-accordion-item.glass-item::part(panel-content) {
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
}

ae-accordion-item.glass-item::part(icon) {
  color: white;
  transition: transform 0.3s;
}

ae-accordion-item.glass-item[open]::part(icon) {
  transform: rotate(90deg);
}
```

---

## Best Practices

### ✅ Do's

1. **Use CSS Parts consistently** - Target parts rather than trying to pierce Shadow DOM
2. **Start with a base style** - Create reusable base styles for common components
3. **Leverage CSS custom properties** - Use them for dynamic theming
4. **Test accessibility** - Ensure your custom styles maintain proper contrast and focus states
5. **Document your styles** - Keep a style guide for your custom components
6. **Use semantic class names** - Make your code maintainable

### ❌ Don'ts

1. **Don't try to pierce Shadow DOM** - Use parts, not deep selectors
2. **Don't forget focus states** - Always style `:focus-visible` states
3. **Don't ignore disabled states** - Style `[disabled]` and `[aria-disabled]` states
4. **Don't hardcode colors** - Use custom properties for flexibility
5. **Don't forget mobile** - Test responsive behavior
6. **Don't skip accessibility** - Maintain WCAG contrast ratios

---

## Comparison: Styled vs Unstyled

### Default Styled Mode

```html
<ae-button variant="primary">Click me</ae-button>
```

**Pros:**
- Works immediately out of the box
- Professional default appearance
- Consistent design language
- Quick prototyping

**Cons:**
- May not match your brand
- Requires overriding defaults
- Larger CSS bundle

### Unstyled Mode

```html
<ae-button unstyled class="custom-btn">Click me</ae-button>
```

**Pros:**
- Complete visual control
- No style conflicts
- Smaller bundle size
- Perfect brand alignment

**Cons:**
- More initial setup
- Need to style all states
- More CSS to write

---

## Migration Path

### From Styled to Unstyled

If you're currently using styled components and want to migrate:

1. **Identify components** - List all AetherUI components you're using
2. **Document customizations** - Note any CSS custom property overrides
3. **Create base styles** - Build your own styling system
4. **Migrate incrementally** - Move one component at a time
5. **Test thoroughly** - Ensure all states work correctly

```typescript
// Before
import '@aetherui/tokens/light.css';

// After
import './my-custom-theme.css';
```

```html
<!-- Before -->
<ae-button variant="primary">Click me</ae-button>

<!-- After -->
<ae-button unstyled class="btn btn-primary">Click me</ae-button>
```

---

## Resources

- [Theming Guide](./THEMING.md) - Learn about styled theming
- [CSS Properties Reference](./CSS_PROPERTIES.md) - All available CSS parts and properties
- [Component Documentation](https://debug-diary-1.github.io/AetherUI/docs/) - Component APIs
- [Examples](../examples/headless-example/) - Real-world headless implementations

---

## Need Help?

- [GitHub Discussions](https://github.com/debug-diary-1/AetherUI/discussions) - Ask questions
- [Examples Repository](../examples/) - See complete implementations
- [Storybook](https://debug-diary-1.github.io/AetherUI/storybook/) - Interactive component explorer

---

**Tip**: Start with one component in unstyled mode to understand the workflow before converting your entire application.
