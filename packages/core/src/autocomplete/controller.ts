import { ReactiveController, ReactiveControllerHost } from 'lit';
import { AutoItem, LoadOptionsCallback } from './types';

/**
 * Controller that manages autocomplete state and async loading
 */
export class AutocompleteController implements ReactiveController {
  private _options: AutoItem[] = [];
  private _filteredOptions: AutoItem[] = [];
  private _query: string = '';
  private _loading: boolean = false;
  private _loadOptions?: LoadOptionsCallback;
  private _debounceTimeout: number | null = null;
  private _throttleMs: number = 200;
  private _highlightIndex: number = -1;
  
  constructor(private host: ReactiveControllerHost) {
    this.host.addController(this);
  }

  hostConnected() {
    // Initial setup
  }

  hostDisconnected() {
    // Clean up any pending debounce
    if (this._debounceTimeout !== null) {
      window.clearTimeout(this._debounceTimeout);
    }
  }

  /**
   * Set static options list
   */
  set options(items: (string | AutoItem)[]) {
    this._options = items.map(item => {
      if (typeof item === 'string') {
        return { id: item, label: item };
      }
      return item;
    });
    
    this.filter(this._query);
  }

  /**
   * Get options list
   */
  get options(): AutoItem[] {
    return this._options;
  }

  /**
   * Set async load function
   */
  set loadOptions(fn: LoadOptionsCallback | undefined) {
    this._loadOptions = fn;
  }

  /**
   * Get filtered options
   */
  get filteredOptions(): AutoItem[] {
    return this._filteredOptions;
  }

  /**
   * Get loading state
   */
  get loading(): boolean {
    return this._loading;
  }

  /**
   * Set throttle/debounce time in milliseconds
   */
  set throttle(ms: number) {
    this._throttleMs = ms;
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
    if (index >= this._filteredOptions.length) index = this._filteredOptions.length - 1;
    
    this._highlightIndex = index;
    this.host.requestUpdate();
  }

  /**
   * Move highlight up/down
   */
  moveHighlight(direction: 'up' | 'down'): void {
    if (this._filteredOptions.length === 0) return;
    
    if (direction === 'down') {
      this.setHighlight(this._highlightIndex + 1);
    } else {
      this.setHighlight(this._highlightIndex - 1);
    }
  }

  /**
   * Get the currently highlighted item
   */
  get highlightedItem(): AutoItem | null {
    if (this._highlightIndex === -1 || this._filteredOptions.length === 0) return null;
    return this._filteredOptions[this._highlightIndex];
  }

  /**
   * Process user input with debounce
   */
  handleInput(query: string): void {
    this._query = query;
    
    // Clear any pending debounce
    if (this._debounceTimeout !== null) {
      window.clearTimeout(this._debounceTimeout);
    }
    
    // Set up debounce timeout
    this._debounceTimeout = window.setTimeout(() => {
      this._debounceTimeout = null;
      
      if (this._loadOptions) {
        this.loadAsyncOptions(query);
      } else {
        this.filter(query);
      }
    }, this._throttleMs);
  }

  /**
   * Filter options based on query
   */
  filter(query: string): void {
    this._query = query;
    
    if (!query) {
      this._filteredOptions = [...this._options];
    } else {
      const lcQuery = query.toLowerCase();
      this._filteredOptions = this._options.filter(item => 
        item.label.toLowerCase().includes(lcQuery)
      );
    }
    
    // Reset highlight index when filter changes
    this._highlightIndex = -1;
    this.host.requestUpdate();
  }

  /**
   * Load options asynchronously
   */
  private async loadAsyncOptions(query: string): Promise<void> {
    if (!this._loadOptions) return;
    
    try {
      this._loading = true;
      this.host.requestUpdate();
      
      // Dispatch load event - ensure host supports dispatchEvent
      if ('dispatchEvent' in this.host) {
        (this.host as unknown as EventTarget).dispatchEvent(new CustomEvent('ae-autocomplete-load', {
          detail: { query },
          bubbles: true,
          composed: true
        }));
      }
      
      // Wait for options to load
      const items = await this._loadOptions(query);
      
      // Update filtered options
      this._filteredOptions = items;
      this._highlightIndex = -1;
      
      // Dispatch load-end event - ensure host supports dispatchEvent
      if ('dispatchEvent' in this.host) {
        (this.host as unknown as EventTarget).dispatchEvent(new CustomEvent('ae-autocomplete-load-end', {
          detail: { query, items },
          bubbles: true,
          composed: true
        }));
      }
    } catch (error) {
      console.error('Error loading autocomplete options:', error);
      this._filteredOptions = [];
      
      // Dispatch load-end event with empty items - ensure host supports dispatchEvent
      if ('dispatchEvent' in this.host) {
        (this.host as unknown as EventTarget).dispatchEvent(new CustomEvent('ae-autocomplete-load-end', {
          detail: { query, items: [] },
          bubbles: true,
          composed: true
        }));
      }
    } finally {
      this._loading = false;
      this.host.requestUpdate();
    }
  }

  /**
   * Format item label with query highlighting
   */
  highlightMatches(itemLabel: string, query: string): string {
    if (!query) return itemLabel;
    
    const lcLabel = itemLabel.toLowerCase();
    const lcQuery = query.toLowerCase();
    const index = lcLabel.indexOf(lcQuery);
    
    if (index === -1) return itemLabel;
    
    const before = itemLabel.substring(0, index);
    const match = itemLabel.substring(index, index + query.length);
    const after = itemLabel.substring(index + query.length);
    
    return `${before}<span class="highlight" part="highlight">${match}</span>${after}`;
  }

  /**
   * Reset the controller state
   */
  reset(): void {
    this._query = '';
    this._filteredOptions = [...this._options];
    this._highlightIndex = -1;
    this._loading = false;
    this.host.requestUpdate();
  }
}