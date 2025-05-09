import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { DATATABLE_ROW_ELEMENT_NAME } from './index';
import { rowStyles } from './styles';

/**
 * Row component for the datatable
 * @element ae-datatable-row
 * 
 * @property {boolean} selected - Whether the row is selected
 * @property {boolean} selectable - Whether the row is selectable
 * 
 * @fires {CustomEvent} ae-datatable-row-click - Fired when the row is clicked
 * 
 * @slot - Default slot for cells
 */
export class AeDatatableRow extends LitElement {
  static styles = rowStyles;

  /**
   * Whether the row is selected
   */
  @property({ type: Boolean, reflect: true })
  accessor selected = false;

  /**
   * Whether the row is selectable
   */
  @property({ type: Boolean, reflect: true })
  accessor selectable = false;

  /**
   * Handle row click
   */
  private handleClick(e: MouseEvent) {
    if (!this.selectable) return;
    
    // Dispatch row click event
    this.dispatchEvent(new CustomEvent('ae-datatable-row-click', {
      detail: {
        id: this.id,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <slot @click=${this.handleClick}></slot>
    `;
  }
}

customElements.define(DATATABLE_ROW_ELEMENT_NAME, AeDatatableRow);