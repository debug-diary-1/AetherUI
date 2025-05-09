import { ColumnDef } from '../models/column-model';
import { ColumnFiltersState, defaultStringFilter } from '../models/filter-model';
import { getCellValue } from './sort-utils';

/**
 * Filters data rows based on column filters and global filter
 * @param data The data rows to filter
 * @param columnFilters The column filter state
 * @param globalFilter The global filter string
 * @param columns The column definitions
 * @returns Filtered data
 */
export function filterData<T>(
  data: T[],
  columnFilters: ColumnFiltersState,
  globalFilter: string,
  columns: ColumnDef<T>[]
): T[] {
  if (!columnFilters.length && !globalFilter) return [...data];
  
  // Create a columns map for faster lookups
  const columnsMap = new Map<string, ColumnDef<T>>();
  columns.forEach(col => columnsMap.set(col.id, col));
  
  // Function to match a row against column filters
  const matchesColumnFilters = (row: T): boolean => {
    for (const { id, value } of columnFilters) {
      const column = columnsMap.get(id);
      if (!column || column.filterable === false) continue;
      
      const cellValue = getCellValue(row, column);
      
      // If there's a custom filter function, use it
      if (column.filterFn) {
        if (!column.filterFn(cellValue, value)) {
          return false;
        }
      } else {
        // Otherwise use the default string filter
        if (!defaultStringFilter(cellValue, value)) {
          return false;
        }
      }
    }
    
    return true;
  };
  
  // Function to match a row against the global filter
  const matchesGlobalFilter = (row: T): boolean => {
    if (!globalFilter) return true;
    
    // Check each column for a match
    for (const column of columns) {
      if (column.filterable === false) continue;
      
      const cellValue = getCellValue(row, column);
      
      // If there's a custom filter function, use it
      if (column.filterFn) {
        if (column.filterFn(cellValue, globalFilter)) {
          return true;
        }
      } else {
        // Otherwise use the default string filter
        if (defaultStringFilter(cellValue, globalFilter)) {
          return true;
        }
      }
    }
    
    return false;
  };
  
  // Apply both filters
  return data.filter(row => {
    return matchesColumnFilters(row) && matchesGlobalFilter(row);
  });
}