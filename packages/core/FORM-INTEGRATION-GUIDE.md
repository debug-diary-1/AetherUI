# Form Integration Guide for AetherUI

## Current State
AetherUI form components (checkbox, radio, etc.) currently don't participate in native form submission. They use a shadow DOM approach which prevents native form integration.

## Recommendation: ElementInternals API

For components that need to participate in forms, we should implement the ElementInternals API.

### Example Implementation

```typescript
@customElement('ae-checkbox')
export class AeCheckbox extends LitElement {
  static formAssociated = true;

  @property({ type: Boolean, reflect: true })
  accessor checked = false;

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor value = 'on';

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateFormValue();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('checked') || changedProperties.has('value')) {
      this._updateFormValue();
    }
  }

  private _updateFormValue() {
    if (this.checked) {
      this._internals.setFormValue(this.value);
    } else {
      this._internals.setFormValue(null);
    }
  }

  // Form lifecycle callbacks
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.checked = this.hasAttribute('checked');
  }

  formStateRestoreCallback(state: string) {
    this.checked = state === this.value;
  }
}
```

## Benefits

1. **Native Form Participation**: Components work with `<form>` elements
2. **Form Validation**: Built-in constraint validation API
3. **Form Data**: Automatic inclusion in FormData
4. **Accessibility**: Better screen reader support
5. **Progressive Enhancement**: Works without JavaScript

## Components That Need Form Integration

- [x] ae-checkbox
- [ ] ae-radio / ae-radio-group  
- [ ] ae-input (future)
- [ ] ae-select (future)
- [ ] ae-textarea (future)

## Alternative: Light DOM Approach

For maximum compatibility, consider a light DOM approach where form controls are slotted:

```html
<ae-checkbox>
  <input type="checkbox" slot="input" />
  <span slot="label">Accept terms</span>
</ae-checkbox>
```

This ensures form participation works everywhere but requires more setup from consumers.

## Browser Support

ElementInternals is supported in all modern browsers:
- Chrome 77+
- Firefox 98+
- Safari 16.4+
- Edge 79+

For older browsers, a polyfill is available.