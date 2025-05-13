/**
 * This file contains the updated styles and rendering methods to fix the selection checkbox layout issues.
 * To apply this fix, copy the CSS into styles.ts and the method implementations into ae-datatable.ts
 */

/** 
 * STEP 1: Replace the existing styles in styles.ts with a completely new, simpler approach 
 * that uses a consistent table-based layout
 */
import { css } from 'lit';

export const datatableStyles = css`
  :host {
    display: block;
    overflow: auto;
    --ae-datatable-border-color: var(--ae-border-color, #e5e7eb);
    --ae-datatable-header-bg: var(--ae-surface-2, #f9fafb);
    --ae-datatable-hover-bg: var(--ae-surface-1-hover, #f3f4f6);
    --ae-datatable-selected-bg: var(--ae-selected-bg, rgba(94, 124, 226, 0.1));
    --ae-datatable-cell-padding: 0.75rem 1rem;
    --ae-datatable-cell-padding-dense: 0.375rem 0.75rem;
    --ae-datatable-row-height: 3rem;
    --ae-datatable-row-height-dense: 2.25rem;
    --ae-datatable-header-height: 3rem;
    --ae-datatable-header-height-dense: 2.5rem;
    --ae-datatable-border-radius: var(--ae-border-radius, 0.375rem);
    --ae-datatable-text-color: var(--ae-text-color, #111827);
    --ae-datatable-empty-text-color: var(--ae-text-color-secondary, #6b7280);
    --ae-datatable-header-text-color: var(--ae-text-color-emphasis, #000000);
    --ae-datatable-resize-handle-color: var(--ae-color-brand-600, #2563eb);
    --ae-datatable-row-alt-bg: var(--ae-surface-1-alt, rgba(0, 0, 0, 0.02));
    --ae-datatable-focus-ring: 0 0 0 2px var(--ae-color-focus, rgba(59, 130, 246, 0.5));
    --ae-datatable-pagination-button-radius: var(--ae-border-radius-sm, 0.25rem);
    --ae-datatable-badge-bg: var(--ae-color-brand-50, rgba(59, 130, 246, 0.1));
    --ae-datatable-badge-text: var(--ae-color-brand-600, #2563eb);
    --ae-datatable-selection-column-width: 40px;
  }

  /* Main table container */
  .datatable {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--ae-datatable-border-color);
    border-radius: var(--ae-datatable-border-radius);
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
  }

  /* Table layout styling */
  .datatable__header,
  .datatable__body {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .datatable__header-row {
    display: table-row;
    background-color: var(--ae-datatable-header-bg);
  }

  .datatable__body ae-datatable-row {
    display: table-row;
  }

  ae-datatable-header,
  ae-datatable-header-cell,
  ae-datatable-cell {
    display: table-cell !important;
    vertical-align: middle;
    padding: var(--ae-datatable-cell-padding);
    border-bottom: 1px solid var(--ae-datatable-border-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ae-datatable-header,
  ae-datatable-header-cell {
    background-color: var(--ae-datatable-header-bg);
    color: var(--ae-datatable-header-text-color);
    font-weight: 500;
    height: var(--ae-datatable-header-height);
    user-select: none;
  }

  /* Selection column styling */
  .datatable__selection-header,
  .datatable__selection-cell {
    width: var(--ae-datatable-selection-column-width, 40px);
    min-width: var(--ae-datatable-selection-column-width, 40px);
    max-width: var(--ae-datatable-selection-column-width, 40px);
    padding: 0 !important;
    vertical-align: middle;
    text-align: center;
  }

  .datatable__selection-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .datatable__selection-checkbox input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
  }

  /* Row hover and selection effects */
  .datatable__body ae-datatable-row:hover {
    background-color: var(--ae-datatable-hover-bg);
  }

  .datatable__body ae-datatable-row[selected] {
    background-color: var(--ae-datatable-selected-bg);
  }

  /* Striped rows */
  .datatable--striped .datatable__body ae-datatable-row:nth-child(even) {
    background-color: var(--ae-datatable-row-alt-bg);
  }

  /* Dense mode */
  .datatable--dense ae-datatable-header,
  .datatable--dense ae-datatable-header-cell,
  .datatable--dense ae-datatable-cell {
    padding: var(--ae-datatable-cell-padding-dense);
    height: var(--ae-datatable-row-height-dense);
  }

  .datatable--dense .datatable__header {
    height: var(--ae-datatable-header-height-dense);
  }

  /* Toolbar section */
  .datatable__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--ae-datatable-border-color);
    gap: 0.5rem;
  }

  .datatable__filter {
    position: relative;
    display: flex;
    align-items: center;
  }

  .datatable__filter-badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    width: 100%;
  }

  .datatable__clear-filters {
    padding: 0.25rem 0.5rem;
    background-color: transparent;
    border: 1px solid var(--ae-datatable-border-color);
    border-radius: var(--ae-datatable-pagination-button-radius);
    cursor: pointer;
    font-size: 12px;
    color: var(--ae-datatable-text-color);
  }

  .datatable__clear-filters:hover {
    background-color: var(--ae-datatable-hover-bg);
  }

  /* Empty state */
  .datatable__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    padding: 1rem;
    color: var(--ae-datatable-empty-text-color);
    width: 100%;
  }

  /* Footer and pagination */
  .datatable__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--ae-datatable-border-color);
  }

  .datatable__pagination {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .datatable__pagination-info {
    margin-right: 1rem;
  }

  .datatable__pagination-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .datatable__page-size-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .datatable__page-size-selector select {
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--ae-datatable-border-color);
    border-radius: var(--ae-datatable-pagination-button-radius);
    background-color: white;
  }

  /* Button styles for pagination */
  .datatable__pagination button {
    padding: 0.375rem 0.75rem;
    background-color: white;
    border: 1px solid var(--ae-datatable-border-color);
    border-radius: var(--ae-datatable-pagination-button-radius);
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }

  .datatable__pagination button:hover:not(:disabled) {
    background-color: var(--ae-datatable-hover-bg);
  }

  .datatable__pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Alignment utilities */
  [align="center"] {
    text-align: center;
  }

  [align="right"] {
    text-align: right;
  }

  /* Focus utilities */
  .keyboard-focused {
    outline: var(--ae-datatable-focus-ring);
    z-index: 1;
    position: relative;
  }

  /* Focus styles for all focusable elements */
  ae-datatable-header:focus,
  ae-datatable-header-cell:focus,
  ae-datatable-cell:focus,
  .datatable:focus {
    outline: var(--ae-datatable-focus-ring);
  }

  /* Loading state */
  .datatable--loading {
    position: relative;
  }

  .datatable__loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .datatable__loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .datatable__loading-spinner {
    width: 2rem;
    height: 2rem;
    border: 2px solid var(--ae-datatable-border-color);
    border-top: 2px solid var(--ae-datatable-resize-handle-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .datatable__loading-text {
    font-weight: 500;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Resize handle */
  .datatable__resize-handle,
  .header-cell__resize-handle {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 4px;
    cursor: col-resize;
    z-index: 1;
  }

  .datatable__resize-handle:hover,
  .datatable__resize-handle--active,
  .header-cell__resize-handle:hover,
  .header-cell__resize-handle--active {
    background-color: var(--ae-datatable-resize-handle-color);
  }

  /* Sort icons */
  .datatable__sort-icon,
  .header-cell__sort-icon {
    width: 1em;
    height: 1em;
    transition: transform 0.2s;
  }

  .datatable__sort-icon--asc,
  .header-cell__sort-icon--asc {
    transform: rotate(0deg);
  }

  .datatable__sort-icon--desc,
  .header-cell__sort-icon--desc {
    transform: rotate(180deg);
  }

  /* Header content layout */
  .datatable__header-content,
  .header-cell__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
  }

  /* Bordered table */
  .datatable--bordered ae-datatable-header,
  .datatable--bordered ae-datatable-header-cell,
  .datatable--bordered ae-datatable-cell {
    border-right: 1px solid var(--ae-datatable-border-color);
  }

  .datatable--bordered ae-datatable-header:last-child,
  .datatable--bordered ae-datatable-header-cell:last-child,
  .datatable--bordered ae-datatable-cell:last-child {
    border-right: none;
  }

  /* Virtualization support */
  .datatable__virtual-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .datatable__virtual-items {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    will-change: transform;
  }
`;

