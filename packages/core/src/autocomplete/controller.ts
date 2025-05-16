import { ReactiveController, ReactiveControllerHost } from 'lit';
import { AutocompleteOption, AutocompleteFilterFunction, defaultFilter } from './types';

export class AutocompleteController implements ReactiveController {
  private _options: AutocompleteOption[] = [];
  private _filteredOptions: AutocompleteOption[] = [];
  private _value: string = '';
  private _isOpen: boolean = false;
  private _highlightedIndex: number = -1;
  private _selectedIndex: number = -1;
  private _minChars: number = 1;
  private _maxItems: number = 10;
  private _filterFn: AutocompleteFilterFunction = defaultFilter;
  private _debounceTimeout: number | null = null;

  constructor(private host: ReactiveControllerHost) {
    this.host.addController(this);
  }

  hostConnected() {
    // Initial setup
  }

  hostDisconnected() {
    // Clean up
    this.clearDebounce();
  }

  private clearDebounce(): void {
    if (this._debounceTimeout !== null) {
      window.clearTimeout(this._debounceTimeout);
      this._debounceTimeout = null;
    }
  }

  /**
   * Set the options for the autocomplete
   */
  set options(options: (string | AutocompleteOption)[]) {
    this._options = options.map(option => {
      if (typeof option === 'string') {
        return { id: option, text: option };
      }
      return option;
    });
    this.filter(this._value);
  }

  /**
   * Get the current options
   */
  get options(): AutocompleteOption[] {
    return [...this._options];
  }

  /**
   * Set the value for the autocomplete input
   */
  set value(value: string) {
    if (this._value !== value) {
      this._value = value;
      this.filter(value);
    }
  }

  /**
   * Get the current value
   */
  get value(): string {
    return this._value;
  }

  /**
   * Set minimum characters before showing suggestions
   */
  set minChars(chars: number) {
    this._minChars = chars;
    // Re-evaluate filtering with new minChars
    this.filter(this._value);
  }

  /**
   * Get minimum characters configuration
   */
  get minChars(): number {
    return this._minChars;
  }

  /**
   * Set maximum items to show
   */
  set maxItems(items: number) {
    this._maxItems = items;
    // Re-filter to apply the new limit
    this.filter(this._value);
  }

  /**
   * Get maximum items configuration
   */
  get maxItems(): number {
    return this._maxItems;
  }

  /**
   * Set custom filter function
   */
  set filterFn(fn: AutocompleteFilterFunction) {
    this._filterFn = fn;
    this.filter(this._value);
  }

  /**
   * Get the current filtered options
   */
  get filteredOptions(): AutocompleteOption[] {
    return [...this._filteredOptions];
  }

  /**
   * Get whether the dropdown is open
   */
  get isOpen(): boolean {
    return this._isOpen;
  }

  /**
   * Get the current highlighted index
   */
  get highlightedIndex(): number {
    return this._highlightedIndex;
  }

  /**
   * Get the current selected index
   */
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  /**
   * Filter options based on the input value
   */
  filter(value: string, debounceMs = 0): void {
    this.clearDebounce();

    if (debounceMs > 0) {
      this._debounceTimeout = window.setTimeout(() => {
        this.performFilter(value);
      }, debounceMs);
    } else {
      this.performFilter(value);
    }
  }

  private performFilter(value: string): void {
    this._value = value;

    // Don't show options if we don't meet minimum chars
    if (value.length < this._minChars) {
      this._filteredOptions = [];
      this._isOpen = false;
      this._highlightedIndex = -1;
      this.host.requestUpdate();
      return;
    }

    // Filter options based on the value
    this._filteredOptions = this._options
      .filter(option => this._filterFn(value, option))
      .slice(0, this._maxItems);

    // Update UI state
    this._isOpen = this._filteredOptions.length > 0;
    this._highlightedIndex = this._filteredOptions.length > 0 ? 0 : -1;
    this.host.requestUpdate();
  }

  /**
   * Open the dropdown
   */
  open(): void {
    if (!this._isOpen && this._filteredOptions.length > 0) {
      this._isOpen = true;
      this.host.requestUpdate();
    }
  }

  /**
   * Close the dropdown
   */
  close(): void {
    if (this._isOpen) {
      this._isOpen = false;
      this._highlightedIndex = -1;
      this.host.requestUpdate();
    }
  }

  /**
   * Toggle the dropdown state
   */
  toggle(): void {
    if (this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Highlight the option at the given index
   */
  highlightOption(index: number): void {
    if (index >= -1 && index < this._filteredOptions.length) {
      this._highlightedIndex = index;
      this.host.requestUpdate();
    }
  }

  /**
   * Highlight the next option
   */
  highlightNext(): void {
    if (this._filteredOptions.length === 0) return;
    
    const newIndex = this._highlightedIndex + 1;
    if (newIndex >= this._filteredOptions.length) {
      this._highlightedIndex = 0;
    } else {
      this._highlightedIndex = newIndex;
    }
    this.host.requestUpdate();
  }

  /**
   * Highlight the previous option
   */
  highlightPrev(): void {
    if (this._filteredOptions.length === 0) return;
    
    const newIndex = this._highlightedIndex - 1;
    if (newIndex < 0) {
      this._highlightedIndex = this._filteredOptions.length - 1;
    } else {
      this._highlightedIndex = newIndex;
    }
    this.host.requestUpdate();
  }

  /**
   * Select the option at the highlighted index
   */
  selectHighlighted(): AutocompleteOption | null {
    if (this._highlightedIndex >= 0 && this._highlightedIndex < this._filteredOptions.length) {
      const option = this._filteredOptions[this._highlightedIndex];
      if (option && !option.disabled) {
        this._value = option.text;
        this._selectedIndex = this._options.findIndex(o => o.id === option.id);
        this.close();
        this.host.requestUpdate();
        return option;
      }
    }
    return null;
  }

  /**
   * Select option by id
   */
  selectById(id: string | number): AutocompleteOption | null {
    const optionIndex = this._options.findIndex(o => o.id === id);
    if (optionIndex >= 0) {
      const option = this._options[optionIndex];
      if (!option.disabled) {
        this._value = option.text;
        this._selectedIndex = optionIndex;
        this.close();
        this.host.requestUpdate();
        return option;
      }
    }
    return null;
  }

  /**
   * Clear the current selection and value
   */
  clear(): void {
    this._value = '';
    this._selectedIndex = -1;
    this._filteredOptions = [];
    this._isOpen = false;
    this._highlightedIndex = -1;
    this.host.requestUpdate();
  }

  /**
   * Get highlighted text parts for displaying matches
   */
  getHighlightedText(text: string): { text: string; isMatch: boolean }[] {
    if (!this._value || this._value.length < this._minChars) {
      return [{ text, isMatch: false }];
    }

    const query = this._value.toLowerCase();
    const textLower = text.toLowerCase();
    const result: { text: string; isMatch: boolean }[] = [];

    const startIndex = textLower.indexOf(query);
    if (startIndex === -1) {
      return [{ text, isMatch: false }];
    }

    if (startIndex > 0) {
      result.push({
        text: text.substring(0, startIndex),
        isMatch: false
      });
    }

    result.push({
      text: text.substring(startIndex, startIndex + query.length),
      isMatch: true
    });

    if (startIndex + query.length < text.length) {
      result.push({
        text: text.substring(startIndex + query.length),
        isMatch: false
      });
    }

    return result;
  }
}