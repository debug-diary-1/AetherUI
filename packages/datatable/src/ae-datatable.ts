import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { DATATABLE_ELEMENT_NAME, DATATABLE_HEADER_ELEMENT_NAME, DATATABLE_ROW_ELEMENT_NAME, DATATABLE_CELL_ELEMENT_NAME } from './index';
import { datatableStyles } from './styles';
import { DataTableController } from './controllers/datatable-controller';
import { ColumnDef } from './models/column-model';
import { SortDirection } from './models/sort-model';
import { PaginationState } from './models/pagination-model';
import './ae-datatable-header';
import './ae-datatable-row';
import './ae-datatable-cell';

/**
 * A powerful data table component for displaying and manipulating tabular data
 * @element ae-datatable
 * 
 * @property {Object[]} data - Array of data objects to display in the table
 * @property {ColumnDef[]} columns - Column definitions for the table
 * @property {boolean} sortable - Whether the table supports sorting (global setting)
 * @property {boolean} filterable - Whether the table supports filtering (global setting)
 * @property {boolean} selectable - Whether rows can be selected
 * @property {string} selectionMode - Selection mode ('single' or 'multiple')
 * @property {boolean} paginated - Whether to enable pagination
 * @property {number} pageSize - Number of rows per page
 * @property {string} emptyMessage - Message to display when there is no data
 * @property {boolean} virtualized - Whether to use virtualized scrolling for large datasets
 * @property {boolean} resizable - Whether columns can be resized
 * 
 * @fires {CustomEvent} ae-datatable-sort - Fired when a column is sorted
 * @fires {CustomEvent} ae-datatable-filter - Fired when data is filtered
 * @fires {CustomEvent} ae-datatable-select - Fired when row selection changes
 * @fires {CustomEvent} ae-datatable-page - Fired when page changes
 * @fires {CustomEvent} ae-datatable-resize - Fired when a column is resized
 * 
 * @slot toolbar - Custom toolbar content at the top of the table
 * @slot footer - Custom footer content
 * @slot empty - Content to display when there is no data
 * 
 * @csspart base - The table container
 * @csspart header - The table header
 * @csspart body - The table body
 * @csspart row - Table rows
 * @csspart cell - Table cells
 * @csspart toolbar - The toolbar container
 * @csspart footer - The footer container
 * @csspart pagination - The pagination control container
 * 
 * @cssproperty --ae-datatable-border-color - Border color
 * @cssproperty --ae-datatable-header-bg - Header background color
 * @cssproperty --ae-datatable-hover-bg - Row hover background color
 * @cssproperty --ae-datatable-selected-bg - Selected row background color
 * @cssproperty --ae-datatable-cell-padding - Cell padding
 * @cssproperty --ae-datatable-row-height - Row height
 * @cssproperty --ae-datatable-header-height - Header height
 * @cssproperty --ae-datatable-border-radius - Table border radius
 * @cssproperty --ae-datatable-text-color - Text color
 * @cssproperty --ae-datatable-empty-text-color - Empty state text color
 * @cssproperty --ae-datatable-header-text-color - Header text color
 * @cssproperty --ae-datatable-resize-handle-color - Column resize handle color
 */
export class AeDataTable<T extends Record<string, any>> extends LitElement {
  static styles = datatableStyles;

  /**
   * The data to display in the table
   */
  @property({ type: Array })
  accessor data: T[] = [];

  /**
   * Column definitions
   */
  @property({ type: Array })
  accessor columns: ColumnDef<T>[] = [];

  /**
   * Whether the table supports sorting
   */
  @property({ type: Boolean, reflect: true })
  accessor sortable = true;

  /**
   * Whether the table supports filtering
   */
  @property({ type: Boolean, reflect: true })
  accessor filterable = true;

  /**
   * Whether rows can be selected
   */
  @property({ type: Boolean, reflect: true })
  accessor selectable = false;

  /**
   * Selection mode ('single' or 'multiple')
   */
  @property({ type: String, reflect: true, attribute: 'selection-mode' })
  accessor selectionMode: 'single' | 'multiple' = 'multiple';

  /**
   * Whether to enable pagination
   */
  @property({ type: Boolean, reflect: true })
  accessor paginated = false;

  /**
   * Number of rows per page
   */
  @property({ type: Number, reflect: true, attribute: 'page-size' })
  accessor pageSize = 10;

  /**
   * Message to display when there is no data
   */
  @property({ type: String, reflect: true, attribute: 'empty-message' })
  accessor emptyMessage = 'No data to display';

  /**
   * Whether to use virtualized scrolling for large datasets
   */
  @property({ type: Boolean, reflect: true })
  accessor virtualized = false;

  /**
   * Whether columns can be resized
   */
  @property({ type: Boolean, reflect: true })
  accessor resizable = true;

  /**
   * The controller managing all data operations
   */
  private controller = new DataTableController<T>(this);

