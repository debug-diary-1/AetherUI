import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { menuItemStyles } from './item-styles';

/**
 * A menu item component to be used within ae-menu.
 *
 * @element ae-menu-item
 *
 * @property {boolean} disabled - Whether the menu item is disabled
 * @property {string} value - The value associated with this menu item
 *
 * @fires {CustomEvent<{value: string}>} ae-menu-select - Fired when the menu item is selected
 *
 * @slot - The menu item content
 * @slot prefix - Content to display before the menu item text
 * @slot suffix - Content to display after the menu item text
 *
 * @csspart base - The component's base wrapper
 * @csspart prefix - The prefix slot container
 * @csspart label - The label container
 * @csspart suffix - The suffix slot container
 *
 * @example
 * ```html
 * <ae-menu-item>Edit</ae-menu-item>
 * <ae-menu-item value="copy">Copy</ae-menu-item>
 * <ae-menu-item disabled>Delete</ae-menu-item>
 * ```
 */
@customElement('ae-menu-item')
export class AeMenuItem extends LitElement {
  static styles = menuItemStyles;

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: String })
  accessor value = '';

  private handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.dispatchEvent(new CustomEvent('ae-menu-select', {
      detail: { value: this.value || this.textContent?.trim() || '' },
      bubbles: true,
      composed: true,
    }));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  render() {
    return html`
      <div
        part="base"
        class="menu-item"
        role="menuitem"
        tabindex="${this.disabled ? '-1' : '0'}"
        ?aria-disabled="${this.disabled}"
        @click="${this.handleClick}"
        @keydown="${this.handleKeyDown}"
      >
        <slot name="prefix" part="prefix"></slot>
        <span part="label" class="menu-item-label">
          <slot></slot>
        </span>
        <slot name="suffix" part="suffix"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-menu-item': AeMenuItem;
  }
}
