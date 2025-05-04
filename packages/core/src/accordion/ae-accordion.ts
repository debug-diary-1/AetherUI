import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class AeAccordion extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    ::slotted(ae-accordion-item) {
      margin-bottom: 0.5rem;
    }

    ::slotted(ae-accordion-item:last-child) {
      margin-bottom: 0;
    }
  `;

  @property({ type: Boolean, reflect: true })
  multiselectable = false;

  @property({ type: Array })
  defaultOpen: string[] = [];

  @state()
  private openPanels = new Set<string>();

  private items = new Set<any>();

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'presentation');
    if (this.defaultOpen.length > 0) {
      this.openPanels = new Set(this.defaultOpen);
    }
  }

  handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const elements = slot.assignedElements();
    
    // Clear previous items
    this.items.clear();
    
    // Add new items
    elements.forEach(element => {
      if (element.tagName.toLowerCase() === 'ae-accordion-item') {
        this.items.add(element);
        // Set initial state
        const headerId = element.getAttribute('headerid');
        if (headerId) {
          element.open = this.openPanels.has(headerId);
        }
      }
    });
  }

  handlePanelChange(event: CustomEvent) {
    const headerId = event.detail.headerId;
    const isOpen = event.detail.open;
    const target = event.target as HTMLElement;

    if (isOpen) {
      if (!this.multiselectable) {
        // Close all other panels
        this.items.forEach(item => {
          if (item !== target) {
            item.open = false;
          }
        });
        this.openPanels.clear();
      }
      this.openPanels.add(headerId);
    } else {
      this.openPanels.delete(headerId);
    }

    this.dispatchEvent(
      new CustomEvent('ae-change', {
        detail: { open: Array.from(this.openPanels) },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <slot 
        @slotchange=${this.handleSlotChange}
        @ae-panel-change=${this.handlePanelChange}
      ></slot>
    `;
  }
} 