# Radio & RadioGroup Technical Spec

## 1 · Purpose

Mutually exclusive option selection.

## 2 · Components

| Tag                | Description                             |
| ------------------ | --------------------------------------- |
| `<ae-radio>`       | Single radio option.                    |
| `<ae-radio-group>` | Groups radios, manages roving tabindex. |

## 3 · Public API

### RadioGroup Props

| Prop          | Type                         | Default      | Description          |
| ------------- | ---------------------------- | ------------ | -------------------- |
| `value`       | `string`                     | `''`         | Selected value.      |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Arrow key behaviour. |

### Events

| Event       | Payload             |
| ----------- | ------------------- |
| `ae-change` | `{ value: string }` |

## 4 · Accessibility

- Group `role="radiogroup"`, each radio `role="radio"`.
- Roving tabindex for keyboard.

## 5 · Styling

Parts: `control`, `label`, `indicator`.

## 6 · Folder

```
packages/radio/
├─ src/ae-radio.ts
├─ src/ae-radio-group.ts
└─ ...
```

## 7 · Performance & Tests

Similar to Checkbox but with roving tabindex tests.

---

_Updated: {{date}}_
