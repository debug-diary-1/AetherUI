import { 
  DEFAULT_PAGINATION_STATE, 
  DEFAULT_PAGE_SIZES, 
  PaginationState 
} from '../models/pagination-model';

/**
 * The PaginationManager class is responsible for handling pagination
 */
export class PaginationManager {
  private _pagination: PaginationState = { ...DEFAULT_PAGINATION_STATE };
  private _pageSizeOptions: number[] = [...DEFAULT_PAGE_SIZES];
  private _enablePagination: boolean = true;
  private _rowCount?: number;
  
  /**
   * Initialize pagination state and options
   * @param pagination Initial pagination state
   * @param options Configuration options
   */
  initialize(
    paginationOrRowCount?: Partial<PaginationState> | number,
    options?: {
      pageSizeOptions?: number[];
      enablePagination?: boolean;
      rowCount?: number;
    }
  ): void {
    // Handle the case where a number is passed (for backward compatibility)
    if (typeof paginationOrRowCount === 'number') {
      this._rowCount = paginationOrRowCount;
      this._pagination = { ...DEFAULT_PAGINATION_STATE };
    } else {
      this._pagination = { 
        ...DEFAULT_PAGINATION_STATE, 
        ...(paginationOrRowCount || {})
      };
      
      if (options?.rowCount !== undefined) {
        this._rowCount = options.rowCount;
      }
    }
    
    if (options) {
      if (options.pageSizeOptions) {
        this._pageSizeOptions = [...options.pageSizeOptions];
      }
      
      this._enablePagination = options.enablePagination ?? true;
    }
    
    // Update derived properties
    this.updateDerivedState();
  }
  
  /**
   * Get current pagination state
   * @returns Current pagination state
   */
  getPagination(): PaginationState {
    return { ...this._pagination };
  }
  
  /**
   * Alias for getPagination for backward compatibility
   * @returns Current pagination state with additional properties
   */
  getPaginationState(): PaginationState {
    return {
      ...this._pagination,
      page: this._pagination.pageIndex + 1,
      totalItems: this._rowCount || 0,
      totalPages: this.getPageCount()
    };
  }
  
  /**
   * Update derived state properties
   */
  private updateDerivedState(): void {
    // Implementation stays empty for now
  }
  
  /**
   * Update total items count
   * @param count New total items count
   */
  updateTotalItems(count: number): void {
    this._rowCount = count;
  }
  
  /**
   * Set page (1-based for compatibility)
   * @param page Page number (1-based)
   * @returns True if pagination changed
   */
  setPage(page: number): boolean {
    return this.setPageIndex(page - 1);
  }
  
  /**
   * Set pagination state
   * @param pagination New pagination state
   * @returns True if pagination changed
   */
  setPagination(pagination: Partial<PaginationState>): boolean {
    if (!this._enablePagination) return false;
    
    const newPagination = { ...this._pagination, ...pagination };
    const changed = 
      this._pagination.pageIndex !== newPagination.pageIndex || 
      this._pagination.pageSize !== newPagination.pageSize;
    
    if (changed) {
      this._pagination = newPagination;
    }
    
    return changed;
  }
  
  /**
   * Set page index
   * @param pageIndex New page index (0-based)
   * @returns True if pagination changed
   */
  setPageIndex(pageIndex: number): boolean {
    return this.setPagination({ pageIndex });
  }
  
  /**
   * Set page size
   * @param pageSize New page size
   * @returns True if pagination changed
   */
  setPageSize(pageSize: number): boolean {
    // When changing page size, reset to the first page
    return this.setPagination({ 
      pageSize, 
      pageIndex: 0 
    });
  }
  
  /**
   * Go to the next page
   * @returns True if pagination changed
   */
  nextPage(): boolean {
    return this.setPageIndex(this._pagination.pageIndex + 1);
  }
  
  /**
   * Go to the previous page
   * @returns True if pagination changed
   */
  previousPage(): boolean {
    return this.setPageIndex(Math.max(0, this._pagination.pageIndex - 1));
  }
  
  /**
   * Go to the first page
   * @returns True if pagination changed
   */
  firstPage(): boolean {
    return this.setPageIndex(0);
  }
  
  /**
   * Go to the last page
   * @returns True if pagination changed
   */
  lastPage(): boolean {
    if (this._rowCount === undefined) return false;
    
    const lastPageIndex = Math.max(
      0,
      Math.ceil(this._rowCount / this._pagination.pageSize) - 1
    );
    
    return this.setPageIndex(lastPageIndex);
  }
  
  /**
   * Check if can go to next page
   * @returns True if can go to next page
   */
  canNextPage(): boolean {
    if (!this._rowCount) return true;
    
    const { pageIndex, pageSize } = this._pagination;
    return (pageIndex + 1) * pageSize < this._rowCount;
  }
  
  /**
   * Check if can go to previous page
   * @returns True if can go to previous page
   */
  canPreviousPage(): boolean {
    return this._pagination.pageIndex > 0;
  }
  
  /**
   * Get page size options
   * @returns Array of page size options
   */
  getPageSizeOptions(): number[] {
    return [...this._pageSizeOptions];
  }
  
  /**
   * Set row count
   * @param count Total number of rows
   */
  setRowCount(count: number): void {
    this._rowCount = count;
  }
  
  /**
   * Get row count
   * @returns Total number of rows
   */
  getRowCount(): number | undefined {
    return this._rowCount;
  }
  
  /**
   * Get the number of pages
   * @returns Number of pages
   */
  getPageCount(): number {
    if (!this._rowCount) return 0;
    
    return Math.ceil(this._rowCount / this._pagination.pageSize);
  }
}