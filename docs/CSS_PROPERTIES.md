# AetherUI CSS Custom Properties Reference

This document provides a comprehensive reference of all CSS custom properties available in AetherUI components.

## Table of Contents

- [Global Tokens](#global-tokens)
- [Component Properties](#component-properties)
  - [Button](#button)
  - [Accordion](#accordion)
  - [Checkbox](#checkbox)
  - [Radio](#radio)
  - [Dropdown](#dropdown)
  - [Modal](#modal)
  - [Alert](#alert)
  - [Toast](#toast)
  - [Tabs](#tabs)
  - [Tooltip](#tooltip)
  - [TreeView](#treeview)
  - [Combo](#combo)
  - [Autocomplete](#autocomplete)

---

## Global Tokens

These semantic tokens can be used across all components for consistent theming.

### Colors

| Property               | Default   | Description         |
| ---------------------- | --------- | ------------------- |
| `--ae-color-primary`   | `#0066cc` | Primary brand color |
| `--ae-color-secondary` | `#666666` | Secondary color     |
| `--ae-color-success`   | `#28a745` | Success state color |
| `--ae-color-warning`   | `#ffc107` | Warning state color |
| `--ae-color-error`     | `#dc3545` | Error state color   |
| `--ae-color-info`      | `#17a2b8` | Info state color    |

### Spacing

| Property          | Default   | Description         |
| ----------------- | --------- | ------------------- |
| `--ae-spacing-xs` | `0.25rem` | Extra small spacing |
| `--ae-spacing-sm` | `0.5rem`  | Small spacing       |
| `--ae-spacing-md` | `1rem`    | Medium spacing      |
| `--ae-spacing-lg` | `1.5rem`  | Large spacing       |
| `--ae-spacing-xl` | `2rem`    | Extra large spacing |

### Typography

| Property            | Default                                | Description           |
| ------------------- | -------------------------------------- | --------------------- |
| `--ae-font-family`  | `system-ui, -apple-system, sans-serif` | Default font family   |
| `--ae-font-size-xs` | `0.75rem`                              | Extra small font size |
| `--ae-font-size-sm` | `0.875rem`                             | Small font size       |
| `--ae-font-size-md` | `1rem`                                 | Medium font size      |
| `--ae-font-size-lg` | `1.125rem`                             | Large font size       |
| `--ae-font-size-xl` | `1.25rem`                              | Extra large font size |

### Border Radius

| Property                  | Default   | Description          |
| ------------------------- | --------- | -------------------- |
| `--ae-border-radius-sm`   | `0.25rem` | Small border radius  |
| `--ae-border-radius-md`   | `0.5rem`  | Medium border radius |
| `--ae-border-radius-lg`   | `1rem`    | Large border radius  |
| `--ae-border-radius-full` | `9999px`  | Fully rounded        |

### Shadows

| Property         | Default                               | Description   |
| ---------------- | ------------------------------------- | ------------- |
| `--ae-shadow-sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)`     | Small shadow  |
| `--ae-shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1)`   | Medium shadow |
| `--ae-shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1)` | Large shadow  |

### Transitions

| Property                 | Default | Description                |
| ------------------------ | ------- | -------------------------- |
| `--ae-transition-fast`   | `150ms` | Fast transition duration   |
| `--ae-transition-normal` | `250ms` | Normal transition duration |
| `--ae-transition-slow`   | `350ms` | Slow transition duration   |

### Focus Ring

| Property                 | Default   | Description       |
| ------------------------ | --------- | ----------------- |
| `--ae-focus-ring-color`  | `#2563eb` | Focus ring color  |
| `--ae-focus-ring-offset` | `2px`     | Focus ring offset |

---

## Component Properties

### Button

#### Layout

| Property                        | Default    | Description                   |
| ------------------------------- | ---------- | ----------------------------- |
| `--ae-button-padding-x`         | `1rem`     | Horizontal padding            |
| `--ae-button-padding-y`         | `0.5rem`   | Vertical padding              |
| `--ae-button-gap`               | `0.5rem`   | Gap between icon and label    |
| `--ae-button-radius`            | `0.375rem` | Border radius                 |
| `--ae-button-padding-icon-only` | `0.5rem`   | Padding for icon-only buttons |

#### Primary Variant

| Property                           | Default                       | Description            |
| ---------------------------------- | ----------------------------- | ---------------------- |
| `--ae-button-bg-primary`           | `var(--ae-color-primary)`     | Background color       |
| `--ae-button-fg-primary`           | `white`                       | Text color             |
| `--ae-button-border-primary`       | `var(--ae-button-bg-primary)` | Border color           |
| `--ae-button-bg-primary-hover`     | Darker shade                  | Hover background color |
| `--ae-button-border-primary-hover` | Darker shade                  | Hover border color     |

#### Secondary Variant

| Property                         | Default   | Description            |
| -------------------------------- | --------- | ---------------------- |
| `--ae-button-bg-secondary`       | `#f3f4f6` | Background color       |
| `--ae-button-fg-secondary`       | `#333333` | Text color             |
| `--ae-button-border-secondary`   | `#d4d4d4` | Border color           |
| `--ae-button-bg-secondary-hover` | `#e5e7eb` | Hover background color |

#### Ghost Variant

| Property                     | Default                   | Description            |
| ---------------------------- | ------------------------- | ---------------------- |
| `--ae-button-bg-ghost`       | `transparent`             | Background color       |
| `--ae-button-fg-ghost`       | `var(--ae-color-primary)` | Text color             |
| `--ae-button-border-ghost`   | `transparent`             | Border color           |
| `--ae-button-bg-ghost-hover` | `rgba(94, 124, 226, 0.1)` | Hover background color |

#### Sizes

| Property              | Default    | Description             |
| --------------------- | ---------- | ----------------------- |
| `--ae-button-font-sm` | `0.875rem` | Small button font size  |
| `--ae-button-font-md` | `1rem`     | Medium button font size |
| `--ae-button-font-lg` | `1.125rem` | Large button font size  |

#### Transitions & States

| Property                          | Default | Description                |
| --------------------------------- | ------- | -------------------------- |
| `--ae-button-transition-duration` | `200ms` | Transition duration        |
| `--ae-button-transition-timing`   | `ease`  | Transition timing function |
| `--ae-button-disabled-opacity`    | `0.6`   | Disabled state opacity     |

---

### Accordion

#### Container

| Property                 | Default             | Description           |
| ------------------------ | ------------------- | --------------------- |
| `--ae-accordion-bg`      | `white`             | Background color      |
| `--ae-accordion-radius`  | `0.375rem`          | Border radius         |
| `--ae-accordion-shadow`  | Shadow              | Box shadow            |
| `--ae-accordion-border`  | `1px solid #e5e7eb` | Border                |
| `--ae-accordion-divider` | `1px solid #e5e7eb` | Divider between items |

#### Header

| Property                               | Default                   | Description             |
| -------------------------------------- | ------------------------- | ----------------------- |
| `--ae-accordion-header-bg`             | `transparent`             | Header background       |
| `--ae-accordion-header-padding`        | `0.875rem 1rem`           | Header padding          |
| `--ae-accordion-header-color`          | `#111827`                 | Header text color       |
| `--ae-accordion-header-font-weight`    | `500`                     | Header font weight      |
| `--ae-accordion-header-font-size`      | `0.875rem`                | Header font size        |
| `--ae-accordion-header-hover-bg`       | `#f9fafb`                 | Header hover background |
| `--ae-accordion-header-active-bg`      | `#f3f4f6`                 | Open header background  |
| `--ae-accordion-header-active-color`   | `var(--ae-color-primary)` | Open header text color  |
| `--ae-accordion-header-disabled-color` | `#9ca3af`                 | Disabled header color   |

#### Icon

| Property                             | Default                   | Description         |
| ------------------------------------ | ------------------------- | ------------------- |
| `--ae-accordion-icon-color`          | `#4b5563`                 | Icon color          |
| `--ae-accordion-icon-active-color`   | `var(--ae-color-primary)` | Open icon color     |
| `--ae-accordion-icon-disabled-color` | `#9ca3af`                 | Disabled icon color |

#### Panel

| Property                         | Default    | Description           |
| -------------------------------- | ---------- | --------------------- |
| `--ae-accordion-panel-padding`   | `1rem`     | Panel content padding |
| `--ae-accordion-panel-bg`        | `white`    | Panel background      |
| `--ae-accordion-panel-color`     | `#374151`  | Panel text color      |
| `--ae-accordion-panel-font-size` | `0.875rem` | Panel font size       |

---

### Checkbox

#### Size & Layout

| Property                      | Default | Description   |
| ----------------------------- | ------- | ------------- |
| `--ae-checkbox-size`          | `18px`  | Checkbox size |
| `--ae-checkbox-border-radius` | `4px`   | Border radius |

#### Colors

| Property                             | Default                   | Description          |
| ------------------------------------ | ------------------------- | -------------------- |
| `--ae-checkbox-bg`                   | `white`                   | Background color     |
| `--ae-checkbox-border-color`         | `#d1d5db`                 | Border color         |
| `--ae-checkbox-checked-bg`           | `var(--ae-color-primary)` | Checked background   |
| `--ae-checkbox-checked-border-color` | `var(--ae-color-primary)` | Checked border color |
| `--ae-checkbox-checked-icon-color`   | `white`                   | Checkmark color      |

#### Indeterminate State

| Property                                   | Default                   | Description              |
| ------------------------------------------ | ------------------------- | ------------------------ |
| `--ae-checkbox-indeterminate-bg`           | `var(--ae-color-primary)` | Indeterminate background |
| `--ae-checkbox-indeterminate-border-color` | `var(--ae-color-primary)` | Indeterminate border     |
| `--ae-checkbox-indeterminate-icon-color`   | `white`                   | Indeterminate icon color |

#### States

| Property                              | Default                   | Description         |
| ------------------------------------- | ------------------------- | ------------------- |
| `--ae-checkbox-focus-ring-color`      | `var(--ae-color-primary)` | Focus ring color    |
| `--ae-checkbox-disabled-bg`           | `#f3f4f6`                 | Disabled background |
| `--ae-checkbox-disabled-border-color` | `#e5e7eb`                 | Disabled border     |
| `--ae-checkbox-disabled-text-color`   | `#9ca3af`                 | Disabled text color |

#### Label

| Property                   | Default   | Description      |
| -------------------------- | --------- | ---------------- |
| `--ae-checkbox-text-color` | `inherit` | Label text color |
| `--ae-checkbox-font-size`  | `inherit` | Label font size  |

---

### Radio

Similar properties to Checkbox (uses same naming pattern).

---

### Dropdown

#### Container

| Property                   | Default | Description      |
| -------------------------- | ------- | ---------------- |
| `--ae-dropdown-bg`         | Themed  | Background color |
| `--ae-dropdown-fg`         | Themed  | Text color       |
| `--ae-dropdown-radius`     | `8px`   | Border radius    |
| `--ae-dropdown-shadow`     | Shadow  | Box shadow       |
| `--ae-dropdown-border`     | `none`  | Border           |
| `--ae-dropdown-max-height` | `400px` | Maximum height   |

#### Header

| Property                      | Default   | Description          |
| ----------------------------- | --------- | -------------------- |
| `--ae-dropdown-header-bg`     | `inherit` | Header background    |
| `--ae-dropdown-header-fg`     | `inherit` | Header text color    |
| `--ae-dropdown-header-border` | Border    | Header bottom border |

#### Menu Items

| Property                       | Default  | Description            |
| ------------------------------ | -------- | ---------------------- |
| `--ae-dropdown-item-font-size` | `0.9rem` | Item font size         |
| `--ae-dropdown-item-hover-bg`  | Themed   | Item hover background  |
| `--ae-dropdown-item-active-bg` | Themed   | Active item background |

#### Separator & Sections

| Property                        | Default | Description     |
| ------------------------------- | ------- | --------------- |
| `--ae-dropdown-separator-color` | Themed  | Separator color |
| `--ae-dropdown-section-border`  | Border  | Section border  |

#### Hints

| Property                     | Default       | Description        |
| ---------------------------- | ------------- | ------------------ |
| `--ae-dropdown-hint-color`   | Themed        | Hint text color    |
| `--ae-dropdown-hint-bg`      | `transparent` | Hint background    |
| `--ae-dropdown-hint-padding` | `2px 4px`     | Hint padding       |
| `--ae-dropdown-hint-radius`  | `3px`         | Hint border radius |

---

### Modal

| Property                | Default              | Description        |
| ----------------------- | -------------------- | ------------------ |
| `--ae-modal-overlay-bg` | `rgba(0, 0, 0, 0.5)` | Overlay background |
| `--ae-modal-bg`         | `white`              | Modal background   |
| `--ae-modal-max-width`  | `500px`              | Maximum width      |
| `--ae-modal-padding`    | `1.5rem`             | Content padding    |
| `--ae-modal-radius`     | `8px`                | Border radius      |
| `--ae-modal-shadow`     | Shadow               | Box shadow         |

---

### Alert

| Property                  | Default    | Description     |
| ------------------------- | ---------- | --------------- |
| `--ae-alert-padding`      | `1rem`     | Content padding |
| `--ae-alert-radius`       | `0.375rem` | Border radius   |
| `--ae-alert-border-width` | `1px`      | Border width    |

#### Variant Colors

Each variant (info, success, warning, error) has:

- `--ae-alert-bg-{variant}` - Background color
- `--ae-alert-fg-{variant}` - Text color
- `--ae-alert-border-{variant}` - Border color
- `--ae-alert-icon-{variant}` - Icon color

---

### Toast

Similar to Alert, with additional positioning properties:

| Property            | Default  | Description        |
| ------------------- | -------- | ------------------ |
| `--ae-toast-offset` | `1rem`   | Offset from edge   |
| `--ae-toast-gap`    | `0.5rem` | Gap between toasts |

---

### Tabs

| Property                        | Default                   | Description            |
| ------------------------------- | ------------------------- | ---------------------- |
| `--ae-tabs-border-color`        | `#e5e7eb`                 | Border color           |
| `--ae-tabs-active-color`        | `var(--ae-color-primary)` | Active tab color       |
| `--ae-tabs-active-border-width` | `2px`                     | Active indicator width |
| `--ae-tabs-padding`             | `0.75rem 1rem`            | Tab padding            |

---

### Tooltip

| Property                 | Default          | Description      |
| ------------------------ | ---------------- | ---------------- |
| `--ae-tooltip-bg`        | `#1f2937`        | Background color |
| `--ae-tooltip-fg`        | `white`          | Text color       |
| `--ae-tooltip-padding`   | `0.5rem 0.75rem` | Padding          |
| `--ae-tooltip-radius`    | `0.375rem`       | Border radius    |
| `--ae-tooltip-font-size` | `0.875rem`       | Font size        |
| `--ae-tooltip-max-width` | `200px`          | Maximum width    |

---

### TreeView

| Property                       | Default                   | Description              |
| ------------------------------ | ------------------------- | ------------------------ |
| `--ae-treeview-indent`         | `1.5rem`                  | Indentation per level    |
| `--ae-treeview-node-padding`   | `0.5rem`                  | Node padding             |
| `--ae-treeview-selected-bg`    | Background                | Selected node background |
| `--ae-treeview-selected-color` | `var(--ae-color-primary)` | Selected node color      |
| `--ae-treeview-hover-bg`       | Background                | Hover background         |
| `--ae-treeview-icon-color`     | `#6b7280`                 | Icon color               |
| `--ae-treeview-caret-color`    | `#6b7280`                 | Caret color              |

---

### Combo & Autocomplete

| Property                      | Default             | Description              |
| ----------------------------- | ------------------- | ------------------------ |
| `--ae-combo-input-padding`    | `0.5rem 0.75rem`    | Input padding            |
| `--ae-combo-input-border`     | `1px solid #d1d5db` | Input border             |
| `--ae-combo-input-radius`     | `0.375rem`          | Input border radius      |
| `--ae-combo-list-max-height`  | `300px`             | List maximum height      |
| `--ae-combo-item-padding`     | `0.5rem 0.75rem`    | Item padding             |
| `--ae-combo-item-hover-bg`    | Background          | Item hover background    |
| `--ae-combo-item-selected-bg` | Background          | Selected item background |

---

## Usage Examples

### Override Global Tokens

```css
:root {
  --ae-color-primary: #1976d2;
  --ae-spacing-md: 1.5rem;
  --ae-border-radius-md: 8px;
}
```

### Override Component-Specific Properties

```css
:root {
  --ae-button-bg-primary: #ff6b35;
  --ae-button-radius: 24px;
  --ae-accordion-header-font-weight: 600;
}
```

### Scoped Overrides

```css
.dark-section {
  --ae-accordion-bg: #1a1a1a;
  --ae-accordion-header-color: white;
  --ae-accordion-panel-color: #e5e5e5;
}
```

### Dynamic Theming

```typescript
// Change at runtime
document.documentElement.style.setProperty('--ae-color-primary', '#ff0000');
```

---

## Property Naming Convention

All AetherUI CSS custom properties follow this convention:

```
--ae-{component}-{property}-{variant?}
```

**Examples:**

- `--ae-button-bg-primary` - Button background for primary variant
- `--ae-accordion-header-padding` - Accordion header padding
- `--ae-checkbox-size` - Checkbox size

**Global tokens:**

```
--ae-{category}-{name}
```

**Examples:**

- `--ae-color-primary` - Global primary color
- `--ae-spacing-md` - Global medium spacing
- `--ae-shadow-lg` - Global large shadow

---

## Best Practices

1. **Use global tokens first** - Override `--ae-color-primary` rather than every component's primary color
2. **Leverage CSS cascade** - Set tokens on `:root` or scoped containers
3. **Group related properties** - Keep all your theme customizations together
4. **Document your overrides** - Comment why you're overriding specific properties
5. **Test in different states** - Check hover, focus, disabled, and active states

---

## Need More Information?

- [Theming Guide](./THEMING.md) - Learn how to create custom themes
- [Component Documentation](https://pallavL01.github.io/AetherUI/) - See component-specific examples
- [Storybook](https://pallavL01.github.io/AetherUI/storybook/) - Interactive property editor

---

**Note**: This reference is automatically generated from component source code. If you find any missing or incorrect properties, please [open an issue](https://github.com/pallavL01/AetherUI/issues).
