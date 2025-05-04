# Accordion Component Technical Spec

## 1 · Purpose
A **collapsible disclosure component** that shows or hides content panels one‑to‑one with headers. Supports single‑open and multi‑open modes.

## 2 · Public API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean \| string[]` | `false` | Controlled IDs currently open. |
| `defaultOpen` | `string[]` | `[]` | Uncontrolled initial state. |
| `multiselectable` | `boolean` | `false` | Allow multiple open panels. |

| Event | Payload |
|-------|---------|
| `ae-change` | `{ open: string[] }` |

| Slot / Part | Purpose |
|-------------|---------|
| `header` *(part)* | Clickable header button. |
| `panel` *(part)* | Content region. |

## 3 · Accessibility
* WAI‑ARIA Disclosure pattern (`role="button"`, `aria-expanded`, `aria-controls`).
* Panel `role="region"`, labelled by header `id`.
* Keyboard: `Enter`/`Space` toggle, arrow keys navigate headers.

## 4 · Styling Best Practices
```css
/* Icon rotation */
ae-accordion::part(header-icon) {
  transition: transform 160ms linear;
}
ae-accordion[open]::part(header-icon) {
  transform: rotate(90deg);
}
```
Use tokens like `--ae-accordion-border`.

## 5 · Folder Structure
```text
packages/accordion/
├─ src/
│  ├─ ae-accordion.ts
│  ├─ styles.ts
│  └─ utils.ts
└─ index.ts
```

## 6 · Performance Budget
≤ 1 KB gzip over core bundle.

---
*Updated: 2025-05-03*