/**
 * STEP 2: Replace the existing renderHeader method in ae-datatable.ts
 * with this simplified version that uses a table-based layout
 */

/**
 * Render table header
 */
private renderHeader() {
  const visibleColumns = this.controller.getVisibleColumns();
  const sortState = this.controller.getSortState();

  return html`
    <div class="datatable__header" part="header" role="rowgroup">
      <div class="datatable__header-row" role="row">
        ${this.selectable ? html`
          <ae-datatable-header-cell
            id="selection"
            .sortable=${false}
            role="columnheader"
            aria-label="Select all rows"
            class="datatable__selection-header"
            aria-colindex="1"
          >
            <div class="datatable__selection-checkbox">
              <input
                type="checkbox"
                slot="content"
                ?checked=${this.controller.getSelectedRows().length === this.controller.getProcessedData().length && this.controller.getProcessedData().length > 0}
                ?indeterminate=${this.controller.getSelectedRows().length > 0 && this.controller.getSelectedRows().length < this.controller.getProcessedData().length}
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.handleSelectAll();
                }}
                aria-label="Select all rows"
              />
            </div>
          </ae-datatable-header-cell>
        ` : ''}

        ${visibleColumns.map((column, index) => {
          const sortInfo = sortState.find(s => s.id === column.id);
          const sortDirection = sortInfo?.direction || 'none';

          // Generate appropriate ARIA attributes based on sorting state
          const ariaSort = sortDirection === 'none' ? 'none' :
                          sortDirection === 'asc' ? 'ascending' : 'descending';

          const sortIndex = sortState.findIndex(s => s.id === column.id);
          const ariaSortIndex = sortIndex > -1 ? sortIndex + 1 : undefined;

          const isSortable = this.sortable && column.sortable !== false;
          const isResizable = this.resizable && column.resizable !== false;

          // Generate accessible label
          const headerLabel = typeof column.header === 'string' ? column.header : `Column ${index + 1}`;
          const sortableText = isSortable ? ', sortable' : '';
          const sortStateText = sortDirection !== 'none' ?
            `, sorted ${sortDirection === 'asc' ? 'ascending' : 'descending'}` +
            (ariaSortIndex && ariaSortIndex > 1 ? `, sort priority ${ariaSortIndex}` : '')
            : '';

          const ariaLabel = `${headerLabel}${sortableText}${sortStateText}`;
          
          // Calculate aria-colindex (accounts for selection)
          const ariaColIndex = this.selectable ? index + 2 : index + 1;

          return html`
            <ae-datatable-header
              id=${column.id}
              .sortable=${isSortable}
              .resizable=${isResizable}
              .direction=${sortDirection}
              .align=${column.align || 'left'}
              @ae-datatable-header-sort=${(e: CustomEvent) => this.handleSort(column.id, e.detail.direction, e.detail.multiSort)}
              @ae-datatable-header-resize=${(e: CustomEvent) => this.handleColumnResize(column.id, e.detail.width)}
              role="columnheader"
              aria-sort=${ariaSort}
              aria-colindex=${String(ariaColIndex)}
              aria-label=${ariaLabel}
              tabindex=${isSortable ? '0' : '-1'}
            >
              <slot name="header-cell-${column.id}">
                ${typeof column.header === 'string'
                  ? column.header
                  : column.header}
              </slot>
            </ae-datatable-header>
          `;
        })}
      </div>
    </div>
  `;
}

