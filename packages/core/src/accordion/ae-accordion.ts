import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { accordionStyles } from './styles';
import type { AeAccordionItem } from './ae-accordion-item';

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

  private _value: string[] = [];

  /**
   * Array of panel IDs that are currently open/expanded (controlled)
   * @default []
   */
  @property({ type: Array, attribute: 'value' })
  set value(next: string[]) {
    const value = Array.isArray(next) ? [...next] : [];
    const previous = this._value;
    if (
      previous.length === value.length &&
      previous.every((entry, index) => entry === value[index])
    ) {
      return;
    }
    this._value = value;
    this.requestUpdate('value', previous);
  }
  get value(): string[] {
    return [...this._value];
  }

  /** Compatibility alias retained for the standalone accordion package. */
  @property({ type: Array })
  set expanded(value: string[]) {
    // The canonical value attribute wins regardless of source attribute order.
    if (this.hasAttribute('value')) return;
    this.value = Array.isArray(value) ? [...value] : [];
  }
  get expanded(): string[] {
    return this.value;
  }

  /**
   * Initial panel IDs to open (uncontrolled mode)
   * This property is only used during initialization
   */
  @property({ type: Array, attribute: 'default-value' })
  accessor defaultValue: string[] = [];

  @state()
  private accessor openPanels = new Set<string>();

  private _observer: MutationObserver | null = null;
  private syncingItems = false;

  connectedCallback() {
    super.connectedCallback();
    this.setupMutationObserver();
    // Initialize controlled state before the first reactive update can reconcile items.
    const initialValue = this.value.length > 0 ? this.value : this.defaultValue;

    if (initialValue.length) {
      const normalizedValue = this.multiselectable ? initialValue : initialValue.slice(0, 1);
      this.openPanels = new Set(normalizedValue);
      if (this.value.length === 0) this.value = [...normalizedValue];
      this.updateItems();
    }

    // Check for initially open items (set via HTML attributes)
    if (!this.hasAttribute('value') && initialValue.length === 0) this.handleInitiallyOpenItems();
  }

  /**
   * Handle the case where items have the open attribute set in HTML
   * This ensures only one panel is open if multiselectable is false
   */
  private handleInitiallyOpenItems() {
    const items = this.getItems().filter((item) => item.open || item.hasAttribute('open'));

    if (items.length === 0) return;

    if (!this.multiselectable && items.length > 0) {
      // In single selection mode, only the first open item should stay open
      const firstOpenItem = items[0];
      const headerId = firstOpenItem.headerId;

      if (headerId) {
        // Clear any existing open panels
        this.openPanels.clear();
        // Only add the first open panel
        this.openPanels.add(headerId);

        // Force close all other items by setting open=false
        items.slice(1).forEach((item) => item.setOpenFromAccordion(false));
      }
    } else if (this.multiselectable) {
      // In multiselectable mode, add all open items to the set
      items.forEach((item) => {
        const headerId = item.headerId;
        if (headerId) {
          this.openPanels.add(headerId);
        }
      });
    }

    this.syncPublicValue();

    // Force the update on all items to ensure consistency
    this.updateItems();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._observer = null;
  }

  private setupMutationObserver() {
    this._observer = new MutationObserver((mutations) => {
      let identityChanged = false;
      let childrenChanged = false;
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          childrenChanged = true;
          continue;
        }
        if (mutation.type !== 'attributes' || mutation.attributeName !== 'data-header-id') continue;
        const item = mutation.target as AeAccordionItem;
        if (item.closest('ae-accordion') !== this) continue;
        const previousId = mutation.oldValue;
        const nextId = item.getAttribute('data-header-id');
        if (!previousId || !nextId || previousId === nextId || !this.openPanels.has(previousId)) {
          continue;
        }
        this.openPanels = new Set(
          Array.from(this.openPanels, (panelId) => (panelId === previousId ? nextId : panelId)),
        );
        identityChanged = true;
      }
      if (identityChanged) this.syncPublicValue();
      if (childrenChanged && this.openPanels.size === 0 && !this.hasAttribute('value')) {
        this.handleInitiallyOpenItems();
        return;
      }
      this.updateItems();
    });

    this._observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-header-id'],
      attributeOldValue: true,
    });
  }

  firstUpdated() {
    // After first rendering, ensure our state is correctly enforced
    this.handleInitiallyOpenItems();
    this.updateItems();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('value')) return;

    this.openPanels = new Set(this.value);
    this.updateItems();
  }

  private syncPublicValue() {
    this.value = Array.from(this.openPanels);
  }

  private getItems(): AeAccordionItem[] {
    return Array.from(this.querySelectorAll<AeAccordionItem>('ae-accordion-item')).filter(
      (item) => item.closest('ae-accordion') === this,
    );
  }

  private updateItems(notify = false) {
    const items = this.getItems();

    if (!this.multiselectable && items.length > 0) {
      // Make sure only one panel is open in non-multiselectable mode
      const openPanelIds = Array.from(this.openPanels);
      if (openPanelIds.length > 1) {
        // Keep only the first one
        const firstPanelId = openPanelIds[0];
        this.openPanels.clear();
        this.openPanels.add(firstPanelId);
        this.syncPublicValue();
      }
    }

    // Apply the open state to all items
    this.syncingItems = true;
    try {
      items.forEach((item) => {
        const headerId = item.headerId;
        if (headerId) {
          item.setOpenFromAccordion(this.openPanels.has(headerId), notify);
        }
      });
    } finally {
      this.syncingItems = false;
    }
  }

  private handlePanelChange(event: CustomEvent) {
    if (this.syncingItems) return;
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
        this.openPanels.clear();
        this.openPanels.add(headerId);
      } else {
        // Just close this panel
        this.openPanels.delete(headerId);
      }
    }

    // Publish the next value before sibling close notifications can run.
    this.syncPublicValue();
    this.updateItems(true);

    // Dispatch standardized event
    this.dispatchEvent(
      new CustomEvent('ae-accordion-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );

    // Preserve the original standalone package event contract.
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

declare global {
  interface HTMLElementTagNameMap {
    'ae-accordion': AeAccordion;
  }
}
