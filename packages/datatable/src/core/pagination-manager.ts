import {
  DEFAULT_PAGINATION_STATE,
  DEFAULT_PAGE_SIZES,
  PaginationState,
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
    },
  ): void {
    if (typeof paginationOrRowCount === 'number') {
      // If passed a number, treat it as rowCount
      this._pagination = { ...DEFAULT_PAGINATION_STATE };
      this.updateTotalItems(paginationOrRowCount);
    } else {
      // Otherwise treat as partial pagination state
      this._pagination = {
        ...DEFAULT_PAGINATION_STATE,
        ...paginationOrRowCount,
      };
    }

    if (options) {
      if (options.pageSizeOptions) {
        this._pageSizeOptions = [...options.pageSizeOptions];
      }

      this._enablePagination = options.enablePagination ?? true;

      if (options.rowCount !== undefined) {
        this.updateTotalItems(options.rowCount);
      }
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
   * Alias for getPagination()
   * @returns Current pagination state
   */
  getPaginationState(): PaginationState {
    return this.getPagination();
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
      this._pagination.page !== newPagination.page ||
      this._pagination.pageSize !== newPagination.pageSize;

    if (changed) {
      this._pagination = newPagination;
    }

    return changed;
  }

  /**
   * Set page
   * @param page New page (1-based)
   * @returns True if pagination changed
   */
  setPage(page: number): boolean {
    return this.setPagination({ page });
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
      page: 1,
    });
  }

  /**
   * Go to the next page
   * @returns True if pagination changed
   */
  nextPage(): boolean {
    return this.setPage(this._pagination.page + 1);
  }

  /**
   * Go to the previous page
   * @returns True if pagination changed
   */
  previousPage(): boolean {
    return this.setPage(Math.max(1, this._pagination.page - 1));
  }

  /**
   * Go to the first page
   * @returns True if pagination changed
   */
  firstPage(): boolean {
    return this.setPage(1);
  }

  /**
   * Go to the last page
   * @returns True if pagination changed
   */
  lastPage(): boolean {
    if (this._rowCount === undefined) return false;

    const lastPage = Math.max(1, Math.ceil(this._rowCount / this._pagination.pageSize));

    return this.setPage(lastPage);
  }

  /**
   * Check if can go to next page
   * @returns True if can go to next page
   */
  canNextPage(): boolean {
    if (!this._rowCount) return true;

    const { page, pageSize } = this._pagination;
    return page * pageSize < this._rowCount;
  }

  /**
   * Check if can go to previous page
   * @returns True if can go to previous page
   */
  canPreviousPage(): boolean {
    return this._pagination.page > 1;
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
   * Update total items count
   * @param count Total number of items
   */
  updateTotalItems(count: number): void {
    this._rowCount = count;
    this._pagination.totalItems = count;
    this._pagination.totalPages = Math.max(1, Math.ceil(count / this._pagination.pageSize));
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
