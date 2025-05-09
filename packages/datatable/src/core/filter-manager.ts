import { ColumnFiltersState } from '../models/filter-model';

/**
 * The FilterManager class is responsible for handling filtering operations
 */
export class FilterManager {
  private _columnFilters: ColumnFiltersState = [];
  private _globalFilter: string = '';
  private _enableFiltering: boolean = true;
  private _enableColumnFilters: boolean = true;
  
  /**
   * Initialize filter state and options
   * @param columnFilters Initial column filters state
   * @param globalFilter Initial global filter value
   * @param options Configuration options
   */
  initialize(
    columnFilters: ColumnFiltersState = [],
    globalFilter: string = '',
    options?: {
      enableFiltering?: boolean;
      enableColumnFilters?: boolean;
    }
  ): void {
    this._columnFilters = [...columnFilters];
    this._globalFilter = globalFilter;
    
    if (options) {
      this._enableFiltering = options.enableFiltering ?? true;
      this._enableColumnFilters = options.enableColumnFilters ?? true;
    }
  }
  
  /**
   * Get column filters
   * @returns Current column filters state
   */
  getColumnFilters(): ColumnFiltersState {
    return [...this._columnFilters];
  }
  
  /**
   * Set column filters
   * @param filters New column filters state
   * @returns True if filters changed
   */
  setColumnFilters(filters: ColumnFiltersState): boolean {
    if (!this._enableFiltering || !this._enableColumnFilters) return false;
    
    // Compare and only update if changed
    const changed = 
      this._columnFilters.length !== filters.length || 
      JSON.stringify(this._columnFilters) !== JSON.stringify(filters);
    
    if (changed) {
      this._columnFilters = [...filters];
    }
    
    return changed;
  }
  
  /**
   * Get global filter
   * @returns Current global filter value
   */
  getGlobalFilter(): string {
    return this._globalFilter;
  }
  
  /**
   * Set global filter
   * @param filter New global filter value
   * @returns True if filter changed
   */
  setGlobalFilter(filter: string): boolean {
    if (!this._enableFiltering) return false;
    
    const changed = this._globalFilter !== filter;
    
    if (changed) {
      this._globalFilter = filter;
    }
    
    return changed;
  }
  
  /**
   * Set a column filter
   * @param columnId Column ID to filter
   * @param value Filter value
   * @returns True if filters changed
   */
  setColumnFilter(columnId: string, value: string): boolean {
    if (!this._enableFiltering || !this._enableColumnFilters) return false;
    
    const currentFilterIndex = this._columnFilters.findIndex(f => f.id === columnId);
    
    // Create a copy of the current filters
    const newFilters = [...this._columnFilters];
    
    if (currentFilterIndex >= 0) {
      if (value === '') {
        // Remove filter if value is empty
        newFilters.splice(currentFilterIndex, 1);
      } else {
        // Update existing filter
        newFilters[currentFilterIndex] = { id: columnId, value };
      }
    } else if (value !== '') {
      // Add new filter if value isn't empty
      newFilters.push({ id: columnId, value });
    }
    
    return this.setColumnFilters(newFilters);
  }
  
  /**
   * Remove a column filter
   * @param columnId Column ID to remove filter for
   * @returns True if filters changed
   */
  removeColumnFilter(columnId: string): boolean {
    return this.setColumnFilter(columnId, '');
  }
  
  /**
   * Clear all filters
   * @param includeGlobal Whether to clear global filter too
   * @returns True if filters changed
   */
  clearFilters(includeGlobal: boolean = true): boolean {
    let changed = this.setColumnFilters([]);
    
    if (includeGlobal) {
      changed = this.setGlobalFilter('') || changed;
    }
    
    return changed;
  }
  
  /**
   * Get a column filter value
   * @param columnId Column ID to get filter for
   * @returns Current filter value or empty string
   */
  getColumnFilterValue(columnId: string): string {
    const filter = this._columnFilters.find(f => f.id === columnId);
    return filter?.value || '';
  }
}