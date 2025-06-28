import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { accordionStyles } from './styles';

/**
 * A collapsible disclosure component that shows or hides content panels.
 * 
 * @element ae-accordion
 * 
 * @property {boolean} multiselectable - Allows multiple panels to be open simultaneously
 * @property {string[]} value - Array of panel IDs that are currently open/expanded
 * @property {string[]} defaultValue - Initial panel IDs to open (uncontrolled mode)
 * 
 * @fires {CustomEvent<{value: string[]}>} ae-accordion-change - Fired when open/expanded panels change
 * 
 * @slot - Default slot for accordion items
 * 
 * @csspart base - The container element for the accordion
 * 
 * @cssproperty --ae-accordion-bg - Background color
 * @cssproperty --ae-accordion-border - Border style
 * @cssproperty --ae-accordion-radius - Border radius
 * @cssproperty --ae-accordion-shadow - Box shadow
 * @cssproperty --ae-accordion-divider - Divider between items
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
   * Array of panel IDs that are currently open/expanded (controlled)
   */
  @property({ type: Array, attribute: 'value' })
  accessor value: string[] = [];

  /**
   * Initial panel IDs to open (uncontrolled mode)
   * This property is only used during initialization
   */
  @property({ type: Array, attribute: 'default-value' })
  accessor defaultValue: string[] = [];

  /**
   * @deprecated Use value instead
   * @internal Maintained for backward compatibility
   */
  @property({ type: Array })
  accessor expanded: string[] = [];

  @state()
  private accessor openPanels = new Set<string>();

  connectedCallback() {
    super.connectedCallback();
    this.setupMutationObserver();
    this.setAttribute('role', 'accordion');
    
    // Initialize from value/expanded property
    const initialValue = this.value.length > 0 ? this.value : 
                         this.expanded.length > 0 ? this.expanded :
                         this.defaultValue;
                        
    if (initialValue.length) {
      if (this.multiselectable) {
        initialValue.forEach(id => this.openPanels.add(id));
      } else {
        // In non-multiselectable mode, only keep the first panel open
        this.openPanels.add(initialValue[0]);
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
        items.slice(1).forEach(item => {
          item.removeAttribute('open');
          (item as AeAccordionItem).open = false;
        });
      }
    } else if (this.multiselectable) {
      // In multiselectable mode, add all open items to the set
      items.forEach(item => {
        const headerId = item.getAttribute('data-header-id');
        if (headerId) {
          this.openPanels.add(headerId);
        }
      });
    }
    
    // Update value and expanded property to match
    this.value = Array.from(this.openPanels);
    this.expanded = this.value; // Keep expanded in sync for backward compatibility
    
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
    if (changedProperties.has('value')) {
      this.openPanels = new Set(this.value);
      this.expanded = this.value; // Keep expanded in sync for backward compatibility
      this.updateItems();
    } else if (changedProperties.has('expanded')) {
      // Support legacy expanded property
      this.openPanels = new Set(this.expanded);
      this.value = this.expanded; // Keep value in sync for backward compatibility
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
        // Update the value property to match
        this.value = [firstPanelId];
        this.expanded = this.value; // Keep expanded in sync
      }
    }
    
    // Apply the open state to all items
    items.forEach(item => {
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
        items.forEach(item => {
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
    
    // Update the value property
    this.value = Array.from(this.openPanels);
    this.expanded = this.value; // Keep expanded in sync for backward compatibility
    
    // Dispatch standardized event
    this.dispatchEvent(new CustomEvent('ae-accordion-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
    
    // Also dispatch legacy event for backward compatibility
    this.dispatchEvent(new CustomEvent('ae-expand-change', {
      detail: { expanded: this.expanded },
      bubbles: true,
      composed: true,
    }));
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