import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { radioGroupStyles } from './styles';
import { AeRadio } from './ae-radio';

/**
 * @element ae-radio-group
 * @summary A container for radio buttons that manages their state
 * @fires {CustomEvent<{value: string}>} ae-change - Fired when the selected radio changes
 * 
 * @example
 * ```html
 * <ae-radio-group name="options">
 *   <ae-radio value="1">Option 1</ae-radio>
 *   <ae-radio value="2">Option 2</ae-radio>
 * </ae-radio-group>
 * ```
 */
@customElement('ae-radio-group')
export class AeRadioGroup extends LitElement {
  static styles = radioGroupStyles;

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor value = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  private radios: NodeListOf<AeRadio> = null!;

  connectedCallback() {
    super.connectedCallback();
    this.updateRadios();
  }

  private updateRadios() {
    this.radios = this.querySelectorAll('ae-radio');
    this.radios.forEach(radio => {
      radio.name = this.name;
      radio.disabled = this.disabled;
      radio.checked = radio.value === this.value;
      radio.addEventListener('ae-change', this.handleRadioChange.bind(this));
    });
  }

  private handleRadioChange(event: Event) {
    const radio = event.target as AeRadio;
    this.value = radio.value;
    this.updateRadios();
    this.dispatchEvent(new CustomEvent('ae-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div
        part="base"
        role="radiogroup"
      >
        <slot @slotchange="${this.updateRadios}"></slot>
      </div>
    `;
  }
} 