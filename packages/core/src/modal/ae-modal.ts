import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { modalStyles } from './styles';

/**
 * A modal dialog component with backdrop, focus management, and accessibility features.
 * 
 * @element ae-modal
 * 
 * @property {boolean} open - Whether the modal is open
 * @property {boolean} closable - Whether the modal can be closed by the user (shows close button, allows Escape key)
 * @property {boolean} backdrop - Whether to show a backdrop behind the modal
 * @property {'small' | 'medium' | 'large'} size - The size of the modal panel
 * 
 * @fires {CustomEvent} ae-modal-open - Fired when the modal opens
 * @fires {CustomEvent} ae-modal-close - Fired when the modal closes
 * @fires {CustomEvent} ae-open - Fired when the modal opens
 * @deprecated The ae-open event is deprecated. Use ae-modal-open instead.
 * @fires {CustomEvent} ae-close - Fired when the modal closes
 * @deprecated The ae-close event is deprecated. Use ae-modal-close instead.
 * 
 * @slot header - The modal header content
 * @slot body - The modal body content
 * @slot footer - The modal footer content (typically action buttons)
 * 
 * @csspart backdrop - The backdrop overlay
 * @csspart panel - The modal panel container
 * @csspart header - The header section
 * @csspart close-button - The close button in the header
 * @csspart close-icon - The close icon SVG
 * @csspart body - The body section
 * @csspart footer - The footer section
 * 
 * @cssproperty --ae-modal-backdrop-bg - The backdrop background color
 * @cssproperty --ae-modal-panel-bg - The panel background color
 * @cssproperty --ae-modal-panel-shadow - The panel box shadow
 * @cssproperty --ae-modal-panel-radius - The panel border radius
 * @cssproperty --ae-modal-panel-padding - The panel padding
 * @cssproperty --ae-modal-header-padding - The header padding
 * @cssproperty --ae-modal-body-padding - The body padding
 * @cssproperty --ae-modal-footer-padding - The footer padding
 * @cssproperty --ae-modal-max-width-small - Maximum width for small size
 * @cssproperty --ae-modal-max-width-medium - Maximum width for medium size
 * @cssproperty --ae-modal-max-width-large - Maximum width for large size
 * 
 * @example
 * ```html
 * <ae-modal open>
 *   <h2 slot="header">Modal Title</h2>
 *   <div slot="body">Modal content goes here</div>
 *   <div slot="footer">
 *     <button>Close</button>
 *   </div>
 * </ae-modal>
 * 
 * <ae-modal size="small" closable="false">
 *   <span slot="header">Confirmation</span>
 *   <p slot="body">Are you sure?</p>
 *   <div slot="footer">
 *     <button>Yes</button>
 *     <button>No</button>
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

    // Dispatch the new standard event
    this.dispatchEvent(new CustomEvent('ae-modal-open', {
      bubbles: true,
      composed: true,
    }));
    
    // Also dispatch the old event for backward compatibility
    // @deprecated Use ae-modal-open instead
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

    // Dispatch the new standard event
    this.dispatchEvent(new CustomEvent('ae-modal-close', {
      bubbles: true,
      composed: true,
    }));
    
    // Also dispatch the old event for backward compatibility
    // @deprecated Use ae-modal-close instead
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
