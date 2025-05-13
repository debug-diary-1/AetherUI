import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { DATATABLE_HEADER_CELL_ELEMENT_NAME } from './constants';

/**
 * Header cell component specifically for selection and special cells in the datatable
 * @element ae-datatable-header-cell
 *
 * @property {boolean} sortable - Whether the column is sortable
 * @property {string} align - Text alignment ('left', 'center', 'right')
 *
 * @slot - Default content for the header cell
 * @slot content - Named slot for explicit content
 *
 * @csspart content - The header cell content
 */
export class AeDatatableHeaderCell extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      user-select: none;
      height: 100%;
      font-weight: 500;
    }

    /* Selection cell specific styling */
    :host(.datatable__selection-header) {
      width: var(--ae-datatable-selection-column-width, 56px);
      min-width: var(--ae-datatable-selection-column-width, 56px);
      max-width: var(--ae-datatable-selection-column-width, 56px);
      padding: 0;
      text-align: center;
    }

    .header-cell__content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: var(--ae-datatable-cell-padding, 0.75rem 1rem);
    }

    /* Selection container */
    .selection-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0;
    }

    /* Alignment styles */
    :host(.datatable__selection-header) {
      justify-content: center;
      text-align: center;
    }

    :host([align="center"]) .header-cell__content {
      justify-content: center;
      text-align: center;
    }

    :host([align="right"]) .header-cell__content {
      justify-content: flex-end;
      text-align: right;
    }
  `;

  /**
   * Whether the column is sortable
   */
  @property({ type: Boolean, reflect: true })
  accessor sortable = false;

  /**
   * Text alignment
   */
  @property({ type: String, reflect: true })
  accessor align: 'left' | 'center' | 'right' = 'center';

  /**
   * Column index for positioning (1-based, set via attribute)
   * This is handled through HTML attribute data-col-index
   */
  @property({ type: String, reflect: true, attribute: 'data-col-index' })
  accessor dataColIndex: string = '0';

  /**
   * Whether this is a selection cell
   */
  get isSelectionHeader() {
    return this.classList.contains('datatable__selection-header');
  }

  render() {
    // For selection header, wrap in the selection checkbox container
    if (this.isSelectionHeader) {
      return html`
        <div part="selection-container" class="selection-container">
          <slot name="checkbox">
            <slot name="content">
              <slot></slot>
            </slot>
          </slot>
        </div>
      `;
    }

    // Standard header cell content
    return html`
      <div class="header-cell__content" part="content">
        <slot name="content"><slot></slot></slot>
      </div>
    `;
  }
}

customElements.define(DATATABLE_HEADER_CELL_ELEMENT_NAME, AeDatatableHeaderCell); 