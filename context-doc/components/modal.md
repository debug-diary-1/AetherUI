# Modal (Dialog) Component Technical Spec

## 1 · Purpose

Blocking overlay for critical user tasks—must **trap focus**, restore focus on close, disable background scrolling, and communicate context with an accessible label.

## 2 · Public API

| Prop             | Type                    | Default | Description                                  |
| ---------------- | ----------------------- | ------- | -------------------------------------------- |
| `open`           | `boolean`               | `false` | Controlled visibility state.                 |
| `defaultOpen`    | `boolean`               | `false` | Uncontrolled initial visibility.             |
| `initialFocus`   | `string \| HTMLElement` | `null`  | Selector/element to focus when opened.       |
| `underlay`       | `boolean`               | `true`  | Render backdrop/overlay element.             |
| `destroyOnClose` | `boolean`               | `false` | Remove panel from DOM after close animation. |

| Event              | Payload                                       |
| ------------------ | --------------------------------------------- |
| `ae-request-close` | `{ reason: 'escape' \| 'backdrop' \| 'api' }` |
| `ae-after-close`   | `void` – fired after exit animation completes |

## 3 · Accessibility

- Uses `<dialog>` when available; polyfills via inert/aria‑hidden otherwise.
- Root panel gets `role="dialog"`, `aria-modal="true"`, `aria-labelledby` / `aria-describedby`.
- **Focus trap** implemented with `focus-trap` library; restores focus to trigger on close.
- **Keyboard**: `Esc` closes (unless `preventDefault()`), tab cycles within trap.

## 4 · Styling & Theming

### 4.1 Shadow Parts

| Part      | Element          | Notes                           |
| --------- | ---------------- | ------------------------------- |
| `overlay` | backdrop `<div>` | Underlay behind panel.          |
| `panel`   | main `<section>` | Dialog surface.                 |
| `header`  | slot wrapper     | Title/content header area.      |
| `body`    | slot wrapper     | Scrollable content region.      |
| `footer`  | slot wrapper     | Action buttons region.          |
| `close`   | `<button>`       | Optional close button (× icon). |

Example:

```css
/* Glassy backdrop */
ae-modal::part(overlay) {
  backdrop-filter: blur(4px) saturate(150%);
  background: rgba(0, 0, 0, 0.4);
}
```

### 4.2 Design Tokens

| Token                           | Default                      | Purpose                |
| ------------------------------- | ---------------------------- | ---------------------- |
| `--ae-modal-overlay-bg`         | `rgba(0,0,0,.4)`             | Backdrop color.        |
| `--ae-modal-panel-bg`           | `var(--ae-color-surface)`    | Panel background.      |
| `--ae-modal-panel-radius`       | `var(--ae-border-radius-lg)` | Corner rounding.       |
| `--ae-modal-panel-shadow`       | `var(--ae-elevation-5)`      | Elevation shadow.      |
| `--ae-modal-z-index`            | `1000`                       | Stacking context.      |
| `--ae-modal-max-width`          | `32rem`                      | Default panel width.   |
| `--ae-modal-animation-duration` | `180ms`                      | Enter/exit transition. |

Dark‑theme override:

```css
:root[data-theme='dark'] {
  --ae-modal-panel-bg: #1f2937;
}
```

### 4.3 `styles.ts` Example

```ts
// packages/modal/src/styles.ts
import { css } from 'lit';

export const modalStyles = css`
  :host {
    position: fixed;
    inset: 0;
    z-index: var(--ae-modal-z-index, 1000);
  }

  ::part(overlay) {
    position: absolute;
    inset: 0;
    background: var(--ae-modal-overlay-bg, rgba(0, 0, 0, 0.4));
  }

  ::part(panel) {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: var(--ae-modal-max-width, 32rem);
    width: 90vw;
    transform: translate(-50%, -50%);
    background: var(--ae-modal-panel-bg, #fff);
    border-radius: var(--ae-modal-panel-radius, 0.75rem);
    box-shadow: var(--ae-modal-panel-shadow, 0 15px 30px rgba(0, 0, 0, 0.2));
    display: flex;
    flex-direction: column;
    animation: modal-enter var(--ae-modal-animation-duration, 180ms) ease;
  }

  @keyframes modal-enter {
    from {
      opacity: 0;
      transform: translate(-50%, -48%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;
```

Consumers can extend by importing `modalStyles` and layering additional CSS.

## 5 · Folder Structure

```text
packages/modal/
├─ src/
│  ├─ ae-modal.ts        # LitElement component
│  ├─ styles.ts          # css tagged template (above)
│  ├─ trap.ts            # focus trap util
│  ├─ scroll-lock.ts     # body lock helper
│  └─ portal.ts          # LitPortalController wrapper
└─ index.ts              # barrel + defineAeModal()
```

## 6 · Architecture

- Renders overlay & panel into a **portal** attached to `document.body` to avoid stacking issues.
- `open` reflection drives `aria-hidden` on sibling nodes for assistive tech.
- `scroll-lock.ts` toggles `overflow:hidden` on `<html>` while modal is open.

## 7 · Performance

- Core bundle ≤ 3 KB; focus‑trap polyfill (\~1 KB) lazy‑imports when opened.
- Enter/exit animation uses `transform` for GPU‑friendly rendering.

## 8 · Testing Strategy

- **Unit**: open/close API, event emission, scroll lock state.
- **Playwright**: focus trap, escape key, backdrop click.
- **axe‑core**: ensure `aria-modal`, labelled dialog, focusable elements within.

---

_Updated: 2025‑05‑07_
