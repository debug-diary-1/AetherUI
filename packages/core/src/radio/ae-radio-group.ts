import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { radioGroupStyles } from './styles';
import { AeRadio } from './ae-radio';

/**
 * A container component that manages a group of radio buttons and their selection state.
 *
 * @element ae-radio-group
 *
 * @property {string} name - The name attribute for all radio buttons in the group
 * @property {string} value - The value of the currently selected radio button
 * @property {boolean} disabled - Whether all radio buttons in the group are disabled
 *
 * @fires {CustomEvent<{value: string}>} ae-radio-group-change - Fired when the selected radio changes
 *
 * @slot - The radio buttons (ae-radio elements) to be grouped
 *
 * @csspart base - The component's base wrapper
 *
 * @cssproperty --ae-radio-group-gap - The gap between radio buttons
 * @cssproperty --ae-radio-group-direction - The flex direction (column or row)
 *
 * @example
 * ```html
 * <ae-radio-group name="options" value="2">
 *   <ae-radio value="1">Option 1</ae-radio>
 *   <ae-radio value="2">Option 2</ae-radio>
 *   <ae-radio value="3">Option 3</ae-radio>
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

  private _previousRadios: Set<AeRadio> = new Set();
  private _handleRadioChange = this.handleRadioChange.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.updateRadios();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeOldListeners();
  }

  private _removeOldListeners() {
    this._previousRadios.forEach((radio) => {
      radio.removeEventListener('ae-radio-change', this._handleRadioChange);
    });
    this._previousRadios.clear();
  }

  private updateRadios() {
    this._removeOldListeners();
    const radios = this.querySelectorAll<AeRadio>('ae-radio');
    radios.forEach((radio) => {
      radio.name = this.name;
      radio.disabled = this.disabled;
      radio.checked = radio.value === this.value;
      radio.addEventListener('ae-radio-change', this._handleRadioChange);
      this._previousRadios.add(radio);
    });
  }

  private handleRadioChange(event: Event) {
    const radio = event.target as AeRadio;
    this.value = radio.value;
    this.updateRadios();

    // Dispatch the standard event
    this.dispatchEvent(
      new CustomEvent('ae-radio-group-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div part="base" role="radiogroup">
        <slot @slotchange="${this.updateRadios}"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-radio-group': AeRadioGroup;
  }
}
