import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { DATATABLE_CELL_ELEMENT_NAME } from './constants';
import { cellStyles } from './styles';

/**
 * Cell component for the datatable
 * @element ae-datatable-cell
 *
 * @property {string} align - Text alignment ('left', 'center', 'right')
 *
 * @slot - Default content for the cell
 *
 * @csspart content - The cell content
 */
export class AeDatatableCell extends LitElement {
  static styles = cellStyles;

  /**
   * Text alignment
   */
  @property({ type: String, reflect: true })
  align: 'left' | 'center' | 'right' = 'left';

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'cell');
  }

  render() {
    return html`
      <div part="content">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get(DATATABLE_CELL_ELEMENT_NAME)) {
  customElements.define(DATATABLE_CELL_ELEMENT_NAME, AeDatatableCell);
}
