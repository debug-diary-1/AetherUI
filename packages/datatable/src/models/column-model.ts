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
  accessor?: (item: T) => unknown;

  /** Custom cell renderer */
  renderer?: (value: unknown, row: T) => TemplateResult;

  /** Column footer content */
  footer?: string | TemplateResult;

  /** Enable sorting (true by default) */
  sortable?: boolean;

  /** Enable filtering (true by default) */
  filterable?: boolean;

  /** Custom sort comparator */
  sortFn?: (a: unknown, b: unknown) => number;

  /** Custom filter function */
  filterFn?: (value: unknown, filter: string) => boolean;

  /** Column width (CSS value) */
  width?: string;

  /** Minimum width (CSS value) */
  minWidth?: string;

  /** Maximum width (CSS value) */
  maxWidth?: string;

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
  format?: (value: unknown) => string;
}
