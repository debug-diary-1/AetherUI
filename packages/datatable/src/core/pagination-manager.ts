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
    pagination?: Partial<PaginationState>,
    options?: {
      pageSizeOptions?: number[];
      enablePagination?: boolean;
      rowCount?: number;
    }
  ): void {
    this._pagination = { 
      ...DEFAULT_PAGINATION_STATE, 
      ...pagination 
    };
    
    if (options) {
      if (options.pageSizeOptions) {
        this._pageSizeOptions = [...options.pageSizeOptions];
      }
      
      this._enablePagination = options.enablePagination ?? true;
      this._rowCount = options.rowCount;
    }
  }
  
  /**
   * Get current pagination state
   * @returns Current pagination state
   */
  getPagination(): PaginationState {
    return { ...this._pagination };
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