import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../internal/custom-element';
import { spinnerStyles } from './styles';

/**
 * A loading spinner component for indicating loading or processing states.
 *
 * @element ae-spinner
 *
 * @property {string} size - The size of the spinner (xs, sm, md, lg, xl)
 * @property {string} variant - The visual variant (primary, secondary, success, warning, error, info)
 * @property {string} label - Accessible label for screen readers
 *
 * @csspart base - The component's base wrapper
 * @csspart spinner - The spinner SVG element
 * @csspart label - The label element (visually hidden by default)
 *
 * @example
 * ```html
 * <ae-spinner></ae-spinner>
 * <ae-spinner size="lg" variant="primary"></ae-spinner>
 * <ae-spinner label="Loading content..."></ae-spinner>
 * ```
 */
@customElement('ae-spinner')
export class AeSpinner extends LitElement {
  static styles = spinnerStyles;

  @property({ type: String, reflect: true })
  accessor size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @property({ type: String, reflect: true })
  accessor variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  @property({ type: String })
  accessor label = 'Loading...';

  render() {
    return html`
      <div part="base" class="spinner-base" role="status" aria-live="polite">
        <svg
          part="spinner"
          class="spinner-svg"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle class="spinner-track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
          <circle class="spinner-indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        </svg>
        <span part="label" class="sr-only">${this.label}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-spinner': AeSpinner;
  }
}
