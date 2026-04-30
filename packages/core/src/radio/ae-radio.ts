import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { radioStyles } from './styles';

/**
 * A radio button input component that participates in native form submission.
 * Should be used within an ae-radio-group for proper grouping.
 *
 * @element ae-radio
 *
 * @property {boolean} checked - Whether the radio is checked
 * @property {boolean} disabled - Whether the radio is disabled
 * @property {string} name - The name attribute for form submission
 * @property {string} value - The value attribute for form submission
 *
 * @fires {CustomEvent<{checked: boolean, value: string}>} ae-radio-change - Fired when the radio state changes
 *
 * @slot - The radio label content
 *
 * @csspart base - The component's base wrapper (label element)
 * @csspart input - The native radio input element
 * @csspart control - The custom radio control container
 * @csspart dot - The radio dot indicator
 * @csspart label - The label text container
 *
 * @cssproperty --ae-radio-size - The size of the radio control
 * @cssproperty --ae-radio-border - The border style of the radio
 * @cssproperty --ae-radio-bg - The background color of the radio
 * @cssproperty --ae-radio-bg-checked - The background color when checked
 * @cssproperty --ae-radio-bg-hover - The background color on hover
 * @cssproperty --ae-radio-fg - The dot color
 * @cssproperty --ae-radio-gap - The gap between radio and label
 *
 * @example
 * ```html
 * <ae-radio-group name="options">
 *   <ae-radio value="1">Option 1</ae-radio>
 *   <ae-radio value="2">Option 2</ae-radio>
 *   <ae-radio value="3">Option 3</ae-radio>
 * </ae-radio-group>
 * ```
 */
@customElement('ae-radio')
export class AeRadio extends LitElement {
  static styles = radioStyles;
  static formAssociated = true;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: Boolean, reflect: true })
  accessor checked = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor value = '';

  @query('[part="control"]')
  private control?: HTMLElement;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();

    // Set initial form value
    this._updateFormValue();

    // Set ARIA role
    this._internals.role = 'radio';
    this._internals.ariaChecked = String(this.checked);
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('checked')) {
      this._updateFormValue();
      this._internals.ariaChecked = String(this.checked);

      // If checked, uncheck other radios in the same group
      if (this.checked && this.name) {
        this._uncheckOthers();
      }
    }

    if (changedProperties.has('disabled')) {
      this._internals.ariaDisabled = String(this.disabled);
    }
  }

  private _updateFormValue() {
    if (this.checked) {
      this._internals.setFormValue(this.value);
    } else {
      this._internals.setFormValue(null);
    }
  }

  private _uncheckOthers() {
    const form = this.closest('form');
    const root = form || this.getRootNode();

    // Find all radios with the same name
    const radios =
      root instanceof DocumentFragment || root instanceof Document || root instanceof Element
        ? (Array.from(root.querySelectorAll(`ae-radio[name="${this.name}"]`)) as AeRadio[])
        : [];

    radios.forEach((radio) => {
      if (radio !== this && radio.checked) {
        radio.checked = false;
      }
    });
  }

  private handleChange(event: Event) {
    event.preventDefault(); // Prevent native radio behavior

    if (this.disabled || this.checked) return;

    // Set this radio as checked
    this.checked = true;

    // Dispatch change event
    this.dispatchEvent(
      new CustomEvent('ae-radio-change', {
        detail: {
          checked: this.checked,
          value: this.value,
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
    this.checked = this.hasAttribute('checked');
    this._updateFormValue();
  }

  formStateRestoreCallback(state: string | null, _mode: 'restore' | 'autocomplete') {
    this.checked = state === this.value;
    this._updateFormValue();
  }

  render() {
    return html`
      <label part="base" class="radio" ?aria-disabled="${this.disabled}">
        <input
          part="input"
          type="radio"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          .name="${this.name}"
          .value="${this.value}"
          @change="${this.handleChange}"
          @keydown="${this.handleKeyDown}"
          tabindex="-1"
          aria-hidden="true"
        />

        <span part="control" class="control">
          ${this.checked ? html` <span part="dot" class="dot"></span> ` : null}
        </span>

        <span part="label" class="label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-radio': AeRadio;
  }
}
