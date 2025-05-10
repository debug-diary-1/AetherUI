import { ColumnDef } from '../models/column-model';
import { SortingState, defaultSortCompare } from '../models/sort-model';

/**
 * Gets the value for a given column in a row
 * @param row The data row
 * @param column The column definition
 * @returns The value for the column in the row
 */
export function getCellValue<T>(row: T, column: ColumnDef<T>): any {
  if (column.accessor) {
    return column.accessor(row);
  }
  
  if (column.field !== undefined) {
    return row[column.field];
  }
  
  return undefined;
}

/**
 * Sorts data rows based on sort configuration
 * @param data The data rows to sort
 * @param sorting The sorting state
 * @param columns The column definitions
 * @returns Sorted data
 */
export function sortData<T>(
  data: T[],
  sorting: SortingState,
  columns: ColumnDef<T>[]
): T[] {
  if (!sorting.length) return [...data];
  
  // Create a copy to avoid mutating the original
  const result = [...data];
  
  // Create a columns map for faster lookups
  const columnsMap = new Map<string, ColumnDef<T>>();
  columns.forEach(col => columnsMap.set(col.id, col));
  
  // Sort the data
  return result.sort((rowA, rowB) => {
    for (const { id, desc } of sorting) {
      const column = columnsMap.get(id);
      if (!column) continue;
      
      const valueA = getCellValue(rowA, column);
      const valueB = getCellValue(rowB, column);
      
      // If there's a custom sort function, use it
      if (column.sortFn) {
        const result = column.sortFn(valueA, valueB);
        if (result !== 0) {
          return desc ? -result : result;
        }
      } else {
        // Otherwise use the default sort
        const result = defaultSortCompare(valueA, valueB, desc);
        if (result !== 0) {
          return result;
        }
      }
    }
    
    return 0;
  });
}