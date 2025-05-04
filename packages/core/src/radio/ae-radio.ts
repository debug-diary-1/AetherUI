import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ae-radio')
export class AeRadio extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .control {
      position: relative;
      width: 1rem;
      height: 1rem;
      border: 2px solid var(--ae-color-border);
      border-radius: 50%;
      background: var(--ae-color-surface);
      transition: border-color var(--ae-transition-duration) ease;
    }

    .control:hover {
      border-color: var(--ae-color-primary);
    }

    .indicator {
      position: absolute;
      inset: 2px;
      border-radius: 50%;
      background: var(--ae-color-primary);
      transform: scale(0);
      transition: transform var(--ae-transition-duration) ease;
    }

    .control[aria-checked="true"] .indicator {
      transform: scale(1);
    }

    .label {
      font-size: var(--ae-font-size-sm);
      color: var(--ae-color-text);
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([disabled]) .control {
      border-color: var(--ae-color-border-disabled);
    }
  `;

  @property({ type: String })
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @query('.control')
  private control!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radio');
    this.setAttribute('tabindex', this.checked ? '0' : '-1');
    this.setAttribute('aria-checked', this.checked.toString());
  }

  private handleClick() {
    if (this.disabled) return;
    this.checked = true;
    this.dispatchEvent(
      new CustomEvent('ae-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeydown(event: KeyboardEvent) {
    if (this.disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.handleClick();
    }
  }

  render() {
    return html`
      <div
        class="control"
        part="control"
        @click=${this.handleClick}
        @keydown=${this.handleKeydown}
        aria-checked=${this.checked}
        tabindex=${this.checked ? '0' : '-1'}
      >
        <div class="indicator" part="indicator"></div>
      </div>
      <span class="label" part="label">
        <slot></slot>
      </span>
    `;
  }
} 