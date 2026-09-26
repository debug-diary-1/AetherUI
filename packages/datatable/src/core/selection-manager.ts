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
 * @template T The type of data being selected
 */
export class SelectionManager<T> {
  // Add methods for selecting rows based on data objects

  /**
   * Get the ID for a row (for use in selection tracking)
   * @param row Row data
   * @returns String ID for the row
   */
  getRowId(row: T): string {
    // First check for an id property directly on the row
    if (row && (row as Record<string, unknown>).id != null) {
      return String((row as Record<string, unknown>).id);
    }

    // Then check for an _id property (common in MongoDB)
    if (row && (row as Record<string, unknown>)._id != null) {
      return String((row as Record<string, unknown>)._id);
    }

    // Fallback to JSON stringifying the object
    return JSON.stringify(row);
  }

  /**
   * Select or deselect all rows in the provided data set
   * @param data Array of row data
   * @param select Whether to select (true) or deselect (false)
   * @returns True if selection changed
   */
  selectAllRows(data: T[]): boolean {
    if (this._selectionMode !== 'multiple') return false;

    const rowIds = data.map((row) => this.getRowId(row));
    return this.selectAll(rowIds);
  }

  /**
   * Deselect all rows
   * @returns True if selection changed
   */
  deselectAllRows(): boolean {
    return this.deselectAll();
  }

  /**
   * Get the selected state for a row by ID
   * @param rowId Row ID (string or number)
   * @returns True if the row is selected
   */
  isRowSelected(rowId: string | number): boolean {
    const id = typeof rowId === 'number' ? String(rowId) : rowId;
    return !!this._selectedRows[id];
  }

  /**
   * Set selection state for a specific row
   * @param row Row data object
   * @param selected Whether the row should be selected
   * @returns True if selection changed
   */
  setRowSelection(rowId: string | number, selected: boolean): boolean {
    const id = typeof rowId === 'number' ? String(rowId) : rowId;
    return this.toggleRowSelection(id, selected);
  }
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
    },
  ): void {
    this._selectedRows = { ...selectedRows };

    if (options) {
      this._selectionMode = options.selectionMode ?? 'none';
      this._selectionTrigger = options.selectionTrigger ?? 'checkbox';
    }
  }

  /**
   * Get selected rows as a mapping
   * @returns Object mapping row IDs to selection state
   */
  getSelectedRowsMap(): Record<string, boolean> {
    return { ...this._selectedRows };
  }

  /**
   * Get selected rows as an array of IDs
   * @returns Array of selected row IDs
   */
  getSelectedRows(): (string | number)[] {
    return Object.entries(this._selectedRows)
      .filter(([, selected]) => selected)
      .map(([id]) => id);
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
        .filter(([, selected]) => selected)
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
  toggleRowSelection(rowId: string | number, value?: boolean): boolean {
    if (this._selectionMode === 'none') return false;

    // Convert number to string if needed
    const id = typeof rowId === 'number' ? String(rowId) : rowId;

    const isSelected = this._selectedRows[id] || false;
    const newValue = value !== undefined ? value : !isSelected;

    if (newValue === isSelected) return false;

    let newSelectedRows: Record<string, boolean>;

    if (this._selectionMode === 'single') {
      // For single mode, deselect all other rows
      newSelectedRows = newValue ? { [id]: true } : {};
    } else {
      // For multiple mode, just toggle this row
      newSelectedRows = { ...this._selectedRows };

      if (newValue) {
        newSelectedRows[id] = true;
      } else {
        delete newSelectedRows[id];
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
    rowIds.forEach((id) => {
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

  /* This duplicate method was removed to fix TS2393 */

  /**
   * Get all selected row IDs (alias for getSelectedRows for backward compatibility)
   * @returns Array of selected row IDs
   * @deprecated Use getSelectedRows instead
   */
  getSelectedRowIds(): string[] {
    return this.getSelectedRows().map((id) => String(id));
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
