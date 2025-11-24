import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ComboController } from './controller';
import type { ComboFilterFunction, ComboItem } from './types';
import { comboStyles } from './styles';

/**
 * Aether UI Combobox Component 
 * 
 * An autocomplete dropdown that allows free-text input or selection 
 * from a filtered list, following the ARIA Listbox Combobox pattern.
 * 
 * @element ae-combo
 * 
 * @property {(string|ComboItem)[]} items - Items to display in the dropdown
 * @property {string} value - Current input value (controlled)
 * @property {string} placeholder - Placeholder text for the input
 * @property {boolean} disabled - Whether the input is disabled
 * @property {boolean} freeInput - Whether user can enter values not in the list
 * @property {ComboFilterFunction} filterFn - Custom filter function
 * 
 * @fires {CustomEvent<{value: string, item: ComboItem | null}>} ae-combo-select - Fired when an item is selected
 * @fires {CustomEvent<{value: string}>} ae-combo-input - Fired on each keystroke
 * 
 * @slot - Default slot (not used)
 * 
 * @csspart input - Text input field
 * @csspart caret - Dropdown arrow icon wrapper
 * @csspart overlay - Positioned wrapper for the popup
 * @csspart listbox - Scroll container
 * @csspart option - Each list option
 * @csspart highlight - Query match highlights
 * 
 * @cssproperty --ae-combo-border - Input border color
 * @cssproperty --ae-combo-radius - Corner radius of input & listbox
 * @cssproperty --ae-combo-bg - Input background
 * @cssproperty --ae-combo-fg - Text color
 * @cssproperty --ae-combo-option-hover-bg - Hover/active option background
 * @cssproperty --ae-combo-option-selected-bg - Selected option background
 * @cssproperty --ae-combo-option-selected-fg - Selected option text color
 * @cssproperty --ae-combo-shadow - Overlay shadow
 */
export class AeCombo extends LitElement {
  static styles = comboStyles;

  /**
   * Private controller for managing filtered items and highlighting
   */
  private controller = new ComboController(this);

  /**
   * Items to display in the dropdown
   */
  @property({ type: Array })
  set items(value: (string | ComboItem)[]) {
    this.controller.items = value;
  }
  get items(): ComboItem[] {
    return this.controller.items;
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
   * Whether the input is disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Whether user can enter values not in the list
   */
  @property({ type: Boolean, attribute: 'free-input' })
  freeInput = true;

  /**
   * Custom filter function
   */
  @property({ attribute: false })
  set filterFn(fn: ComboFilterFunction) {
    this.controller.filterFn = fn;
  }
  get filterFn(): ComboFilterFunction {
    return this.controller.filterFn;
  }

  /**
   * Whether the dropdown is open
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
   * Handle input changes
   */
  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.controller.filter(input.value);
    
    // Always open dropdown when typing unless disabled
    if (!this.disabled) {
      this.isOpen = true;
      
      // If typing but no value, still show all options
      if (!input.value) {
        this.controller.filter('');
      }
    }
    
    this.dispatchEvent(new CustomEvent('ae-combo-input', {
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
  private handleOptionClick(item: ComboItem) {
    if (item.disabled) return;
    
    this.selectItem(item);
  }

  /**
   * Select an item and update input
   */
  private selectItem(item: ComboItem) {
    this.value = item.label;
    this.inputElement.value = item.label;
    this.isOpen = false;
    
    this.dispatchEvent(new CustomEvent('ae-combo-select', {
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
          } else if (this.freeInput) {
            // Allow free input if enabled
            this.isOpen = false;
            this.dispatchEvent(new CustomEvent('ae-combo-select', {
              detail: { value: this.value, item: null },
              bubbles: true,
              composed: true
            }));
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
    const highlighted = this.listboxElement?.querySelector('.option[data-highlighted]');
    if (highlighted) {
      highlighted.scrollIntoView({ block: 'nearest' });
    }
  }

  /**
   * Toggle the dropdown
   */
  private toggleDropdown() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.inputElement.focus();
      }
    }
  }

  /**
   * Component connected callback
   */
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick);
  }

  /**
   * Component disconnected callback
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  render() {
    const filteredItems = this.controller.filteredItems;
    const highlightIndex = this.controller.highlightIndex;
    
    return html`
      <div class="combo-container">
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
        
        <span 
          part="caret" 
          class="caret"
          ?data-expanded=${this.isOpen}
          @click=${this.toggleDropdown}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
        
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
          >
            ${filteredItems.length === 0 
              ? html`<div part="empty-message" class="empty-message">No results found</div>` 
              : filteredItems.map((item, index) => {
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
                })
            }
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * Define the custom element
 */
export const defineAeCombo = () => {
  if (!customElements.get('ae-combo')) {
    customElements.define('ae-combo', AeCombo);
  }
};