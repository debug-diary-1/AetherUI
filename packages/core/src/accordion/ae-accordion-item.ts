import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ae-accordion-item')
export class AeAccordionItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--ae-color-border);
      border-radius: var(--ae-border-radius);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      cursor: pointer;
      background: var(--ae-color-surface);
      border: none;
      width: 100%;
      text-align: left;
      color: var(--ae-color-text);
      font-family: var(--ae-font-family);
      font-size: var(--ae-font-size-base);
    }

    .header:hover {
      background: var(--ae-color-surface-hover);
    }

    .header:focus-visible {
      outline: 2px solid var(--ae-color-primary);
      outline-offset: -2px;
    }

    .icon {
      width: 1rem;
      height: 1rem;
      transform: rotate(0deg);
      transition: transform var(--ae-transition-duration) ease;
      flex-shrink: 0;
      margin-left: 0.5rem;
    }

    :host([open]) .icon {
      transform: rotate(180deg);
    }

    .panel {
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition: max-height var(--ae-transition-duration) ease,
                  opacity var(--ae-transition-duration) ease,
                  padding var(--ae-transition-duration) ease;
      background: var(--ae-color-surface);
      border-top: 0 solid var(--ae-color-border);
    }

    :host([open]) .panel {
      max-height: var(--panel-height, 1000px);
      opacity: 1;
      border-top-width: 1px;
      padding: 1rem;
    }

    .panel-inner {
      opacity: 0;
      transition: opacity var(--ae-transition-duration) ease;
    }

    :host([open]) .panel-inner {
      opacity: 1;
    }
  `;

  @property({ type: String })
  accessor headerId = crypto.randomUUID();

  @property({ type: Boolean, reflect: true })
  accessor open = false;

  private panelHeight = 0;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      this.updatePanelHeight();
    }
  }

  private updatePanelHeight() {
    if (this.open) {
      const panel = this.shadowRoot?.querySelector('.panel-inner') as HTMLElement;
      if (panel) {
        this.panelHeight = panel.offsetHeight;
        this.style.setProperty('--panel-height', `${this.panelHeight}px`);
      }
    }
  }

  private handleHeaderClick() {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('ae-panel-change', {
        detail: { headerId: this.headerId, open: this.open },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.handleHeaderClick();
    }
  }

  render() {
    return html`
      <button
        class="header"
        part="header"
        role="button"
        aria-expanded=${this.open}
        aria-controls="panel-${this.headerId}"
        @click=${this.handleHeaderClick}
        @keydown=${this.handleKeydown}
      >
        <slot name="header"></slot>
        <svg
          class="icon"
          part="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div
        class="panel"
        part="panel"
        id="panel-${this.headerId}"
      >
        <div class="panel-inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
} 