import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from './styles';
// Icons are available for use if needed
// import { plusIcon, arrowRightIcon, editIcon, deleteIcon } from './icons';

/**
 * Primary action trigger with variants (primary, secondary, ghost, icon‑only) and sizes (sm, md, lg).
 * @element ae-button
 * 
 * @prop {string} variant - Visual style token mapping ('primary' | 'secondary' | 'ghost')
 * @prop {string} size - Applied to padding & font‑size ('sm' | 'md' | 'lg')
 * @prop {boolean} disabled - Native disable state
 * @prop {string} iconPosition - Position of the icon ('start' | 'end')
 * 
 * @slot default - Button label
 * @slot icon - Icon content
 * 
 * @csspart base - The button element
 * @csspart label - Text wrapper element
 * @csspart icon - The icon wrapper
 */
export class AeButton extends LitElement {
  static styles = styles;

  @property({ type: String, reflect: true })
  accessor variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: String, reflect: true, attribute: 'icon-position' })
  accessor iconPosition: 'start' | 'end' = 'start';

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
        if (!this.hasAttribute('aria-label')) {
          console.warn('Icon-only buttons should have an aria-label attribute');
        }
      }
    });
  }
} 