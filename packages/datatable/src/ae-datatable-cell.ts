import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { DATATABLE_CELL_ELEMENT_NAME } from './constants';
import { classMap } from 'lit/directives/class-map.js';
import { cellStyles } from './styles';

/**
 * Cell component for the datatable
 * @element ae-datatable-cell
 *
 * @property {string} align - Text alignment ('left', 'center', 'right')
 *
 * @slot - Default content for the cell
 * @slot checkbox - Slot for selection checkbox content
 *
 * @csspart content - The cell content
 * @csspart selection-container - The selection checkbox container
 */
export class AeDatatableCell extends LitElement {
  static styles = [
    cellStyles,
    css`
      /* Base styles for all cells */
      :host {
        display: table-cell;
        vertical-align: middle;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Selection cell styling */
      :host(.datatable__selection-cell) {
        width: var(--ae-datatable-selection-column-width, 56px);
        min-width: var(--ae-datatable-selection-column-width, 56px);
        max-width: var(--ae-datatable-selection-column-width, 56px);
        padding: 0;
        text-align: center;
      }

      /* Selection checkbox container */
      .selection-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      /* Regular cell content */
      .cell-content {
        display: flex;
        align-items: center;
        min-width: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Alignment styles */
      :host([align="left"]) .cell-content {
        justify-content: flex-start;
        text-align: left;
      }

      :host([align="center"]) .cell-content,
      :host(.datatable__selection-cell) {
        justify-content: center;
        text-align: center;
      }

      :host([align="right"]) .cell-content {
        justify-content: flex-end;
        text-align: right;
      }
    `
  ];

  /**
   * Text alignment
   */
  @property({ type: String, reflect: true })
  accessor align: 'left' | 'center' | 'right' = 'left';

  /**
   * Column index for positioning (1-based, set via attribute)
   * This is handled through HTML attribute data-col-index
   */
  @property({ type: String, reflect: true, attribute: 'data-col-index' })
  accessor dataColIndex: string = '0';

  /**
   * Whether this is a selection cell
   */
  get isSelectionCell() {
    return this.classList.contains('datatable__selection-cell');
  }

  render() {
    if (this.isSelectionCell) {
      return html`
        <div part="selection-container" class="selection-container">
          <slot name="checkbox">
            <slot></slot>
          </slot>
        </div>
      `;
    }

    const classes = {
      'cell-content': true,
      [`cell-content--${this.align}`]: true
    };

    return html`
      <div part="content" class=${classMap(classes)}>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define(DATATABLE_CELL_ELEMENT_NAME, AeDatatableCell);