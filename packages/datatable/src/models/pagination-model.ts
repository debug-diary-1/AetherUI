/**
 * Pagination state
 */
export interface PaginationState {
  /** Current page index (0-based) */
  pageIndex: number;
  
  /** Number of rows per page */
  pageSize: number;
  
  /** Current page (1-based, for compatibility) */
  page?: number;
  
  /** Total number of items */
  totalItems?: number;
  
  /** Total number of pages */
  totalPages?: number;
}

/**
 * Default pagination state
 */
export const DEFAULT_PAGINATION_STATE: PaginationState = {
  pageIndex: 0,
  pageSize: 10
};

/**
 * Default page size options
 */
export const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];

/**
 * Calculate pagination details
 */
export interface PaginationInfo {
  /** Current page (1-based for display) */
  currentPage: number;
  
  /** Total pages based on row count */
  totalPages: number;
  
  /** First row index (0-based) */
  firstRowIndex: number;
  
  /** Last row index (0-based) */
  lastRowIndex: number;
  
  /** First row number (1-based for display) */
  firstRowNumber: number;
  
  /** Last row number (1-based for display) */
  lastRowNumber: number;
  
  /** Whether we can go to previous page */
  canPreviousPage: boolean;
  
  /** Whether we can go to next page */
  canNextPage: boolean;
}

/**
 * Calculate pagination information 
 * @param pagination Current pagination state
 * @param totalRowCount Total number of rows
 * @returns Pagination details
 */
export function getPaginationInfo(
  pagination: PaginationState,
  totalRowCount: number
): PaginationInfo {
  const { pageIndex, pageSize } = pagination;
  
  const totalPages = Math.max(1, Math.ceil(totalRowCount / pageSize));
  const firstRowIndex = pageIndex * pageSize;
  const lastRowIndex = Math.min(firstRowIndex + pageSize - 1, totalRowCount - 1);
  
  return {
    currentPage: pageIndex + 1,
    totalPages,
    firstRowIndex,
    lastRowIndex,
    firstRowNumber: firstRowIndex + 1,
    lastRowNumber: lastRowIndex + 1,
    canPreviousPage: pageIndex > 0,
    canNextPage: pageIndex < totalPages - 1
  };
}