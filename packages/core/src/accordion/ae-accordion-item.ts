import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { accordionItemStyles } from './styles';

/**
 * An individual collapsible panel within an accordion.
 * 
 * @element ae-accordion-item
 * 
 * @property {string} headerId - Unique identifier for this accordion item
 * @property {boolean} open - Whether this panel is currently open
 * @property {boolean} disabled - Whether this accordion item is disabled
 * 
 * @fires {CustomEvent<{headerId: string, open: boolean}>} ae-panel-change - Fired when this panel is opened or closed
 * @fires {CustomEvent<{headerId: string, open: boolean}>} ae-accordion-item-change - Standardized event fired when opened/closed
 * 
 * @slot - Default slot for panel content
 * @slot header - Content for the accordion header/button
 * 
 * @csspart base - The container element
 * @csspart header - The clickable header button
 * @csspart icon - The expand/collapse icon
 * @csspart panel - The content panel
 * 
 * @cssproperty --ae-accordion-header-bg - Header background color
 * @cssproperty --ae-accordion-header-color - Header text color
 * @cssproperty --ae-accordion-header-active-bg - Open header background color
 * @cssproperty --ae-accordion-header-active-color - Open header text color
 * @cssproperty --ae-accordion-header-hover-bg - Header hover background
 * @cssproperty --ae-accordion-icon-color - Icon color
 * @cssproperty --ae-accordion-icon-active-color - Open state icon color
 * @cssproperty --ae-accordion-panel-bg - Panel background color
 * @cssproperty --ae-accordion-panel-color - Panel text color
 */
@customElement('ae-accordion-item')
export class AeAccordionItem extends LitElement {
  static styles = accordionItemStyles;

  private static _idCounter = 0;

  /**
   * Unique identifier for this accordion item
   */
  @property({ type: String })
  accessor headerId = `ae-accordion-${AeAccordionItem._idCounter++}`;

  /**
   * Whether this panel is currently open
   */
  @property({ type: Boolean, reflect: true })
  accessor open = false;

  /**
   * Whether this accordion item is disabled
   */
  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  private panelHeight = 0;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('data-header-id', this.headerId);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      this.updatePanelHeight();
    }
  }

  private updatePanelHeight() {
    if (this.open) {
      const panel = this.shadowRoot?.querySelector('.panel-content') as HTMLElement;
      if (panel) {
        this.panelHeight = panel.offsetHeight;
        this.style.setProperty('--panel-height', `${this.panelHeight}px`);
      }
    }
  }

  /**
   * Handles user clicking on the header
   */
  private handleHeaderClick() {
    if (this.disabled) return;
    this.open = !this.open;

    const detail = { headerId: this.headerId, open: this.open };

    this.dispatchEvent(
      new CustomEvent('ae-accordion-item-change', {
        detail,
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('ae-panel-change', {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="accordion-item" part="base">
        <div role="heading" aria-level="3">
          <button
            class="header"
            part="header"
            aria-expanded=${this.open}
            aria-controls="panel-${this.headerId}"
            ?disabled=${this.disabled}
            @click=${this.handleHeaderClick}
          >
            <span class="header-content" part="header-content">
              <slot name="header"></slot>
            </span>
            <svg
              class="icon"
              part="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div
          class="panel"
          part="panel"
          id="panel-${this.headerId}"
          role="region"
          aria-labelledby="header-${this.headerId}"
        >
          <div class="panel-content" part="panel-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-accordion-item': AeAccordionItem;
  }
}