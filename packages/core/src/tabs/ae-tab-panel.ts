import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Tab panel component that contains tab content
 */
@customElement('ae-tab-panel')
export class AeTabPanel extends LitElement {
  /**
   * The ID for this panel
   */
  @property({ type: String, reflect: true })
  id: string = '';

  /**
   * The ID of the tab that labels this panel
   */
  @property({ type: String, reflect: true, attribute: 'aria-labelledby' })
  ariaLabelledby: string = '';

  /**
   * Whether the panel is hidden
   */
  @property({ type: Boolean, reflect: true })
  hidden: boolean = false;

  updated(changedProperties: PropertyValues) {
    // Forward relevant properties to the actual section element
    if (changedProperties.has('ariaLabelledby') || changedProperties.has('hidden')) {
      const section = this.shadowRoot?.querySelector('section');
      if (section) {
        section.setAttribute('aria-labelledby', this.ariaLabelledby);
        section.hidden = this.hidden;
      }
    }
  }

  render() {
    return html`
      <section 
        role="tabpanel" 
        tabindex="0" 
        part="panel"
        aria-labelledby="${this.ariaLabelledby}"
        ?hidden="${this.hidden}"
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