# Button Component Technical Spec

## 1 · Purpose

Primary action trigger with variants (primary, secondary, ghost, icon‑only) and sizes (sm, md, lg).

## 2 · Public API

| Prop       | Type                                  | Default     | Description                     |
| ---------- | ------------------------------------- | ----------- | ------------------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style token mapping.     |
| `size`     | `'sm' \| 'md' \| 'lg'`                | `'md'`      | Applied to padding & font‑size. |
| `disabled` | `boolean`                             | `false`     | Native disable.                 |

| Event          | Payload      |
| -------------- | ------------ |
| Native `click` | `MouseEvent` |

| Slot / Part            | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| default slot           | Button label.                                      |
| `icon` _(slot + part)_ | icon on either side (reflect via `icon-position`). |
| `base` _(part)_        | actual `<button>` element.                         |

## 3 · Accessibility

- `<button>` semantics out‑of‑box.
- If `icon‑only`, require `aria-label`.
- Focus ring uses token `--ae-focus-ring`.

## 4 · Styling & Theming

### 4.1 Shadow Parts

| Part Name | Element              | Notes                                                         |
| --------- | -------------------- | ------------------------------------------------------------- |
| `base`    | `<button>`           | Interactive surface.                                          |
| `label`   | `<span>`             | Text wrapper; hidden when `icon‑only`.                        |
| `icon`    | `<slot name="icon">` | Leading or trailing icon (controlled by `icon-position`).     |
| `loader`  | `<span>`             | Optional spinner shown while `loading` prop true _(roadmap)_. |

Examples:

**External styling** (from outside the component):

```css
/* Make ghost variant transparent with brand‑color text */
ae-button[variant='ghost']::part(base) {
  background: transparent;
  color: var(--ae-color-brand-600);
}
```

**Internal styling** (within the component):

```css
/* In the component's styles.ts */
:host([variant='ghost']) button {
  background-color: transparent;
  color: var(--ae-color-brand-600, #5e7ce2);
  border-color: transparent;
}
```

Note: Within the component's Shadow DOM, use direct element selectors (`button`) rather than `::part()` selectors. The `::part()` syntax is only for external styling.

### 4.2 Design Tokens

| Token                      | Default                        | Purpose                       |
| -------------------------- | ------------------------------ | ----------------------------- |
| `--ae-button-bg-primary`   | `var(--ae-color-brand-600)`    | Primary background.           |
| `--ae-button-fg-primary`   | `#fff`                         | Primary text/icon color.      |
| `--ae-button-bg-secondary` | `var(--ae-color-base-200)`     | Secondary background.         |
| `--ae-button-fg-secondary` | `var(--ae-color-text-primary)` | Secondary text.               |
| `--ae-button-radius`       | `var(--ae-border-radius-sm)`   | Corner rounding.              |
| `--ae-button-padding-x`    | `var(--ae-space-4)`            | Inline padding.               |
| `--ae-button-padding-y`    | `var(--ae-space-2)`            | Block padding.                |
| `--ae-button-gap`          | `0.5rem`                       | Space between icon and label. |

Override per theme:

```css
:root[data-theme='dark'] {
  --ae-button-bg-primary: var(--ae-color-brand-400);
}
```

### 4.3 `styles.ts` Example

```ts
// packages/button/src/styles.ts
import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-block;
  }

  /* Base button styles for all variants */
  button {
    display: inline-flex;
    align-items: center;
    gap: var(--ae-button-gap, 0.5rem);
    padding: var(--ae-button-padding-y, 0.5rem) var(--ae-button-padding-x, 1rem);
    border-radius: var(--ae-button-radius, 0.375rem);
    border: 1px solid;
    cursor: pointer;
    font: inherit;
    transition-property: background-color, box-shadow, border-color, transform;
    transition-duration: 200ms;
    transition-timing-function: ease;
  }

  /* Primary variant */
  :host([variant='primary']) button,
  :host(:not([variant])) button {
    background-color: var(--ae-button-bg-primary, #5e7ce2);
    color: var(--ae-button-fg-primary, white);
    border-color: var(--ae-button-bg-primary, #5e7ce2);
  }

  /* Secondary variant */
  :host([variant='secondary']) button {
    background-color: var(--ae-button-bg-secondary, #f3f4f6);
    color: var(--ae-button-fg-secondary, #333333);
    border-color: #d4d4d4;
  }

  /* Ghost variant */
  :host([variant='ghost']) button {
    background-color: transparent;
    color: var(--ae-color-brand-600, #5e7ce2);
    border-color: transparent;
  }

  /* Disabled state */
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
```

Consumers can import `buttonStyles` and extend when composing design themes.

## 5 · Folder Structure

```
packages/button/
├─ src/ae-button.ts
├─ styles.ts
├─ icons.ts          # imported SVGs
├─ index.ts
└─ ...
```

## 6 · Architecture

- Lightweight Lit component wrapping native `<button>`; passes all unrecognised attributes.
- Emits `defineAeButton()` for single registration.

## 7 · Performance Budget

- ≤ 0.8 KB gzip.

## 8 · Testing

- Unit: attribute reflection, disabled state.
- Visual: hover / active / disabled.

---

_Updated: 2025‑05‑07_
