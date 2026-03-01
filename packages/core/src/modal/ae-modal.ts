import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
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
 * @cssproperty --ae-modal-width - The modal width (default: 32rem)
 * @cssproperty --ae-modal-max-width - Maximum width (default: calc(100vw - 2rem))
 * @cssproperty --ae-modal-height - The modal height (default: auto)
 * @cssproperty --ae-modal-max-height - Maximum height (default: calc(100vh - 2rem))
 * @cssproperty --ae-modal-background - The panel background color
 * @cssproperty --ae-modal-text-color - The text color
 * @cssproperty --ae-modal-border-radius - The panel border radius
 * @cssproperty --ae-modal-padding - The panel padding
 * @cssproperty --ae-modal-shadow - The panel box shadow
 * @cssproperty --ae-modal-backdrop-color - The backdrop background color
 * @cssproperty --ae-modal-backdrop-blur - The backdrop blur amount
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
 * ```
 */
@customElement('ae-modal')
export class AeModal extends LitElement {
  static styles = [
    modalStyles,
    css`
      /* Additional styles for body scroll lock */
      :host([open]) {
        /* Signal to consuming app that modal is open */
        --ae-modal-is-open: 1;
      }
    `
  ];

  @property({ type: Boolean, reflect: true })
  accessor open = false;

  @property({ type: Boolean, reflect: true })
  accessor closable = true;

  @property({ type: Boolean, reflect: true })
  accessor backdrop = true;

  @property({ type: String })
  accessor size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel: string | null = null;

  @query('[part="panel"]')
  private accessor panel!: HTMLElement;

  @state()
  private accessor previousActiveElement: HTMLElement | null = null;

  @state()
  private accessor focusableElements: HTMLElement[] = [];

  // Bind event handlers to preserve context
  private _handleKeyDown = this.handleKeyDown.bind(this);
  private _handleBackdropClick = this.handleBackdropClick.bind(this);

  connectedCallback() {
    super.connectedCallback();
    // Only add listener to this element, not document
    this.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    
    // Clean up if modal is still open
    if (this.open) {
      this.restoreFocus();
      this.emitCloseEvent();
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('open')) {
      if (this.open) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    }
  }

  private handleOpen() {
    // Save current focus
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Set up focus trap after render
    this.updateComplete.then(() => {
      this.setupFocusTrap();
      this.emitOpenEvent();
    });
  }

  private handleClose() {
    this.restoreFocus();
    this.emitCloseEvent();
  }

  private setupFocusTrap() {
    if (!this.panel) return;

    // Find all focusable elements
    this.focusableElements = Array.from(
      this.panel.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    // Focus first focusable element or panel itself
    const firstFocusable = this.focusableElements[0];
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      this.panel.focus();
    }
  }

  private restoreFocus() {
    if (this.previousActiveElement && this.previousActiveElement.focus) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
  }

  private getDeepActiveElement(): Element | null {
    let active = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.open) return;

    switch (event.key) {
      case 'Escape':
        if (this.closable) {
          event.preventDefault();
          event.stopPropagation();
          this.open = false;
        }
        break;

      case 'Tab': {
        if (!this.focusableElements.length) return;

        const firstFocusable = this.focusableElements[0];
        const lastFocusable = this.focusableElements[this.focusableElements.length - 1];
        const activeElement = this.getDeepActiveElement();

        if (event.shiftKey && activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        } else if (!event.shiftKey && activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
        break;
      }
    }
  }

  private handleBackdropClick(event: MouseEvent) {
    if (this.closable && event.target === event.currentTarget) {
      this.open = false;
    }
  }

  private handleCloseClick() {
    if (this.closable) {
      this.open = false;
    }
  }

  private emitOpenEvent() {
    this.dispatchEvent(new CustomEvent('ae-modal-open', {
      bubbles: true,
      composed: true,
    }));
  }

  private emitCloseEvent() {
    this.dispatchEvent(new CustomEvent('ae-modal-close', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    if (!this.open) return nothing;

    return html`
      <div
        part="backdrop"
        class="backdrop"
        ?hidden="${!this.backdrop}"
        @click="${this._handleBackdropClick}"
      >
        <div
          part="panel"
          class="panel"
          role="dialog"
          aria-modal="true"
          aria-label="${this.ariaLabel || 'Dialog'}"
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
                @click="${this.handleCloseClick}"
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