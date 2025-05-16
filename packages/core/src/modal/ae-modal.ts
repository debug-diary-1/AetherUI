import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { modalStyles } from './styles';

/**
 * @element ae-modal
 * @summary A modal dialog component with backdrop and focus management
 * @fires {CustomEvent} ae-open - Fired when the modal opens
 * @fires {CustomEvent} ae-close - Fired when the modal closes
 * 
 * @example
 * ```html
 * <ae-modal>
 *   <h2 slot="header">Modal Title</h2>
 *   <div slot="body">Modal content goes here</div>
 *   <div slot="footer">
 *     <button>Close</button>
 *   </div>
 * </ae-modal>
 * ```
 */
@customElement('ae-modal')
export class AeModal extends LitElement {
  static styles = modalStyles;

  @property({ type: Boolean, reflect: true })
  accessor open = false;

  @property({ type: Boolean, reflect: true })
  accessor closable = true;

  @property({ type: Boolean, reflect: true })
  accessor backdrop = true;

  @property({ type: String })
  accessor size: 'small' | 'medium' | 'large' = 'medium';

  private accessor panel!: HTMLElement;
  private previousActiveElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.openModal();
      } else {
        this.closeModal();
      }
    }
  }

  private openModal() {
    // Save current focus
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Set up focus trap
    requestAnimationFrame(() => {
      this.panel = this.renderRoot.querySelector('[part="panel"]') as HTMLElement;
      this.focusableElements = Array.from(
        this.panel.querySelectorAll(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      // Focus first focusable element or panel itself
      const firstFocusable = this.focusableElements[0];
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        this.panel.focus();
      }
    });

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    this.dispatchEvent(new CustomEvent('ae-open', {
      bubbles: true,
      composed: true,
    }));
  }

  private closeModal() {
    // Restore focus
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }

    // Restore body scroll
    document.body.style.overflow = '';

    this.dispatchEvent(new CustomEvent('ae-close', {
      bubbles: true,
      composed: true,
    }));
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.open) return;

    switch (event.key) {
      case 'Escape':
        if (this.closable) {
          this.open = false;
        }
        break;

      case 'Tab': {
        if (!this.focusableElements.length) return;

        const firstFocusable = this.focusableElements[0];
        const lastFocusable = this.focusableElements[this.focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
        break;
      }
    }
  };

  private handleBackdropClick = (event: MouseEvent) => {
    if (this.closable && event.target === event.currentTarget) {
      this.open = false;
    }
  };

  render() {
    if (!this.open) return null;

    return html`
      <div
        part="backdrop"
        class="backdrop"
        ?backdrop="${this.backdrop}"
        @click="${this.handleBackdropClick}"
      >
        <div
          part="panel"
          class="panel"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          data-size="${this.size}"
        >
          <div part="header" class="header">
            <slot name="header"></slot>
            ${this.closable ? html`
              <button
                part="close-button"
                class="close-button"
                aria-label="Close dialog"
                @click="${() => this.open = false}"
              >
                <svg
                  part="close-icon"
                  class="close-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ` : null}
          </div>

          <div part="body" class="body">
            <slot name="body"></slot>
          </div>

          <div part="footer" class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-modal': AeModal;
  }
} 
