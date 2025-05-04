import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class AeButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border: none;
      border-radius: var(--ae-border-radius, 0.375rem);
      font-family: var(--ae-font-family);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--ae-transition-duration, 200ms) ease;
    }

    /* Variants */
    .button--primary {
      background: var(--ae-color-primary);
      color: var(--ae-color-primary-foreground);
    }

    .button--primary:hover:not(:disabled) {
      background: var(--ae-color-primary-hover);
    }

    .button--secondary {
      background: var(--ae-color-secondary);
      color: var(--ae-color-secondary-foreground);
    }

    .button--secondary:hover:not(:disabled) {
      background: var(--ae-color-secondary-hover);
    }

    .button--ghost {
      background: transparent;
      color: var(--ae-color-text);
    }

    .button--ghost:hover:not(:disabled) {
      background: var(--ae-color-surface-hover);
    }

    /* Sizes */
    .button--sm {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    }

    .button--md {
      padding: 0.625rem 1rem;
      font-size: 1rem;
    }

    .button--lg {
      padding: 0.75rem 1.25rem;
      font-size: 1.125rem;
    }

    /* Disabled state */
    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([disabled]) .button {
      cursor: not-allowed;
    }

    /* Focus state */
    .button:focus-visible {
      outline: 2px solid var(--ae-color-primary);
      outline-offset: 2px;
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    return html`
      <button
        class="button button--${this.variant} button--${this.size}"
        part="button"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
      </button>
    `;
  }

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.dispatchEvent(new CustomEvent('ae-click', {
      bubbles: true,
      composed: true
    }));
  }
} 