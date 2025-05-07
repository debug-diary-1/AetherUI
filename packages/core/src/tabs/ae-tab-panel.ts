import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Tab panel component that contains tab content
 */
@customElement('ae-tab-panel')
export class AeTabPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    :host(:not([selected])) {
      display: none;
    }

    .panel {
      padding: var(--ae-tab-panel-padding, 1rem);
    }
  `;

  /**
   * The ID for this panel
   */
  @property({ type: String, reflect: true })
  accessor id: string = '';

  /**
   * The ID of the tab that labels this panel
   */
  @property({ type: String, reflect: true, attribute: 'aria-labelledby' })
  accessor ariaLabelledby: string = '';

  /**
   * Whether the panel is hidden
   */
  @property({ type: Boolean, reflect: true })
  accessor hidden: boolean = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tabpanel');
    this.setAttribute('tabindex', '0');
  }

  render() {
    return html`
      <div class="panel">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-tab-panel': AeTabPanel;
  }
}

export type AeTabPanelElement = AeTabPanel; 