/**
 * STEP 3: Replace the existing renderBody method in ae-datatable.ts
 * with this simplified version that uses a table-based layout
 */

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

  // Determine if we should use virtualization
  if (this.virtualized && this.virtualizationController.isEnabled()) {
    // Get virtualization data
    const { start, end } = this.virtualizationController.getVisibleRange();
    const containerStyle = this.virtualizationController.getContainerStyle();
    const itemsStyle = this.virtualizationController.getItemsStyle();

    // Create a slice of data to render
    const visibleData = processedData.slice(start, end + 1);

    return html`
      <div class="datatable__body" part="body">
        <!-- Virtual scroll container with total height -->
        <div class="datatable__virtual-container" style=${styleMap(containerStyle)}>
          <!-- Rows container positioned at correct offset -->
          <div class="datatable__virtual-items" style=${styleMap(itemsStyle)}>
            ${repeat(visibleData, (item: T, index) => {
              const rowId = (item as any).id || (start + index);
              const isSelected = this.controller.isRowSelected(rowId);

              return this.renderRow(item, rowId, isSelected, visibleColumns);
            })}
          </div>
        </div>
      </div>
    `;
  }

  // Standard (non-virtualized) rendering
  return html`
    <div class="datatable__body" part="body">
      ${repeat(processedData, (item: T, index) => {
        const rowId = (item as any).id || index;
        const isSelected = this.controller.isRowSelected(rowId);

        return this.renderRow(item, rowId, isSelected, visibleColumns);
      })}
    </div>
  `;
}

