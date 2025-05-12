# Autocomplete Component Technical Spec

## 1 · Purpose

An input control that presents **type‑ahead suggestions**. Supports:

1. **Static data** passed as an array.
2. **Async data** fetched via a `loadOptions` callback with built‑in loading state.
3. Configurable **debounce** (`throttle`) interval to avoid chatty API calls.

## 2 · Public API

| Prop          | Type                                     | Default     | Description                                                  |
| ------------- | ---------------------------------------- | ----------- | ------------------------------------------------------------ |
| `options`     | `string[] \| AutoItem[]`                 | `[]`        | Static list of options. Ignored if `loadOptions` supplied.   |
| `loadOptions` | `(query: string) => Promise<AutoItem[]>` | `undefined` | Async loader; component renders loading state while pending. |
| `value`       | `string`                                 | `''`        | Controlled input value.                                      |
| `placeholder` | `string`                                 | `''`        | Input placeholder.                                           |
| `throttle`    | `number`                                 | `200`       | Debounce ms before calling `loadOptions`.                    |
| `disabled`    | `boolean`                                | `false`     | Disable interaction.                                         |

`AutoItem` = `{ id: string; label: string; disabled?: boolean }`.

| Event         | Payload                                                         |                           |
| ------------- | --------------------------------------------------------------- | ------------------------- |
| `ae-select`   | \`{ value: string; item: AutoItem                               | null }\` when user picks. |
| `ae-input`    | `{ value: string }` every keystroke (after debounce for async). |                           |
| `ae-load`     | `{ query: string }` fires before `loadOptions` promise.         |                           |
| `ae-load-end` | `{ query: string; items: AutoItem[] }` after resolve/reject.    |                           |

## 3 · Accessibility

* Input gets `role="combobox"` + `aria-autocomplete="list"`.
* Popup list `role="listbox"`; options `role="option"` with `aria-disabled`.
* `aria-busy="true"` applied to listbox while loading.
* Keyboard: Arrow keys, Enter, Esc, type‑ahead characters.

## 4 · Styling & Theming

*(The snippets in this section show ****override hooks**** only — the component itself ships a minimal baseline in **`styles.ts`**; consumers extend or override these tokens/parts as needed).*

### 4.1 Shadow Parts

| Part      | Element                | Notes                                       |
| --------- | ---------------------- | ------------------------------------------- |
| `input`   | `<input>`              | Text input.                                 |
| `overlay` | Wrapper `<div>`        | Positioned container.                       |
| `listbox` | `<div role="listbox">` | Suggestions list.                           |
| `option`  | `<div role="option">`  | Each suggestion.                            |
| `spinner` | `<div>`                | Loading indicator. Hidden when not loading. |

Example override:

```css
/* Branded spinner colour */
ae-autocomplete::part(spinner) {
  border-top-color: var(--ae-auto-spinner-color, #2563eb);
}
```

### 4.2 Design Tokens

| Token                          | Default                              | Purpose                    |
| ------------------------------ | ------------------------------------ | -------------------------- |
| `--ae-auto-bg`                 | `var(--ae-color-surface)`            | Overlay background.        |
| `--ae-auto-border`             | `1px solid var(--ae-color-base-300)` | Border style.              |
| `--ae-auto-radius`             | `var(--ae-border-radius-sm)`         | Rounded corners.           |
| `--ae-auto-shadow`             | `var(--ae-elevation-3)`              | Overlay elevation.         |
| `--ae-auto-option-hover-bg`    | `var(--ae-color-base-50)`            | Hover background.          |
| `--ae-auto-option-selected-bg` | `var(--ae-color-brand-50)`           | Selected bg.               |
| `--ae-auto-spinner-size`       | `16px`                               | Loading spinner dimension. |

### 4.3 `styles.ts` Example

```ts
// packages/autocomplete/src/styles.ts
import { css } from 'lit';

export const autoStyles = css`
  :host { display: inline-block; position: relative; }

  ::part(input) {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: var(--ae-auto-border, 1px solid #d1d5db);
    border-radius: var(--ae-auto-radius, 0.375rem);
  }

  ::part(overlay) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 14rem;
    overflow: auto;
    background: var(--ae-auto-bg, #fff);
    border: var(--ae-auto-border, 1px solid #d1d5db);
    border-radius: var(--ae-auto-radius, 0.375rem);
    box-shadow: var(--ae-auto-shadow, 0 4px 12px rgba(0,0,0,.1));
    z-index: 1000;
  }

  ::part(option) { padding: 0.375rem 0.75rem; cursor: pointer; }
  ::part(option):hover { background: var(--ae-auto-option-hover-bg, #f3f4f6); }
  ::part(option)[data-selected] {
    background: var(--ae-auto-option-selected-bg, #e0e7ff);
  }

  ::part(spinner) {
    width: var(--ae-auto-spinner-size, 16px);
    height: var(--ae-auto-spinner-size, 16px);
    border: 2px solid transparent;
    border-top-color: var(--ae-auto-spinner-color, #2563eb);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0.25rem auto;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`;
```

## 5 · Folder Structure

```text
packages/autocomplete/
├─ src/
│  ├─ ae-autocomplete.ts   # component
│  ├─ controller.ts        # debounce & async state
│  ├─ types.ts             # AutoItem definition
│  ├─ styles.ts            # css (above)
│  └─ utils.ts             # highlight / filter helpers
└─ index.ts                # barrel + defineAeAutocomplete()
```

## 6 · Architecture

* **Lit reactive controller** manages `query`, debounced calls to `loadOptions`, loading flag, and filtered options.
* When `loadOptions` resolves, component re‑renders list and fires `ae-load-end`.
* Suggestion list overlays using **@floating-ui** for viewport clipping.

## 7 · Performance

* Debounce default 200 ms reduces API chatter.
* Spinner SVG inline; no extra network requests.
* Bundle ≤ 3 KB + optional dynamic import of `@floating-ui` (4 KB) on first open.

## 8 · Testing Strategy

* **Unit**: debounce timing, async loading states, controlled vs uncontrolled value.
* **Playwright**: keyboard navigation, aria states, loading spinner visibility.
* **axe‑core**: verify `aria-busy`, listbox semantics, contrast.

---

*Updated: 2025‑05‑07*
