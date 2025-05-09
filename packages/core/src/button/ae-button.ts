import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { buttonStyles } from './styles';
// Icons are available for use if needed
// import { plusIcon, arrowRightIcon, editIcon, deleteIcon } from './icons';

/**
 * Primary action trigger with variants (primary, secondary, ghost, icon‑only) and sizes (sm, md, lg).
 * @element ae-button
 * 
 * @property {string} variant - Visual style token mapping ('primary' | 'secondary' | 'ghost')
 * @property {string} size - Applied to padding & font‑size ('sm' | 'md' | 'lg')
 * @property {boolean} disabled - Native disable state
 * @property {string} iconPosition - Position of the icon ('start' | 'end')
 * @property {boolean} iconOnly - Whether the button contains only an icon
 * 
 * @fires {CustomEvent} ae-button-click - Fired when the button is clicked and not disabled
 * 
 * @slot - Button label text (default slot)
 * @slot icon - Icon content
 * 
 * @csspart base - The button element
 * @csspart label - Text wrapper element
 * @csspart icon - The icon wrapper
 * 
 * @cssproperty --ae-button-bg-primary - Primary button background color
 * @cssproperty --ae-button-fg-primary - Primary button text color
 * @cssproperty --ae-button-bg-secondary - Secondary button background color
 * @cssproperty --ae-button-fg-secondary - Secondary button text color
 * @cssproperty --ae-button-bg-ghost - Ghost button background color
 * @cssproperty --ae-button-fg-ghost - Ghost button text color
 * @cssproperty --ae-button-radius - Corner radius
 * @cssproperty --ae-button-padding-x - Horizontal padding
 * @cssproperty --ae-button-padding-y - Vertical padding
 * @cssproperty --ae-button-gap - Space between icon and label
 */
export class AeButton extends LitElement {
  static styles = buttonStyles;

  /**
   * The visual style of the button
   * @type {'primary' | 'secondary' | 'ghost'}
   */
  @property({ type: String, reflect: true })
  accessor variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  /**
   * The size of the button
   * @type {'sm' | 'md' | 'lg'}
   */
  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the button is disabled
   */
  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  /**
   * The position of the icon relative to the label
   * @type {'start' | 'end'}
   */
  @property({ type: String, reflect: true, attribute: 'icon-position' })
  accessor iconPosition: 'start' | 'end' = 'start';

  /**
   * Whether the button contains only an icon
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-only' })
  accessor iconOnly = false;

  render() {
    return html`
      <button
        part="base"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot name="icon" part="icon"></slot>
        <span part="label"><slot></slot></span>
      </button>
    `;
  }

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    // Dispatch standardized event
    this.dispatchEvent(new CustomEvent('ae-button-click', {
      bubbles: true,
      composed: true,
      detail: {
        sourceEvent: e
      }
    }));
  }

  /** @internal */
  connectedCallback() {
    super.connectedCallback();
    // Check if we have an icon slot but no default slot
    this.updateComplete.then(() => {
      const hasIcon = this.querySelector('[slot="icon"]') !== null;
      const hasLabel = Array.from(this.childNodes).some(node => {
        if (node.nodeType === Node.TEXT_NODE) return node.textContent?.trim() !== '';
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          return !element.hasAttribute('slot');
        }
        return false;
      });
      
      if (hasIcon && !hasLabel) {
        this.iconOnly = true;
        // Ensure accessibility
        if (!this.hasAttribute('aria-label') && !this.hasAttribute('aria-labelledby')) {
          console.warn('Icon-only buttons should have an aria-label or aria-labelledby attribute for accessibility');
        }
      }
    });
  }
} 