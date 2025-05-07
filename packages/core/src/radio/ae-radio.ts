import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { radioStyles } from './styles';

/**
 * @element ae-radio
 * @summary A radio button input component
 * @fires {CustomEvent<{checked: boolean}>} ae-change - Fired when the radio state changes
 * 
 * @example
 * ```html
 * <ae-radio name="options" value="1">Option 1</ae-radio>
 * ```
 */
@customElement('ae-radio')
export class AeRadio extends LitElement {
  static styles = radioStyles;

  @property({ type: Boolean, reflect: true })
  accessor checked = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor value = '';

  private accessor control: HTMLElement = document.createElement('div');

  connectedCallback() {
    super.connectedCallback();
    this.control = this.renderRoot.querySelector('[part="control"]') as HTMLElement;
  }

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
        class="radio"
      >
        <input
          type="radio"
          part="input"
          .checked="${this.checked}"
          .disabled="${this.disabled}"
          .name="${this.name}"
          .value="${this.value}"
          @change="${this.handleChange}"
        />
        <span part="control" class="control"></span>
        <span part="label" class="label">
          <slot></slot>
        </span>
      </label>
    `;
  }
} 