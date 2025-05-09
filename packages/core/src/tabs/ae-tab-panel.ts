import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @element ae-tab-panel
 * @summary Panel component for tab content
 */
@customElement('ae-tab-panel')
export class AeTabPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    section {
      padding: var(--ae-tabs-panel-padding, 1rem);
    }
  `;

  /**
   * ID for the panel
   */
  @property({ type: String, reflect: true })
  accessor id: string = '';

  /**
   * ID of the tab that controls this panel
   */
  @property({ type: String, reflect: true, attribute: 'aria-labelledby' })
  accessor ariaLabelledby: string = '';

  /**
   * Whether the panel is hidden
   */
  @property({ type: Boolean, reflect: true })
  accessor hidden: boolean = false;

  render() {
    return html`
      <section
        role="tabpanel"
        part="panel"
        aria-labelledby="${this.ariaLabelledby}"
        ?hidden="${this.hidden}"
        tabindex="0"
      >
        <slot></slot>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-tab-panel': AeTabPanel;
  }
}

export type AeTabPanelElement = AeTabPanel;