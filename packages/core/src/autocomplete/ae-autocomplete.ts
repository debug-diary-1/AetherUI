import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { AutocompleteController } from './controller';
import { AutoItem, LoadOptionsCallback } from './types';
import { autoStyles } from './styles';

/**
 * Input control that presents type-ahead suggestions, supporting both static data passed as an array 
 * and asynchronous data fetched via a callback.
 * 
 * @element ae-autocomplete
 * 
 * @property {(string|AutoItem)[]} options - Static list of options to show in the dropdown
 * @property {LoadOptionsCallback} loadOptions - Async function to load options based on user input
 * @property {string} value - Current value of the input
 * @property {string} placeholder - Placeholder text for the input
 * @property {number} throttle - Debounce time in milliseconds before triggering search/filter
 * @property {boolean} disabled - Whether the input is disabled
 * 
 * @fires {CustomEvent<{value: string, item: AutoItem}>} ae-autocomplete-select - Fired when an item is selected
 * @fires {CustomEvent<{value: string}>} ae-autocomplete-input - Fired on each keystroke (after debounce for async)
 * @fires {CustomEvent<{query: string}>} ae-autocomplete-load - Fired before loadOptions promise
 * @fires {CustomEvent<{query: string, items: AutoItem[]}>} ae-autocomplete-load-end - Fired after options are loaded (or error)
 * 
 * @slot default - The default slot is not used, content is generated based on options
 * 
 * @csspart input - Text input field
 * @csspart overlay - Positioned wrapper for the popup
 * @csspart listbox - Scroll container for suggestions
 * @csspart option - Each suggestion option
 * @csspart spinner - Loading indicator
 * @csspart highlight - Query match highlights
 * @csspart empty-message - Message shown when no results are found
 * 
 * @cssprop --ae-auto-border - Border for the input and dropdown
 * @cssprop --ae-auto-radius - Border radius for the input and dropdown
 * @cssprop --ae-auto-bg - Background color for the input and dropdown
 * @cssprop --ae-auto-fg - Text color for the input
 * @cssprop --ae-auto-border-hover - Border color on hover
 * @cssprop --ae-focus-border - Border color when focused
 * @cssprop --ae-focus-shadow - Box shadow when focused
 * @cssprop --ae-auto-shadow - Box shadow for the dropdown
 * @cssprop --ae-auto-option-hover-bg - Background color for hovered options
 * @cssprop --ae-auto-option-selected-bg - Background color for the selected option
 * @cssprop --ae-auto-option-selected-fg - Text color for the selected option
 * @cssprop --ae-auto-option-selected-hover-bg - Background color for selected option when hovered
 * @cssprop --ae-auto-highlight-bg - Background color for matching text highlight
 * @cssprop --ae-auto-highlight-weight - Font weight for highlighted text
 * @cssprop --ae-auto-spinner-size - Size of the loading spinner
 * @cssprop --ae-auto-spinner-color - Color of the loading spinner
 */
export class AeAutocomplete extends LitElement {
  static styles = autoStyles;

  /**
   * Controller for managing filtered options and async loading
   */
  private controller = new AutocompleteController(this);

  /**
   * Static options list - ignored if loadOptions is provided
   */
  @property({ type: Array })
  set options(value: (string | AutoItem)[]) {
    this.controller.options = value;
  }
  get options(): AutoItem[] {
    return this.controller.options;
  }

  /**
   * Async loader function - takes precedence over static options
   */
  @property({ attribute: false })
  set loadOptions(callback: LoadOptionsCallback | undefined) {
    this.controller.loadOptions = callback;
  }

  /**
   * Current input value (controlled)
   */
  @property({ type: String })
  value = '';

  /**
   * Placeholder text for the input
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Debounce time in milliseconds before triggering search/filter
   */
  @property({ type: Number })
  throttle = 200;

  /**
   * Whether the input is disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Whether the suggestions dropdown is open
   */
  @state()
  private isOpen = false;

  /**
   * Input element reference
   */
  @query('input')
  private inputElement!: HTMLInputElement;

  /**
   * Listbox element reference
   */
  @query('.listbox')
  private listboxElement!: HTMLDivElement;

