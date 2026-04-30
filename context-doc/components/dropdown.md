# Dropdown Component Technical Spec

## 1 · Purpose

Floating context menu that anchors to a trigger element and positions itself with **@floating‑ui**. Supports keyboard navigation, type‑ahead search, and nesting (sub‑menus).

## 2 · Public API

| Prop          | Type                                                                      | Default          | Description                                 |
| ------------- | ------------------------------------------------------------------------- | ---------------- | ------------------------------------------- |
| `open`        | `boolean`                                                                 | `false`          | Controlled visibility.                      |
| `defaultOpen` | `boolean`                                                                 | `false`          | Uncontrolled initial state.                 |
| `placement`   | `'top' \| 'bottom' \| 'left' \| 'right'` plus variants (`-start`, `-end`) | `'bottom-start'` | Menu placement relative to trigger.         |
| `strategy`    | `'absolute' \| 'fixed'`                                                   | `'absolute'`     | Positioning strategy passed to floating‑ui. |
| `disabled`    | `boolean`                                                                 | `false`          | Disable trigger interaction.                |

| Event            | Payload                                   |
| ---------------- | ----------------------------------------- |
| `ae-open-change` | `{ open: boolean }`                       |
| `ae-select`      | `{ value: string }` emitted by menu items |

## 3 · Accessibility

- Trigger receives `aria-haspopup="menu"` and `aria-expanded`.
- Menu root gets `role="menu"` and is focus‑managed via roving tabindex.
- Menu items are `role="menuitem"`; separators use `role="separator"`.
- Keyboard: **Arrow keys** navigate, **Enter/Space** activate, **Esc** closes, **type‑ahead** focuses first match.

## 4 · Styling & Theming

### 4.1 Shadow Parts

| Part        | Element                    | Notes                                      |
| ----------- | -------------------------- | ------------------------------------------ |
| `trigger`   | `<button>`                 | Anchor element; rendered via default slot. |
| `overlay`   | wrapper `<div>`            | Positioned container (applies elevation).  |
| `menu`      | `<div role="menu">`        | Scrollable list container.                 |
| `item`      | `<button role="menuitem">` | Individual actionable option.              |
| `separator` | `<hr role="separator">`    | Visual separator.                          |

Style example:

```css
/* Set rounded corners & custom shadow */
ae-dropdown::part(overlay) {
  border-radius: var(--ae-dropdown-radius, 0.375rem);
  box-shadow: var(--ae-dropdown-shadow, var(--ae-elevation-3));
}
```

### 4.2 Design Tokens

| Token                          | Default                        | Purpose                         |
| ------------------------------ | ------------------------------ | ------------------------------- |
| `--ae-dropdown-shadow`         | `var(--ae-elevation-3)`        | Overlay box‑shadow.             |
| `--ae-dropdown-radius`         | `var(--ae-border-radius-sm)`   | Corner rounding.                |
| `--ae-dropdown-bg`             | `var(--ae-color-surface)`      | Menu background.                |
| `--ae-dropdown-fg`             | `var(--ae-color-text-primary)` | Text color.                     |
| `--ae-dropdown-item-hover-bg`  | `var(--ae-color-base-50)`      | Hover state.                    |
| `--ae-dropdown-item-active-bg` | `var(--ae-color-base-100)`     | Active / selected state.        |
| `--ae-dropdown-gap`            | `0.25rem`                      | Vertical spacing between items. |

Global dark‑theme override:

```css
:root[data-theme='dark'] {
  --ae-dropdown-bg: var(--ae-color-base-900);
  --ae-dropdown-fg: var(--ae-color-base-50);
}
```

### 4.3 `styles.ts` Example

```ts
// packages/dropdown/src/styles.ts
import { css } from 'lit';

export const dropdownStyles = css`
  :host {
    display: contents;
  }

  ::part(overlay) {
    background: var(--ae-dropdown-bg, #fff);
    color: var(--ae-dropdown-fg, #111);
    border-radius: var(--ae-dropdown-radius, 6px);
    box-shadow: var(--ae-dropdown-shadow, 0 4px 12px rgba(0, 0, 0, 0.1));
    padding: 0.25rem 0;
  }

  ::part(menu) {
    display: flex;
    flex-direction: column;
    gap: var(--ae-dropdown-gap, 0.25rem);
    outline: none;
  }

  ::part(item) {
    padding: 0.375rem 0.75rem;
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
  }

  ::part(item):hover {
    background: var(--ae-dropdown-item-hover-bg, #f3f4f6);
  }

  ::part(item)[data-active] {
    background: var(--ae-dropdown-item-active-bg, #e5e7eb);
  }
`;
```

Consumers can import `dropdownStyles` and extend via Lit’s `css` helper when building theme variants.

## 5 · Folder Structure

```text
packages/dropdown/
├─ src/
│  ├─ ae-dropdown.ts      # Lit component (controller + template)
│  ├─ positioning.ts      # floating‑ui setup & middleware
│  ├─ keyboard.ts         # roving tabindex controller
│  └─ styles.ts           # css tagged template (above)
└─ index.ts               # barrel + defineAeDropdown()
```

## 6 · Architecture

- **Lit reactive controller** handles open state, outside‑click & Esc key close.
- **@floating‑ui/dom** computes placement; middleware for offset & flip.
- Menu lazily rendered into `document.body` via `LitPortalController` to avoid clipping inside scrolling containers.

## 7 · Performance

- Core bundle ≤ 2 KB; `@floating-ui` (≈4 KB) dynamically imported on first open.
- Re‑renders only when `open` or content slot mutations occur.

## 8 · Testing Strategy

- **Unit**: state transitions, event emissions.
- **Playwright**: arrow‑key navigation, viewport edge flipping.
- **axe‑core**: ensure `aria-haspopup`, `role` attributes, and focus order.

---

_Updated: {{date}}_
