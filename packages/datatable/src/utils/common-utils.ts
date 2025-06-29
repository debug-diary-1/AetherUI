import type { DataColumn } from '../models/column-model';

/**
 * Extracts a value from a row based on column configuration
 */
export function getCellValue<T>(row: T, column: DataColumn<T>): unknown {
  // Try accessor function first
  if (column.accessor && typeof column.accessor === 'function') {
    return column.accessor(row);
  }
  
  // Try accessorKey
  if (column.accessorKey && typeof column.accessorKey === 'string') {
    return (row as any)[column.accessorKey];
  }
  
  // Try field (legacy support)
  if (column.field !== undefined) {
    return (row as any)[column.field];
  }
  
  // Fall back to column id
  return (row as any)[column.id];
}