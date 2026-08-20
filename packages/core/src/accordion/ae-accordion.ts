import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
   * Set once the consumer writes `value` (attribute or property). From that
   * point the accordion is controlled: authored `open` markup is never
   * adopted and the legacy `expanded` alias can no longer override `value`.
   */
  private _valueWasSet = false;

  /**
   * Array of panel IDs that are currently open/expanded (controlled)
   * @default []
   */
  @property({ type: Array, attribute: 'value' })
  set value(next: string[]) {
    this._valueWasSet = true;
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
    // ignored. Legacy consumers that only ever use `expanded` are unaffected.
    if (this._valueWasSet || this.hasAttribute('value')) return;
    this.assignValue(next);
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

  /** Internal write path shared by user interaction, adoption, and aliases. */
  private assignValue(next: unknown) {
    const value = toArrayCopy<string>(next);
    const previous = this._value;
    if (arraysShallowEqual(previous, value)) return;
    this._value = value;
    this.requestUpdate('value', previous);
  }

  private isControlled(): boolean {
    return this._valueWasSet || this.hasAttribute('value');
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupMutationObserver();

    if (this.isControlled()) {
      // Controlled state (including an explicit empty array) is the single
      // source of truth; authored `open` markup is never adopted.
      const normalized = this.multiselectable ? this.value : this.value.slice(0, 1);
      this.openPanels = new Set(normalized);
      this.updateItems();
    } else if (this.defaultValue.length) {
      const normalized = this.multiselectable ? this.defaultValue : this.defaultValue.slice(0, 1);
      this.openPanels = new Set(normalized);
      this.assignValue(normalized);
      this.updateItems();
    } else {
      // Children are usually not parsed yet here; firstUpdated() and the
      // mutation observer retry adoption once items exist.
      this.adoptAuthoredOpenItems(false);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._observer = null;
  }

  /**
   * Adopt items authored with the `open` attribute/property as accordion
   * state. Only runs while uncontrolled. Initial adoption (mount, parse) is
   * silent; adoption of items injected after mount reports the value change
   * through the public change events so event-driven consumers stay in sync.
   *
   * In single-select mode the first authored-open item wins during initial
   * adoption (matching the longstanding parse behavior), while a post-mount
   * injection wins over an already-open panel (matching native
   * `<details name>` semantics where the newly opened panel closes others).
   *
   * @returns whether any authored open state was adopted
   */
  private adoptAuthoredOpenItems(notify: boolean): boolean {
    if (this.isControlled()) return false;

    const items = this.getItems();
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
    this.assignValue(Array.from(this.openPanels));
    this.updateItems(notify, items);
    if (notify && !arraysShallowEqual(previous, this._value)) this.dispatchChangeEvents();
    return true;
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
      if (childrenChanged) {
        // Adopt authored open state on injected items regardless of whether
        // other panels are already open. Adoption during document parsing is
        // part of initial mount and stays silent; later injections notify.
        const notify = this.hasUpdated && this.ownerDocument.readyState !== 'loading';
        if (this.adoptAuthoredOpenItems(notify)) return;
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
    // Children exist by now; adopt authored open markup only when nothing
    // (controlled value or default-value) has established state already.
    if (!this.isControlled() && this.openPanels.size === 0 && this.defaultValue.length === 0) {
      this.adoptAuthoredOpenItems(false);
    }
    this.updateItems();
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
