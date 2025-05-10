/**
 * Selection modes
 */
export type SelectionMode = 'none' | 'single' | 'multiple';

/**
 * Selection types
 */
export type SelectionTrigger = 'row' | 'checkbox' | 'both';

/**
 * The SelectionManager class is responsible for handling row selection
 */
export class SelectionManager {
  private _selectionMode: SelectionMode = 'none';
  private _selectionTrigger: SelectionTrigger = 'checkbox';
  private _selectedRows: Record<string, boolean> = {};
  
  /**
   * Initialize selection state and options
   * @param selectedRows Initial selected rows state
   * @param options Configuration options
   */
  initialize(
    selectedRows: Record<string, boolean> = {},
    options?: {
      selectionMode?: SelectionMode;
      selectionTrigger?: SelectionTrigger;
    }
  ): void {
    this._selectedRows = { ...selectedRows };
    
    if (options) {
      this._selectionMode = options.selectionMode ?? 'none';
      this._selectionTrigger = options.selectionTrigger ?? 'checkbox';
    }
  }
  
  /**
   * Get selected rows
   * @returns Object mapping row IDs to selection state
   */
  getSelectedRows(): Record<string, boolean> {
    return { ...this._selectedRows };
  }
  
  /**
   * Set selected rows
   * @param selectedRows New selected rows state
   * @returns True if selection changed
   */
  setSelectedRows(selectedRows: Record<string, boolean>): boolean {
    if (this._selectionMode === 'none') return false;
    
    // For single selection mode, ensure only one row is selected
    let newSelectedRows = { ...selectedRows };
    
    if (this._selectionMode === 'single') {
      const selectedIds = Object.entries(newSelectedRows)
        .filter(([_, selected]) => selected)
        .map(([id]) => id);
      
      if (selectedIds.length > 1) {
        // Keep only the first selected row
        newSelectedRows = { [selectedIds[0]]: true };
      }
    }
    
    // Compare and only update if changed
    const changed = JSON.stringify(this._selectedRows) !== JSON.stringify(newSelectedRows);
    
    if (changed) {
      this._selectedRows = newSelectedRows;
    }
    
    return changed;
  }
  
  /**
   * Toggle selection for a row
   * @param rowId Row ID to toggle
   * @param value Force a specific selection state
   * @returns True if selection changed
   */
  toggleRowSelection(rowId: string, value?: boolean): boolean {
    if (this._selectionMode === 'none') return false;
    
    const isSelected = this._selectedRows[rowId] || false;
    const newValue = value !== undefined ? value : !isSelected;
    
    if (newValue === isSelected) return false;
    
    let newSelectedRows: Record<string, boolean>;
    
    if (this._selectionMode === 'single') {
      // For single mode, deselect all other rows
      newSelectedRows = newValue ? { [rowId]: true } : {};
    } else {
      // For multiple mode, just toggle this row
      newSelectedRows = { ...this._selectedRows };
      
      if (newValue) {
        newSelectedRows[rowId] = true;
      } else {
        delete newSelectedRows[rowId];
      }
    }
    
    return this.setSelectedRows(newSelectedRows);
  }
  
  /**
   * Select all rows
   * @param rowIds Array of all row IDs
   * @returns True if selection changed
   */
  selectAll(rowIds: string[]): boolean {
    if (this._selectionMode !== 'multiple') return false;
    
    const newSelectedRows: Record<string, boolean> = {};
    rowIds.forEach(id => {
      newSelectedRows[id] = true;
    });
    
    return this.setSelectedRows(newSelectedRows);
  }
  
  /**
   * Deselect all rows
   * @returns True if selection changed
   */
  deselectAll(): boolean {
    return this.setSelectedRows({});
  }
  
  /**
   * Check if a row is selected
   * @param rowId Row ID to check
   * @returns True if the row is selected
   */
  isRowSelected(rowId: string): boolean {
    return !!this._selectedRows[rowId];
  }
  
  /**
   * Get all selected row IDs
   * @returns Array of selected row IDs
   */
  getSelectedRowIds(): string[] {
    return Object.entries(this._selectedRows)
      .filter(([_, selected]) => selected)
      .map(([id]) => id);
  }
  
  /**
   * Check if the "select all" state is indeterminate
   * @param totalRows Total number of rows
   * @returns True if selection is indeterminate
   */
  isIndeterminate(totalRows: number): boolean {
    if (this._selectionMode !== 'multiple') return false;
    
    const selectedCount = Object.values(this._selectedRows).filter(Boolean).length;
    return selectedCount > 0 && selectedCount < totalRows;
  }
  
  /**
   * Check if all rows are selected
   * @param totalRows Total number of rows
   * @returns True if all rows are selected
   */
  isAllSelected(totalRows: number): boolean {
    if (this._selectionMode !== 'multiple' || totalRows === 0) return false;
    
    const selectedCount = Object.values(this._selectedRows).filter(Boolean).length;
    return selectedCount === totalRows;
  }
}