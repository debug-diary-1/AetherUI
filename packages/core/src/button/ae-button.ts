import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { buttonStyles } from './styles';
// Icons are available for use if needed
// import { plusIcon, arrowRightIcon, editIcon, deleteIcon } from './icons';

/**
 * Primary action trigger with variants (primary, secondary, ghost, icon‑only) and sizes (sm, md, lg).
 * 
 * @element ae-button
 * 
 * @property {'primary' | 'secondary' | 'ghost'} variant - Visual style of the button (defaults to 'primary')
 * @property {'sm' | 'md' | 'lg'} size - Size of the button affecting padding and font-size (defaults to 'md')
 * @property {boolean} disabled - Whether the button is disabled and cannot be interacted with
 * @property {'start' | 'end'} iconPosition - Position of the icon relative to the label (defaults to 'start')
 * @property {boolean} iconOnly - Whether the button contains only an icon (auto-detected, but can be set manually)
 * 
 * @fires {CustomEvent<{sourceEvent: Event}>} ae-button-click - Fired when the button is clicked and not disabled
 * 
 * @slot - Button label text (default slot)
 * @slot icon - Icon content (SVG or other icon element)
 * 
 * @csspart base - The button element itself
 * @csspart label - Text wrapper element for the default slot content
 * @csspart icon - The icon wrapper element
 * 
 * @cssproperty --ae-button-bg-primary - Primary button background color (default: #5e7ce2)
 * @cssproperty --ae-button-fg-primary - Primary button text color (default: white)
 * @cssproperty --ae-button-bg-primary-hover - Primary button hover background color (default: #4b69c8)
 * @cssproperty --ae-button-bg-secondary - Secondary button background color (default: #f3f4f6)
 * @cssproperty --ae-button-fg-secondary - Secondary button text color (default: #333333)
 * @cssproperty --ae-button-bg-secondary-hover - Secondary button hover background color (default: #e5e7eb)
 * @cssproperty --ae-button-bg-ghost - Ghost button background color (default: transparent)
 * @cssproperty --ae-button-fg-ghost - Ghost button text color (default: #5e7ce2)
 * @cssproperty --ae-button-bg-ghost-hover - Ghost button hover background color (default: rgba(94, 124, 226, 0.08))
 * @cssproperty --ae-button-radius - Button border radius (default: 0.375rem)
 * @cssproperty --ae-button-padding-x - Horizontal padding (default: 1rem)
 * @cssproperty --ae-button-padding-y - Vertical padding (default: 0.5rem)
 * @cssproperty --ae-button-gap - Space between icon and label (default: 0.5rem)
 * @cssproperty --ae-button-transition-duration - Transition duration for hover effects (default: 200ms)
 * @cssproperty --ae-button-transition-timing - Transition timing function (default: ease)
 * 
 * @example
 * ```html
 * <ae-button variant="primary">Click me</ae-button>
 * ```
 * 
 * @example
 * ```html
 * <ae-button variant="secondary" size="lg">
 *   <svg slot="icon" width="20" height="20">...</svg>
 *   Save Document
 * </ae-button>
 * ```
 * 
 * @example
 * ```html
 * <ae-button icon-only aria-label="Settings">
 *   <svg slot="icon" width="20" height="20">...</svg>
 * </ae-button>
 * ```
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

  /**
   * Whether to use unstyled/headless mode (no default styles)
   */
  @property({ type: Boolean, reflect: true })
  accessor unstyled = false;

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
        if (!this.hasAttribute('aria-label') && !this.hasAttribute('aria-labelledby')) {
          if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).__DEV__) {
            console.warn('ae-button: icon-only button should have an aria-label or aria-labelledby attribute for accessibility.');
          }
        }
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-button': AeButton;
  }
} 