import { ReactiveController, ReactiveElement } from 'lit';

/**
 * A controller that implements roving tabindex keyboard navigation
 * for dropdown and menu components
 */
export class KeyboardController implements ReactiveController {
  private host: ReactiveElement;
  private menuElement: HTMLElement | null = null;
  private items: HTMLElement[] = [];
  private activeIndex: number = -1;
  private typeaheadBuffer: string = '';
  private typeaheadTimeout: number | null = null;

  constructor(host: ReactiveElement) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    // No-op - we'll set up listeners when the menu is opened
  }

  hostDisconnected() {
    this.cleanup();
  }

  /**
   * Set the menu element to control
   */
  setMenu(menu: HTMLElement | null) {
    if (!menu) {
      this.cleanup();
      return;
    }

    this.menuElement = menu;
    this.refresh();
    
    // Set up keyboard event listeners
    this.menuElement.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Refresh the list of items and reset the active index
   */
  refresh() {
    if (!this.menuElement) return;
    
    // Get all menu items with role="menuitem"
    this.items = Array.from(
      this.menuElement.querySelectorAll('[role="menuitem"]')
    ) as HTMLElement[];
    
    // Set initial active item if none is set
    if (this.activeIndex === -1 && this.items.length > 0) {
      this.setActiveItem(0);
    }
  }

  /**
   * Set the active item by index
   */
  setActiveItem(index: number) {
    // Remove active state from current item
    if (this.activeIndex >= 0 && this.activeIndex < this.items.length) {
      const currentItem = this.items[this.activeIndex];
      currentItem.tabIndex = -1;
      currentItem.removeAttribute('data-active');
      currentItem.blur();
    }

    // Set the new active index
    this.activeIndex = index;

    // Apply active state to new item
    if (this.activeIndex >= 0 && this.activeIndex < this.items.length) {
      const newItem = this.items[this.activeIndex];
      newItem.tabIndex = 0;
      newItem.setAttribute('data-active', '');
      newItem.focus();
    }
  }

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'Home':
        event.preventDefault();
        if (this.items.length > 0) {
          this.setActiveItem(0);
        }
        break;
      case 'End':
        event.preventDefault();
        if (this.items.length > 0) {
          this.setActiveItem(this.items.length - 1);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.activeIndex >= 0 && this.activeIndex < this.items.length) {
          this.items[this.activeIndex].click();
        }
        break;
      default:
        // Type-ahead: if the key is a printable character
        if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
          this.handleTypeahead(event.key.toLowerCase());
        }
    }
  };

  /**
   * Handle type-ahead search
   */
  private handleTypeahead(char: string) {
    // Clear existing timeout
    if (this.typeaheadTimeout !== null) {
      window.clearTimeout(this.typeaheadTimeout);
    }

    // Add the character to the buffer
    this.typeaheadBuffer += char;

    // Set a timeout to clear the buffer after 500ms
    this.typeaheadTimeout = window.setTimeout(() => {
      this.typeaheadBuffer = '';
      this.typeaheadTimeout = null;
    }, 500);

    // Search for an item that starts with the typeahead buffer
    const index = this.items.findIndex(item => {
      const text = item.textContent?.trim().toLowerCase() || '';
      return text.startsWith(this.typeaheadBuffer);
    });

    // If found, set it as active
    if (index >= 0) {
      this.setActiveItem(index);
    }
  }

  /**
   * Move the active item by a relative amount
   */
  private moveActive(delta: number) {
    if (this.items.length === 0) return;

    let newIndex = this.activeIndex + delta;

    // Wrap around
    if (newIndex < 0) {
      newIndex = this.items.length - 1;
    } else if (newIndex >= this.items.length) {
      newIndex = 0;
    }

    this.setActiveItem(newIndex);
  }

  /**
   * Clean up event listeners and reset state
   */
  cleanup() {
    if (this.menuElement) {
      this.menuElement.removeEventListener('keydown', this.handleKeyDown);
    }
    
    this.menuElement = null;
    this.items = [];
    this.activeIndex = -1;
    
    if (this.typeaheadTimeout !== null) {
      window.clearTimeout(this.typeaheadTimeout);
      this.typeaheadTimeout = null;
    }
    this.typeaheadBuffer = '';
  }
} 