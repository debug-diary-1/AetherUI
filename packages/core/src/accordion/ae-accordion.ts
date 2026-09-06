import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../internal/custom-element';
import { accordionStyles } from './styles';
import { arraysShallowEqual, toArrayCopy } from '../internal/array-props';
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
   * Set while the consumer's `value` is authoritative, so a later write
   * through the legacy `expanded` alias cannot override it. Cleared when the
   * `value` attribute is removed, which returns the accordion to the
   * uncontrolled behaviour it had before the attribute appeared.
   */
  private _valueWasSet = false;

  /**
   * Set once open state has been established by any means: a consumer write
   * (`value` or `expanded`), `default-value` seeding, adoption of authored
   * `open` markup, or user interaction. Determines whether reconnecting
   * restores the live state (it must) or re-seeds from defaults, and whether
   * authored `open` markup may still be adopted.
   */
  private _stateEstablished = false;

  /**
   * Array of panel IDs that are currently open/expanded (controlled)
   * @default []
   */
  @property({ type: Array, attribute: 'value' })
  set value(next: string[]) {
    this._valueWasSet = true;
    this._stateEstablished = true;
    this.assignValue(next);
  }
  get value(): string[] {
    return [...this._value];
  }

  /** Compatibility alias retained for the standalone accordion package. */
  @property({ type: Array })
  set expanded(next: string[]) {
    // The canonical value wins regardless of attribute or property write
    // order: once `value` has been written by the consumer, alias writes are
    // ignored. A legacy consumer that only ever writes `expanded` still
    // establishes state, so authored `open` markup cannot override it.
    if (this._valueWasSet) return;
    this._stateEstablished = true;
    this.assignValue(next);
  }
  get expanded(): string[] {
    return this.value;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    // Removing the `value` attribute hands control back rather than pinning
    // the accordion to an empty controlled value forever.
    if (name === 'value' && newValue === null) {
      this._valueWasSet = false;
      return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
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

  /**
   * Whether the accordion has finished its initial adoption of authored
   * `open` markup. Later adoptions (items injected by an application) report
   * through the public change events; the initial one stays silent. This is
   * per-instance on purpose: keying it on document.readyState would make the
   * event contract depend on when the surrounding script happened to run.
   */
  private _initialAdoptionDone = false;

  /** Internal write path shared by user interaction, adoption, and aliases. */
  private assignValue(next: unknown) {
    const value = toArrayCopy<string>(next);
    const previous = this._value;
    if (arraysShallowEqual(previous, value)) return;
    this._value = value;
    this.requestUpdate('value', previous);
  }

  private normalizeForMode(value: readonly string[]): string[] {
    return this.multiselectable ? [...value] : value.slice(0, 1);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupMutationObserver();

    if (this._stateEstablished) {
      // Established state is authoritative, whether it came from a consumer
      // write, an earlier adoption, or user interaction. Re-parenting the
      // accordion must not discard the panels the user opened.
      this.openPanels = new Set(this.normalizeForMode(this._value));
      this.updateItems();
    } else if (this.defaultValue.length) {
      const normalized = this.normalizeForMode(this.defaultValue);
      this.openPanels = new Set(normalized);
      this._stateEstablished = true;
      this.assignValue(normalized);
      this.updateItems();
    }
    // Otherwise adoption of authored `open` markup happens on slotchange,
    // once children are actually assigned.
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._observer = null;
  }

  /**
   * Adopt items authored with the `open` attribute/property as accordion
   * state. Skipped once `value` is controlled or state was otherwise
   * established by the consumer. The first adoption is silent; adoption of
   * items injected afterwards reports the value change through the public
   * change events so event-driven consumers stay in sync.
   *
   * In single-select mode the first authored-open item wins during initial
   * adoption (matching the longstanding parse behavior), while a later
   * injection wins over an already-open panel (matching native
   * `<details name>` semantics where the newly opened panel closes others).
   *
   * @returns whether any authored open state was adopted
   */
  private adoptAuthoredOpenItems(items: AeAccordionItem[]): boolean {
    if (this._valueWasSet || (this._stateEstablished && !this._initialAdoptionDone)) return false;

    const notify = this._initialAdoptionDone;
    const authoredOpen = items.filter(
      (item) => (item.open || item.hasAttribute('open')) && item.headerId,
    );
    const newlyOpen = authoredOpen.filter((item) => !this.openPanels.has(item.headerId));
    if (newlyOpen.length === 0) return false;

    if (this.multiselectable) {
      newlyOpen.forEach((item) => this.openPanels.add(item.headerId));
    } else {
      const winner = notify ? newlyOpen[newlyOpen.length - 1] : authoredOpen[0];
      this.openPanels.clear();
      this.openPanels.add(winner.headerId);
    }

    const previous = this._value;
    this._stateEstablished = true;
    this.assignValue(Array.from(this.openPanels));
    this.updateItems(notify, items);
    if (notify && !arraysShallowEqual(previous, this._value)) this.dispatchChangeEvents();
    return true;
  }

  /**
   * Drop open panels whose items were removed from the DOM, so `value` never
   * reports panels that no longer exist. Only ids belonging to the removed
   * nodes are considered: pruning against the surviving items would discard
   * a controlled value for items that have not been parsed yet.
   */
  private pruneRemovedItems(removed: readonly Node[]): boolean {
    if (this.openPanels.size === 0) return false;
    const removedIds = new Set<string>();
    for (const node of removed) {
      if (!(node instanceof Element)) continue;
      const items =
        node.tagName === 'AE-ACCORDION-ITEM'
          ? [node]
          : Array.from(node.querySelectorAll('ae-accordion-item'));
      for (const item of items) {
        const headerId = (item as AeAccordionItem).headerId ?? item.getAttribute('data-header-id');
        if (headerId) removedIds.add(headerId);
      }
    }
    // An item that was moved rather than deleted still lives under this
    // accordion, so keep its panel open.
    const surviving = new Set(this.getItems().map((item) => item.headerId));
    let changed = false;
    for (const id of removedIds) {
      if (this.openPanels.has(id) && !surviving.has(id)) {
        this.openPanels.delete(id);
        changed = true;
      }
    }
    if (changed) this.syncPublicValue();
    return changed;
  }

  /** Light-DOM children are assigned; adopt authored state and prune stale ids. */
  private handleSlotChange() {
    const items = this.getItems();
    const adopted = this.adoptAuthoredOpenItems(items);
    this._initialAdoptionDone = true;
    if (!adopted) this.updateItems(false, items);
  }

  private setupMutationObserver() {
    this._observer = new MutationObserver((mutations) => {
      let stateChanged = false;
      let itemsAdded = false;
      const removedNodes: Node[] = [];
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          removedNodes.push(...Array.from(mutation.removedNodes));
          if (mutation.addedNodes.length > 0) itemsAdded = true;
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
        stateChanged = true;
      }
      if (stateChanged) this.syncPublicValue();
      if (removedNodes.length > 0) this.pruneRemovedItems(removedNodes);
      // Added items are handled by slotchange, which fires outside the
      // reactive update cycle. Reconciling here first would close an injected
      // item before its authored `open` state can be adopted.
      if (!itemsAdded) this.updateItems();
    });

    this._observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-header-id'],
      attributeOldValue: true,
    });
  }

  updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('value')) return;

    // Skip the redundant pass when internal state already matches (the value
    // change originated from openPanels via syncPublicValue).
    if (arraysShallowEqual(this._value, Array.from(this.openPanels))) return;

    this.openPanels = new Set(this._value);
    this.updateItems();
  }

  private syncPublicValue() {
    // Any internal state change (user interaction, identity rename, pruning)
    // counts as established state, so reconnecting restores it instead of
    // falling back to default-value.
    this._stateEstablished = true;
    this.assignValue(Array.from(this.openPanels));
  }

  private getItems(): AeAccordionItem[] {
    return Array.from(this.querySelectorAll<AeAccordionItem>('ae-accordion-item')).filter(
      (item) => item.closest('ae-accordion') === this,
    );
  }

  private updateItems(notify = false, itemsOverride?: AeAccordionItem[]) {
    const items = itemsOverride ?? this.getItems();

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

  private dispatchChangeEvents() {
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

    this.dispatchChangeEvents();
  }

  render() {
    return html`
      <div
        class="accordion"
        part="base"
        @ae-panel-change="${(e: CustomEvent) => this.handlePanelChange(e)}"
      >
        <slot @slotchange="${this.handleSlotChange}"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-accordion': AeAccordion;
  }
}
