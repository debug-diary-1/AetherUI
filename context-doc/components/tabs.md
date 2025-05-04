# Tabs Component Technical Spec

## 1 · Purpose

Horizontal / vertical tabbed navigation, lazy‑loads panel content.

## 2 · Public API

| Prop          | Type           | Default      | Description    |                              |
| ------------- | -------------- | ------------ | -------------- | ---------------------------- |
| `value`       | `string`       | first tab    | Active tab id. |                              |
| `orientation` | \`'horizontal' | 'vertical'\` | `'horizontal'` | Keyboard arrows.             |
| `activation`  | \`'auto'       | 'manual'\`   | `'auto'`       | Auto focus vs manual select. |

| Event       | Payload             |
| ----------- | ------------------- |
| `ae-change` | `{ value: string }` |

\| Parts | `tablist`, `tab`, `panel` |

## 3 · Accessibility

* Implements APG Tabs pattern.
* `role="tablist"`, `role="tab"`, `role="tabpanel"`.

## 4 · Styling

Token `--ae-tabs-indicator-color`.

## 5 · Folder

```
packages/tabs/
├─ src/ae-tabs.ts
├─ src/ae-tab.ts
├─ src/ae-tab-panel.ts
└─ ...
```

## 6 · Performance

* Virtualize off‑screen panels (optional future).

## 7 · Tests

Keyboard arrow navigation, manual activation.

---

*Updated: {{date}}*
