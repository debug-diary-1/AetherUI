/**
 * Column filter configuration
 */
export interface ColumnFilter {
  /** Column ID being filtered */
  id: string;
  
  /** Filter value */
  value: string;
}

/**
 * Full filter state for a table
 */
export type ColumnFiltersState = ColumnFilter[];

/**
 * Alias for backward compatibility
 */
export type FilterState = ColumnFiltersState;

/**
 * Default implementation of a string filter function
 * @param value The value to check
 * @param filter The filter string to match against
 * @returns true if the value matches the filter
 */
export function defaultStringFilter(value: any, filter: string): boolean {
  if (filter === '') return true;
  if (value === null || value === undefined) return false;
  
  const strValue = String(value).toLowerCase();
  const strFilter = filter.toLowerCase();
  
  return strValue.includes(strFilter);
}

/**
 * Default implementation of a number filter function
 * @param value The value to check
 * @param filter The filter string to match against (can be comparison operator)
 * @returns true if the value matches the filter
 */
export function defaultNumberFilter(value: any, filter: string): boolean {
  if (filter === '') return true;
  if (value === null || value === undefined) return false;
  
  // Convert to number
  const numValue = Number(value);
  if (isNaN(numValue)) return false;
  
  // Check for comparison operators
  if (filter.startsWith('>=')) {
    return numValue >= Number(filter.slice(2));
  } else if (filter.startsWith('<=')) {
    return numValue <= Number(filter.slice(2));
  } else if (filter.startsWith('>')) {
    return numValue > Number(filter.slice(1));
  } else if (filter.startsWith('<')) {
    return numValue < Number(filter.slice(1));
  } else if (filter.startsWith('=')) {
    return numValue === Number(filter.slice(1));
  } else if (filter.includes('-')) {
    // Range filter (e.g., "10-20")
    const [min, max] = filter.split('-').map(Number);
    return numValue >= min && numValue <= max;
  } else {
    // Simple contains
    return String(numValue).includes(filter);
  }
}

/**
 * Default implementation of a date filter function
 * @param value The value to check (Date or string date)
 * @param filter The filter string to match against (can be comparison operator)
 * @returns true if the value matches the filter
 */
export function defaultDateFilter(value: any, filter: string): boolean {
  if (filter === '') return true;
  if (value === null || value === undefined) return false;
  
  // Convert to date
  const dateValue = value instanceof Date ? value : new Date(value);
  if (isNaN(dateValue.getTime())) return false;
  
  // Check for comparison operators or exact date match
  if (filter.startsWith('>=')) {
    const filterDate = new Date(filter.slice(2));
    return dateValue >= filterDate;
  } else if (filter.startsWith('<=')) {
    const filterDate = new Date(filter.slice(2));
    return dateValue <= filterDate;
  } else if (filter.startsWith('>')) {
    const filterDate = new Date(filter.slice(1));
    return dateValue > filterDate;
  } else if (filter.startsWith('<')) {
    const filterDate = new Date(filter.slice(1));
    return dateValue < filterDate;
  } else if (filter.includes('-') && filter.split('-').length === 3) {
    // Exact date match
    const filterDate = new Date(filter);
    if (!isNaN(filterDate.getTime())) {
      return dateValue.toDateString() === filterDate.toDateString();
    }
  }
  
  // Default to string contains search on the date string
  return dateValue.toISOString().includes(filter);
}