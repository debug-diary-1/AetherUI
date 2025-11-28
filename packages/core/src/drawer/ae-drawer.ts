import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { drawerStyles } from './styles';

/**
 * A drawer component that slides in from the edge of the screen.
 *
 * @element ae-drawer
 *
 * @property {boolean} open - Whether the drawer is open
 * @property {string} placement - Which side the drawer appears from (left, right, top, bottom)
 * @property {boolean} closable - Whether the drawer can be closed by the user
 * @property {boolean} backdrop - Whether to show a backdrop behind the drawer
 * @property {string} size - The size of the drawer (sm, md, lg, full)
 *
 * @fires {CustomEvent<void>} ae-drawer-open - Fired when the drawer opens
 * @fires {CustomEvent<void>} ae-drawer-close - Fired when the drawer closes
 *
 * @slot header - The drawer header content
 * @slot - The drawer body content
 * @slot footer - The drawer footer content
 *
 * @csspart backdrop - The backdrop overlay
 * @csspart panel - The drawer panel container
 * @csspart header - The header section
 * @csspart close-button - The close button
 * @csspart body - The body section
 * @csspart footer - The footer section
 *
 * @example
 * ```html
 * <ae-drawer open placement="right">
 *   <h2 slot="header">Drawer Title</h2>
 *   <div>Drawer content goes here</div>
 *   <div slot="footer">
 *     <button>Close</button>
 *   </div>
 * </ae-drawer>
 * ```
 */
@customElement('ae-drawer')
export class AeDrawer extends LitElement {
  static styles = drawerStyles;

  @property({ type: Boolean, reflect: true })
  accessor open = false;

  @property({ type: String, reflect: true })
  accessor placement: 'left' | 'right' | 'top' | 'bottom' = 'right';

  @property({ type: Boolean, reflect: true })
  accessor closable = true;

  @property({ type: Boolean, reflect: true })
  accessor backdrop = true;

  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' | 'full' = 'md';

  @query('[part="panel"]')
  private accessor panel!: HTMLElement;

  @state()
  private accessor previousActiveElement: HTMLElement | null = null;

  @state()
  private accessor focusableElements: HTMLElement[] = [];

  private _handleKeyDown = this.handleKeyDown.bind(this);
  private _handleBackdropClick = this.handleBackdropClick.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    if (this.open) {
      this.restoreFocus();
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
    // Store the currently focused element
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Setup focus trap
    requestAnimationFrame(() => {
      this.setupFocusTrap();
      this.focusFirstElement();
    });

    this.dispatchEvent(new CustomEvent('ae-drawer-open', {
      bubbles: true,
      composed: true,
    }));
  }

  private handleClose() {
    this.restoreFocus();

    this.dispatchEvent(new CustomEvent('ae-drawer-close', {
      bubbles: true,
      composed: true,
    }));
  }

  private setupFocusTrap() {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];

    // Collect focusable elements from both light DOM (slotted content) and shadow DOM (close button)
    const lightDomElements = Array.from(
      this.querySelectorAll(focusableSelectors.join(','))
    ) as HTMLElement[];

    const shadowDomElements = Array.from(
      this.shadowRoot!.querySelectorAll(focusableSelectors.join(','))
    ) as HTMLElement[];

    this.focusableElements = [...shadowDomElements, ...lightDomElements];
  }

  private focusFirstElement() {
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    } else {
      this.panel?.focus();
    }
  }

  private restoreFocus() {
    if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
      this.previousActiveElement.focus();
    }
    this.previousActiveElement = null;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.open) return;

    if (event.key === 'Escape' && this.closable) {
      event.preventDefault();
      this.close();
    }

    if (event.key === 'Tab') {
      this.handleTabKey(event);
    }
  }

  private handleTabKey(event: KeyboardEvent) {
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget && this.closable) {
      this.close();
    }
  }

  private handleCloseClick() {
    this.close();
  }

  public show() {
    this.open = true;
  }

  public close() {
    this.open = false;
  }

  render() {
    if (!this.open) return null;

    return html`
      ${this.backdrop ? html`
        <div
          part="backdrop"
          class="drawer-backdrop"
          @click="${this._handleBackdropClick}"
        ></div>
      ` : ''}

      <div
        part="panel"
        class="drawer-panel"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
      >
        ${this.closable ? html`
          <button
            part="close-button"
            class="drawer-close"
            @click="${this.handleCloseClick}"
            aria-label="Close drawer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        ` : ''}

        <slot name="header" part="header" class="drawer-header"></slot>

        <div part="body" class="drawer-body">
          <slot></slot>
        </div>

        <slot name="footer" part="footer" class="drawer-footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-drawer': AeDrawer;
  }
}
