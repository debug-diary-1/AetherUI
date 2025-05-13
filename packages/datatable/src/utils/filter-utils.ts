import { ColumnDef } from '../models/column-model';
import { ColumnFiltersState, defaultStringFilter, defaultNumberFilter, defaultDateFilter } from '../models/filter-model';
import { getCellValue } from './sort-utils';
import { ColumnFilterValue, FilterOperator } from '../components/column-filter';

/**
 * Apply a filter operation based on the specified operator
 * @param value The cell value to check
 * @param filter The filter value with operator
 * @param dataType The data type of the column
 * @returns True if the value matches the filter
 */
export function applyFilterWithOperator(
  value: any,
  filter: ColumnFilterValue,
  dataType: 'string' | 'number' | 'boolean' | 'date' = 'string'
): boolean {
  if (!filter || !filter.value) return true;

  // Handle null/undefined values
  if (value === null || value === undefined) {
    if (filter.operator === 'isNull') return true;
    if (filter.operator === 'isNotNull') return false;
    return false;
  }

  // Handle inverted null checks
  if (filter.operator === 'isNull') return false;
  if (filter.operator === 'isNotNull') return true;

  // Convert to appropriate type
  let typedValue = value;
  let filterValue = filter.value;
  let filterValueTo = filter.valueTo;

  // Type conversion based on data type
  if (dataType === 'number') {
    typedValue = Number(value);
    filterValue = Number(filterValue);
    if (filterValueTo) filterValueTo = Number(filterValueTo);
    if (isNaN(typedValue)) return false;
    if (filter.operator !== 'isNull' && filter.operator !== 'isNotNull' && isNaN(filterValue)) return false;
  } else if (dataType === 'date') {
    if (!(value instanceof Date)) {
      typedValue = new Date(value);
    }
    filterValue = new Date(filterValue);
    if (filterValueTo) filterValueTo = new Date(filterValueTo);
    if (isNaN(typedValue.getTime())) return false;
    if (filter.operator !== 'isNull' && filter.operator !== 'isNotNull' && isNaN(filterValue.getTime())) return false;
  } else if (dataType === 'boolean') {
    typedValue = Boolean(value);
    filterValue = filterValue.toLowerCase() === 'true';
  } else {
    // String type
    typedValue = String(value).toLowerCase();
    filterValue = String(filterValue).toLowerCase();
    if (filterValueTo) filterValueTo = String(filterValueTo).toLowerCase();
  }

  // Apply operator
  switch (filter.operator as FilterOperator) {
    case 'equals':
      return typedValue == filterValue; // Use loose equality to handle type differences
    case 'notEquals':
      return typedValue != filterValue;
    case 'contains':
      return String(typedValue).toLowerCase().includes(String(filterValue).toLowerCase());
    case 'notContains':
      return !String(typedValue).toLowerCase().includes(String(filterValue).toLowerCase());
    case 'startsWith':
      return String(typedValue).toLowerCase().startsWith(String(filterValue).toLowerCase());
    case 'endsWith':
      return String(typedValue).toLowerCase().endsWith(String(filterValue).toLowerCase());
    case 'lessThan':
      return typedValue < filterValue;
    case 'lessThanOrEqual':
      return typedValue <= filterValue;
    case 'greaterThan':
      return typedValue > filterValue;
    case 'greaterThanOrEqual':
      return typedValue >= filterValue;
    case 'between':
      if (!filterValueTo) return false;
      return typedValue >= filterValue && typedValue <= filterValueTo;
    default:
      return defaultStringFilter(value, String(filterValue));
  }
}

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
        // Check if value is an advanced filter object
        try {
          const filterObj = JSON.parse(value);
          if (filterObj && typeof filterObj === 'object' && filterObj.hasOwnProperty('value')) {
            // Use the advanced filter with operator
            const dataType = column.dataType || 'string';
            if (!applyFilterWithOperator(cellValue, filterObj, dataType)) {
              return false;
            }
          } else {
            // Fallback to simple string filtering
            if (!defaultStringFilter(cellValue, value)) {
              return false;
            }
          }
        } catch (e) {
          // Not JSON, use appropriate default filter based on column data type
          if (column.dataType === 'number') {
            if (!defaultNumberFilter(cellValue, value)) {
              return false;
            }
          } else if (column.dataType === 'date') {
            if (!defaultDateFilter(cellValue, value)) {
              return false;
            }
          } else {
            // Default to string filter
            if (!defaultStringFilter(cellValue, value)) {
              return false;
            }
          }
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
        // Use appropriate default filter based on column data type
        if (column.dataType === 'number') {
          if (defaultNumberFilter(cellValue, globalFilter)) {
            return true;
          }
        } else if (column.dataType === 'date') {
          if (defaultDateFilter(cellValue, globalFilter)) {
            return true;
          }
        } else {
          // Default to string filter
          if (defaultStringFilter(cellValue, globalFilter)) {
            return true;
          }
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