import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DATATABLE_ELEMENT_NAME, DATATABLE_HEADER_ELEMENT_NAME, DATATABLE_ROW_ELEMENT_NAME, DATATABLE_CELL_ELEMENT_NAME } from './index';
import { datatableStyles } from './styles';
import { DataTableController } from './controllers/datatable-controller';
import { VirtualizationController } from './controllers/virtualization-controller';
import { KeyboardController } from './controllers/keyboard-controller';
import { ColumnDef } from './models/column-model';
import { SortDirection } from './models/sort-model';
import type { PaginationState } from './models/pagination-model';
import type { VirtualizationOptions } from './utils/virtualization-utils';
import type { GridPosition } from './controllers/keyboard-controller';
import { ColumnFilterValue } from './components/column-filter';
import './components/filter-badge';
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
   * Whether the table supports sorting (global setting)
   */
  @property({ type: Boolean, reflect: true })
  accessor sortable = true;

  /**
   * Allow multi-column sorting
   */
  @property({ type: Boolean, reflect: true, attribute: 'enable-multi-sort' })
  accessor enableMultiSort = true;

  /**
   * Allow removing sort
   */
  @property({ type: Boolean, reflect: true, attribute: 'enable-sorting-removal' })
  accessor enableSortingRemoval = true;

  /**
   * Enable server-side sorting
   */
  @property({ type: Boolean, reflect: true, attribute: 'manual-sorting' })
  accessor manualSorting = false;

  /**
   * Current sort state (array of {id, desc} objects)
   */
  @property({ type: Array, attribute: false })
  accessor sorting: { id: string, desc: boolean }[] = [];

  /**
   * Whether the table supports filtering (global setting)
   */
  @property({ type: Boolean, reflect: true })
  accessor filterable = true;

  /**
   * Enable column-specific filtering
   */
  @property({ type: Boolean, reflect: true, attribute: 'enable-column-filters' })
  accessor enableColumnFilters = true;

  /**
   * Enables slot for custom global filter input
   */
  @property({ type: Boolean, reflect: true, attribute: 'global-filter-slot' })
  accessor globalFilterSlot = false;

  /**
   * Enable server-side filtering
   */
  @property({ type: Boolean, reflect: true, attribute: 'manual-filtering' })
  accessor manualFiltering = false;

  /**
   * Global filter value
   */
  @property({ type: String, reflect: true, attribute: 'global-filter' })
  accessor globalFilterValue = '';

  /**
   * Column filters state
   */
  @property({ type: Array, attribute: false })
  accessor columnFilters: { id: string, value: string }[] = [];

  /**
   * Whether rows can be selected
   */
  @property({ type: Boolean, reflect: true })
  accessor selectable = false;

  /**
   * Selection mode ('single' or 'multiple')
   */
  @property({ type: String, reflect: true, attribute: 'selection-mode' })
  accessor selectionMode: 'single' | 'multiple' | 'none' = 'multiple';

  /**
   * What triggers row selection ('row', 'checkbox', or 'both')
   */
  @property({ type: String, reflect: true, attribute: 'selection-trigger' })
  accessor selectionTrigger: 'row' | 'checkbox' | 'both' = 'checkbox';

  /**
   * Selected row IDs with `true` values
   */
  @property({ type: Object })
  accessor selected: Record<string, boolean> = {};

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
   * Available page size options
   */
  @property({ type: Array, attribute: 'page-size-options' })
  accessor pageSizeOptions: number[] = [10, 25, 50, 100];

  /**
   * Total row count for server-side pagination
   */
  @property({ type: Number, reflect: true, attribute: 'row-count' })
  accessor rowCount?: number;

  /**
   * Enable server-side pagination
   */
  @property({ type: Boolean, reflect: true, attribute: 'manual-pagination' })
  accessor manualPagination = false;

  /**
   * Current pagination state (for external control)
   */
  @property({ type: Object, attribute: false })
  accessor pagination: { page: number, pageSize: number } = { page: 1, pageSize: 10 };

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
   * Width of the table (CSS value)
   */
  @property({ type: String, reflect: true })
  accessor width = '100%';

  /**
   * Maximum height before scrolling (CSS value)
   */
  @property({ type: String, reflect: true, attribute: 'max-height' })
  accessor maxHeight: string | undefined = undefined;

  /**
   * Compact mode with reduced vertical padding
   */
  @property({ type: Boolean, reflect: true })
  accessor dense = false;

  /**
   * Apply alternating row styles
   */
  @property({ type: Boolean, reflect: true })
  accessor striped = false;

  /**
   * Add borders to cells, rows, and columns
   */
  @property({ type: Boolean, reflect: true })
  accessor bordered = false;

  /**
   * Show loading state UI overlay
   */
  @property({ type: Boolean, reflect: true })
  accessor loading = false;

  /**
   * Text to display during loading
   */
  @property({ type: String, reflect: true, attribute: 'loading-text' })
  accessor loadingText = 'Loading...';

  /**
   * Accessibility label
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  accessor ariaLabel = 'Data table';

  /**
   * The controller managing all data operations
   */
  private controller = new DataTableController<T>(this);

  /**
   * The controller handling virtualized rendering
   */
  private virtualizationController = new VirtualizationController(this);

  /**
   * The controller handling keyboard navigation
   */
  private keyboardController = new KeyboardController(this);

  /**
   * Reference to the body container element for virtualization
   */
  @query('.datatable__body')
  private bodyElement?: HTMLElement;

  /**
   * Whether keyboard navigation is enabled
   */
  @property({ type: Boolean, reflect: true, attribute: 'keyboard-navigation' })
  accessor keyboardNavigation = true;

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

    // Setup scroll listener for virtualization if enabled
    if (this.virtualized && this.bodyElement) {
      this.bodyElement.addEventListener('scroll', this.handleBodyScroll);
      this.initializeVirtualization();
    }

    // Initialize keyboard navigation
    if (this.keyboardNavigation) {
      this.initializeKeyboardNavigation();

      // Add keydown event listener
      this.addEventListener('keydown', this.handleKeyDown);
    }
  }

  /**
   * Initialize keyboard navigation settings
   */
  private initializeKeyboardNavigation() {
    const visibleColumns = this.controller.getVisibleColumns();
    const processedData = this.controller.getProcessedData();

    const options = {
      rowCount: processedData.length,
      colCount: visibleColumns.length + (this.selectable ? 1 : 0),
      wrap: true,
      isCellFocusable: (position: GridPosition) => {
        // All cells are focusable by default
        return true;
      }
    };

    this.keyboardController.initialize(options);
    this.keyboardController.setEnabled(this.keyboardNavigation);
  }

  /**
   * Handle keydown events for keyboard navigation
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    if (!this.keyboardNavigation) return;

    // Let the keyboard controller handle the event
    const handled = this.keyboardController.handleKeyDown(e);

    // If the controller handled the event, focus the corresponding cell
    if (handled) {
      const position = this.keyboardController.getPosition();

      // Find the cell element based on position
      // This is a simplistic implementation and might need to be adjusted
      const cell = this.findCellElement(position);

      if (cell) {
        this.keyboardController.focusCell(cell);

        // Announce the cell content for screen readers
        this.announceCellContent(cell, position);
      }
    }
  };

  /**
   * Find a cell element based on grid position
   */
  private findCellElement(position: GridPosition): HTMLElement | null {
    const { rowIndex, colIndex } = position;

    // Find all rows
    const rows = this.shadowRoot?.querySelectorAll('ae-datatable-row');
    if (!rows || rowIndex < 0 || rowIndex >= rows.length) return null;

    // Get the target row
    const row = rows[rowIndex];
    if (!row) return null;

    // Find all cells in the row
    const cells = row.querySelectorAll('ae-datatable-cell');
    if (!cells || colIndex < 0 || colIndex >= cells.length) return null;

    // Get the target cell
    return cells[colIndex] as HTMLElement;
  }

  /**
   * Announce cell content for screen readers
   */
  private announceCellContent(cell: HTMLElement, position: GridPosition) {
    // Get the cell content for screen reader announcement
    const content = cell.textContent?.trim();
    if (!content) return;

    // Find the header for this column
    const { colIndex } = position;
    const headers = this.shadowRoot?.querySelectorAll('ae-datatable-header, ae-datatable-header-cell');
    const header = headers?.[colIndex];
    const headerText = header?.textContent?.trim() || `Column ${colIndex + 1}`;

    // Announce the cell content
    const announcement = `${headerText}: ${content}`;

    // Create or get an ARIA live region for announcements
    let liveRegion = this.shadowRoot?.querySelector('.sr-only-announcement');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.className = 'sr-only-announcement';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      liveRegion.style.clip = 'rect(0, 0, 0, 0)';
      this.shadowRoot?.appendChild(liveRegion);
    }

    // Update the live region content
    liveRegion.textContent = announcement;
  }

  /**
   * Handle property changes
   */
  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('data') || changedProperties.has('columns')) {
      this.initializeController();

      // Update virtualization with new data length
      if (this.virtualized) {
        this.virtualizationController.setTotalRows(this.data.length);
      }
    }

    if (changedProperties.has('pageSize') && this.initialized) {
      this.controller.setPageSize(this.pageSize);
    }

    // Handle virtualization changes
    if (changedProperties.has('virtualized')) {
      this.virtualizationController.setEnabled(this.virtualized);
      if (this.virtualized && this.bodyElement) {
        this.initializeVirtualization();
        this.bodyElement.addEventListener('scroll', this.handleBodyScroll);
      } else if (this.bodyElement) {
        this.bodyElement.removeEventListener('scroll', this.handleBodyScroll);
      }
    }

    // Handle external selection state changes
    if (changedProperties.has('selected') && this.initialized) {
      this.syncSelectionState();
    }

    // Handle selection mode changes
    if ((changedProperties.has('selectionMode') || changedProperties.has('selectable')) && this.initialized) {
      // If selection is disabled or mode is none, clear selection
      if (!this.selectable || this.selectionMode === 'none') {
        this.controller.deselectAllRows();
      }
    }

    // Handle sorting changes from external sorting property
    if (changedProperties.has('sorting') && this.initialized) {
      this.syncSortState();
    }

    // Handle filter changes from external properties
    if ((changedProperties.has('globalFilterValue') || changedProperties.has('columnFilters')) && this.initialized) {
      this.syncFilterState();
    }

    // Handle pagination changes from external properties
    if ((changedProperties.has('pagination') || changedProperties.has('rowCount')) && this.initialized) {
      this.syncPaginationState();
    }

    // Handle keyboard navigation changes
    if (changedProperties.has('keyboardNavigation') && this.initialized) {
      if (this.keyboardNavigation) {
        this.initializeKeyboardNavigation();
        this.addEventListener('keydown', this.handleKeyDown);
      } else {
        this.keyboardController.setEnabled(false);
        this.removeEventListener('keydown', this.handleKeyDown);
      }
    }
  }

  /**
   * Initialize virtualization settings
   */
  private initializeVirtualization() {
    if (!this.bodyElement || !this.virtualized) return;

    const options: Partial<VirtualizationOptions> = {
      totalRows: this.controller.getProcessedData().length,
      rowHeight: parseInt(getComputedStyle(this).getPropertyValue('--ae-datatable-row-height') || '48', 10)
    };

    this.virtualizationController.initialize(options, this.bodyElement);
    this.virtualizationController.setEnabled(true);
  }

  /**
   * Handle body scroll for virtualization
   */
  private handleBodyScroll = (e: Event) => {
    if (!this.virtualized) return;

    const scrollTop = (e.target as HTMLElement).scrollTop;
    this.virtualizationController.handleScroll(scrollTop);
  }

  /**
   * Sync the pagination state between the component and controller
   */
  private syncPaginationState() {
    // Update page and page size in the controller
    if (this.pagination.page !== undefined) {
      this.controller.setPage(this.pagination.page);
    }

    if (this.pagination.pageSize !== undefined) {
      this.controller.setPageSize(this.pagination.pageSize);
    }

    // If row count is provided (for server-side pagination), update it
    if (this.rowCount !== undefined) {
      this.controller.setRowCount(this.rowCount);
    }

    // Update internal pagination state
    this.paginationState = this.controller.getPaginationState();
  }

  /**
   * Sync the filter state between the component and controller
   */
  private syncFilterState() {
    // Set global filter
    if (this.globalFilterValue) {
      this.controller.setGlobalFilter(this.globalFilterValue);
    }

    // Set column filters
    for (const filter of this.columnFilters) {
      this.controller.setColumnFilter(filter.id, filter.value);
    }
  }

  /**
   * Sync the sort state between the component and controller
   */
  private syncSortState() {
    // Convert external sorting format to internal format
    const sortState = this.sorting.map(item => ({
      id: item.id,
      direction: item.desc ? 'desc' : 'asc' as SortDirection
    }));

    // Set the sort state in the controller
    this.controller.setSortingState(sortState);
  }

  /**
   * Sync the controller's selection state with the external state
   */
  private syncSelectionState() {
    // Get the current internal selection state from the controller
    const currentSelected = this.controller.getSelectedRows().reduce((acc, id) => {
      acc[String(id)] = true;
      return acc;
    }, {} as Record<string, boolean>);

    // Compare with the external state
    const externalSelected = this.selected;
    let updated = false;

    // Deselect rows that are no longer in the external selection
    for (const id in currentSelected) {
      if (!externalSelected[id]) {
        this.controller.setRowSelection(id, false);
        updated = true;
      }
    }

    // Select rows that are in the external selection
    for (const id in externalSelected) {
      if (externalSelected[id] && !currentSelected[id]) {
        this.controller.setRowSelection(id, true);
        updated = true;
      }
    }

    // If changes were made, dispatch a selection event
    if (updated) {
      this.dispatchEvent(new CustomEvent('ae-datatable-select', {
        detail: {
          selectedRows: this.controller.getSelectedRows()
        },
        bubbles: true,
        composed: true
      }));
    }
  }

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

      // Set table attributes to support layout
      this.updateColumnAttributes();

      this.paginationState = this.controller.getPaginationState();
      this.initialized = true;
    }
  }

  /**
   * Update attributes for table layout
   */
  private updateColumnAttributes() {
    // Set selection mode attribute
    if (this.selectable) {
      this.setAttribute('data-has-selection', 'true');
    } else {
      this.removeAttribute('data-has-selection');
    }
    
    // Set column count attribute
    const visibleColumns = this.controller.getVisibleColumns();
    const totalColumns = this.selectable ? visibleColumns.length + 1 : visibleColumns.length;
    this.setAttribute('data-column-count', String(totalColumns));
  }

  /**
   * Handle column sort
   * @param columnId Column to sort by
   * @param direction Sort direction
   * @param multiSortEvent Whether the multi-sort key was pressed during the event
   */
  handleSort(columnId: string, direction: SortDirection, multiSortEvent = false) {
    // Skip if sorting is disabled
    if (!this.sortable) return;

    // Check if we should enable multi-sort
    const multiSort = this.enableMultiSort && multiSortEvent;

    // If sorting removal is disabled and trying to remove sorting, use 'asc' instead
    if (!this.enableSortingRemoval && direction === 'none') {
      direction = 'asc';
    }

    // Apply the sort
    this.controller.setSortState(columnId, direction, multiSort);

    // Update the external sorting property
    const sortState = this.controller.getSortState();
    this.sorting = sortState.map(item => ({
      id: item.id,
      desc: item.direction === 'desc'
    }));

    // For manual sorting, we won't re-render immediately as data will come from external source
    if (this.manualSorting) {
      // Don't process data internally
    }

    // Dispatch sort event
    this.dispatchEvent(new CustomEvent('ae-datatable-sort', {
      detail: {
        columnId,
        direction,
        sortState: sortState,
        sorting: this.sorting
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
    // Skip if filtering is disabled
    if (!this.filterable) return;

    const input = e.target as HTMLInputElement;

    // Update internal state and external property
    this.globalFilter = input.value;
    this.globalFilterValue = input.value;

    // Apply filter in the controller (unless manual filtering is enabled)
    if (!this.manualFiltering) {
      this.controller.setGlobalFilter(input.value);
    }

    // Update column filters array to reflect in external state
    const filterState = this.controller.getFilterState();
    this.columnFilters = filterState.map(filter => ({
      id: filter.id,
      value: filter.value as string
    }));

    // Dispatch filter event
    this.dispatchEvent(new CustomEvent('ae-datatable-filter', {
      detail: {
        globalFilter: input.value,
        filterState: filterState,
        columnFilters: this.columnFilters
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle column filter change
   * @param columnId Column ID
   * @param value Filter value (string or advanced filter object)
   */
  handleColumnFilter(columnId: string, value: string | any) {
    // Skip if filtering is disabled or column filtering is disabled
    if (!this.filterable || !this.enableColumnFilters) return;

    // Check if this is an advanced filter or a simple string filter
    const isAdvancedFilter = value !== null && typeof value === 'object';

    if (isAdvancedFilter) {
      // Handle advanced filter
      if (!this.manualFiltering) {
        this.controller.setAdvancedColumnFilter(columnId, value);
      }

      // For external state, we need to serialize the advanced filter to a string
      const filterStr = value ? JSON.stringify(value) : '';

      // Update column filters array for external state
      this.updateColumnFiltersState(columnId, filterStr);
    } else {
      // Handle simple string filter
      if (!this.manualFiltering) {
        this.controller.setColumnFilter(columnId, value as string);
      }

      // Update column filters array for external state
      this.updateColumnFiltersState(columnId, value as string);
    }

    // Dispatch filter event
    this.dispatchEvent(new CustomEvent('ae-datatable-filter', {
      detail: {
        columnId,
        value,
        filterState: this.controller.getFilterState(),
        advancedFilters: this.controller.getAdvancedFilters(),
        columnFilters: this.columnFilters
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Update the column filters external state
   * @param columnId Column ID
   * @param value Filter value (serialized if advanced)
   */
  private updateColumnFiltersState(columnId: string, value: string) {
    const existingFilter = this.columnFilters.find(f => f.id === columnId);
    let newFilters;

    if (value === '') {
      // Remove filter
      newFilters = this.columnFilters.filter(f => f.id !== columnId);
    } else if (existingFilter) {
      // Update existing filter
      newFilters = this.columnFilters.map(f =>
        f.id === columnId ? { ...f, value } : f
      );
    } else {
      // Add new filter
      newFilters = [...this.columnFilters, { id: columnId, value }];
    }

    this.columnFilters = newFilters;
  }

  /**
   * Handle row selection
   * @param rowId Row ID
   * @param source Source of the selection action ('row' or 'checkbox')
   */
  handleRowSelect(rowId: string | number, source: 'row' | 'checkbox' = 'row') {
    // Skip if selection is disabled or selection trigger doesn't match
    if (
      !this.selectable ||
      this.selectionMode === 'none' ||
      (this.selectionTrigger !== 'both' && this.selectionTrigger !== source)
    ) {
      return;
    }

    if (this.selectionMode === 'single') {
      this.controller.deselectAllRows();
    }

    this.controller.toggleRowSelection(rowId);

    // Update external selection state
    const selected = this.controller.getSelectedRows().reduce((acc, id) => {
      acc[String(id)] = true;
      return acc;
    }, {} as Record<string, boolean>);

    this.selected = selected;

    // Dispatch selection event
    this.dispatchEvent(new CustomEvent('ae-datatable-select', {
      detail: {
        selectedRows: this.controller.getSelectedRows(),
        selection: selected
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle select all rows
   */
  handleSelectAll() {
    // Skip if selection is disabled or selection trigger is not 'checkbox' or 'both'
    if (
      !this.selectable ||
      this.selectionMode === 'none' ||
      (this.selectionTrigger !== 'checkbox' && this.selectionTrigger !== 'both')
    ) {
      return;
    }

    // Check if all rows are selected
    const allSelected = this.controller.getSelectedRows().length === this.controller.getProcessedData().length;

    if (allSelected) {
      this.controller.deselectAllRows();
    } else {
      this.controller.selectAllRows();
    }

    // Update external selection state
    const selected = this.controller.getSelectedRows().reduce((acc, id) => {
      acc[String(id)] = true;
      return acc;
    }, {} as Record<string, boolean>);

    this.selected = selected;

    // Dispatch selection event
    this.dispatchEvent(new CustomEvent('ae-datatable-select', {
      detail: {
        selectedRows: this.controller.getSelectedRows(),
        selection: selected
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
    // Update the external pagination state
    this.pagination = { ...this.pagination, page };

    // For manual pagination, wait for external data update
    if (!this.manualPagination) {
      this.controller.setPage(page);
    }

    // Update the pagination state
    this.paginationState = this.controller.getPaginationState();

    // Dispatch page event
    this.dispatchEvent(new CustomEvent('ae-datatable-page', {
      detail: {
        page,
        pageSize: this.paginationState.pageSize,
        pagination: this.pagination,
        paginationState: this.paginationState
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle page size change
   * @param size New page size
   */
  handlePageSizeChange(size: number) {
    // Update the external pagination state
    this.pagination = { ...this.pagination, pageSize: size, page: 1 }; // Reset to first page

    // For manual pagination, wait for external data update
    if (!this.manualPagination) {
      this.controller.setPageSize(size);
      this.controller.setPage(1);
    }

    // Update the pagination state
    this.paginationState = this.controller.getPaginationState();

    // Dispatch page event
    this.dispatchEvent(new CustomEvent('ae-datatable-page', {
      detail: {
        page: 1,
        pageSize: size,
        pagination: this.pagination,
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

    // Use rowCount if provided (for server-side pagination), otherwise use paginationState
    const totalItems = this.rowCount !== undefined ? this.rowCount : this.paginationState.totalItems;

    const { page, pageSize, totalPages } = this.paginationState;
    const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalItems);

    // Page size selector
    const pageSizeSelector = html`
      <div class="datatable__page-size-selector">
        <span>Rows per page:</span>
        <select
          .value=${String(pageSize)}
          @change=${(e: Event) => this.handlePageSizeChange(Number((e.target as HTMLSelectElement).value))}
        >
          ${this.pageSizeOptions.map(size => html`
            <option value=${size} ?selected=${size === pageSize}>${size}</option>
          `)}
        </select>
      </div>
    `;

    return html`
      <div class="datatable__footer" part="footer">
        <div class="datatable__pagination-info">
          ${totalItems > 0
            ? html`Showing ${start}-${end} of ${totalItems} items`
            : html`No items`}
        </div>
        <div class="datatable__pagination-controls">
          ${pageSizeSelector}
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
            <span>Page ${page} of ${totalPages || 1}</span>
            <button
              ?disabled=${page === totalPages || totalPages === 0}
              @click=${() => this.handlePageChange(page + 1)}
            >
              Next
            </button>
            <button
              ?disabled=${page === totalPages || totalPages === 0}
              @click=${() => this.handlePageChange(totalPages || 1)}
            >
              Last
            </button>
          </div>
        </div>
        <slot name="footer"></slot>
      </div>
    `;
  }

  /**
   * Render filter toolbar
   */
  private renderToolbar() {
    // Default toolbar with filter input (if globalFilterSlot is false)
    let defaultToolbar = html``;

    // Only show default filter if enabled and globalFilterSlot is not enabled
    if (this.filterable && !this.globalFilterSlot) {
      defaultToolbar = html`
        <div class="datatable__filter">
          <input
            type="text"
            placeholder="Search..."
            .value=${this.globalFilter}
            @input=${this.handleGlobalFilterChange}
          />
        </div>
      `;
    }

    // For the global filter slot
    const filterSlot = this.globalFilterSlot ? html`
      <slot name="filter"></slot>
    ` : html``;

    // Render active filter badges if there are any
    const filterBadges = this.renderFilterBadges();

    return html`
      <div class="datatable__toolbar" part="toolbar">
        ${filterSlot}
        <slot name="toolbar">${defaultToolbar}</slot>
        ${filterBadges}
      </div>
    `;
  }

  /**
   * Render filter badges for active filters
   */
  private renderFilterBadges() {
    // Get advanced filters from controller
    const advancedFilters = this.controller.getAdvancedFilters();
    if (!this.filterable || (advancedFilters.size === 0 && this.columnFilters.length === 0)) {
      return '';
    }

    // Create badges for all active filters
    const badges = [];

    // Add advanced filters
    for (const [columnId, filter] of advancedFilters.entries()) {
      // Find column name
      const column = this.controller.getColumn(columnId);
      const columnName = column?.header?.toString() || columnId;

      badges.push(html`
        <ae-datatable-filter-badge
          .columnId=${columnId}
          .columnName=${columnName}
          .filter=${filter}
          @filter-remove=${(e: CustomEvent) => this.handleFilterRemove(e.detail.columnId)}
        ></ae-datatable-filter-badge>
      `);
    }

    // Add regular filters if they're not already in advanced filters
    for (const { id, value } of this.columnFilters) {
      // Skip if it's already in advanced filters
      if (advancedFilters.has(id)) {
        continue;
      }

      // Check if value is a serialized advanced filter
      try {
        const parsedFilter = JSON.parse(value);
        if (typeof parsedFilter === 'object' && parsedFilter.value) {
          // It's a serialized advanced filter
          const column = this.controller.getColumn(id);
          const columnName = column?.header?.toString() || id;

          badges.push(html`
            <ae-datatable-filter-badge
              .columnId=${id}
              .columnName=${columnName}
              .filter=${parsedFilter}
              @filter-remove=${(e: CustomEvent) => this.handleFilterRemove(e.detail.columnId)}
            ></ae-datatable-filter-badge>
          `);
        } else {
          // It's not a valid advanced filter - create a simple badge
          this.createSimpleFilterBadge(id, value, badges);
        }
      } catch (e) {
        // Not JSON - create a simple badge
        this.createSimpleFilterBadge(id, value, badges);
      }
    }

    // Add global filter badge if present
    if (this.globalFilter) {
      badges.push(html`
        <ae-datatable-filter-badge
          columnId="global"
          columnName="Global"
          .filter=${{ value: this.globalFilter, operator: 'contains' }}
          @filter-remove=${() => this.handleGlobalFilterChange({ target: { value: '' } } as any)}
        ></ae-datatable-filter-badge>
      `);
    }

    if (badges.length === 0) {
      return '';
    }

    return html`
      <div class="datatable__filter-badges" part="filter-badges">
        ${badges}
        ${badges.length > 1 ? html`
          <button
            class="datatable__clear-filters"
            @click=${this.handleClearAllFilters}
            title="Clear all filters"
          >
            Clear all
          </button>
        ` : ''}
      </div>
    `;
  }

  /**
   * Helper to create a simple filter badge
   */
  private createSimpleFilterBadge(columnId: string, value: string, badges: TemplateResult[]) {
    const column = this.controller.getColumn(columnId);
    const columnName = column?.header?.toString() || columnId;

    // Create a simple filter object
    const filter: ColumnFilterValue = {
      value,
      operator: 'contains'
    };

    badges.push(html`
      <ae-datatable-filter-badge
        .columnId=${columnId}
        .columnName=${columnName}
        .filter=${filter}
        @filter-remove=${(e: CustomEvent) => this.handleFilterRemove(e.detail.columnId)}
      ></ae-datatable-filter-badge>
    `);
  }

  /**
   * Handle filter remove
   */
  private handleFilterRemove(columnId: string) {
    if (columnId === 'global') {
      this.handleGlobalFilterChange({ target: { value: '' } } as any);
    } else {
      this.handleColumnFilter(columnId, '');
    }
  }

  /**
   * Handle clearing all filters
   */
  private handleClearAllFilters() {
    this.controller.clearFilters();
    this.globalFilter = '';
    this.globalFilterValue = '';
    this.columnFilters = [];

    // Dispatch filter event
    this.dispatchEvent(new CustomEvent('ae-datatable-filter', {
      detail: {
        filterState: this.controller.getFilterState(),
        advancedFilters: this.controller.getAdvancedFilters(),
        columnFilters: this.columnFilters,
        globalFilter: ''
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Render table header
   */
  private renderHeader() {
    const visibleColumns = this.controller.getVisibleColumns();
    const sortState = this.controller.getSortState();

    return html`
      <table class="datatable__table" part="table" cellspacing="0" cellpadding="0" border="0">
        <thead class="datatable__header" part="header">
          <tr class="datatable__header-row" role="row">
            ${this.selectable ? html`
              <th class="datatable__selection-header" role="columnheader" aria-label="Select all rows">
                <div class="datatable__selection-checkbox">
                  <input
                    type="checkbox"
                    ?checked=${this.controller.getSelectedRows().length === this.controller.getProcessedData().length && this.controller.getProcessedData().length > 0}
                    ?indeterminate=${this.controller.getSelectedRows().length > 0 && this.controller.getSelectedRows().length < this.controller.getProcessedData().length}
                    @click=${(e: Event) => {
                      e.stopPropagation();
                      this.handleSelectAll();
                    }}
                    aria-label="Select all rows"
                  />
                </div>
              </th>
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
              
              // Calculate column position (accounts for selection column)
              const colPosition = this.selectable ? index + 2 : index + 1;

              const classes = {
                'datatable__header-cell': true,
                'datatable__header-cell--sortable': isSortable,
                'datatable__header-cell--sorted': sortDirection !== 'none',
                'datatable__header-cell--resizable': isResizable,
                [`datatable__header-cell--align-${column.align || 'left'}`]: true
              };

              return html`
                <th 
                  class=${classMap(classes)}
                  data-column-id=${column.id}
                  role="columnheader"
                  aria-sort=${ariaSort}
                  aria-colindex=${String(colPosition)}
                  aria-label=${ariaLabel}
                  tabindex=${isSortable ? '0' : '-1'}
                  @click=${isSortable ? (e: MouseEvent) => this.handleColumnClick(e, column.id, sortDirection) : undefined}
                >
                  <div class="datatable__header-content">
                    ${typeof column.header === 'string' ? column.header : column.header}
                    ${sortDirection !== 'none' ? html`
                      <span class="datatable__sort-icon datatable__sort-icon--${sortDirection}">▲</span>
                    ` : ''}
                  </div>
                  ${isResizable ? html`
                    <div 
                      class="datatable__resize-handle"
                      @mousedown=${(e: MouseEvent) => this.handleResizeStart(e, column.id)}
                    ></div>
                  ` : ''}
                </th>
              `;
            })}
          </tr>
        </thead>
        <tbody class="datatable__body" part="body">
          ${this.renderRows()}
        </tbody>
      </table>
    `;
  }

  /**
   * Handle column click for sorting
   */
  private handleColumnClick(e: MouseEvent, columnId: string, currentDirection: SortDirection) {
    // Cycle through sort directions: none -> asc -> desc -> none
    let newDirection: SortDirection = 'asc';
    if (currentDirection === 'asc') {
      newDirection = 'desc';
    } else if (currentDirection === 'desc') {
      newDirection = 'none';
    }

    this.handleSort(columnId, newDirection, e.ctrlKey || e.metaKey);
  }

  /**
   * Handle resize start
   */
  private handleResizeStart(e: MouseEvent, columnId: string) {
    // Prevent the click event from being triggered
    e.stopPropagation();
    e.preventDefault();

    const headerCell = (e.target as HTMLElement).closest('.datatable__header-cell') as HTMLElement;
    if (!headerCell) return;

    const startX = e.clientX;
    const startWidth = headerCell.offsetWidth;
    let currentWidth = startWidth;

    // Add the active class to the resize handle
    const handle = e.target as HTMLElement;
    handle.classList.add('datatable__resize-handle--active');

    // Function to handle mouse movement during resize
    const handleResizeMove = (e: MouseEvent) => {
      // Calculate new width based on mouse movement
      const diff = e.clientX - startX;
      currentWidth = Math.max(50, startWidth + diff); // Minimum width of 50px

      // Update current width during resize for visual feedback
      headerCell.style.width = `${currentWidth}px`;
    };

    // Function to handle the end of resize
    const handleResizeEnd = () => {
      // Remove event listeners
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);

      // Remove active class from resize handle
      handle.classList.remove('datatable__resize-handle--active');

      // Dispatch resize event with final width
      this.handleColumnResize(columnId, currentWidth);
    };

    // Add event listeners for drag and end events
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  }

  /**
   * Render table rows
   */
  private renderRows() {
    const processedData = this.controller.getProcessedData();
    const visibleColumns = this.controller.getVisibleColumns();

    if (processedData.length === 0) {
      return html`
        <tr>
          <td colspan=${this.selectable ? visibleColumns.length + 1 : visibleColumns.length} class="datatable__empty">
            <slot name="empty">${this.emptyMessage}</slot>
          </td>
        </tr>
      `;
    }

    return processedData.map((item: T, index) => {
      const rowId = (item as any).id || index;
      const isSelected = this.controller.isRowSelected(rowId);

      const rowClasses = {
        'datatable__row': true,
        'datatable__row--selected': isSelected,
        'datatable__row--even': index % 2 === 1 && this.striped
      };

      return html`
        <tr
          class=${classMap(rowClasses)}
          data-row-id=${String(rowId)}
          role="row"
          aria-selected=${isSelected ? 'true' : 'false'}
          @click=${() => {
            if (this.selectable && (this.selectionTrigger === 'row' || this.selectionTrigger === 'both')) {
              this.handleRowSelect(rowId, 'row');
            }
          }}
        >
          ${this.selectable ? html`
            <td class="datatable__selection-cell">
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
            </td>
          ` : ''}

          ${visibleColumns.map((column, colIndex) => {
            let cellContent: string | TemplateResult;

            // Get the value for this cell
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

            const cellClasses = {
              'datatable__cell': true,
              [`datatable__cell--align-${column.align || 'left'}`]: true
            };

            return html`
              <td 
                class=${classMap(cellClasses)}
                data-column=${column.id}
                role="cell"
                aria-colindex=${String(colIndex + 1 + (this.selectable ? 1 : 0))}
              >
                <div class="datatable__cell-content">
                  <slot name="cell-${column.id}-${rowId}">
                    ${cellContent}
                  </slot>
                </div>
              </td>
            `;
          })}
        </tr>
      `;
    });
  }

  /**
   * Render loading overlay when in loading state
   */
  private renderLoading() {
    if (!this.loading) {
      return html``;
    }

    return html`
      <div class="datatable__loading-overlay" part="loading-overlay">
        <div class="datatable__loading-content">
          <slot name="loading">
            <div class="datatable__loading-spinner"></div>
            <div class="datatable__loading-text">${this.loadingText}</div>
          </slot>
        </div>
      </div>
    `;
  }

  /**
   * Render the table with everything (used by the main render method)
   */
  private renderTable() {
    return html`
      <div class="datatable__container">
        ${this.renderToolbar()}
        <div class="datatable__table-container">
          ${this.renderHeader()}
        </div>
        ${this.renderPagination()}
        ${this.renderLoading()}
      </div>
    `;
  }

  render() {
    if (!this.initialized && !this.loading) {
      return html`<div part="base">Loading...</div>`;
    }

    const tableClasses = {
      'datatable': true,
      'datatable--dense': this.dense,
      'datatable--striped': this.striped,
      'datatable--bordered': this.bordered,
      'datatable--loading': this.loading,
      'datatable--virtualized': this.virtualized,
      'datatable--selectable': this.selectable
    };

    const tableStyles = {
      width: this.width,
      maxHeight: this.maxHeight
    };

    // Get processed data for aria attributes
    const processedData = this.controller.getProcessedData();
    const totalRows = processedData.length;
    const selectedCount = this.controller.getSelectedRows().length;

    // Pagination info for ARIA
    const { page, pageSize, totalPages } = this.paginationState;
    const paginationInfo = this.paginated
      ? `Page ${page} of ${totalPages}, showing ${pageSize} items per page`
      : '';

    // Filtering info for ARIA
    const filterInfo = this.filterable && this.globalFilter
      ? `Filtered by "${this.globalFilter}"`
      : '';

    // Sorting info for ARIA
    const sortState = this.controller.getSortState();
    const sortInfo = this.sortable && sortState.length > 0
      ? `Sorted by ${sortState.map(s => `${s.id} ${s.direction}`).join(', ')}`
      : '';

    // Combined ARIA description
    const ariaDescription = [
      `${totalRows} rows`,
      selectedCount > 0 ? `${selectedCount} selected` : '',
      paginationInfo,
      filterInfo,
      sortInfo
    ].filter(Boolean).join('. ');

    return html`
      <div
        class=${classMap(tableClasses)}
        part="base"
        style=${styleMap(tableStyles)}
        aria-label=${this.ariaLabel}
        aria-description=${ariaDescription}
        aria-rowcount=${String(totalRows)}
        aria-colcount=${String(this.controller.getVisibleColumns().length + (this.selectable ? 1 : 0))}
        role="grid"
        tabindex="0"
      >
        ${this.renderTable()}
      </div>
    `;
  }
}

// Define the custom elements
customElements.define(DATATABLE_ELEMENT_NAME, AeDataTable);