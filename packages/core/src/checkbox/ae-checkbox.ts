import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { checkboxStyles } from './styles';

/**
 * A checkbox input component with support for checked, unchecked, and indeterminate states.
 * Participates in native form submission via ElementInternals API.
 *
 * @element ae-checkbox
 *
 * @property {boolean} checked - Whether the checkbox is checked
 * @property {boolean} defaultChecked - Initial checked state for uncontrolled usage
 * @property {boolean} indeterminate - Whether the checkbox is in an indeterminate state
 * @property {boolean} disabled - Whether the checkbox is disabled
 * @property {boolean} required - Whether the checkbox is required
 * @property {string} name - The name attribute for form submission
 * @property {string} value - The value attribute for form submission
 *
 * @fires {CustomEvent<{checked: boolean, indeterminate: boolean}>} ae-checkbox-change - Fired when the checkbox state changes
 *
 * @slot - The checkbox label content
 *
 * @csspart base - The component's base wrapper (label element)
 * @csspart input - The native checkbox input element
 * @csspart control - The custom checkbox control container
 * @csspart icon - The checkmark icon
 * @csspart indeterminate-icon - The indeterminate state icon
 * @csspart label - The label text container
 *
 * @cssproperty --ae-checkbox-size - The size of the checkbox control
 * @cssproperty --ae-checkbox-radius - The border radius of the checkbox
 * @cssproperty --ae-checkbox-border - The border style of the checkbox
 * @cssproperty --ae-checkbox-bg - The background color of the checkbox
 * @cssproperty --ae-checkbox-bg-checked - The background color when checked
 * @cssproperty --ae-checkbox-bg-hover - The background color on hover
 * @cssproperty --ae-checkbox-fg - The checkmark color
 * @cssproperty --ae-checkbox-gap - The gap between checkbox and label
 *
 * @example
 * ```html
 * <ae-checkbox name="terms">Accept terms and conditions</ae-checkbox>
 *
 * <ae-checkbox checked name="subscribe" value="yes">Subscribe to newsletter</ae-checkbox>
 *
 * <ae-checkbox indeterminate>Select all</ae-checkbox>
 * ```
 */
@customElement('ae-checkbox')
export class AeCheckbox extends LitElement {
  static styles = checkboxStyles;
  static formAssociated = true;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: Boolean, reflect: true })
  accessor checked = false;

  @property({ type: Boolean, attribute: 'default-checked' })
  accessor defaultChecked = false;

  @property({ type: Boolean, reflect: true })
  accessor indeterminate = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: Boolean, reflect: true })
  accessor required = false;

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor value = 'on';

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
    this._internals.role = 'checkbox';
    this._internals.ariaChecked = String(this.checked);
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('checked') || changedProperties.has('indeterminate')) {
      this._updateFormValue();
      this._updateValidity();
      this._internals.ariaChecked = this.indeterminate ? 'mixed' : String(this.checked);
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
      this._internals.setValidity(
        { valueMissing: true },
        'Please check this box if you want to proceed.',
        this,
      );
    }
  }

  private handleChange(event: Event) {
    event.preventDefault(); // Prevent native checkbox behavior

    if (this.disabled) return;

    // Mark as no longer pristine
    this.pristine = false;

    // Toggle checked state
    this.checked = !this.checked;
    this.indeterminate = false; // Clicking clears the indeterminate state

    // Dispatch change event
    this.dispatchEvent(
      new CustomEvent('ae-checkbox-change', {
        detail: {
          checked: this.checked,
          indeterminate: this.indeterminate,
        },
        bubbles: true,
        composed: true,
      }),
    );
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
    this.indeterminate = false;
    this.pristine = true;
    this._updateFormValue();
    this._updateValidity();
  }

  formStateRestoreCallback(state: string | null, _mode: 'restore' | 'autocomplete') {
    this.checked = state === this.value;
    this._updateFormValue();
    this._updateValidity();
  }

  // Public method to check validity
  checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  // Public method to report validity
  reportValidity(): boolean {
    return this._internals.reportValidity();
  }

  render() {
    return html`
      <label part="base" class="checkbox-label" ?aria-disabled="${this.disabled}">
        <input
          part="input"
          type="checkbox"
          class="checkbox-input"
          .checked="${this.checked}"
          .indeterminate="${this.indeterminate}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @change="${this.handleChange}"
          @keydown="${this.handleKeyDown}"
          aria-hidden="true"
        />

        <span part="control" class="checkbox-control">
          ${this.indeterminate
            ? html`
                <svg part="indeterminate-icon" class="indeterminate-icon" viewBox="0 0 16 16">
                  <rect x="3" y="7" width="10" height="2" fill="currentColor" />
                </svg>
              `
            : this.checked
              ? html`
                  <svg part="icon" class="checkbox-icon" viewBox="0 0 16 16">
                    <polyline
                      points="3,8 6,11 13,4"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                `
              : null}
        </span>

        <span part="label" class="checkbox-label-text">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-checkbox': AeCheckbox;
  }
}