  /**
   * Current pagination state
   */
  @state()
  private paginationState: PaginationState = { page: 1, pageSize: 10, totalItems: 0, totalPages: 1 };

  /**
   * Global filter value
   */
  @state()
  private globalFilter = '';

  /**
   * Whether the data is initialized
   */
  @state()
  private initialized = false;

  /**
   * Styles for the grid columns
   */
  @state()
  private gridTemplateColumns = '';

  /**
   * Handle component first updated
   */
  firstUpdated() {
    this.initializeController();
  }

  /**
   * Handle property changes
   */
  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('data') || changedProperties.has('columns')) {
      this.initializeController();
    }

    if (changedProperties.has('pageSize') && this.initialized) {
      this.controller.setPageSize(this.pageSize);
    }
  }

  /**
   * Initialize the controller with data and columns
   */
  private initializeController() {
    if (this.data.length > 0 && this.columns.length > 0) {
      this.controller.initialize(this.data, this.columns);
      this.updateGridTemplateColumns();
      this.paginationState = this.controller.getPaginationState();
      this.initialized = true;
    }
  }

  /**
   * Update the grid columns CSS definition
   */
  private updateGridTemplateColumns() {
    const visibleColumns = this.controller.getVisibleColumns();
    const columnsStyle = visibleColumns.map(col => {
      const width = this.controller.getColumn(col.id)?.width || '1fr';
      return typeof width === 'number' ? `${width}px` : width;
    }).join(' ');
    
    this.gridTemplateColumns = columnsStyle;
  }

  /**
   * Handle column sort
   * @param columnId Column to sort by
   * @param direction Sort direction
   * @param multiSort Whether to allow multi-column sorting
   */
  handleSort(columnId: string, direction: SortDirection, multiSort = false) {
    this.controller.setSortState(columnId, direction, multiSort);
    
    // Dispatch sort event
    this.dispatchEvent(new CustomEvent('ae-datatable-sort', {
      detail: {
        columnId,
        direction,
        sortState: this.controller.getSortState()
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle global filter change
   * @param e Input event
   */
  handleGlobalFilterChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.globalFilter = input.value;
    this.controller.setGlobalFilter(input.value);
    
    // Dispatch filter event
    this.dispatchEvent(new CustomEvent('ae-datatable-filter', {
      detail: {
        globalFilter: input.value,
        filterState: this.controller.getFilterState()
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle column filter change
   * @param columnId Column ID
   * @param value Filter value
   */
  handleColumnFilter(columnId: string, value: string) {
    this.controller.setColumnFilter(columnId, value);
    
    // Dispatch filter event
    this.dispatchEvent(new CustomEvent('ae-datatable-filter', {
      detail: {
        columnId,
        value,
        filterState: this.controller.getFilterState()
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle row selection
   * @param rowId Row ID
   */
  handleRowSelect(rowId: string | number) {
    if (this.selectionMode === 'single') {
      this.controller.deselectAllRows();
    }
    
    this.controller.toggleRowSelection(rowId);
    
    // Dispatch selection event
    this.dispatchEvent(new CustomEvent('ae-datatable-select', {
      detail: {
        selectedRows: this.controller.getSelectedRows()
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle select all rows
   */
  handleSelectAll() {
    const allSelected = this.controller.getSelectedRows().length === this.controller.getProcessedData().length;
    
    if (allSelected) {
      this.controller.deselectAllRows();
    } else {
      this.controller.selectAllRows();
    }
    
    // Dispatch selection event
    this.dispatchEvent(new CustomEvent('ae-datatable-select', {
      detail: {
        selectedRows: this.controller.getSelectedRows()
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle page change
   * @param page Page number
   */
  handlePageChange(page: number) {
    this.controller.setPage(page);
    this.paginationState = this.controller.getPaginationState();
    
    // Dispatch page event
    this.dispatchEvent(new CustomEvent('ae-datatable-page', {
      detail: {
        page,
        paginationState: this.paginationState
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle column resize
   * @param columnId Column ID
   * @param width New width in pixels
   */
  handleColumnResize(columnId: string, width: number) {
    this.controller.setColumnWidth(columnId, width);
    this.updateGridTemplateColumns();
    
    // Dispatch resize event
    this.dispatchEvent(new CustomEvent('ae-datatable-resize', {
      detail: {
        columnId,
        width
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Render pagination controls
   */
  private renderPagination() {
    if (!this.paginated) {
      return html``;
    }
    
    const { page, pageSize, totalItems, totalPages } = this.paginationState;
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalItems);
    
    return html`
      <div class="datatable__footer" part="footer">
        <div class="datatable__pagination-info">
          Showing ${start}-${end} of ${totalItems} items
        </div>
        <div class="datatable__pagination" part="pagination">
          <button 
            ?disabled=${page === 1}
            @click=${() => this.handlePageChange(1)}
          >
            First
          </button>
          <button 
            ?disabled=${page === 1}
            @click=${() => this.handlePageChange(page - 1)}
          >
            Previous
          </button>
          <span>Page ${page} of ${totalPages}</span>
          <button 
            ?disabled=${page === totalPages}
            @click=${() => this.handlePageChange(page + 1)}
          >
            Next
          </button>
          <button 
            ?disabled=${page === totalPages}
            @click=${() => this.handlePageChange(totalPages)}
          >
            Last
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Render filter toolbar
   */
  private renderToolbar() {
    // Default toolbar with filter input
    const defaultToolbar = this.filterable ? html`
      <div class="datatable__filter">
        <input
          type="text"
          placeholder="Search..."
          .value=${this.globalFilter}
          @input=${this.handleGlobalFilterChange}
        />
      </div>
    ` : html``;
    
    return html`
      <div class="datatable__toolbar" part="toolbar">
        <slot name="toolbar">${defaultToolbar}</slot>
      </div>
    `;
  }

  /**
   * Render table header
   */
  private renderHeader() {
    const visibleColumns = this.controller.getVisibleColumns();
    const sortState = this.controller.getSortState();
    
    const headerStyle = {
      gridTemplateColumns: this.gridTemplateColumns
    };
    
    return html`
      <div class="datatable__header" part="header" style=${styleMap(headerStyle)}>
        ${this.selectable ? html`
          <ae-datatable-header-cell
            id="selection"
            .sortable=${false}
            @click=${this.handleSelectAll}
          >
            <input type="checkbox" slot="content" />
          </ae-datatable-header-cell>
        ` : ''}
        
        ${visibleColumns.map(column => {
          const sortInfo = sortState.find(s => s.id === column.id);
          
          return html`
            <ae-datatable-header
              id=${column.id}
              .sortable=${this.sortable && column.sortable !== false}
              .resizable=${this.resizable && column.resizable !== false}
              .direction=${sortInfo?.direction || 'none'}
              .align=${column.align || 'left'}
              @ae-datatable-header-sort=${(e: CustomEvent) => this.handleSort(column.id, e.detail.direction, e.detail.multiSort)}
              @ae-datatable-header-resize=${(e: CustomEvent) => this.handleColumnResize(column.id, e.detail.width)}
            >
              ${typeof column.header === 'string' 
                ? column.header 
                : column.header}
            </ae-datatable-header>
          `;
        })}
      </div>
    `;
  }

  /**
   * Render table body
   */
  private renderBody() {
    const processedData = this.controller.getProcessedData();
    const visibleColumns = this.controller.getVisibleColumns();
    
    if (processedData.length === 0) {
      return html`
        <div class="datatable__body" part="body">
          <div class="datatable__empty">
            <slot name="empty">${this.emptyMessage}</slot>
          </div>
        </div>
      `;
    }
    
    const bodyStyle = {
      gridTemplateColumns: this.gridTemplateColumns
    };
    
    return html`
      <div class="datatable__body" part="body">
        ${repeat(processedData, (item: T, index) => {
          const rowId = (item as any).id || index;
          const isSelected = this.controller.isRowSelected(rowId);
          
          return html`
            <ae-datatable-row
              id=${String(rowId)}
              ?selected=${isSelected}
              ?selectable=${this.selectable}
              @click=${() => this.selectable && this.handleRowSelect(rowId)}
            >
              ${this.selectable ? html`
                <ae-datatable-cell align="center">
                  <input type="checkbox" ?checked=${isSelected} />
                </ae-datatable-cell>
              ` : ''}
              
              ${visibleColumns.map(column => {
                let cellContent: string | TemplateResult;
                
                if (column.renderer) {
                  // Use custom renderer if provided
                  const value = column.accessor ? column.accessor(item) : column.field ? item[column.field] : null;
                  cellContent = column.renderer(value, item);
                } else {
                  // Get value from accessor or field
                  let value;
                  if (column.accessor) {
                    value = column.accessor(item);
                  } else if (column.field) {
                    value = item[column.field];
                  } else {
                    value = '';
                  }
                  
                  // Format value if formatter is provided
                  if (column.format && value !== undefined && value !== null) {
                    cellContent = column.format(value);
                  } else {
                    cellContent = value !== undefined && value !== null ? String(value) : '';
                  }
                }
                
                return html`
                  <ae-datatable-cell
                    data-column=${column.id}
                    align=${column.align || 'left'}
                  >
                    ${cellContent}
                  </ae-datatable-cell>
                `;
              })}
            </ae-datatable-row>
          `;
        })}
      </div>
    `;
  }

  render() {
    if (!this.initialized) {
      return html`<div part="base">Loading...</div>`;
    }
    
    return html`
      <div class="datatable" part="base">
        ${this.renderToolbar()}
        ${this.renderHeader()}
        ${this.renderBody()}
        ${this.renderPagination()}
      </div>
    `;
  }
}

// Define the custom elements
customElements.define(DATATABLE_ELEMENT_NAME, AeDataTable);