import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { badgeStyles } from './styles';

/**
 * A badge component for displaying small labels, tags, counts, or status indicators.
 * Supports multiple variants, sizes, closable option, dot indicators, and outline styles.
 *
 * @element ae-badge
 *
 * @property {'primary'|'secondary'|'success'|'warning'|'error'|'info'} variant - The visual variant
 * @property {'sm'|'md'|'lg'} size - The size of the badge
 * @property {boolean} closable - Whether to show a close button
 * @property {boolean} dot - Whether to display as a dot indicator
 * @property {boolean} outline - Whether to use outline style
 *
 * @fires {CustomEvent<void>} ae-badge-close - Fired when the close button is clicked
 *
 * @slot - The badge content
 * @slot icon - Optional icon to display before the content
 *
 * @csspart base - The component's base wrapper
 * @csspart icon - The icon container
 * @csspart content - The content container
 * @csspart close-button - The close button
 *
 * @example
 * ```html
 * <ae-badge variant="primary">New</ae-badge>
 * <ae-badge variant="success" size="sm">Active</ae-badge>
 * <ae-badge variant="error" closable>Error</ae-badge>
 * <ae-badge variant="warning" dot></ae-badge>
 * <ae-badge variant="info" outline>Info</ae-badge>
 * ```
 */
@customElement('ae-badge')
export class AeBadge extends LitElement {
  static styles = badgeStyles;

  @property({ type: String, reflect: true })
  accessor variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  accessor closable = false;

  @property({ type: Boolean, reflect: true })
  accessor dot = false;

  @property({ type: Boolean, reflect: true })
  accessor outline = false;

  private handleClose(event: Event) {
    event.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('ae-badge-close', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    if (this.dot) {
      return html`
        <span part="base" class="badge-dot">
          <span class="dot-indicator"></span>
        </span>
      `;
    }

    return html`
      <span part="base" class="badge-base">
        <slot name="icon" part="icon"></slot>
        <span part="content" class="badge-content">
          <slot></slot>
        </span>
        ${this.closable
          ? html`
              <button
                part="close-button"
                class="close-button"
                type="button"
                @click="${this.handleClose}"
                aria-label="Close badge"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            `
          : ''}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-badge': AeBadge;
  }
}
