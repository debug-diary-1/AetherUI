import { SortingState, SortDirection } from '../models/sort-model';

/**
 * The SortManager class is responsible for handling sorting operations
 * @template T The type of data being sorted
 */
export class SortManager<T> {
  // Add methods for applying sorting to data

  /**
   * Apply the current sort configuration to data
   * @param data Data to sort
   * @param columns Column definitions with functions
   * @returns Sorted data
   */
  applySort(data: T[], columns: any[]): T[] {
    if (!this._sorting.length) return [...data];

    // Create a copy to avoid mutating the original
    const sortedData = [...data];

    // Sort by each sort configuration in order
    sortedData.sort((a, b) => {
      for (const sort of this._sorting) {
        // Find column definition
        const column = columns.find(col => col.id === sort.id);
        if (!column) continue;

        // Get values to compare
        const valueA = this.getValueForSorting(a, column);
        const valueB = this.getValueForSorting(b, column);

        // Compare values
        const result = this.compareValues(valueA, valueB);

        // If not equal, return result, otherwise continue to next sort level
        if (result !== 0) {
          return sort.desc ? -result : result;
        }
      }

      return 0;
    });

    return sortedData;
  }

  /**
   * Extract value for sorting from a row based on column definition
   * @param row Row data
   * @param column Column definition
   * @returns Value to use for sorting
   */
  private getValueForSorting(row: T, column: any): any {
    // Use function if provided
    if (column.accessor && typeof column.accessor === 'function') {
      return column.accessor(row);
    }

    // Use accessorKey if it's a string
    if (column.accessorKey && typeof column.accessorKey === 'string') {
      return (row as any)[column.accessorKey];
    }

    // Fallback to using column id as property name
    return (row as any)[column.id];
  }

  /**
   * Compare two values for sorting
   * @param a First value
   * @param b Second value
   * @returns Comparison result (-1, 0, 1)
   */
  private compareValues(a: any, b: any): number {
    // Handle null/undefined
    if (a === null || a === undefined) {
      return b === null || b === undefined ? 0 : 1;
    }
    if (b === null || b === undefined) {
      return -1;
    }

    // Convert to comparable values if needed
    const valueA = a instanceof Date ? a.getTime() : a;
    const valueB = b instanceof Date ? b.getTime() : b;

    // Compare based on type
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }

    if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      return valueA === valueB ? 0 : valueA ? -1 : 1;
    }

    // Fallback to string comparison
    return String(valueA).localeCompare(String(valueB));
  }
  private _sorting: SortingState = [];
  private _multiSort: boolean = true;
  private _enableSorting: boolean = true;
  private _enableSortingRemoval: boolean = true;
  
  /**
   * Initialize sorting state and options
   * @param sorting Initial sorting state
   * @param options Configuration options
   */
  initialize(
    sorting: SortingState = [], 
    options?: { 
      multiSort?: boolean; 
      enableSorting?: boolean; 
      enableSortingRemoval?: boolean; 
    }
  ): void {
    this._sorting = [...sorting];
    
    if (options) {
      this._multiSort = options.multiSort ?? true;
      this._enableSorting = options.enableSorting ?? true;
      this._enableSortingRemoval = options.enableSortingRemoval ?? true;
    }
  }
  
  /**
   * Get current sorting state
   * @returns The current sorting state
   */
  getSorting(): SortingState {
    return [...this._sorting];
  }
  
  /**
   * Set the entire sorting state
   * @param sorting New sorting state
   * @returns True if sorting changed
   */
  setSorting(sorting: SortingState): boolean {
    if (!this._enableSorting) return false;
    
    // Compare and only update if changed
    const changed = 
      this._sorting.length !== sorting.length || 
      JSON.stringify(this._sorting) !== JSON.stringify(sorting);
    
    if (changed) {
      this._sorting = [...sorting];
    }
    
    return changed;
  }
  
  /**
   * Toggle sorting for a specific column
   * @param columnId Column ID to toggle sorting for
   * @param multiSort Whether to use multi-sort (hold shift)
   * @param desc Force a specific direction
   * @returns True if sorting changed
   */
  toggleSorting(columnId: string, multiSort?: boolean, desc?: boolean): boolean {
    if (!this._enableSorting) return false;
    
    // Find current sort for this column
    const currentSort = this._sorting.find(sort => sort.id === columnId);
    
    // Use provided multiSort or default
    const useMultiSort = multiSort !== undefined ? multiSort : this._multiSort;
    
    // Create a copy of the current sorting
    let newSorting: SortingState;
    
    if (currentSort) {
      // If already sorted, toggle direction or remove
      if (desc !== undefined) {
        // If direction is forced, just update it
        newSorting = this._sorting.map(sort =>
          sort.id === columnId
            ? { ...sort, desc, direction: desc ? 'desc' : 'asc' }
            : sort
        );
      } else if (currentSort.desc) {
        // Toggle from desc to asc
        if (this._enableSortingRemoval) {
          // Remove from sorting if we allow removal
          newSorting = this._sorting.filter(sort => sort.id !== columnId);
        } else {
          // Toggle to asc
          newSorting = this._sorting.map(sort =>
            sort.id === columnId ? { ...sort, desc: false, direction: 'asc' } : sort
          );
        }
      } else {
        // Toggle from asc to desc
        newSorting = this._sorting.map(sort =>
          sort.id === columnId ? { ...sort, desc: true, direction: 'desc' } : sort
        );
      }
    } else {
      // Add new sort
      if (useMultiSort) {
        // Add to existing sorts
        newSorting = [
          ...this._sorting,
          {
            id: columnId,
            desc: desc ?? false,
            direction: (desc ?? false) ? 'desc' : 'asc'
          }
        ];
      } else {
        // Replace existing sorts
        newSorting = [{
          id: columnId,
          desc: desc ?? false,
          direction: (desc ?? false) ? 'desc' : 'asc'
        }];
      }
    }
    
    return this.setSorting(newSorting);
  }
  
  /**
   * Clear all sorting
   * @returns True if sorting changed
   */
  clearSorting(): boolean {
    return this.setSorting([]);
  }
  
  /**
   * Check if a column is currently sorted
   * @param columnId Column ID to check
   * @returns The sort direction or undefined if not sorted
   */
  getColumnSortDirection(columnId: string): SortDirection | undefined {
    const sort = this._sorting.find(sort => sort.id === columnId);
    if (!sort) return undefined;
    return sort.direction;
  }
  
  /**
   * Get the sort index for a column (for showing multi-sort indicators)
   * @param columnId Column ID to check
   * @returns The sort index (0-based) or -1 if not sorted
   */
  getColumnSortIndex(columnId: string): number {
    return this._sorting.findIndex(sort => sort.id === columnId);
  }
}