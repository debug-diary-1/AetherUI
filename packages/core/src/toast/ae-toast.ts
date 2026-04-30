import { LitElement, html, nothing, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toastStyles } from './styles';

/**
 * Type of toast variant
 */
export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Type of toast placement
 */
export type ToastPlacement = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';

/**
 * Source of toast close action
 */
export type ToastCloseSource = 'timeout' | 'closeButton' | 'keyboard';

/**
 * @element ae-toast
 * @summary Ephemeral non-modal notifications that appear and disappear automatically
 * @fires {CustomEvent} ae-close - Fired when the toast is closed
 * @fires {CustomEvent} ae-click - Fired when the toast is clicked
 *
 * @example
 * ```html
 * <ae-toast variant="success" duration="3000">Operation successful!</ae-toast>
 * ```
 *
 * @slot - Default slot for the message content
 * @slot icon - Custom icon
 *
 * @csspart toast - Main container
 * @csspart icon - Icon element
 * @csspart content - Message text wrapper
 * @csspart close - Close button
 * @csspart progress - Animated time remaining bar
 */
@customElement('ae-toast')
export class AeToast extends LitElement {
  static styles: CSSResult = toastStyles;

  /**
   * Toast message (falls back to slot content if not provided)
   */
  @property({ type: String })
  accessor message = '';

  /**
   * Visual style of the toast
   */
  @property({ type: String, reflect: true })
  accessor variant: ToastVariant = 'info';

  /**
   * Size of the toast
   */
  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the toast is visible
   */
  @property({ type: Boolean, reflect: true })
  accessor open = true;

  /**
   * Auto-dismiss duration in milliseconds (0 = sticky)
   */
  @property({ type: Number })
  accessor duration = 5000;

  /**
   * Position on the screen
   */
  @property({ type: String })
  accessor placement: ToastPlacement = 'bottom-right';

  /**
   * Pause the auto-dismiss timer when hovering
   */
  @property({ type: Boolean })
  accessor pauseOnHover = true;

  /**
   * Internal countdown state
   */
  private _timeLeft = 0;
  private _timer: number | null = null;
  private _startTime = 0;
  private _isPaused = false;

  connectedCallback() {
    super.connectedCallback();

    // Set ARIA attributes based on variant
    const isAlertVariant = this.variant === 'error' || this.variant === 'warning';
    this.setAttribute('role', isAlertVariant ? 'alert' : 'status');
    this.setAttribute('aria-live', isAlertVariant ? 'assertive' : 'polite');
    this.setAttribute('aria-atomic', 'true');

    // Start timer if duration > 0
    if (this.duration > 0) {
      this._timeLeft = this.duration;
      this._startTimer();
    }

    // Add event listeners for pause on hover
    if (this.pauseOnHover) {
      this.addEventListener('mouseenter', this._handleMouseEnter);
      this.addEventListener('mouseleave', this._handleMouseLeave);
    }

    // Add a class to prevent animation on first render
    // (will be removed on next frame)
    this.classList.add('no-animation');
    requestAnimationFrame(() => {
      this.classList.remove('no-animation');
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();

    // Remove event listeners
    if (this.pauseOnHover) {
      this.removeEventListener('mouseenter', this._handleMouseEnter);
      this.removeEventListener('mouseleave', this._handleMouseLeave);
    }
  }

  /**
   * Start or resume the timer
   */
  private _startTimer() {
    if (this.duration <= 0 || this._timer !== null) return;

    this._startTime = Date.now();
    this._isPaused = false;

    this._timer = window.setTimeout(() => {
      this.close('timeout');
    }, this._timeLeft);
  }

  /**
   * Pause the timer when hovering
   */
  private _handleMouseEnter = () => {
    if (this.duration <= 0 || !this.pauseOnHover) return;

    this._pauseTimer();
  };

  /**
   * Resume the timer when mouse leaves
   */
  private _handleMouseLeave = () => {
    if (this.duration <= 0 || !this.pauseOnHover) return;

    this._resumeTimer();
  };

  /**
   * Pause the countdown timer
   */
  private _pauseTimer() {
    if (this.duration <= 0 || this._timer === null || this._isPaused) return;

    // Clear the current timer
    window.clearTimeout(this._timer);
    this._timer = null;

    // Calculate time left
    const elapsed = Date.now() - this._startTime;
    this._timeLeft = Math.max(0, this._timeLeft - elapsed);
    this._isPaused = true;
  }

  /**
   * Resume the countdown timer
   */
  private _resumeTimer() {
    if (this.duration <= 0 || !this._isPaused) return;
    this._startTimer();
  }

  /**
   * Clear the timer
   */
  private _clearTimer() {
    if (this._timer !== null) {
      window.clearTimeout(this._timer);
      this._timer = null;
    }
  }

  /**
   * Public method to close the toast
   * @param source The source of the close action
   */
  close(source: ToastCloseSource = 'closeButton') {
    this._clearTimer();
    this.open = false;

    // Set an exiting attribute to trigger animation
    this.setAttribute('exiting', '');

    // Dispatch close event with source info
    this.dispatchEvent(
      new CustomEvent('ae-close', {
        bubbles: true,
        composed: true,
        detail: { source },
      }),
    );
  }

  /**
   * Handle close button click
   */
  private _handleCloseClick(e: Event) {
    e.stopPropagation(); // Prevent toast click event
    this.close('closeButton');
  }

  /**
   * Handle key events
   */
  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.close('keyboard');
    }
  }

  /**
   * Handle toast click
   */
  private _handleClick(e: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent('ae-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      }),
    );
  }

  /**
   * Get default icon based on variant
   */
  private _getDefaultIcon() {
    if (this.querySelector('[slot="icon"]')) {
      return html`<slot name="icon"></slot>`;
    }

    const iconMap = {
      info: html`<svg part="icon" viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
        />
      </svg>`,
      success: html`<svg part="icon" viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        />
      </svg>`,
      warning: html`<svg part="icon" viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
      </svg>`,
      error: html`<svg part="icon" viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
        />
      </svg>`,
    };

    return iconMap[this.variant];
  }

  render() {
    if (!this.open) return nothing;

    // Convert duration to seconds for CSS
    const durationInSeconds = this.duration / 1000;
    const showProgress = this.duration > 0;

    return html`
      <div
        part="toast"
        tabindex="0"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
        style=${showProgress ? `--ae-toast-duration: ${durationInSeconds}s` : ''}
      >
        ${this._getDefaultIcon()}

        <span part="content">
          <slot>${this.message}</slot>
        </span>

        <button part="close" aria-label="Close" @click=${this._handleCloseClick}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path
              fill="currentColor"
              d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"
            />
          </svg>
        </button>

        ${showProgress ? html`<div part="progress"></div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-toast': AeToast;
  }
}
