import type { ColumnDef } from '../models/column-model';

/**
 * Extracts a value from a row based on column configuration
 */
export function getCellValue<T>(row: T, column: ColumnDef<T>): unknown {
  // Try accessor function first
  if (column.accessor && typeof column.accessor === 'function') {
    return column.accessor(row);
  }

  // Try accessorKey
  const colRecord = column as unknown as Record<string, unknown>;
  if (colRecord.accessorKey && typeof colRecord.accessorKey === 'string') {
    return (row as Record<string, unknown>)[colRecord.accessorKey];
  }

  // Try field (legacy support)
  if (column.field !== undefined) {
    return (row as Record<string, unknown>)[column.field as string];
  }

  // Fall back to column id
  return (row as Record<string, unknown>)[column.id];
}