/**
 * STEP 4: Replace the existing renderRow method in ae-datatable.ts
 * with this simplified version that uses a table-based layout
 */

/**
 * Render a single row (extracted to avoid code duplication)
 */
private renderRow(item: T, rowId: string | number, isSelected: boolean, visibleColumns: ColumnDef<T>[]) {
  // Create cells for this row
  const cells = [];
  
  // 1. Add the selection cell first if selectable
  if (this.selectable) {
    cells.push(html`
      <ae-datatable-cell
        class="datatable__selection-cell"
        role="cell"
        aria-colindex="1"
      >
        <div class="datatable__selection-checkbox">
          <input
            type="checkbox"
            ?checked=${isSelected}
            @click=${(e: Event) => {
              e.stopPropagation(); // Prevent row click event
              this.handleRowSelect(rowId, 'checkbox');
            }}
            aria-label="${isSelected ? 'Deselect row' : 'Select row'}"
          />
        </div>
      </ae-datatable-cell>
    `);
  }

  // 2. Add data cells for each column
  visibleColumns.forEach((column, colIndex) => {
    let cellContent: string | TemplateResult;

    // Get cell value through accessor or field
    if (column.renderer) {
      const value = column.accessor ? column.accessor(item) : column.field ? item[column.field] : null;
      cellContent = column.renderer(value, item);
    } else {
      let value;
      if (column.accessor) {
        value = column.accessor(item);
      } else if (column.field) {
        value = item[column.field];
      } else {
        value = '';
      }

      if (column.format && value !== undefined && value !== null) {
        cellContent = column.format(value);
      } else {
        cellContent = value !== undefined && value !== null ? String(value) : '';
      }
    }

    // Calculate aria-colindex (1-based, accounts for selection)
    const ariaColIndex = this.selectable ? colIndex + 2 : colIndex + 1;

    cells.push(html`
      <ae-datatable-cell
        data-column=${column.id}
        align=${column.align || 'left'}
        role="cell"
        aria-colindex=${String(ariaColIndex)}
      >
        <slot name="cell-${column.id}">
          ${cellContent}
        </slot>
      </ae-datatable-cell>
    `);
  });

  return html`
    <ae-datatable-row
      id=${String(rowId)}
      ?selected=${isSelected}
      ?selectable=${this.selectable}
      @click=${() => this.handleRowSelect(rowId, 'row')}
      role="row"
      aria-selected=${isSelected ? 'true' : 'false'}
    >
      ${cells}
    </ae-datatable-row>
  `;
}

/**
 * STEP 5: Replace the existing updateGridTemplateColumns method in ae-datatable.ts
 * with this simplified version that doesn't use grid layout
 */

/**
 * Initialize the controller with data and columns
 */
private initializeController() {
  if (this.data.length > 0 && this.columns.length > 0) {
    // Initialize selection in the controller with our external selection state and options
    this.controller.initialize(this.data, this.columns);

    // Initialize selection manager
    const selectionMode = !this.selectable ? 'none' : this.selectionMode;
    this.controller.initializeSelection(this.selected, {
      selectionMode,
      selectionTrigger: this.selectionTrigger
    });

    this.paginationState = this.controller.getPaginationState();
    this.initialized = true;
  }
}

// Note: Remove the updateGridTemplateColumns method entirely as we're using table layout now