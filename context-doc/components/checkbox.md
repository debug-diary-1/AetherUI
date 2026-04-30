# Checkbox Component Technical Spec

## 1 · Purpose

Binary choice widget with **checked / unchecked / indeterminate** states. Offers a custom visual while keeping the native `<input type="checkbox">` semantic for accessibility and form submission.

## 2 · Public API

| Prop             | Type      | Default | Description                               |
| ---------------- | --------- | ------- | ----------------------------------------- |
| `checked`        | `boolean` | `false` | Controlled state.                         |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial state.               |
| `indeterminate`  | `boolean` | `false` | Tri‑state visual; does not set `checked`. |
| `disabled`       | `boolean` | `false` | Disable interaction.                      |

| Event       | Payload                                        |
| ----------- | ---------------------------------------------- |
| `ae-change` | `{ checked: boolean; indeterminate: boolean }` |

## 3 · Accessibility

- Shadow DOM wraps a visually‑hidden native input (using **visually‑hidden** CSS).
  The custom control forwards focus & click to this input.
- Reflects state via `aria‑checked="mixed"` when `indeterminate`.
- Native form participation ensured by leaving the hidden input in the light DOM.
- Keyboard: `Space` toggles, `Tab` focuses; obeys OS high‑contrast mode.

## 4 · Styling & Theming

### 4.1 Shadow Parts

| Part        | Element           | Notes                |
| ----------- | ----------------- | -------------------- |
| `control`   | `<span>`          | Visual square box.   |
| `indicator` | `<svg>` or pseudo | Check / minus glyph. |
| `label`     | default slot      | Adjacent text.       |

Override example:

```css
/* Rounded checkbox */
ae-checkbox::part(control) {
  border-radius: var(--ae-checkbox-border-radius, 4px);
}
```

### 4.2 Design Tokens

| Token                         | Default                              | Purpose                       |
| ----------------------------- | ------------------------------------ | ----------------------------- |
| `--ae-checkbox-size`          | `1rem`                               | Control width & height.       |
| `--ae-checkbox-border`        | `2px solid var(--ae-color-base-500)` | Border style.                 |
| `--ae-checkbox-bg`            | `var(--ae-color-surface)`            | Background when unchecked.    |
| `--ae-checkbox-fg`            | `var(--ae-color-text-primary)`       | Indicator color when checked. |
| `--ae-checkbox-checked-bg`    | `var(--ae-color-brand-600)`          | Background when checked.      |
| `--ae-checkbox-border-radius` | `4px`                                | Corner rounding.              |
| `--ae-checkbox-focus-ring`    | `0 0 0 3px rgba(59,113,202,.5)`      | Box‑shadow focus ring.        |

Dark theme sample:

```css
:root[data-theme='dark'] {
  --ae-checkbox-bg: var(--ae-color-base-800);
  --ae-checkbox-border: 2px solid var(--ae-color-base-600);
}
```

### 4.3 `styles.ts` Example

```ts
// packages/checkbox/src/styles.ts
import { css } from 'lit';

export const checkboxStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Hidden native input */
  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  ::part(control) {
    width: var(--ae-checkbox-size, 1rem);
    height: var(--ae-checkbox-size, 1rem);
    border: var(--ae-checkbox-border, 2px solid #6b7280);
    border-radius: var(--ae-checkbox-border-radius, 4px);
    background: var(--ae-checkbox-bg, #fff);
    display: grid;
    place-items: center;
    transition:
      background 120ms ease,
      border-color 120ms ease;
  }

  /* Indicator (check or minus) */
  ::part(indicator) {
    width: 70%;
    height: 70%;
    stroke: var(--ae-checkbox-fg, #fff);
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity 120ms ease,
      transform 120ms ease;
  }

  /* Checked state */
  :host([checked]) ::part(control) {
    background: var(--ae-checkbox-checked-bg, #2563eb);
    border-color: var(--ae-checkbox-checked-bg, #2563eb);
  }
  :host([checked]) ::part(indicator) {
    opacity: 1;
    transform: scale(1);
  }

  /* Indeterminate state uses minus glyph */
  :host([indeterminate]) ::part(indicator) {
    opacity: 1;
    transform: scale(1);
  }

  /* Focus ring */
  :host(:focus-visible) ::part(control) {
    box-shadow: var(--ae-checkbox-focus-ring, 0 0 0 3px rgba(59, 113, 202, 0.5));
  }
`;
```

## 5 · Folder Structure

```text
packages/checkbox/
├─ src/
│  ├─ ae-checkbox.ts   # component class
│  ├─ styles.ts        # css tagged template (above)
│  └─ icons.ts         # check & minus SVG paths
└─ index.ts            # barrel + defineAeCheckbox()
```

## 6 · Architecture

- Lit component with reactive props `checked`, `indeterminate`.
- Syncs native `<input>` properties so forms submit values.
- Emits `ae-change` after state changes; consumer prevents if they want controlled behaviour.

## 7 · Performance

- ≤ 1 KB gzip (excluding optional SVG paths which are tiny).

## 8 · Testing Strategy

- **Unit**: controlled vs uncontrolled, indeterminate logic.
- **Playwright**: focus ring visibility, keyboard toggle, high‑contrast.
- **axe‑core**: ensure correct `aria-checked` value.

---

_Updated: 2025‑05‑07_
