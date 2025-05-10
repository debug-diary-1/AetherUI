/**
 * Sorting direction
 */
export type SortDirection = 'asc' | 'desc' | 'none';

/**
 * Individual sort configuration for a column
 */
export interface SortItem {
  /** Column ID to sort by */
  id: string;
  
  /** Sort direction (asc or desc) */
  desc: boolean;
}

/**
 * Full sorting state for a table
 */
export type SortingState = SortItem[];

/**
 * Alias for backward compatibility
 */
export type SortState = SortingState;

/**
 * Default implementation of a sort comparator
 * @param a First value to compare
 * @param b Second value to compare
 * @param desc If true, sort in descending order
 * @returns -1, 0, or 1 for sorting
 */
export function defaultSortCompare<T>(a: T, b: T, desc: boolean = false): number {
  // Handle null/undefined
  if (a === null || a === undefined) {
    return b === null || b === undefined ? 0 : 1;
  }
  if (b === null || b === undefined) {
    return -1;
  }

  // Convert to comparable values if needed
  const valueA = a instanceof Date ? a.getTime() : a;
  const valueB = b instanceof Date ? b.getTime() : b;

  // Simple comparison based on type
  let result = 0;
  
  if (typeof valueA === 'string' && typeof valueB === 'string') {
    result = valueA.localeCompare(valueB);
  } else if (typeof valueA === 'number' && typeof valueB === 'number') {
    result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
  } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
    result = valueA === valueB ? 0 : valueA ? -1 : 1;
  } else {
    // Convert to string for other types
    const stringA = String(valueA);
    const stringB = String(valueB);
    result = stringA.localeCompare(stringB);
  }
  
  return desc ? -result : result;
}