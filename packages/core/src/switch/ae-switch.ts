import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { switchStyles } from './styles';

/**
 * A toggle switch component for boolean on/off states.
 * Participates in native form submission via ElementInternals API.
 *
 * @element ae-switch
 *
 * @property {boolean} checked - Whether the switch is checked
 * @property {boolean} defaultChecked - Initial checked state for uncontrolled usage
 * @property {boolean} disabled - Whether the switch is disabled
 * @property {boolean} required - Whether the switch is required
 * @property {string} name - The name attribute for form submission
 * @property {string} value - The value attribute for form submission
 * @property {string} size - The size of the switch (sm, md, lg)
 *
 * @fires {CustomEvent<{checked: boolean}>} ae-switch-change - Fired when the switch state changes
 *
 * @slot - The switch label content
 *
 * @csspart base - The component's base wrapper (label element)
 * @csspart input - The native checkbox input element
 * @csspart control - The switch control container
 * @csspart thumb - The switch thumb element
 * @csspart label - The label text container
 *
 * @example
 * ```html
 * <ae-switch name="notifications">Enable notifications</ae-switch>
 * <ae-switch checked name="darkmode" value="enabled">Dark mode</ae-switch>
 * <ae-switch size="lg" disabled>Large disabled switch</ae-switch>
 * ```
 */
@customElement('ae-switch')
export class AeSwitch extends LitElement {
  static styles = switchStyles;
  static formAssociated = true;

  @property({ type: Boolean, reflect: true })
  accessor checked = false;

  @property({ type: Boolean, attribute: 'default-checked' })
  accessor defaultChecked = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: Boolean, reflect: true })
  accessor required = false;

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor value = 'on';

  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' = 'md';

  @state()
  private accessor pristine = true;

  private _internals: ElementInternals;
  private _defaultChecked = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();

    // Store the initial checked state for form reset
    this._defaultChecked = this.checked || this.defaultChecked || this.hasAttribute('checked');
    if (this._defaultChecked && !this.checked) {
      this.checked = true;
    }

    // Set initial form value
    this._updateFormValue();

    // Set ARIA role
    this._internals.role = 'switch';
    this._internals.ariaChecked = String(this.checked);
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('checked')) {
      this._updateFormValue();
      this._updateValidity();
      this._internals.ariaChecked = String(this.checked);
    }

    if (changedProperties.has('disabled')) {
      this._internals.ariaDisabled = String(this.disabled);
    }

    if (changedProperties.has('required')) {
      this._internals.ariaRequired = String(this.required);
      this._updateValidity();
    }
  }

  private _updateFormValue() {
    if (this.checked) {
      this._internals.setFormValue(this.value);
    } else {
      this._internals.setFormValue(null);
    }
  }

  private _updateValidity() {
    // Reset validity first
    this._internals.setValidity({});

    // Check required validation
    if (this.required && !this.checked) {
      const input = this.shadowRoot?.querySelector('input');
      this._internals.setValidity(
        { valueMissing: true },
        'Please toggle this switch if you want to proceed.',
        input || undefined
      );
    }
  }

  private handleChange(event: Event) {
    event.preventDefault();

    if (this.disabled) return;

    // Mark as no longer pristine
    this.pristine = false;

    // Toggle checked state
    this.checked = !this.checked;

    // Dispatch change event
    this.dispatchEvent(new CustomEvent('ae-switch-change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true,
    }));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.handleChange(event);
    }
  }

  // Form-associated callbacks
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.checked = this._defaultChecked;
    this.pristine = true;
    this._updateFormValue();
    this._updateValidity();
  }

  formStateRestoreCallback(state: string | null, _mode: 'restore' | 'autocomplete') {
    this.checked = state === this.value;
    this._updateFormValue();
    this._updateValidity();
  }

  // Public methods
  public checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  public reportValidity(): boolean {
    return this._internals.reportValidity();
  }

  render() {
    return html`
      <label
        part="base"
        class="switch-label"
        ?aria-disabled="${this.disabled}"
      >
        <input
          part="input"
          type="checkbox"
          class="switch-input"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @change="${this.handleChange}"
          @keydown="${this.handleKeyDown}"
          tabindex="${this.disabled ? '-1' : '0'}"
          aria-hidden="true"
        />

        <span part="control" class="switch-control">
          <span part="thumb" class="switch-thumb"></span>
        </span>

        <span part="label" class="switch-label-text">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-switch': AeSwitch;
  }
}
