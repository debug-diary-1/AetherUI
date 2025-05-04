import { LitElement, html, PropertyValues, nothing, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { dropdownStyles } from './styles';
import { KeyboardController } from './keyboard';
import { updatePosition } from './positioning';
import type { Placement, Strategy } from '@floating-ui/dom';

/**
 * Dropdown menu component
 * 
 * @fires ae-open-change - When the dropdown opens or closes
 * @fires ae-select - When a menu item is selected
 * 
 * @cssprop --ae-dropdown-shadow - Overlay box shadow
 * @cssprop --ae-dropdown-radius - Corner rounding
 * @cssprop --ae-dropdown-bg - Menu background
 * @cssprop --ae-dropdown-fg - Text color
 * @cssprop --ae-dropdown-item-hover-bg - Hover state background
 * @cssprop --ae-dropdown-item-active-bg - Active/selected state background
 * @cssprop --ae-dropdown-gap - Vertical spacing between items
 */
@customElement('ae-dropdown')
export class AeDropdown extends LitElement {
  static styles = dropdownStyles;

  /**
   * Whether the dropdown is open (controlled)
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Initial open state (uncontrolled)
   */
  @property({ type: Boolean, attribute: 'default-open' })
  defaultOpen = false;

  /**
   * Menu placement relative to trigger
   */
  @property({ type: String })
  placement: Placement = 'bottom-start';

  /**
   * Positioning strategy
   */
  @property({ type: String })
  strategy: Strategy = 'absolute';

  /**
   * Whether the dropdown trigger is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Reference to the trigger element
   */
  @query('.trigger')
  private triggerEl!: HTMLElement;

  /**
   * Reference to the menu/overlay element
   */
  @query('.overlay')
  private overlayEl!: HTMLElement;

  /**
   * Reference to the menu element
   */
  @query('[role="menu"]')
  private menuEl!: HTMLElement;

  /**
   * Whether the component is operating in controlled or uncontrolled mode
   */
  @state()
  private isControlled = false;

  /**
   * Internal open state for uncontrolled usage
   */
  @state()
  private internalOpen = false;

  /**
   * Cleanup function for positioning
   */
  private positionCleanup: (() => void) | null = null;

  /**
   * Keyboard navigation controller
   */
  private keyboardController = new KeyboardController(this);

  connectedCallback() {
    super.connectedCallback();

    // Check if we're in controlled or uncontrolled mode
    this.isControlled = this.hasAttribute('open');
    
    // Initialize internal state for uncontrolled mode
    if (!this.isControlled) {
      this.internalOpen = this.defaultOpen;
    }

    // Add click outside and escape key listeners when connected
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    
    // Clean up event listeners and positioning
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyDown);
    this.cleanupPositioning();
  }

  /**
   * Handle component updates
   */
  updated(changedProps: PropertyValues) {
    // Handle open state changes
    if (changedProps.has('open') || changedProps.has('internalOpen')) {
      if (this.isOpen) {
        this.handleOpen();
      } else {
        this.cleanupPositioning();
        this.keyboardController.setMenu(null);
      }
    }
  }

  /**
   * Get the current open state (controlled or uncontrolled)
   */
  private get isOpen(): boolean {
    return this.isControlled ? this.open : this.internalOpen;
  }

  /**
   * Set up positioning and focus management when opening
   */
  private async handleOpen() {
    if (!this.overlayEl || !this.triggerEl) return;

    // Position the menu
    this.positionMenu();

    // Set up keyboard navigation
    this.keyboardController.setMenu(this.menuEl);
  }

  /**
   * Position the menu using floating-ui
   */
  private async positionMenu() {
    // Clean up any existing positioning first
    this.cleanupPositioning();

    if (!this.overlayEl || !this.triggerEl) return;

    try {
      // Dynamically import floating-ui to keep the main bundle small
      const cleanup = await updatePosition(
        this.triggerEl,
        this.overlayEl,
        this.placement,
        this.strategy
      );
      
      this.positionCleanup = cleanup as () => void;
    } catch (error) {
      console.error('Error positioning dropdown menu:', error);
    }
  }

  /**
   * Clean up positioning
   */
  private cleanupPositioning() {
    if (this.positionCleanup) {
      this.positionCleanup();
      this.positionCleanup = null;
    }
  }

  /**
   * Toggle the dropdown open state
   */
  toggleOpen(open: boolean) {
    if (this.disabled) return;
    
    if (this.isControlled) {
      // In controlled mode, emit event to let parent know state should change
      this.dispatchEvent(new CustomEvent('ae-open-change', {
        detail: { open },
        bubbles: true,
        composed: true
      }));
    } else {
      // In uncontrolled mode, update internal state
      this.internalOpen = open;
    }
  }

  /**
   * Handle trigger button click
   */
  private handleTriggerClick = (e: Event) => {
    e.stopPropagation();
    if (this.disabled) return;
    this.toggleOpen(!this.isOpen);
  };

  /**
   * Handle menu item click
   */
  private handleItemClick = (e: Event, value: string) => {
    e.stopPropagation();
    
    // Dispatch select event
    this.dispatchEvent(new CustomEvent('ae-select', {
      detail: { value },
      bubbles: true,
      composed: true
    }));
    
    // Close the dropdown
    this.toggleOpen(false);
  };

  /**
   * Close the dropdown when clicking outside
   */
  private handleClickOutside = (e: MouseEvent) => {
    if (!this.isOpen) return;
    
    // Skip if clicking inside the component
    const clickedElement = e.target as Node;
    if (this.contains(clickedElement) || this.overlayEl?.contains(clickedElement)) {
      return;
    }
    
    this.toggleOpen(false);
  };

  /**
   * Close the dropdown on Escape key
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    if (!this.isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      this.toggleOpen(false);
    }
  };

  render() {
    const isOpen = this.isOpen;

    return html`
      <div class="trigger" part="trigger" @click=${this.handleTriggerClick}>
        <slot></slot>
      </div>

      ${isOpen ? html`
        <div class="overlay" part="overlay">
          <div 
            class="menu" 
            part="menu" 
            role="menu" 
            tabindex="-1"
            aria-orientation="vertical"
          >
            <slot name="item" @click=${(e: Event) => {
              // Find the closest menuitem role
              const menuItem = (e.target as HTMLElement).closest('[role="menuitem"]');
              if (menuItem) {
                const value = menuItem.getAttribute('data-value') || '';
                this.handleItemClick(e, value);
              }
            }}></slot>
          </div>
        </div>
      ` : nothing}
    `;
  }
}

// Define ae-menu-item component for dropdown items
@customElement('ae-menu-item')
export class AeMenuItem extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }
  `;

  /**
   * Value to emit when this item is selected
   */
  @property()
  value: string = '';

  /**
   * Whether this item is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  render() {
    return html`
      <button 
        role="menuitem" 
        part="item"
        ?disabled=${this.disabled}
        data-value=${this.value}
        tabindex="-1"
      >
        <slot name="icon" part="item-icon"></slot>
        <slot></slot>
        <slot name="hint" part="item-hint"></slot>
      </button>
    `;
  }
}

// Define ae-menu-separator component for dropdown separators
@customElement('ae-menu-separator')
export class AeMenuSeparator extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }
  `;

  render() {
    return html`<hr role="separator" part="separator">`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-dropdown': AeDropdown;
    'ae-menu-item': AeMenuItem;
    'ae-menu-separator': AeMenuSeparator;
  }
} 