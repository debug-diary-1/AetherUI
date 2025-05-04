# Button Component Technical Spec

## 1 · Purpose
Primary action trigger with variants and sizes.

## 2 · Public API
| Prop | Type | Default |
|------|------|---------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` |
| `size`    | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `disabled`| `boolean` | `false` |

## 3 · Accessibility
If `icon‑only`, consumer must set `aria-label`.

## 4 · Styling
Override via CSS vars first, `::part(base)` second.

## 5 · Folder
```text
packages/button/
└─ src/ae-button.ts
```

---
*Updated: 2025-05-03*
