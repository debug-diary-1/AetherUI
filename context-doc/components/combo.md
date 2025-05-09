# Combobox Component Technical Spec

## 1 · Purpose

An **autocomplete dropdown** that allows free‑type input or selection from a filtered list, following the ARIA **Listbox Combobox** pattern.

## 2 · Public API

| Prop          | Type                                          | Default  | Description                                             |
| ------------- | --------------------------------------------- | -------- | ------------------------------------------------------- |
| `items`       | `string[] \| ComboItem[]`                     | `[]`     | Items to display; string or `{ id, label, disabled? }`. |
| `value`       | `string`                                      | `''`     | Controlled value.                                       |
| `placeholder` | `string`                                      | `''`     | Placeholder text.                                       |
| `disabled`    | `boolean`                                     | `false`  | Disable input.                                          |
| `freeInput`   | `boolean`                                     | `true`   | Allow values not present in list.                       |
| `filterFn`    | `(query: string, item: ComboItem) => boolean` | built‑in | Custom filter.                                          |

| Event       | Payload                                     |          |
| ----------- | ------------------------------------------- | -------- |
| `ae-select` | \`{ value: string; item: ComboItem          | null }\` |
| `ae-input`  | `{ value: string }` fired on each keystroke |          |

## 3 · Accessibility

* Root input has `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`.
* Popup list has `role="listbox"`; list items have `role="option"`.
* **Keyboard**: ArrowDown opens & moves highlight, Enter selects, Esc closes.

## 4 · Styling & Theming

### 4.1 Shadow Parts

| Part        | Element                           | Notes                               |
| ----------- | --------------------------------- | ----------------------------------- |
| `input`     | `<input>`                         | Text input field.                   |
| `caret`     | `<span>`                          | Dropdown arrow icon wrapper.        |
| `overlay`   | Positioned wrapper for the popup. |                                     |
| `listbox`   | `<div role="listbox">`            | Scroll container.                   |
| `option`    | `<div role="option">`             | Each list option.                   |
| `highlight` | `<span>`                          | Matches query highlight (optional). |

```css
/* Gray border on input wrapper */
ae-combo::part(input) {
  border: 1px solid var(--ae-combo-border, #d1d5db);
}
```

### 4.2 Design Tokens

| Token                           | Default                        | Purpose                           |
| ------------------------------- | ------------------------------ | --------------------------------- |
| `--ae-combo-border`             | `#d1d5db`                      | Input border color.               |
| `--ae-combo-radius`             | `var(--ae-border-radius-sm)`   | Corner radius of input & listbox. |
| `--ae-combo-bg`                 | `var(--ae-color-surface)`      | Input background.                 |
| `--ae-combo-fg`                 | `var(--ae-color-text-primary)` | Text color.                       |
| `--ae-combo-option-hover-bg`    | `var(--ae-color-base-50)`      | Hover/active option background.   |
| `--ae-combo-option-selected-bg` | `var(--ae-color-brand-50)`     | Selected option bg.               |
| `--ae-combo-option-selected-fg` | `var(--ae-color-brand-900)`    | Selected option text.             |
| `--ae-combo-shadow`             | `var(--ae-elevation-3)`        | Overlay shadow.                   |

### 4.3 `styles.ts` Example

```ts
// packages/combo/src/styles.ts
import { css } from 'lit';

export const comboStyles = css`
  :host { display: inline-block; position: relative; }

  ::part(input) {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--ae-combo-border, #d1d5db);
    border-radius: var(--ae-combo-radius, 0.375rem);
    background: var(--ae-combo-bg, #fff);
    color: var(--ae-combo-fg, #111);
  }

  ::part(caret) {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  ::part(overlay) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: var(--ae-combo-bg, #fff);
    border: 1px solid var(--ae-combo-border, #d1d5db);
    border-radius: var(--ae-combo-radius, 0.375rem);
    box-shadow: var(--ae-combo-shadow, 0 4px 12px rgba(0,0,0,.1));
    max-height: 12rem;
    overflow: auto;
  }

  ::part(option) {
    padding: 0.375rem 0.75rem;
    cursor: pointer;
  }
  ::part(option):hover {
    background: var(--ae-combo-option-hover-bg, #f3f4f6);
  }
  ::part(option)[data-selected] {
    background: var(--ae-combo-option-selected-bg, #e0e7ff);
    color: var(--ae-combo-option-selected-fg, #3730a3);
  }
`;
```

Consumers may import `comboStyles` to build brand‑specific variants.

## 5 · Folder Structure

```text
packages/combo/
├─ src/
│  ├─ ae-combo.ts       # main component
│  ├─ controller.ts     # filtering / highlight	logic
│  ├─ styles.ts         # css (above)
│  ├─ types.ts
│  └─ listbox.ts        # virtualised list (future)
└─ index.ts             # barrel + defineAeCombo()
```

## 6 · Architecture

* Lit reactive **controller** maintains query, filtered list, and highlight index.
* Overlay positions with **@floating-ui** middleware (optional offset, flip).
* **Debounce** filter at 150 ms for smoother typing.

## 7 · Performance

* Core bundle ≤ 3 KB; `@floating-ui` (4 KB) dynamic import.
* Virtualization cut‑off at > 200 items roadmap.

## 8 · Testing Strategy

* Unit: filter function, freeInput behaviour.
* Playwright: keyboard navigation, aria attributes, option hover.
* axe‑core: ensure listbox semantics, no contrast errors.

---

*Updated: 2025‑05‑07*
