# TreeView Component Technical Spec

## 1 · Purpose

Hierarchical navigation control with expand/collapse, keyboard roving, and optional multi‑select—suitable for file explorers or nested menus.

## 2 · Public API

| Prop            | Type                     | Default    | Description                                        |
| --------------- | ------------------------ | ---------- | -------------------------------------------------- |
| `data`          | `TreeNode[]`             | `[]`       | Nodes `{ id, label, children? }` (uncontrolled).   |
| `expanded`      | `string[]`               | `[]`       | Controlled list of expanded IDs.                   |
| `selectionMode` | `'single' \| 'multiple'` | `'single'` | Allow one or many selected items.                  |
| `selected`      | `string[]`               | `[]`       | Controlled selected IDs (honours `selectionMode`). |
| `indentSize`    | `number`                 | `16`       | Pixels to indent each depth level.                 |

| Event                | Payload                  |
| -------------------- | ------------------------ |
| `ae-treeview-select` | `{ selected: string[] }` |
| `ae-treeview-expand` | `{ expanded: string[] }` |

## 3 · Accessibility

* Root gets `role="tree"` and `tabindex="0"` for the roving container.
* Each node has `role="treeitem"`, `aria-level`, `aria-expanded` (if branch), `aria-selected` (if selectable).
* **Keyboard**: Arrow keys navigate; `Home`, `End`, `*` (expand all siblings) per WAI‑ARIA TreeView pattern.

## 4 · Styling & Theming

### 4.1 Shadow Parts

| Part Name | Element                 | Notes                        |
| --------- | ----------------------- | ---------------------------- |
| `node`    | `<div role="treeitem">` | Focusable row for each item. |
| `caret`   | `<span>`                | Toggle icon wrapper.         |
| `label`   | `<span>`                | Text label.                  |
| `subtree` | `<div role="group">`    | Child container; indented.   |

Example override:

```css
/* Change caret icon colour when node is expanded */
ae-treeview::part(caret)[aria-expanded="true"] {
  color: var(--ae-treeview-caret-open, currentColor);
}
```

### 4.2 Design Tokens

| Token                           | Default                     | Purpose                  |
| ------------------------------- | --------------------------- | ------------------------ |
| `--ae-treeview-indent`          | `16px`                      | Pixel indent per depth.  |
| `--ae-treeview-caret-size`      | `12px`                      | Caret icon size.         |
| `--ae-treeview-row-hover-bg`    | `var(--ae-color-base-50)`   | Hover background.        |
| `--ae-treeview-row-selected-bg` | `var(--ae-color-brand-100)` | Selected row background. |
| `--ae-treeview-row-selected-fg` | `var(--ae-color-brand-900)` | Selected text colour.    |

Token override example:

```css
:root[data-theme="dark"] {
  --ae-treeview-row-hover-bg: rgba(255,255,255,0.05);
}
```

### 4.3 `styles.ts` Example

```ts
// packages/treeview/src/styles.ts
import { css } from 'lit';

export const treeviewStyles = css`
  :host { display: block; }

  ::part(node) {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 0.25rem;
    cursor: pointer;
    user-select: none;
  }
  ::part(node):hover {
    background: var(--ae-treeview-row-hover-bg, #f3f4f6);
  }
  ::part(node)[aria-selected="true"] {
    background: var(--ae-treeview-row-selected-bg, #e0e7ff);
    color: var(--ae-treeview-row-selected-fg, #3730a3);
  }
  ::part(caret) {
    width: var(--ae-treeview-caret-size, 12px);
    height: var(--ae-treeview-caret-size, 12px);
    transition: transform 120ms ease;
  }
  ::part(caret)[aria-expanded="true"] {
    transform: rotate(90deg);
  }
  ::part(subtree) {
    margin-left: var(--ae-treeview-indent, 16px);
  }
`;
```

Consumers may import `treeviewStyles` and extend via Lit’s `unsafeCSS`.

## 5 · Folder Structure

```text
packages/treeview/
├─ src/
│  ├─ ae-treeview.ts      # main Lit component
│  ├─ node.ts             # recursive node template
│  ├─ styles.ts           # css tagged template (above)
│  └─ keyboard.ts         # roving tabindex controller
└─ index.ts               # barrel + defineAeTreeView()
```

## 6 · Performance

* Render up to 1 000 nodes < 30 ms mount time.
* Virtualisation roadmap: integrate `lit-virtualizer` for large trees.

## 7 · Testing

* **Unit**: expansion logic, roving index updates.
* **Playwright**: keyboard traversal, focus outline, high‑contrast mode.
* **axe‑core**: verify `aria-level`, `aria-expanded` values.

---

*Updated: 2025-05-09*
