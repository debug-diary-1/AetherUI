import { LitElement, html, css } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export class AeModal extends LitElement {
  static styles = css`
    :host {
      --ae-modal-overlay-bg: rgba(0, 0, 0, 0.5);
      --ae-modal-z-index: 1000;
      --ae-transition-duration: 200ms;
      --ae-modal-text-color: var(--ae-color-text, #1a1a1a);
      position: fixed;
      inset: 0;
      display: none;
      z-index: var(--ae-modal-z-index);
    }

    :host([open]) {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--ae-modal-overlay-bg);
      backdrop-filter: blur(4px);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--ae-transition-duration) ease,
                  visibility var(--ae-transition-duration) ease;
    }

    :host([open]) .overlay {
      opacity: 1;
      visibility: visible;
    }

    .panel {
      position: relative;
      display: flex;
      flex-direction: column;
      min-width: 20rem;
      max-width: 90vw;
      max-height: 90vh;
      background: var(--ae-color-surface, #fff);
      color: var(--ae-modal-text-color);
      border-radius: var(--ae-border-radius, 0.375rem);
      box-shadow: var(--ae-shadow-lg);
      transform: scale(0.95);
      opacity: 0;
      transition: transform var(--ae-transition-duration) ease,
                  opacity var(--ae-transition-duration) ease;
    }

    :host([open]) .panel {
      transform: scale(1);
      opacity: 1;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid var(--ae-color-border);
      color: var(--ae-modal-text-color);
      font-weight: 600;
    }

    .body {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      color: var(--ae-modal-text-color);
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid var(--ae-color-border);
    }

    .close-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.5rem;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--ae-modal-text-color);
    }

    .close-button:hover {
      opacity: 0.8;
    }

    .close-button:focus-visible {
      outline: 2px solid var(--ae-color-primary);
      outline-offset: 2px;
      border-radius: var(--ae-border-radius);
    }
  `;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean })
  underlay = true;

  @property()
  initialFocus: string | HTMLElement | null = null;

  @query('.panel')
  private panel!: HTMLElement;

  private previousActiveElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    this.restoreScroll();
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    if (name === 'open') {
      this.open = value !== null;
      if (this.open) {
        this.lockScroll();
        this.trapFocus();
      } else {
        this.restoreScroll();
        this.restoreFocus();
      }
    }
  }

  private lockScroll() {
    document.body.style.overflow = 'hidden';
  }

  private restoreScroll() {
    document.body.style.overflow = '';
  }

  private trapFocus() {
    this.previousActiveElement = document.activeElement as HTMLElement;
    
    // Get all focusable elements
    this.focusableElements = Array.from(
      this.panel.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    // Focus initial element or first focusable element
    const initialElement = 
      typeof this.initialFocus === 'string' 
        ? this.panel.querySelector(this.initialFocus) 
        : this.initialFocus;

    if (initialElement instanceof HTMLElement) {
      initialElement.focus();
    } else if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
  }

  private restoreFocus() {
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.hasAttribute('open')) return;

    if (event.key === 'Escape') {
      this.removeAttribute('open');
      this.requestClose('escape');
      return;
    }

    if (event.key === 'Tab') {
      if (this.focusableElements.length === 0) return;

      const firstElement = this.focusableElements[0];
      const lastElement = this.focusableElements[this.focusableElements.length - 1];
      
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private handleOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget && this.underlay) {
      this.removeAttribute('open');
      this.requestClose('backdrop');
    }
  }

  private requestClose(reason: 'escape' | 'backdrop' | 'api') {
    this.removeAttribute('open');
    this.dispatchEvent(
      new CustomEvent('ae-request-close', {
        detail: { reason },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div 
        class="overlay"
        part="overlay"
        @click=${this.handleOverlayClick}
      >
        <div 
          class="panel"
          part="panel"
        >
          <div class="header" part="header">
            <slot name="header"></slot>
            <button
              class="close-button"
              aria-label="Close"
              @click=${() => this.requestClose('api')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="body" part="body">
            <slot></slot>
          </div>
          <div class="footer" part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
} 