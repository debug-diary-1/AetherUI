# @aetherui/accordion

A Lit-based accordion component for AetherUI.

## Installation

```bash
pnpm add @aetherui/accordion
```

## Usage

```html
<ae-accordion>
  <ae-accordion-panel heading="Section 1"> Content for section 1 </ae-accordion-panel>
  <ae-accordion-panel heading="Section 2"> Content for section 2 </ae-accordion-panel>
</ae-accordion>
```

## API

### `<ae-accordion>`

| Attribute         | Type      | Default | Description                                 |
| ----------------- | --------- | ------- | ------------------------------------------- |
| `multiselectable` | `boolean` | `false` | Whether multiple panels can be open at once |
| `defaultOpen`     | `boolean` | `false` | Whether panels are open by default          |

### `<ae-accordion-panel>`

| Attribute | Type      | Default | Description                    |
| --------- | --------- | ------- | ------------------------------ |
| `heading` | `string`  | `''`    | The heading text for the panel |
| `open`    | `boolean` | `false` | Whether the panel is open      |

## Events

### `<ae-accordion>`

| Event       | Description                   |
| ----------- | ----------------------------- |
| `ae-toggle` | Fired when a panel is toggled |

### `<ae-accordion-panel>`

| Event       | Description                     |
| ----------- | ------------------------------- |
| `ae-toggle` | Fired when the panel is toggled |

## Development

```bash
pnpm dev
```

## Building

```bash
pnpm build
```

## Testing

```bash
pnpm test
```

## License

MIT
