import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { accordionStyles } from './styles';

/**
 * @element ae-accordion
 * @summary A collapsible disclosure component that shows or hides content panels
 * @fires {CustomEvent<{expanded: string[]}>} ae-expand-change - Fired when expansion state changes
 * 
 * @example
 * ```html
 * <ae-accordion>
 *   <ae-accordion-item>
 *     <span slot="header">Section 1</span>
 *     <p>Content for section 1</p>
 *   </ae-accordion-item>
 * </ae-accordion>
 * ```
 */
@customElement('ae-accordion')
export class AeAccordion extends LitElement {
  static styles = accordionStyles;

  @property({ type: Boolean, reflect: true })
  accessor multiselectable = false;

  @property({ type: Array })
  accessor expanded: string[] = [];

  @state()
  private accessor openPanels = new Set<string>();

  private items = new Set<any>();

  connectedCallback() {
    super.connectedCallback();
    this.setupMutationObserver();
  }

  private setupMutationObserver() {
    const observer = new MutationObserver(() => {
      this.updateItems();
    });

    observer.observe(this, { childList: true, subtree: true });
  }

  private updateItems() {
    const items = Array.from(this.querySelectorAll('ae-accordion-item'));
    items.forEach(item => {
      const headerId = item.getAttribute('data-header-id');
      if (headerId) {
        (item as any).open = this.openPanels.has(headerId);
      }
    });
  }

  private handleHeaderClick(event: Event) {
    const header = (event.target as HTMLElement).closest('[data-header-id]');
    if (!header) return;

    const headerId = header.getAttribute('data-header-id');
    if (!headerId) return;

    if (this.multiselectable) {
      this.togglePanel(headerId);
    } else {
      this.openPanels.forEach(id => {
        if (id !== headerId) {
          this.openPanels.delete(id);
        }
      });
      this.togglePanel(headerId);
    }

    this.updateItems();
    this.dispatchEvent(new CustomEvent('ae-expand-change', {
      detail: { expanded: Array.from(this.openPanels) },
      bubbles: true,
      composed: true,
    }));
  }

  private togglePanel(headerId: string) {
    if (this.openPanels.has(headerId)) {
      this.openPanels.delete(headerId);
    } else {
      this.openPanels.add(headerId);
    }
  }

  render() {
    return html`
      <div
        role="presentation"
        @click="${this.handleHeaderClick}"
      >
        <slot></slot>
      </div>
    `;
  }
} 