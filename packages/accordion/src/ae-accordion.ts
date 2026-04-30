import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { accordionStyles } from './styles';
import { AeAccordionItem } from './ae-accordion-item';

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

  /**
   * Allows multiple panels to be open simultaneously when true
   */
  @property({ type: Boolean, reflect: true })
  accessor multiselectable = false;

  /**
   * Array of panel IDs that are currently expanded
   */
  @property({ type: Array })
  accessor expanded: string[] = [];

  @state()
  private accessor openPanels = new Set<string>();

  connectedCallback() {
    super.connectedCallback();
    this.setupMutationObserver();
    this.setAttribute('role', 'accordion');

    // Initialize from expanded property
    if (this.expanded.length) {
      if (this.multiselectable) {
        this.expanded.forEach((id) => this.openPanels.add(id));
      } else {
        // In non-multiselectable mode, only keep the first panel open
        this.openPanels.add(this.expanded[0]);
      }
      this.updateItems();
    }

    // Check for initially open items (set via HTML attributes)
    this.handleInitiallyOpenItems();
  }

  /**
   * Handle the case where items have the open attribute set in HTML
   * This ensures only one panel is open if multiselectable is false
   */
  private handleInitiallyOpenItems() {
    // Get all items with the open attribute
    const items = Array.from(this.querySelectorAll('ae-accordion-item[open]'));

    if (items.length === 0) return;

    if (!this.multiselectable && items.length > 0) {
      // In single selection mode, only the first open item should stay open
      const firstOpenItem = items[0];
      const headerId = firstOpenItem.getAttribute('data-header-id');

      if (headerId) {
        // Clear any existing open panels
        this.openPanels.clear();
        // Only add the first open panel
        this.openPanels.add(headerId);

        // Force close all other items by setting open=false
        items.slice(1).forEach((item) => {
          item.removeAttribute('open');
          (item as AeAccordionItem).open = false;
        });
      }
    } else if (this.multiselectable) {
      // In multiselectable mode, add all open items to the set
      items.forEach((item) => {
        const headerId = item.getAttribute('data-header-id');
        if (headerId) {
          this.openPanels.add(headerId);
        }
      });
    }

    // Update expanded property to match
    this.expanded = Array.from(this.openPanels);

    // Force the update on all items to ensure consistency
    this.updateItems();
  }

  private setupMutationObserver() {
    const observer = new MutationObserver(() => {
      this.updateItems();
    });

    observer.observe(this, { childList: true, subtree: true });
  }

  firstUpdated() {
    // After first rendering, ensure our state is correctly enforced
    this.handleInitiallyOpenItems();
    this.updateItems();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('expanded')) {
      this.openPanels = new Set(this.expanded);
      this.updateItems();
    }
  }

  private updateItems() {
    // Update all accordion items based on the current open panels
    const items = Array.from(this.querySelectorAll('ae-accordion-item'));

    if (!this.multiselectable && items.length > 0) {
      // Make sure only one panel is open in non-multiselectable mode
      const openPanelIds = Array.from(this.openPanels);
      if (openPanelIds.length > 1) {
        // Keep only the first one
        const firstPanelId = openPanelIds[0];
        this.openPanels.clear();
        this.openPanels.add(firstPanelId);
        // Update the expanded property to match
        this.expanded = [firstPanelId];
      }
    }

    // Apply the open state to all items
    items.forEach((item) => {
      const headerId = item.getAttribute('data-header-id');
      if (headerId) {
        (item as AeAccordionItem).open = this.openPanels.has(headerId);
      }
    });
  }

  private handlePanelChange(event: CustomEvent) {
    // Prevent handling events from nested accordions
    const target = event.target as Element;
    if (!target || target.closest('ae-accordion') !== this) return;

    const { headerId, open } = event.detail;

    if (this.multiselectable) {
      // In multiselectable mode, just toggle the individual panel
      if (open) {
        this.openPanels.add(headerId);
      } else {
        this.openPanels.delete(headerId);
      }
    } else {
      // In single selection mode, close all other panels when one is opened
      if (open) {
        // First close all panels - we'll do this manually to ensure it works
        const items = Array.from(this.querySelectorAll('ae-accordion-item'));
        items.forEach((item) => {
          const itemId = item.getAttribute('data-header-id');
          if (itemId && itemId !== headerId) {
            (item as AeAccordionItem).open = false;
          }
        });

        // Clear the set and add only the new panel
        this.openPanels.clear();
        this.openPanels.add(headerId);
      } else {
        // Just close this panel
        this.openPanels.delete(headerId);
      }
    }

    // Update all accordion items to reflect the new state
    this.updateItems();

    // Update the expanded property
    this.expanded = Array.from(this.openPanels);

    // Dispatch event with the expanded panels
    this.dispatchEvent(
      new CustomEvent('ae-expand-change', {
        detail: { expanded: this.expanded },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div
        class="accordion"
        part="base"
        @ae-panel-change="${(e: CustomEvent) => this.handlePanelChange(e)}"
      >
        <slot></slot>
      </div>
    `;
  }
}
