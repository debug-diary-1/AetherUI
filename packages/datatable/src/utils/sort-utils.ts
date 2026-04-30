import { ColumnDef } from '../models/column-model';
import { SortingState, defaultSortCompare } from '../models/sort-model';
import { getCellValue } from './common-utils';

/**
 * Sorts data rows based on sort configuration
 * @param data The data rows to sort
 * @param sorting The sorting state
 * @param columns The column definitions
 * @returns Sorted data
 */
export function sortData<T>(data: T[], sorting: SortingState, columns: ColumnDef<T>[]): T[] {
  if (!sorting.length) return [...data];

  // Create a copy to avoid mutating the original
  const result = [...data];

  // Create a columns map for faster lookups
  const columnsMap = new Map<string, ColumnDef<T>>();
  columns.forEach((col) => columnsMap.set(col.id, col));

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
