import { LitElement, html, css } from 'lit';

export class LitButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    /* Base button styles for all variants */
    button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font: inherit;
      transition-property: background-color, box-shadow, border-color, transform;
      transition-duration: 200ms;
      transition-timing-function: ease;
      border: 1px solid;
    }
    
    /* Primary variant */
    :host([variant="primary"]) button, 
    :host(:not([variant])) button {
      background-color: #5e7ce2;
      color: white;
      border-color: #5e7ce2;
    }
    
    :host([variant="primary"]) button:hover, 
    :host(:not([variant])) button:hover {
      background-color: #4b69c8;
      border-color: #4b69c8;
    }
    
    /* Secondary variant */
    :host([variant="secondary"]) button {
      background-color: #f3f4f6;
      color: #333333;
      border-color: #d4d4d4;
    }
    
    :host([variant="secondary"]) button:hover {
      background-color: #e5e7eb;
    }
    
    /* Ghost variant */
    :host([variant="ghost"]) button {
      background-color: transparent;
      color: #5e7ce2;
      border-color: transparent;
    }
    
    :host([variant="ghost"]) button:hover {
      background-color: rgba(94, 124, 226, 0.1);
    }
  `;

  static properties = {
    variant: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true }
  };

  constructor() {
    super();
    this.variant = 'primary';
    this.disabled = false;
  }

  render() {
    return html`
      <button ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('lit-button', LitButton);