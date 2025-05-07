import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Individual tab component to be used inside ae-tabs
 */
@customElement('ae-tab')
export class AeTab extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      padding: var(--ae-tab-padding, 0.5rem 1rem);
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }

    :host([selected]) {
      border-bottom-color: var(--ae-tab-selected-color, #0066cc);
      color: var(--ae-tab-selected-color, #0066cc);
    }

    :host(:hover) {
      color: var(--ae-tab-hover-color, #0052a3);
    }
  `;

  /**
   * The ID for this tab
   */
  @property({ type: String, reflect: true })
  accessor id: string = '';

  /**
   * Whether this tab is selected
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The ID of the panel this tab controls
   */
  @property({ type: String })
  panel = '';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tab');
    this.setAttribute('tabindex', this.selected ? '0' : '-1');
  }

  private _handleClick() {
    this.selected = true;
    this.dispatchEvent(new CustomEvent('ae-tab-select', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div @click=${this._handleClick}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-tab': AeTab;
  }
}

export type AeTabElement = AeTab; 