import { LitElement, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { customElement } from '../internal/custom-element';
import { progressStyles } from './styles';

/**
 * A progress indicator component for showing task completion or loading states.
 *
 * @element ae-progress
 *
 * @property {number} value - The current progress value (0-100)
 * @property {number} max - The maximum value (default: 100)
 * @property {string} variant - The visual variant (primary, secondary, success, warning, error, info)
 * @property {string} size - The size of the progress bar (sm, md, lg)
 * @property {boolean} indeterminate - Whether to show indeterminate/loading state
 * @property {boolean} showLabel - Whether to show percentage label
 * @property {string} label - Custom label text (overrides percentage)
 * @property {boolean} striped - Whether to show striped pattern
 * @property {boolean} animated - Whether to animate the stripes
 * @property {string} ariaLabel - Accessible label for the progress bar
 *
 * @csspart base - The component's base wrapper
 * @csspart track - The progress track/background
 * @csspart bar - The progress bar/indicator
 * @csspart label - The label text
 *
 * @example
 * ```html
 * <ae-progress value="50"></ae-progress>
 * <ae-progress value="75" variant="success" show-label></ae-progress>
 * <ae-progress indeterminate variant="primary"></ae-progress>
 * <ae-progress value="60" striped animated></ae-progress>
 * ```
 */
@customElement('ae-progress')
export class AeProgress extends LitElement {
  static styles = progressStyles;

  @property({ type: Number })
  accessor value = 0;

  @property({ type: Number })
  accessor max = 100;

  @property({ type: String, reflect: true })
  accessor variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  accessor indeterminate = false;

  @property({ type: Boolean, attribute: 'show-label' })
  accessor showLabel = false;

  @property({ type: String })
  accessor label = '';

  @property({ type: Boolean, reflect: true })
  accessor striped = false;

  @property({ type: Boolean, reflect: true })
  accessor animated = false;

  @property({ type: String, attribute: 'aria-label' })
  accessor ariaLabel = '';

  private get percentage(): number {
    if (this.indeterminate) return 100;
    return Math.min(Math.max((this.value / this.max) * 100, 0), 100);
  }

  private get labelText(): string {
    if (this.label) return this.label;
    if (this.indeterminate) return 'Loading...';
    return `${Math.round(this.percentage)}%`;
  }

  render() {
    return html`
      <div
        part="base"
        class="progress-base ${this.indeterminate ? 'indeterminate' : ''}"
        role="progressbar"
        aria-valuenow="${ifDefined(this.indeterminate ? undefined : this.value)}"
        aria-valuemin="0"
        aria-valuemax="${this.max}"
        aria-label="${this.ariaLabel || 'Progress'}"
      >
        <div part="track" class="progress-track">
          <div part="bar" class="progress-bar" style="width: ${this.percentage}%"></div>
        </div>
        ${this.showLabel
          ? html` <div part="label" class="progress-label">${this.labelText}</div> `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-progress': AeProgress;
  }
}
