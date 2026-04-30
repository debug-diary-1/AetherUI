import { ReactiveController, ReactiveControllerHost, html, type TemplateResult } from 'lit';
import { ComboItem, ComboFilterFunction, defaultFilter } from './types';

export class ComboController implements ReactiveController {
  private _items: ComboItem[] = [];
  private _query: string = '';
  private _filteredItems: ComboItem[] = [];
  private _highlightIndex: number = -1;
  private _filterFn: ComboFilterFunction = defaultFilter;
  private _debounceTimeout: number | null = null;

  constructor(private host: ReactiveControllerHost) {
    this.host.addController(this);
  }

  hostConnected() {
    // Initial setup
  }

  hostDisconnected() {
    // Clean up
    if (this._debounceTimeout !== null) {
      window.clearTimeout(this._debounceTimeout);
    }
  }

  /**
   * Set the items for the combobox
   */
  set items(items: (string | ComboItem)[]) {
    this._items = items.map((item) => {
      if (typeof item === 'string') {
        return { id: item, label: item };
      }
      return item;
    });
    this._filteredItems = [...this._items];
    this.host.requestUpdate();
  }

  /**
   * Get the original items
   */
  get items(): ComboItem[] {
    return this._items;
  }

  /**
   * Set the filter function
   */
  set filterFn(fn: ComboFilterFunction) {
    this._filterFn = fn;
    this.filter(this._query);
  }

  /**
   * Get current filter function
   */
  get filterFn(): ComboFilterFunction {
    return this._filterFn;
  }

  /**
   * Get the filtered items based on current query
   */
  get filteredItems(): ComboItem[] {
    return this._filteredItems;
  }

  /**
   * Get current highlight index
   */
  get highlightIndex(): number {
    return this._highlightIndex;
  }

  /**
   * Set the highlighted item index
   */
  setHighlight(index: number): void {
    // Clamp the index to valid range
    if (index < -1) index = -1;
    if (index >= this._filteredItems.length) index = this._filteredItems.length - 1;

    this._highlightIndex = index;
    this.host.requestUpdate();
  }

  /**
   * Move highlight up/down
   */
  moveHighlight(direction: 'up' | 'down'): void {
    if (this._filteredItems.length === 0) return;

    if (direction === 'down') {
      this.setHighlight(this._highlightIndex + 1);
    } else {
      this.setHighlight(this._highlightIndex - 1);
    }
  }

  /**
   * Get the currently highlighted item
   */
  get highlightedItem(): ComboItem | null {
    if (this._highlightIndex === -1 || this._filteredItems.length === 0) return null;
    return this._filteredItems[this._highlightIndex];
  }

  /**
   * Filter items based on query with debounce
   */
  filterWithDebounce(query: string, debounceMs: number = 150): void {
    this._query = query;

    if (this._debounceTimeout !== null) {
      window.clearTimeout(this._debounceTimeout);
    }

    this._debounceTimeout = window.setTimeout(() => {
      this.filter(query);
      this._debounceTimeout = null;
    }, debounceMs);
  }

  /**
   * Filter items immediately based on query
   */
  filter(query: string): void {
    this._query = query;
    this._filteredItems = this._items.filter((item) => this._filterFn(query, item));

    // Reset highlight index when filter changes
    this._highlightIndex = -1;
    this.host.requestUpdate();
  }

  /**
   * Format item label with query highlighting
   */
  highlightMatches(itemLabel: string, query: string): TemplateResult | string {
    if (!query) return itemLabel;

    const lcLabel = itemLabel.toLowerCase();
    const lcQuery = query.toLowerCase();
    const index = lcLabel.indexOf(lcQuery);

    if (index === -1) return itemLabel;

    const before = itemLabel.substring(0, index);
    const match = itemLabel.substring(index, index + query.length);
    const after = itemLabel.substring(index + query.length);

    return html`${before}<span class="highlight" part="highlight">${match}</span>${after}`;
  }

  /**
   * Reset the controller state
   */
  reset(): void {
    this._query = '';
    this._filteredItems = [...this._items];
    this._highlightIndex = -1;
    this.host.requestUpdate();
  }
}
