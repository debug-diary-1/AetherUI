import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { accordionItemStyles } from './styles';

/**
 * @element ae-accordion-item
 * @summary An individual collapsible panel within an accordion
 * @fires {CustomEvent<{headerId: string, open: boolean}>} ae-panel-change - Fired when this panel is opened or closed
 */
@customElement('ae-accordion-item')
export class AeAccordionItem extends LitElement {
  static styles = accordionItemStyles;

  /**
   * Unique identifier for this accordion item
   * Can be a UUID or a custom string identifier
   */
  @property({ type: String })
  accessor headerId: string = crypto.randomUUID();

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
    this.setAttribute('role', 'region');
    this.setAttribute('data-header-id', this.headerId);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      this.updatePanelHeight();
      this.dispatchEvent(
        new CustomEvent('ae-panel-change', {
          detail: { headerId: this.headerId, open: this.open },
          bubbles: true,
          composed: true,
        })
      );
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
  }

  /**
   * Handles keyboard events on the header
   */
  private handleKeydown(event: KeyboardEvent) {
    if (this.disabled) return;
    
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.handleHeaderClick();
    }
  }

  render() {
    return html`
      <div class="accordion-item" part="item">
        <button
          class="header"
          part="header"
          role="button"
          aria-expanded=${this.open}
          aria-controls="panel-${this.headerId}"
          ?disabled=${this.disabled}
          @click=${this.handleHeaderClick}
          @keydown=${this.handleKeydown}
        >
          <span class="header-content">
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
        <div
          class="panel"
          part="panel"
          id="panel-${this.headerId}"
        >
          <div class="panel-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
