import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { AutocompleteController } from './controller';
import type { AutocompleteOption, AutocompleteFilterFunction } from './types';
import autocompleteStyles from './styles';

/**
 * Aether UI Autocomplete Component
 * 
 * A text input with dropdown suggestions as users type, helping them quickly
 * find and select from a list of options.
 * 
 * @element ae-autocomplete
 * 
 * @property {string|AutocompleteOption[]} options - Options to display in the dropdown
 * @property {string} value - Current input value
 * @property {string} placeholder - Placeholder text for the input
 * @property {boolean} disabled - Whether the input is disabled
 * @property {number} minChars - Minimum characters before showing suggestions
 * @property {number} maxItems - Maximum number of items to show in dropdown
 * @property {AutocompleteFilterFunction} filterFn - Custom filter function
 * 
 * @fires {CustomEvent<{value: string, option: AutocompleteOption|null}>} ae-autocomplete-change - Fired when the value changes
 * @fires {CustomEvent<{value: string, option: AutocompleteOption}>} ae-autocomplete-select - Fired when an option is selected
 * 
 * @slot option - Custom template for rendering each option
 * @slot no-results - Content shown when no results match
 * @slot clear - Custom template for the clear button
 * @slot arrow - Custom template for the dropdown arrow
 * 
 * @csspart input - The text input element
 * @csspart dropdown - The dropdown container
 * @csspart option - Each option in the dropdown
 * @csspart group - Group heading for categorized options
 * @csspart clear - The clear button
 * @csspart arrow - The dropdown arrow
 * 
 * @cssproperty --ae-autocomplete-border-color - Border color of the input
 * @cssproperty --ae-autocomplete-background - Background color of the input
 * @cssproperty --ae-autocomplete-text-color - Text color of the input
 * @cssproperty --ae-autocomplete-highlight-color - Color for highlighted text
 * @cssproperty --ae-autocomplete-dropdown-shadow - Shadow for the dropdown
 */
export class AeAutocomplete extends LitElement {
  static styles = autocompleteStyles;

  /**
   * Options for the autocomplete dropdown
   */
  @property({ type: Array })
  set options(options: (string | AutocompleteOption)[]) {
    this._controller.options = options;
  }
  get options(): AutocompleteOption[] {
    return this._controller.options;
  }

  /**
   * Current value of the input
   */
  @property({ type: String })
  set value(value: string) {
    this._controller.value = value;
  }
  get value(): string {
    return this._controller.value;
  }

  /**
   * Placeholder text for the input
   */
  @property({ type: String })
  placeholder: string = 'Start typing...';

  /**
   * Whether the input is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * Minimum characters before showing suggestions
   */
  @property({ type: Number, attribute: 'min-chars' })
  set minChars(value: number) {
    this._controller.minChars = value;
  }
  get minChars(): number {
    return this._controller.minChars;
  }

  /**
   * Maximum number of items to show in dropdown
   */
  @property({ type: Number, attribute: 'max-items' })
  set maxItems(value: number) {
    this._controller.maxItems = value;
  }
  get maxItems(): number {
    return this._controller.maxItems;
  }

  /**
   * Custom filter function
   */
  @property({ attribute: false })
  set filterFn(fn: AutocompleteFilterFunction) {
    this._controller.filterFn = fn;
  }

  /**
   * Whether the component has focus
   */
  @state()
  private _hasFocus: boolean = false;

  /**
   * Prevent handling of next value change
   */
  @state()
  private _skipNextChange: boolean = false;

  /**
   * Reference to the input element
   */
  @query('input')
  input!: HTMLInputElement;

  private _controller = new AutocompleteController(this);

