import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { alertStyles } from './styles';

/**
 * @element ae-alert
 * @summary Non-modal, in-flow banner for status or messaging
 * @fires {CustomEvent} ae-close - Fired when the alert is closed
 *
 * @example
 * ```html
 * <ae-alert variant="success">Operation completed successfully!</ae-alert>
 * ```
 */
@customElement('ae-alert')
export class AeAlert extends LitElement {
  static styles = alertStyles;

  /**
   * Visual theme of the alert
   */
  @property({ type: String, reflect: true })
  accessor variant: 'info' | 'success' | 'warning' | 'error' = 'info';

  /**
   * Size of the alert
   */
  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the alert can be closed
   */
  @property({ type: Boolean, reflect: true })
  accessor closable = false;

  /**
   * Control visibility
   */
  @property({ type: Boolean, reflect: true })
  accessor open: boolean = true;

  /**
   * Handle close button click
   */
  private handleClose() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('ae-close', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Get appropriate ARIA role based on variant
   */
  private _getRole(): string {
    return this.variant === 'info' ? 'status' : 'alert';
  }

  /**
   * Get default icon based on variant if no icon is slotted
   */
  private _getDefaultIcon() {
    if (!this.querySelector('[slot="icon"]')) {
      const iconMap = {
        info: html`<svg part="icon" viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
          />
        </svg>`,
        success: html`<svg part="icon" viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>`,
        warning: html`<svg part="icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>`,
        error: html`<svg part="icon" viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>`,
      };

      return iconMap[this.variant];
    }

    return html`<slot name="icon"></slot>`;
  }

  render() {
    if (!this.open) return nothing;

    return html`
      <section part="base" role=${this._getRole()}>
        ${this._getDefaultIcon()}
        <div part="content">
          <slot></slot>
        </div>
        ${this.closable
          ? html`
              <button part="close" aria-label="Close" @click=${this.handleClose}>
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path
                    fill="currentColor"
                    d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"
                  />
                </svg>
              </button>
            `
          : ''}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-alert': AeAlert;
  }
}
