import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { checkboxStyles } from './styles';

/**
 * A checkbox input component with support for checked, unchecked, and indeterminate states.
 * 
 * @element ae-checkbox
 * 
 * @property {boolean} checked - Whether the checkbox is checked
 * @property {boolean} indeterminate - Whether the checkbox is in an indeterminate state
 * @property {boolean} disabled - Whether the checkbox is disabled
 * @property {boolean} required - Whether the checkbox is required
 * @property {string} name - The name attribute for form submission
 * @property {string} value - The value attribute for form submission
 * 
 * @fires {CustomEvent<{checked: boolean, indeterminate: boolean}>} ae-checkbox-change - Fired when the checkbox state changes
 * @fires {CustomEvent<{checked: boolean, indeterminate: boolean}>} ae-change - Fired when the checkbox state changes
 * @deprecated The ae-change event is deprecated. Use ae-checkbox-change instead.
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
 * <ae-checkbox>Accept terms and conditions</ae-checkbox>
 * 
 * <ae-checkbox checked>Checked by default</ae-checkbox>
 * 
 * <ae-checkbox indeterminate>Indeterminate state</ae-checkbox>
 * ```
 */
@customElement('ae-checkbox')
export class AeCheckbox extends LitElement {
  static styles = checkboxStyles;

  @property({ type: Boolean, reflect: true })
  accessor checked = false;

  @property({ type: Boolean, reflect: true })
  accessor indeterminate = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: Boolean, reflect: true })
  accessor required = false;

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor value = '';

  private _inputElement?: HTMLInputElement;

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false; // Clicking clears the indeterminate state
    // Dispatch the new standard event
    this.dispatchEvent(new CustomEvent('ae-checkbox-change', {
      detail: { 
        checked: this.checked,
        indeterminate: this.indeterminate 
      },
      bubbles: true,
      composed: true,
    }));
    
    // Also dispatch the old event for backward compatibility
    // @deprecated Use ae-checkbox-change instead
    this.dispatchEvent(new CustomEvent('ae-change', {
      detail: { 
        checked: this.checked,
        indeterminate: this.indeterminate 
      },
      bubbles: true,
      composed: true,
    }));
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    
    // Sync the indeterminate property to the input element
    if (this._inputElement && (changedProperties.has('indeterminate') || changedProperties.has('checked'))) {
      this._inputElement.indeterminate = this.indeterminate;
      
      // When indeterminate is true, the checked property has no visual effect,
      // but we maintain its value for when indeterminate becomes false
      if (!this.indeterminate) {
        this._inputElement.checked = this.checked;
      }
    }
  }

  render() {
    return html`
      <label
        part="base"
        class="checkbox"
      >
        <input
          type="checkbox"
          part="input"
          .checked="${this.checked}"
          .disabled="${this.disabled}"
          .required="${this.required}"
          .name="${this.name}"
          .value="${this.value}"
          aria-checked="${this.indeterminate ? 'mixed' : this.checked}"
          @change="${this.handleChange}"
          ${this._setInputRef}
        />
        <span part="control" class="control">
          <svg
            part="icon"
            class="icon"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="${this.indeterminate ? 'display: none;' : 'display: block;'}"
          >
            <polyline points="3 8 7 12 13 4"></polyline>
          </svg>
          <svg
            part="indeterminate-icon"
            class="indeterminate-icon"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="${this.indeterminate ? 'display: block;' : 'display: none;'}"
          >
            <line x1="3" y1="8" x2="13" y2="8"></line>
          </svg>
        </span>
        <span part="label" class="label">
          <slot></slot>
        </span>
      </label>
    `;
  }

  private _setInputRef = (el: HTMLInputElement) => {
    this._inputElement = el;
    if (el) {
      // Always set the indeterminate state explicitly
      el.indeterminate = this.indeterminate;
    }
  }
  
  // Override firstUpdated to set the initial indeterminate state
  firstUpdated() {
    if (this._inputElement) {
      this._inputElement.indeterminate = this.indeterminate;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-checkbox': AeCheckbox;
  }
}