  /**
   * Called when component is connected to DOM
   */
  connectedCallback() {
    super.connectedCallback();
    
    // Set throttle value on controller
    this.controller.throttle = this.throttle;
    
    // Add click handler for outside clicks
    document.addEventListener('click', this.handleOutsideClick);
  }

  /**
   * Called when component is disconnected from DOM
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  /**
   * Handle input changes
   */
  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    
    // Always open dropdown when typing unless disabled
    if (!this.disabled) {
      this.isOpen = true;
    }
    
    // Process input through controller
    this.controller.handleInput(input.value);
    
    this.dispatchEvent(new CustomEvent('ae-autocomplete-input', {
      detail: { value: input.value },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle input focus
   */
  private handleFocus() {
    if (!this.disabled) {
      this.isOpen = true;
    }
  }

  /**
   * Handle clicks outside component
   */
  private handleOutsideClick = (e: MouseEvent) => {
    if (this.isOpen && !this.contains(e.target as Node)) {
      this.isOpen = false;
    }
  };

  /**
   * Handle clicks on dropdown options
   */
  private handleOptionClick(item: AutoItem) {
    if (item.disabled) return;
    
    this.selectItem(item);
  }

  /**
   * Select an item and update input
   */
  private selectItem(item: AutoItem) {
    this.value = item.label;
    this.inputElement.value = item.label;
    this.isOpen = false;
    
    this.dispatchEvent(new CustomEvent('ae-autocomplete-select', {
      detail: { value: item.id, item },
      bubbles: true,
      composed: true
    }));
    
    this.controller.reset();
  }

  /**
   * Handle keyboard interactions
   */
  private handleKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
        } else {
          this.controller.moveHighlight('down');
          this.scrollToHighlighted();
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (this.isOpen) {
          this.controller.moveHighlight('up');
          this.scrollToHighlighted();
        }
        break;
        
      case 'Enter':
        if (this.isOpen) {
          e.preventDefault();
          const highlighted = this.controller.highlightedItem;
          if (highlighted && !highlighted.disabled) {
            this.selectItem(highlighted);
          }
        }
        break;
        
      case 'Escape':
        if (this.isOpen) {
          e.preventDefault();
          this.isOpen = false;
        }
        break;
        
      case 'Tab':
        this.isOpen = false;
        break;
    }
  }

  /**
   * Scroll the listbox to show the highlighted option
   */
  private scrollToHighlighted() {
    requestAnimationFrame(() => {
      const highlighted = this.listboxElement?.querySelector('.option[data-highlighted]');
      if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  render() {
    const filteredOptions = this.controller.filteredOptions;
    const highlightIndex = this.controller.highlightIndex;
    const isLoading = this.controller.loading;
    
    return html`
      <div class="autocomplete-container">
        <input
          part="input"
          type="text"
          .value=${this.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded=${this.isOpen}
          aria-controls="listbox"
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeydown}
        />
        
        <div 
          part="overlay" 
          class="overlay"
          ?data-open=${this.isOpen}
        >
          <div 
            part="listbox" 
            class="listbox" 
            role="listbox" 
            id="listbox"
            tabindex="-1"
            aria-busy=${isLoading}
          >
            <div 
              part="spinner" 
              class="spinner"
              ?data-loading=${isLoading}
            ></div>
            
            ${!isLoading && filteredOptions.length === 0 
              ? html`<div part="empty-message" class="empty-message">No results found</div>` 
              : ''}
            
            ${!isLoading && filteredOptions.map((item, index) => {
              const isHighlighted = index === highlightIndex;
              const itemLabel = this.controller.highlightMatches(item.label, this.value);
              
              return html`
                <div
                  part="option"
                  class="option"
                  role="option"
                  ?data-highlighted=${isHighlighted}
                  ?data-selected=${item.label === this.value}
                  aria-selected=${item.label === this.value}
                  aria-disabled=${item.disabled || false}
                  @click=${() => this.handleOptionClick(item)}
                >
                  ${unsafeHTML(itemLabel)}
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * Define the custom element
 */
export const defineAeAutocomplete = () => {
  if (!customElements.get('ae-autocomplete')) {
    customElements.define('ae-autocomplete', AeAutocomplete);
  }
};

// Add to global HTMLElementTagNameMap
declare global {
  interface HTMLElementTagNameMap {
    'ae-autocomplete': AeAutocomplete;
  }
}