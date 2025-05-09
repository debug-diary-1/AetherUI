import { ColumnDef } from '../models/column-model';

/**
 * The ColumnManager class is responsible for handling column operations
 * such as reordering, resizing, and visibility
 */
export class ColumnManager<T> {
  private _columns: ColumnDef<T>[] = [];
  private _visibleColumns: ColumnDef<T>[] = [];
  private _columnsMap = new Map<string, ColumnDef<T>>();
  private _columnWidths = new Map<string, number>();
  private _columnOrder: string[] = [];
  private _hasHiddenColumns = false;

  /**
   * Initialize with column definitions
   * @param columns Array of column definitions
   */
  initialize(columns: ColumnDef<T>[]): void {
    this._columns = [...columns];
    this._columnsMap.clear();
    this._columnWidths.clear();
    
    // Store columns in a map for quick access by ID
    columns.forEach(column => {
      this._columnsMap.set(column.id, column);
      this._columnOrder.push(column.id);
      
      // Set initial width if specified
      if (column.width) {
        this._columnWidths.set(column.id, this.parseWidth(column.width));
      }
    });
    
    this.updateVisibleColumns();
  }
  
  /**
   * Get a column by ID
   * @param id Column ID
   * @returns Column definition or undefined
   */
  getColumn(id: string): ColumnDef<T> | undefined {
    return this._columnsMap.get(id);
  }
  
  /**
   * Get all columns
   * @returns Array of all column definitions
   */
  getAllColumns(): ColumnDef<T>[] {
    return [...this._columns];
  }
  
  /**
   * Get visible columns
   * @returns Array of visible column definitions
   */
  getVisibleColumns(): ColumnDef<T>[] {
    return [...this._visibleColumns];
  }
  
  /**
   * Update the list of visible columns based on hidden status
   */
  private updateVisibleColumns(): void {
    this._visibleColumns = this._columns.filter(col => !col.hidden);
    this._hasHiddenColumns = this._visibleColumns.length < this._columns.length;
  }
  
  /**
   * Set column visibility
   * @param columnId Column ID
   * @param visible Whether the column should be visible
   */
  setColumnVisibility(columnId: string, visible: boolean): void {
    const column = this._columnsMap.get(columnId);
    if (column) {
      column.hidden = !visible;
      this.updateVisibleColumns();
    }
  }
  
  /**
   * Set multiple column visibilities
   * @param visibilityState Object with column IDs as keys and visibility as values
   */
  setColumnVisibilities(visibilityState: Record<string, boolean>): void {
    let changed = false;
    
    Object.entries(visibilityState).forEach(([columnId, visible]) => {
      const column = this._columnsMap.get(columnId);
      if (column && column.hidden === visible) {
        column.hidden = !visible;
        changed = true;
      }
    });
    
    if (changed) {
      this.updateVisibleColumns();
    }
  }
  
  /**
   * Set column width
   * @param columnId Column ID
   * @param width New width in pixels
   */
  setColumnWidth(columnId: string, width: number): void {
    this._columnWidths.set(columnId, width);
  }
  
  /**
   * Get column width
   * @param columnId Column ID
   * @returns Width in pixels or undefined
   */
  getColumnWidth(columnId: string): number | undefined {
    return this._columnWidths.get(columnId);
  }
  
  /**
   * Parse CSS width value to pixels
   * @param width CSS width value (string or number)
   * @returns Width in pixels
   */
  private parseWidth(width: string | number): number {
    if (typeof width === 'number') {
      return width;
    }
    
    if (width.endsWith('px')) {
      return parseFloat(width);
    }
    
    if (width.endsWith('%')) {
      // For percentage, we'll use a default base width of 100px per column
      return (parseFloat(width) / 100) * 100;
    }
    
    return parseFloat(width) || 100; // Default to 100px
  }
  
  /**
   * Reorder columns
   * @param columnOrder New column order by IDs
   */
  setColumnOrder(columnOrder: string[]): void {
    // Verify all column IDs are valid
    if (columnOrder.every(id => this._columnsMap.has(id)) && 
        columnOrder.length === this._columns.length) {
      this._columnOrder = [...columnOrder];
      
      // Reorder the columns array
      this._columns = columnOrder.map(id => this._columnsMap.get(id)!);
      this.updateVisibleColumns();
    }
  }
  
  /**
   * Check if there are any hidden columns
   * @returns True if there are hidden columns
   */
  hasHiddenColumns(): boolean {
    return this._hasHiddenColumns;
  }
}