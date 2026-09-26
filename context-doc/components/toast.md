# Toast Component Technical Spec

## 1 · Purpose

Ephemeral **non‑modal notifications** that appear and disappear automatically. Designed for short, transient feedback (e.g., “Saved”, “Copied”, error messages). Supports stacking, variant coloring, auto‑dismiss timers, and manual close.

## 2 · Public API

| Prop           | Type                                                       | Default          | Description                              |
| -------------- | ---------------------------------------------------------- | ---------------- | ---------------------------------------- |
| `message`      | `string`                                                   | `''`             | Visible text (or slot for custom).       |
| `variant`      | `'info' \| 'success' \| 'warning' \| 'error'`              | `'info'`         | Visual styling preset.                   |
| `open`         | `boolean`                                                  | `true`           | Controlled visibility (used by manager). |
| `duration`     | `number`                                                   | `5000`           | Auto‑dismiss ms (`0` = sticky).          |
| `placement`    | `'top-right' \| 'bottom-right' \| top-left \| bottom-left` | `'bottom-right'` | Screen corner container.                 |
| `pauseOnHover` | `boolean`                                                  | `true`           | Pause countdown when hovered.            |

| Event      | Payload                             |
| ---------- | ----------------------------------- |
| `ae-close` | `void` fired when dismissed.        |
| `ae-click` | `MouseEvent` emitted on user click. |

> **Imperative helper**: `showToast({ message, variant, duration })` imported from `@aetherui-kit/toast` inserts a toast element via manager.

## 3 · Accessibility

* Toast element outside normal reading order with `role="status"` (polite) or `role="alert"` (error variant).
  Uses `aria-live="polite|assertive"`, `aria-atomic="true"` to announce full message.
* Focus not stolen; but toast becomes focusable when interactive (`tabindex="0"`) so screen‑reader users can dismiss.

## 4 · Styling & Theming

*(Override hooks only—the component ships a minimal baseline in **`styles.ts`**.)*

### 4.1 Shadow Parts

| Part       | Element              | Notes                           |
| ---------- | -------------------- | ------------------------------- |
| `toast`    | `<div>`              | Main container.                 |
| `icon`     | `<slot name="icon">` | Status glyph (auto or slotted). |
| `content`  | `<span>`             | Message text wrapper.           |
| `close`    | `<button>`           | Optional close (“×”) button.    |
| `progress` | `<div>`              | Animated time‑remaining bar.    |

Example override:

```css
/* Add subtle outline for high‑contrast users */
ae-toast::part(toast) {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
@media (forced-colors: active) {
  ae-toast::part(toast) { outline-color: CanvasText; }
}
```

### 4.2 Design Tokens

| Token                        | Default                      | Purpose                      |
| ---------------------------- | ---------------------------- | ---------------------------- |
| `--ae-toast-bg-info`         | `#e8f4fd`                    | Info background.             |
| `--ae-toast-bg-success`      | `#edf7ed`                    | Success background.          |
| `--ae-toast-bg-warning`      | `#fff8e1`                    | Warning background.          |
| `--ae-toast-bg-error`        | `#fdecea`                    | Error background.            |
| `--ae-toast-fg-*`            | matching text colors         | Foreground text.             |
| `--ae-toast-radius`          | `var(--ae-border-radius-lg)` | Corner rounding.             |
| `--ae-toast-shadow`          | `var(--ae-elevation-4)`      | Elevation shadow.            |
| `--ae-toast-progress-height` | `3px`                        | Progress bar thickness.      |
| `--ae-toast-z-index`         | `1100`                       | Stacking layer above modals. |

### 4.3 `styles.ts` Example

```ts
// packages/toast/src/styles.ts
import { css } from 'lit';

export const toastStyles = css`
  :host { display: block; }

  ::part(toast) {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: var(--ae-toast-radius, 0.5rem);
    box-shadow: var(--ae-toast-shadow, 0 6px 20px rgba(0,0,0,.12));
    background: var(--ae-toast-bg-info, #e8f4fd);
    color: var(--ae-toast-fg-info, #055160);
  }
  :host([variant='success']) ::part(toast) {
    background: var(--ae-toast-bg-success, #edf7ed);
    color: var(--ae-toast-fg-success, #065f46);
  }
  /* warning, error … */

  ::part(progress) {
    position: absolute;
    left: 0;
    bottom: 0;
    height: var(--ae-toast-progress-height, 3px);
    width: 100%;
    background: currentColor;
    transform-origin: left;
    animation: bar var(--ae-toast-duration, 5s) linear forwards;
  }

  @keyframes bar { from { transform: scaleX(1); } to { transform: scaleX(0); } }
`;
```

Consumers may import `toastStyles` to extend with motion preferences.

## 5 · Folder Structure

```text
packages/toast/
├─ src/
│  ├─ ae-toast.ts          # single toast component
│  ├─ toast-manager.ts     # host element that stacks toasts, portals to body
│  ├─ api.ts               # showToast({}) helper
│  └─ styles.ts
└─ index.ts                # barrel + defineAeToast()
```

## 6 · Architecture

* A **singleton manager** creates one container per `placement` and appends `<ae-toast>` children.
* Each toast starts a countdown timer (`duration`) that pauses on hover if `pauseOnHover`.
* Dismiss animation triggers `ae-close`; after animation end, toast removes itself.
* Uses **Lit directives** to animate height collapse for smooth stacking.

## 7 · Performance

* Toast component ≤ 1 KB; manager adds \~0.5 KB. No external deps.
* Only the active timer renders progress via CSS keyframes (no JS every frame).

## 8 · Testing Strategy

* **Unit**: timer behaviour, pauseOnHover, manager queue ordering.
* **Playwright**: stacking across placements, focus traversal, reduced‑motion preference (`prefers-reduced-motion`).
* **axe‑core**: assert `role` and live‑region announcing.

---

*Updated: 2025‑05‑07*
