import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ae-accordion-panel')
export class AeAccordionPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .header {
      display: flex;
      align-items: center;
      padding: var(--ae-accordion-panel-padding, 1rem);
      background: var(--ae-accordion-panel-bg, #f5f5f5);
      cursor: pointer;
      user-select: none;
    }

    .header:hover {
      background: var(--ae-accordion-panel-hover-bg, #e5e5e5);
    }

    .content {
      padding: var(--ae-accordion-panel-padding, 1rem);
      display: none;
    }

    :host([open]) .content {
      display: block;
    }

    .icon {
      margin-right: 0.5rem;
      transition: transform 0.2s ease;
    }

    :host([open]) .icon {
      transform: rotate(90deg);
    }
  `;

  @property({ type: String })
  accessor heading = '';

  @state()
  private accessor _open = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
    this.setAttribute('aria-expanded', 'false');
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    if (name === 'open') {
      this._open = value !== null;
      this.setAttribute('aria-expanded', this._open.toString());
      this.dispatchEvent(new CustomEvent('ae-toggle', {
        bubbles: true,
        composed: true
      }));
    }
  }

  private _handleClick() {
    this.toggleAttribute('open');
  }

  render() {
    return html`
      <div class="header" @click=${this._handleClick}>
        <span class="icon">▶</span>
        <span class="heading">${this.heading}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}
