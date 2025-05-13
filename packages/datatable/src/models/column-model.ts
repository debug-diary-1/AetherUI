import { TemplateResult } from 'lit';

/**
 * Definition of a table column
 */
export interface ColumnDef<T> {
  /** Unique column identifier */
  id: string;

  /** Data field name to display (key of T) */
  field?: keyof T;

  /** Column header content (string or template) */
  header: string | TemplateResult;

  /** Function to extract cell value */
  accessor?: (item: T) => any;

  /** Custom cell renderer */
  renderer?: (value: any, row: T) => TemplateResult;

  /** Column footer content */
  footer?: string | TemplateResult;

  /** Data type for filtering and sorting operations */
  dataType?: 'string' | 'number' | 'boolean' | 'date';

  /** Enable sorting (true by default) */
  sortable?: boolean;

  /** Enable filtering (true by default) */
  filterable?: boolean;

  /** Enable global filtering for this column (true by default) */
  enableGlobalFilter?: boolean;

  /** Custom sort comparator */
  sortFn?: (a: any, b: any) => number;

  /** Custom filter function */
  filterFn?: (value: any, filter: string) => boolean;

  /** Custom advanced filter function */
  advancedFilterFn?: (value: any, filter: any) => boolean;

  /** Column width (CSS value) */
  width?: string | number;

  /** Minimum width (CSS value) */
  minWidth?: string | number;

  /** Maximum width (CSS value) */
  maxWidth?: string | number;

  /** Content alignment */
  align?: 'left' | 'center' | 'right';

  /** Additional CSS class */
  class?: string;

  /** Initially hidden */
  hidden?: boolean;

  /** Allow column resizing (true by default) */
  resizable?: boolean;

  /** Pin column to left or right */
  frozen?: boolean;

  /** Simple text formatter */
  format?: (value: any) => string;
}