import { SortingState } from '../models/sort-model';

/**
 * The SortManager class is responsible for handling sorting operations
 */
export class SortManager {
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
          sort.id === columnId ? { ...sort, desc } : sort
        );
      } else if (currentSort.desc) {
        // Toggle from desc to asc
        if (this._enableSortingRemoval) {
          // Remove from sorting if we allow removal
          newSorting = this._sorting.filter(sort => sort.id !== columnId);
        } else {
          // Toggle to asc
          newSorting = this._sorting.map(sort => 
            sort.id === columnId ? { ...sort, desc: false } : sort
          );
        }
      } else {
        // Toggle from asc to desc
        newSorting = this._sorting.map(sort => 
          sort.id === columnId ? { ...sort, desc: true } : sort
        );
      }
    } else {
      // Add new sort
      if (useMultiSort) {
        // Add to existing sorts
        newSorting = [
          ...this._sorting,
          { id: columnId, desc: desc ?? false }
        ];
      } else {
        // Replace existing sorts
        newSorting = [{ id: columnId, desc: desc ?? false }];
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
  getColumnSortDirection(columnId: string): 'asc' | 'desc' | undefined {
    const sort = this._sorting.find(sort => sort.id === columnId);
    if (!sort) return undefined;
    return sort.desc ? 'desc' : 'asc';
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