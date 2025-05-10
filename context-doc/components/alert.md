# Alert Component Technical Spec

## 1 · Purpose

Non-modal, in-flow banner component for displaying status messages or notifications with optional dismiss button.

## 2 · Public API

| Prop          | Type                                           | Default | Description                                 |
| ------------- | ---------------------------------------------- | ------- | ------------------------------------------- |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'error'`  | `'info'`| Visual theme of the alert                  |
| `closable`    | `boolean`                                      | `false` | Whether the alert can be closed with a button |
| `open`        | `boolean`                                      | `true`  | Controls the visibility of the alert        |

| Event             | Payload                |
| ----------------- | ---------------------- |
| `ae-alert-close`  | `{}`                   |

## 3 · Accessibility

* Uses `role="alert"` for warning and error variants (assertive announcements)
* Uses `role="status"` for info and success variants (polite announcements)
* Close button has `aria-label="Close"` for screen readers
* Default icons are presentational and do not interfere with screen readers

## 4 · Styling & Theming

### 4.1 Shadow Parts

| Part               | Element           | Notes                         |
| ------------------ | ----------------- | ----------------------------- |
| `base`             | `<section>`       | Container element             |
| `icon`             | Icon container    | Default or custom icon        |
| `content`          | `<div>`           | Text content container        |
| `close`            | `<button>`        | Close button (when closable)  |

### 4.2 Design Tokens

| Token                       | Default   | Purpose                      |
| --------------------------- | --------- | ---------------------------- |
| `--ae-alert-padding`        | `1rem`    | Padding around the alert     |
| `--ae-alert-radius`         | `0.375rem`| Border radius of the alert   |
| `--ae-alert-bg-info`        | `#e8f4fd` | Info background color        |
| `--ae-alert-fg-info`        | `#055160` | Info text color              |
| `--ae-alert-bg-success`     | `#edf7ed` | Success background color     |
| `--ae-alert-fg-success`     | `#065f46` | Success text color           |
| `--ae-alert-bg-warning`     | `#fff8e1` | Warning background color     |
| `--ae-alert-fg-warning`     | `#7a4d00` | Warning text color           |
| `--ae-alert-bg-error`       | `#fdecea` | Error background color       |
| `--ae-alert-fg-error`       | `#b71c1c` | Error text color             |
| `--ae-space-3`              | `0.75rem` | Gap between elements         |

## 5 · Folder Structure

```text
packages/core/src/alert/
├─ __tests__/
│  └─ ae-alert.test.ts         # unit tests
├─ ae-alert.ts                 # component class
├─ styles.ts                   # component styles
└─ index.ts                    # exports and event types
```

## 6 · Architecture

* Lit component with reactive props for `variant`, `closable`, and `open`
* Conditional rendering based on `open` state
* Default icons that can be overridden with custom icons via slot
* Semantic role selection based on `variant` for proper accessibility
* Event emission when alert is closed

## 7 · Performance

* Lightweight, stateless component
* Conditionally renders nothing when `open` is false
* Efficient updates with minimal DOM changes

## 8 · Testing Strategy

* **Unit tests**: Verify default values, variant rendering, closable behavior
* **Event tests**: Verify that close event is emitted correctly
* **Accessibility**: Proper ARIA roles based on variant
* **Styling**: CSS properties applied correctly based on variant

---

*Updated: 2024-05-09*