import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

@customElement('ae-radio-group')
export class AeRadioGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    :host([orientation="horizontal"]) {
      flex-direction: row;
      align-items: center;
    }
  `;

  @property({ type: String })
  value = '';

  @property({ type: String, reflect: true })
  orientation: 'vertical' | 'horizontal' = 'vertical';

  @queryAssignedElements({ selector: 'ae-radio' })
  private radios!: AeRadio[];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
  }

  private handleChange(event: CustomEvent) {
    const target = event.target as AeRadio;
    this.value = target.value;
    this.updateRadios();
  }

  private updateRadios() {
    this.radios.forEach(radio => {
      radio.checked = radio.value === this.value;
    });
  }

  private handleKeydown(event: KeyboardEvent) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const currentIndex = this.radios.findIndex(radio => radio.checked);
    let nextIndex = currentIndex;

    if (this.orientation === 'vertical') {
      if (event.key === 'ArrowUp') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : this.radios.length - 1;
      } else if (event.key === 'ArrowDown') {
        nextIndex = currentIndex < this.radios.length - 1 ? currentIndex + 1 : 0;
      }
    } else {
      if (event.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : this.radios.length - 1;
      } else if (event.key === 'ArrowRight') {
        nextIndex = currentIndex < this.radios.length - 1 ? currentIndex + 1 : 0;
      }
    }

    const nextRadio = this.radios[nextIndex];
    if (nextRadio && !nextRadio.disabled) {
      nextRadio.checked = true;
      this.value = nextRadio.value;
      this.dispatchEvent(
        new CustomEvent('ae-change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <slot
        @ae-change=${this.handleChange}
        @keydown=${this.handleKeydown}
      ></slot>
    `;
  }
} 