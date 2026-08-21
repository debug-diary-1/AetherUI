# `@aetherui/accordion`

Compatibility package for the AetherUI accordion custom elements. Importing the package registers both `ae-accordion` and `ae-accordion-item`.

## Installation

```bash
pnpm add @aetherui/accordion
```

The components include usable system-color fallbacks. For the complete AetherUI theme, also install `@aetherui/tokens` and import either `@aetherui/tokens/light.css` or `@aetherui/tokens/dark.css` once in your application.

## Usage

```html
<script type="module">
  import '@aetherui/accordion';
</script>

<ae-accordion value='["first"]'>
  <ae-accordion-item header-id="first">
    <span slot="header">Section 1</span>
    Content for section 1
  </ae-accordion-item>
  <ae-accordion-item header-id="second">
    <span slot="header">Section 2</span>
    Content for section 2
  </ae-accordion-item>
</ae-accordion>
```

`ae-accordion` supports `value`, `defaultValue`, and `multiselectable`. The compatibility aliases `expanded`, `headerid`, and `ae-expand-change` remain available for applications using the original standalone API. State changes emit `ae-accordion-change`; items emit `ae-accordion-item-change` and `ae-panel-change` for both user and programmatic changes.

## License

MIT
