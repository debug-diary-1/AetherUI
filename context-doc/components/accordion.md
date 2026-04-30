# Accordion Component Technical Spec

## 1 · Purpose

A **collapsible disclosure component** that shows or hides content panels one‑to‑one with headers. Supports single‑open and multi‑open modes.

## 2 · Public API

| Prop              | Type                  | Default | Description                                |
| ----------------- | --------------------- | ------- | ------------------------------------------ |
| `open`            | `boolean \| string[]` | `false` | Accordion IDs that are open (controlled).  |
| `defaultOpen`     | `string[]`            | `[]`    | Initial open panels (uncontrolled).        |
| `multiselectable` | `boolean`             | `false` | Allow multiple panels open simultaneously. |

| Event       | Payload              |
| ----------- | -------------------- |
| `ae-change` | `{ open: string[] }` |

| Slot / Part       | Purpose                  |
| ----------------- | ------------------------ |
| `header` *(part)* | Clickable header button. |
| `panel` *(part)*  | Content region.          |

## 3 · Accessibility

* Follows **WAI‑ARIA Disclosure** pattern.
* Header gets `role="button"` + `aria-expanded` + `aria-controls`.
* Panel gets `id` and `role="region"`.
* Keyboard: `Enter`/`Space` toggle, `ArrowUp/Down` navigate headers.

## 4 · Styling Best Practices

```css
/* Icon rotation */
ae-accordion::part(header-icon) {
  transition: transform 160ms linear;
}
ae-accordion[open]::part(header-icon) {
  transform: rotate(90deg);
}
```

* Prefer design tokens: `--ae-accordion-border`, `--ae-accordion-duration`.

## 5 · Folder Structure

```
packages/accordion/
├─ src/
│  ├─ ae-accordion.ts        # LitElement class
│  ├─ styles.ts              # export const styles
│  └─ utils.ts               # header registration helpers
├─ __tests__/                # Vitest unit tests
├─ stories/                  # Storybook stories
└─ index.ts                  # re‑export + defineAccordion()
```

## 6 · Architecture Notes

* Composition of child `<ae-collapse-panel>` elements managed by controller.
* State stored as `Set<string>`; Lit reactive property triggers render cycle.
* Uses `requestUpdate()` throttling to avoid layout thrash when many panels.

## 7 · Performance Budget

* Incremental cost ≤ 1 KB gzip over `@aetherui/core`.

## 8 · Testing Strategy

* **Unit**: toggle logic, keyboard events.
* **Playwright**: visual diff (open/closed), focus rings.
* **axe‑core**: zero violations baseline.

---

*Updated: {{date}}*
