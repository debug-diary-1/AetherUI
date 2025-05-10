import { ReactiveController, ReactiveControllerHost } from 'lit';
import type { ColumnDef } from '../models/column-model';
import type { SortState, SortDirection } from '../models/sort-model';
import type { FilterState } from '../models/filter-model';
import type { PaginationState } from '../models/pagination-model';
import { ColumnManager } from '../core/column-manager';
import { SortManager } from '../core/sort-manager';
import { FilterManager } from '../core/filter-manager';
import { SelectionManager } from '../core/selection-manager';
import { PaginationManager } from '../core/pagination-manager';
import { filterData } from '../utils/filter-utils';
import { sortData } from '../utils/sort-utils';

/**
 * A reactive controller for datatable components that handles all data operations
 * like sorting, filtering, selection, and pagination
 */
export class DataTableController<T> implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _data: T[] = [];
  private _processedData: T[] = [];
  
  // Core managers
  private _columnManager: ColumnManager<T>;
  private _sortManager: SortManager;
  private _filterManager: FilterManager;
  private _selectionManager: SelectionManager;
  private _paginationManager: PaginationManager;
  
  /**
   * Creates a new DataTableController
   * @param host The reactive controller host
   */
  constructor(host: ReactiveControllerHost) {
    this._host = host;
    this._columnManager = new ColumnManager<T>();
    this._sortManager = new SortManager();
    this._filterManager = new FilterManager();
    this._selectionManager = new SelectionManager();
    this._paginationManager = new PaginationManager();
    
    host.addController(this);
  }
  
  /**
   * Initialize the data and columns
   * @param data Data array
   * @param columns Column definitions
   */
  initialize(data: T[], columns: ColumnDef<T>[]): void {
    this._data = [...data];
    this._columnManager.initialize(columns);
    this._sortManager.initialize();
    this._filterManager.initialize();
    this._selectionManager.initialize();
    this._paginationManager.initialize(data.length);
    
    this.processData();
  }
  
  /**
   * Process the data with current sorting, filtering, and pagination
   */
  private processData(): void {
    // Start with a copy of the original data
    let result = [...this._data];
    
    // Apply filters first
    const columnFilters = this._filterManager.getColumnFilters();
    const globalFilter = this._filterManager.getGlobalFilter();
    
    // Filter the data based on column and global filters
    result = filterData(result, columnFilters, globalFilter, this._columnManager.getAllColumns());
    
    // Then apply sorting
    const sortState = this._sortManager.getSorting();
    
    // Sort the filtered data
    result = sortData(result, sortState, this._columnManager.getAllColumns());
    
    // Update pagination with new filtered data length
    this._paginationManager.updateTotalItems(result.length);
    
    // Get current page data
    const paginationState = this._paginationManager.getPaginationState();
    const pageIndex = paginationState.pageIndex;
    const pageSize = paginationState.pageSize;
    
    // Slice data for current page if pagination is enabled
    if (pageSize > 0) {
      const start = pageIndex * pageSize;
      result = result.slice(start, start + pageSize);
    }
    
    // Update processed data and notify host to re-render
    this._processedData = result;
    this._host.requestUpdate();
  }
  
  /**
   * Called when the host is connected to the DOM
   */
  hostConnected(): void {
    // Nothing to do
  }

  /**
   * Called when the host is disconnected from the DOM
   */
  hostDisconnected(): void {
    // Nothing to do
  }
  
  /**
   * Get all column definitions
   */
  getAllColumns(): ColumnDef<T>[] {
    return this._columnManager.getAllColumns();
  }
  
  /**
   * Get visible column definitions
   */
  getVisibleColumns(): ColumnDef<T>[] {
    return this._columnManager.getVisibleColumns();
  }
  
  /**
   * Get a column by ID
   */
  getColumn(id: string): ColumnDef<T> | undefined {
    return this._columnManager.getColumn(id);
  }
  
  /**
   * Set column visibility
   */
  setColumnVisibility(columnId: string, visible: boolean): void {
    this._columnManager.setColumnVisibility(columnId, visible);
    this._host.requestUpdate();
  }
  
  /**
   * Set multiple column visibilities
   */
  setColumnVisibilities(visibilityState: Record<string, boolean>): void {
    this._columnManager.setColumnVisibilities(visibilityState);
    this._host.requestUpdate();
  }
  
  /**
   * Set column width
   */
  setColumnWidth(columnId: string, width: number): void {
    this._columnManager.setColumnWidth(columnId, width);
    this._host.requestUpdate();
  }
  
  /**
   * Reorder columns
   */
  setColumnOrder(columnOrder: string[]): void {
    this._columnManager.setColumnOrder(columnOrder);
    this._host.requestUpdate();
  }
  
  /**
   * Get current sort state
   */
  getSortState(): SortState {
    return this._sortManager.getSorting();
  }
  
  /**
   * Set sort state
   */
  setSortState(columnId: string, direction: SortDirection, multiSort = false): void {
    this._sortManager.toggleSorting(columnId, multiSort, direction === 'asc' ? false : direction === 'desc' ? true : undefined);
    this.processData();
  }
  
  /**
   * Clear all sorting
   */
  clearSort(): void {
    this._sortManager.clearSorting();
    this.processData();
  }
  
  /**
   * Get current filter state
   */
  getFilterState(): FilterState {
    return this._filterManager.getColumnFilters();
  }
  
  /**
   * Set global filter
   */
  setGlobalFilter(filter: string): void {
    this._filterManager.setGlobalFilter(filter);
    this.processData();
  }
  
  /**
   * Set column filter
   */
  setColumnFilter(columnId: string, filter: string): void {
    this._filterManager.setColumnFilter(columnId, filter);
    this.processData();
  }
  
  /**
   * Clear all filters
   */
  clearFilters(): void {
    this._filterManager.clearFilters();
    this.processData();
  }
  
  /**
   * Get selected row IDs
   */
  getSelectedRows(): (string | number)[] {
    return this._selectionManager.getSelectedRowIds();
  }
  
  /**
   * Set row selection state
   */
  setRowSelection(rowId: string | number, selected: boolean): void {
    this._selectionManager.toggleRowSelection(String(rowId), selected);
    this._host.requestUpdate();
  }
  
  /**
   * Toggle row selection
   */
  toggleRowSelection(rowId: string | number): void {
    this._selectionManager.toggleRowSelection(String(rowId));
    this._host.requestUpdate();
  }
  
  /**
   * Select all rows
   */
  selectAllRows(): void {
    const rowIds = this._processedData.map((_, index) => String(index));
    this._selectionManager.selectAll(rowIds);
    this._host.requestUpdate();
  }
  
  /**
   * Deselect all rows
   */
  deselectAllRows(): void {
    this._selectionManager.deselectAll();
    this._host.requestUpdate();
  }
  
  /**
   * Check if a row is selected
   */
  isRowSelected(rowId: string | number): boolean {
    return this._selectionManager.isRowSelected(String(rowId));
  }
  
  /**
   * Get current pagination state
   */
  getPaginationState(): PaginationState {
    return this._paginationManager.getPaginationState();
  }
  
  /**
   * Set page
   */
  setPage(page: number): void {
    this._paginationManager.setPage(page);
    this.processData();
  }
  
  /**
   * Set page size
   */
  setPageSize(size: number): void {
    this._paginationManager.setPageSize(size);
    this.processData();
  }
  
  /**
   * Go to next page
   */
  nextPage(): void {
    this._paginationManager.nextPage();
    this.processData();
  }
  
  /**
   * Go to previous page
   */
  previousPage(): void {
    this._paginationManager.previousPage();
    this.processData();
  }
  
  /**
   * Go to first page
   */
  firstPage(): void {
    this._paginationManager.firstPage();
    this.processData();
  }
  
  /**
   * Go to last page
   */
  lastPage(): void {
    this._paginationManager.lastPage();
    this.processData();
  }
  
  /**
   * Get raw data
   */
  getData(): T[] {
    return [...this._data];
  }
  
  /**
   * Get processed data (filtered, sorted, paginated)
   */
  getProcessedData(): T[] {
    return [...this._processedData];
  }
  
  /**
   * Update data
   */
  updateData(data: T[]): void {
    this._data = [...data];
    this._selectionManager.initialize();
    this._paginationManager.updateTotalItems(data.length);
    this.processData();
  }
}