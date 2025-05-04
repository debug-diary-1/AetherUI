import { LitElement, html, PropertyValues, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Individual tab component to be used inside ae-tabs
 */
@customElement('ae-tab')
export class AeTab extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    button {
      width: 100%;
      text-align: left;
      background: transparent;
      border: none;
      font: inherit;
      cursor: pointer;
      padding: var(--ae-tabs-padding-y, 0.25rem) var(--ae-tabs-padding-x, 0.75rem);
    }
    
    /* Adjust for parent orientation */
    :host-context(ae-tabs[orientation="horizontal"]) button {
      text-align: center;
    }
    
    :host-context(ae-tabs[orientation="vertical"]) button {
      text-align: left;
      justify-content: flex-start;
    }
  `;

  /**
   * The ID for this tab
   */
  @property({ type: String, reflect: true })
  id: string = '';

  /**
   * Whether this tab is selected
   */
  @property({ type: String, reflect: true, attribute: 'aria-selected' })
  ariaSelected: string = 'false';

  /**
   * The ID of the panel this tab controls
   */
  @property({ type: String, reflect: true, attribute: 'aria-controls' })
  ariaControls: string = '';

  /**
   * Tab index for keyboard navigation
   */
  @property({ type: Number, reflect: true })
  tabIndex: number = -1;

  constructor() {
    super();
    this.addEventListener('click', this._onClick);
  }

  private _onClick(e: Event) {
    // Event will bubble out to parent ae-tabs
    // where it will be handled by the click handler added in _handleSlotChange
  }

  updated(changedProperties: PropertyValues) {
    // Forward relevant properties to the actual button element
    if (changedProperties.has('ariaSelected') || 
        changedProperties.has('ariaControls') || 
        changedProperties.has('tabIndex')) {
      
      const button = this.shadowRoot?.querySelector('button');
      if (button) {
        button.setAttribute('aria-selected', this.ariaSelected);
        button.setAttribute('aria-controls', this.ariaControls);
        button.tabIndex = this.tabIndex;
      }
    }
  }

  render() {
    return html`
      <button 
        role="tab" 
        part="tab"
        aria-selected="${this.ariaSelected}"
        aria-controls="${this.ariaControls}"
        tabindex="${this.tabIndex}"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-tab': AeTab;
  }
} 