  constructor() {
    super();
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocumentClick);
  }

  /**
   * Close dropdown when clicking outside
   */
  private _handleDocumentClick(e: MouseEvent) {
    const target = e.composedPath()[0];
    if (target !== this && !this.contains(target as Node) && this._controller.isOpen) {
      this._controller.close();
    }
  }

  /**
   * Handle input value changes
   */
  private _handleInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    // Update controller with new value
    this._controller.value = value;
    
    // Dispatch change event
    this._dispatchChangeEvent(value);
  }

  /**
   * Handle key events for navigation
   */
  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this._controller.isOpen) {
          this._controller.open();
        } else {
          this._controller.highlightNext();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (this._controller.isOpen) {
          this._controller.highlightPrev();
        }
        break;

      case 'Enter':
        if (this._controller.isOpen) {
          e.preventDefault();
          const selected = this._controller.selectHighlighted();
          if (selected) {
            this._dispatchSelectEvent(selected);
          }
        }
        break;

      case 'Escape':
        if (this._controller.isOpen) {
          e.preventDefault();
          this._controller.close();
        }
        break;

      case 'Tab':
        if (this._controller.isOpen) {
          this._controller.close();
        }
        break;
    }
  }

  /**
   * Handle focus events
   */
  private _handleFocus() {
    this._hasFocus = true;
    // Show dropdown if we have filtered options
    if (this._controller.filteredOptions.length > 0) {
      this._controller.open();
    }
  }

  /**
   * Handle blur events
   */
  private _handleBlur() {
    this._hasFocus = false;
    // Use requestAnimationFrame to ensure click events are processed first
    requestAnimationFrame(() => {
      if (!this._hasFocus) {
        this._controller.close();
      }
    });
  }

  /**
   * Handle option click events
   */
  private _handleOptionClick(option: AutocompleteOption) {
    if (option.disabled) return;
    
    this._skipNextChange = true;
    this._controller.value = option.text;
    this._controller.close();
    this._dispatchSelectEvent(option);
    
    // Focus back on input after selection
    this.input.focus();
  }

  /**
   * Handle clear button click
   */
  private _handleClear(e: MouseEvent) {
    e.stopPropagation();
    this._controller.clear();
    this._dispatchChangeEvent('');
    this.input.focus();
  }

  /**
   * Toggle dropdown on input click
   */
  private _handleInputClick() {
    if (this.disabled) return;
    if (this._controller.filteredOptions.length > 0) {
      this._controller.toggle();
    }
  }

  /**
   * Helper to generate class string from conditions
   */
  private _getClasses(classes: Record<string, boolean>): string {
    return Object.entries(classes)
      .filter(([_, active]) => active)
      .map(([className]) => className)
      .join(' ');
  }

  /**
   * Dispatch change event
   */
  private _dispatchChangeEvent(value: string) {
    if (this._skipNextChange) {
      this._skipNextChange = false;
      return;
    }

    const matchingOption = this._controller.options.find(opt => opt.text === value);
    
    this.dispatchEvent(new CustomEvent('ae-autocomplete-change', {
      detail: {
        value,
        option: matchingOption || null
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Dispatch select event
   */
  private _dispatchSelectEvent(option: AutocompleteOption) {
    this.dispatchEvent(new CustomEvent('ae-autocomplete-select', {
      detail: {
        value: option.text,
        option
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Set the input value programmatically
   */
  setValue(value: string) {
    this._controller.value = value;
  }

  /**
   * Clear the input value
   */
  clearValue() {
    this._controller.clear();
  }

  /**
   * Focus the input element
   */
  focus() {
    this.input?.focus();
  }

  /**
   * Render the highlighted text for a match
   */
  private _renderHighlightedText(text: string) {
    const parts = this._controller.getHighlightedText(text);
    
    return html`
      ${parts.map(part => {
        if (part.isMatch) {
          return html`<span class="autocomplete-match">${part.text}</span>`;
        }
        return part.text;
      })}
    `;
  }

  /**
   * Render the dropdown options
   */
  private _renderOptions() {
    const filteredOptions = this._controller.filteredOptions;
    const highlightedIndex = this._controller.highlightedIndex;
    
    if (filteredOptions.length === 0) {
      // No results to show
      return html`
        <div class="autocomplete-empty" part="no-results">
          <slot name="no-results">No results found</slot>
        </div>
      `;
    }

    // Group options if needed
    const groupedOptions: Record<string, AutocompleteOption[]> = {};
    let hasGroups = false;
    
    filteredOptions.forEach(option => {
      const group = option.group || '';
      if (group) hasGroups = true;
      
      if (!groupedOptions[group]) {
        groupedOptions[group] = [];
      }
      
      groupedOptions[group].push(option);
    });

    if (!hasGroups) {
      // Render simple option list
      return html`
        <ul class="autocomplete-options" role="listbox" part="options">
          ${filteredOptions.map((option, index) => html`
              <li
                class=${this._getClasses({
                  'autocomplete-option': true,
                  'highlighted': index === highlightedIndex,
                  'disabled': !!option.disabled
                })}
                role="option"
                aria-selected=${index === highlightedIndex ? 'true' : 'false'}
                part="option"
                @click=${() => this._handleOptionClick(option)}
              >
                <slot name="option" .option=${option}>
                  ${this._renderHighlightedText(option.text)}
                </slot>
              </li>
            `
          )}
        </ul>
      `;
    } else {
      // Render grouped options
      return html`
        <ul class="autocomplete-options" role="listbox" part="options">
          ${Object.entries(groupedOptions).map(([group, options]) => html`
            ${group ? html`
              <li class="autocomplete-group-heading" part="group-heading">${group}</li>
            ` : ''}
            
            ${options.map((option, _index) => {
                // Calculate the overall index in the flat list
                const flatIndex = filteredOptions.findIndex(o => o.id === option.id);
                
                return html`
                  <li
                    class=${this._getClasses({
                      'autocomplete-option': true,
                      'highlighted': flatIndex === highlightedIndex,
                      'disabled': !!option.disabled
                    })}
                    role="option"
                    aria-selected=${flatIndex === highlightedIndex ? 'true' : 'false'}
                    part="option"
                    @click=${() => this._handleOptionClick(option)}
                  >
                    <slot name="option" .option=${option}>
                      ${this._renderHighlightedText(option.text)}
                    </slot>
                  </li>
                `;
              }
            )}
          `)}
        </ul>
      `;
    }
  }

  /**
   * Render the clear button
   */
  private _renderClearButton() {
    if (!this.value) return null;
    
    return html`
      <button 
        type="button"
        class="autocomplete-clear"
        part="clear"
        @click=${this._handleClear}
        aria-label="Clear"
      >
        <slot name="clear">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </slot>
      </button>
    `;
  }

  /**
   * Render the dropdown arrow
   */
  private _renderArrow() {
    return html`
      <div class="autocomplete-arrow" part="arrow">
        <slot name="arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </slot>
      </div>
    `;
  }

  render() {
    return html`
      <div class="autocomplete-container">
        <input
          type="text"
          class="autocomplete-input"
          part="input"
          .value=${this._controller.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @keydown=${this._handleKeyDown}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          @click=${this._handleInputClick}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded=${this._controller.isOpen ? 'true' : 'false'}
          autocomplete="off"
        />
        
        ${this._renderClearButton()}
        ${this._renderArrow()}
        
        <div 
          class=${this._getClasses({
            'autocomplete-dropdown': true,
            'open': this._controller.isOpen
          })}
          part="dropdown"
        >
          ${this._renderOptions()}
        </div>
      </div>
    `;
  }
}

export const defineAeAutocomplete = () => {
  if (!customElements.get('ae-autocomplete')) {
    customElements.define('ae-autocomplete', AeAutocomplete);
  }
};