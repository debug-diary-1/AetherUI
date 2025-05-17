# Tooltip Component Technical Spec

## 1 · Purpose

Lightweight **hover / focus hint** that reveals contextual information without stealing focus. Positions itself relative to the anchor via **@floating‑ui**, supports delay, arrow, and accessibility with `aria-describedby`.

## 2 · Public API

| Prop         | Type                                                       | Default      | Description                                 |
| ------------ | ---------------------------------------------------------- | ------------ | ------------------------------------------- |
| `text`       | `string`                                                   | `''`         | Plain‑text message (slot for rich content). |
| `open`       | `boolean`                                                  | `false`      | Controlled visibility (for manual mode).    |
| `hoverDelay` | `number`                                                   | `100`        | ms before showing on hover/focus.           |
| `hideDelay`  | `number`                                                   | `100`        | ms before hiding on mouse‑leave/blur.       |
| `placement`  | `'top' \| 'bottom' \| 'left' \| 'right'` (+ `-start/-end`) | `'top'`      | Preferred position.                         |
| `strategy`   | `'absolute' \| 'fixed'`                                    | `'absolute'` | @floating‑ui strategy.                      |
| `disabled`   | `boolean`                                                  | `false`      | Bypass all interaction.                     |

| Event            | Payload                                                |
| ---------------- | ------------------------------------------------------ |
| `ae-open-change` | `{ open: boolean }` fires whenever visibility toggles. |

## 3 · Accessibility

* Tooltip container has `role="tooltip"`.
* Component manages `aria-describedby` on the anchor when shown.
* Keyboard: `focus` shows, `blur` hides; **Esc** hides if manually triggered.
* High‑contrast mode keeps sufficient color ratio.

## 4 · Styling & Theming

*(Override hooks only — baseline lives in `styles.ts`.)*

### 4.1 Shadow Parts

| Part      | Element  | Notes                                                            |
| --------- | -------- | ---------------------------------------------------------------- |
| `overlay` | `<div>`  | Positioned wrapper.                                              |
| `arrow`   | `<div>`  | Small triangle; rotated & positioned by @floating‑ui middleware. |
| `content` | `<span>` | Text/HTML container.                                             |

Example override:

```css
/* Larger arrow for branding */
ae-tooltip::part(arrow) {
  width: 10px;
  height: 10px;
}
```

### 4.2 Design Tokens

| Token                    | Default                     | Purpose           |
| ------------------------ | --------------------------- | ----------------- |
| `--ae-tooltip-bg`        | `#111`                      | Background color. |
| `--ae-tooltip-fg`        | `#fff`                      | Text color.       |
| `--ae-tooltip-radius`    | `4px`                       | Corner rounding.  |
| `--ae-tooltip-shadow`    | `0 2px 8px rgba(0,0,0,.15)` | Elevation.        |
| `--ae-tooltip-padding`   | `0.375rem 0.5rem`           | Internal padding. |
| `--ae-tooltip-z-index`   | `1200`                      | Stacking layer.   |
| `--ae-tooltip-font-size` | `0.8125rem`                 | Font size (13px). |

Dark theme might only adjust the shadow hue; base colors already dark.

### 4.3 `styles.ts` Example

```ts
// packages/tooltip/src/styles.ts
import { css } from 'lit';

export const tooltipStyles = css`
  :host { position: fixed; inset: 0; pointer-events: none; }

  ::part(overlay) {
    background: var(--ae-tooltip-bg, #111);
    color: var(--ae-tooltip-fg, #fff);
    padding: var(--ae-tooltip-padding, 0.375rem 0.5rem);
    border-radius: var(--ae-tooltip-radius, 4px);
    font-size: var(--ae-tooltip-font-size, 0.8125rem);
    box-shadow: var(--ae-tooltip-shadow, 0 2px 8px rgba(0,0,0,.15));
    max-width: 20rem;
    pointer-events: none;
  }

  ::part(arrow) {
    width: 8px;
    height: 8px;
    background: inherit;
    transform: rotate(45deg);
  }
`;
```

Consumers can import `tooltipStyles` and add brand animation via extra CSS.

## 5 · Folder Structure

```text
packages/tooltip/
├─ src/
│  ├─ ae-tooltip.ts     # main component (controller + template)
│  ├─ styles.ts         # css (above)
│  ├─ middleware.ts     # arrow, offset, flip helpers
└─ index.ts             # barrel + defineAeTooltip()
```

## 6 · Architecture

* Uses **LitElement** + reactive props `open`, timers for hoverDelay/hideDelay.
* @floating‑ui `autoUpdate` keeps position on scroll/resizes.
* Arrow placed using `arrow()` middleware.
* Provides imperative method `show()`/`hide()` for manual control.

## 7 · Performance

* Bundle ≤ 2 KB + dynamic `@floating-ui` import on first show (≈4 KB).
* Overlay only attached to DOM when shown; removed on hide.

## 8 · Testing Strategy

* **Unit**: delay timers, open/close API, aria-describedby toggle.
* **Playwright**: hover/focus behaviour, placement near viewport edges.
* **axe‑core**: ensure tooltip content announced, contrast ratios.

---

*Updated: 2025‑05‑07*
