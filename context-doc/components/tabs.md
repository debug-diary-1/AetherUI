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

## 4 · Styling & Theming

### 4.1 Shadow Parts

| Part Name | Element                     | Notes                                                     |
| --------- | --------------------------- | --------------------------------------------------------- |
| `tablist` | `<div role="tablist">`      | Flex container for tabs; controls orientation.            |
| `tab`     | `<button role="tab">`       | Individual clickable tab; receives `aria-selected`.       |
| `panel`   | `<section role="tabpanel">` | Content area; lazily rendered if `activation==='manual'`. |

You can style any inner element via `::part()` without piercing Shadow DOM internals:

```css
/* 1px colored border beneath active tab */
ae-tabs::part(tab)[aria-selected="true"] {
  border-bottom: 2px solid var(--ae-tabs-indicator-color, currentColor);
}
```

### 4.2 Design Tokens

| Token                       | Default             | Purpose                               |
| --------------------------- | ------------------- | ------------------------------------- |
| `--ae-tabs-indicator-color` | `currentColor`      | Active tab underline / bottom border. |
| `--ae-tabs-gap`             | `var(--ae-space-4)` | Horizontal space between tabs.        |
| `--ae-tabs-padding-x`       | `var(--ae-space-3)` | Inline padding inside each tab.       |
| `--ae-tabs-padding-y`       | `var(--ae-space-2)` | Block padding inside each tab.        |

Override at the app or theme layer:

```css
:root[data-theme="dark"] {
  --ae-tabs-indicator-color: var(--ae-color-brand-primary-dark);
}
```

### 4.3 `styles.ts` Example

`styles.ts` centralises defaults so both the component and consumers can import them:

```ts
// packages/tabs/src/styles.ts
import { css } from 'lit';

export const tabStyles = css`
  :host {
    display: block;
  }

  ::part(tablist) {
    display: flex;
    gap: var(--ae-tabs-gap, 1rem);
  }

  ::part(tab) {
    background: transparent;
    padding: var(--ae-tabs-padding-y, 0.25rem) var(--ae-tabs-padding-x, 0.75rem);
    border: none;
    cursor: pointer;
    font: inherit;
  }

  ::part(tab)[aria-selected="true"] {
    border-bottom: 2px solid var(--ae-tabs-indicator-color, currentColor);
  }
`;
```

Consumers who need to completely override visuals can import and extend:

```ts
import { tabStyles as base } from '@aetherui/tabs/styles.js';
```

## 5 · Folder · Folder

```
packages/tabs/
├─ src/
│  ├─ ae-tabs.ts         # root container component
│  ├─ ae-tab.ts          # individual tab button
│  ├─ ae-tab-panel.ts    # panel wrapper
│  └─ styles.ts          # exported `css` tagged template with parts & tokens
└─ index.ts              # barrel + defineAeTabs()
```

## 6 · Performance

* Virtualize off‑screen panels (optional future).

## 7 · Tests

Keyboard arrow navigation, manual activation.

---

*Updated: {{date}}*

What about the styles.ts? 
