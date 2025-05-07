import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { checkboxStyles } from './styles';

/**
 * @element ae-checkbox
 * @summary A checkbox input component with customizable styles
 * @fires {CustomEvent<{checked: boolean}>} ae-change - Fired when the checkbox state changes
 * 
 * @example
 * ```html
 * <ae-checkbox>Accept terms and conditions</ae-checkbox>
 * ```
 */
@customElement('ae-checkbox')
export class AeCheckbox extends LitElement {
  static styles = checkboxStyles;

  @property({ type: Boolean, reflect: true })
  private accessor checked = false;

  @property({ type: Boolean, reflect: true })
  private accessor disabled = false;

  @property({ type: Boolean, reflect: true })
  accessor required = false;

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor value = '';

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.dispatchEvent(new CustomEvent('ae-change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true,
    }));
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
          @change="${this.handleChange}"
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
          >
            <polyline points="3 8 7 12 13 4"></polyline>
          </svg>
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
    'ae-checkbox': AeCheckbox;
  }
}
