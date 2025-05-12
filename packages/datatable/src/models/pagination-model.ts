/**
 * Pagination state
 */
export interface PaginationState {
  /** Current page (1-based) */
  page: number;

  /** Number of rows per page */
  pageSize: number;

  /** Total number of items */
  totalItems: number;

  /** Total number of pages */
  totalPages: number;
}

/**
 * Default pagination state
 */
export const DEFAULT_PAGINATION_STATE: PaginationState = {
  page: 1,
  pageSize: 10,
  totalItems: 0,
  totalPages: 1
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
 * @param totalRowCount Total number of rows (optional if already in pagination state)
 * @returns Pagination details
 */
export function getPaginationInfo(
  pagination: PaginationState,
  totalRowCount?: number
): PaginationInfo {
  const { page, pageSize, totalItems = totalRowCount || 0 } = pagination;

  // Convert 1-based page to 0-based pageIndex for calculations
  const pageIndex = page - 1;

  // Use totalItems from pagination state or from parameter
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const firstRowIndex = pageIndex * pageSize;
  const lastRowIndex = Math.min(firstRowIndex + pageSize - 1, totalItems - 1);

  return {
    currentPage: page,
    totalPages,
    firstRowIndex,
    lastRowIndex,
    firstRowNumber: firstRowIndex + 1,
    lastRowNumber: lastRowIndex + 1,
    canPreviousPage: page > 1,
    canNextPage: page < totalPages
  };
}