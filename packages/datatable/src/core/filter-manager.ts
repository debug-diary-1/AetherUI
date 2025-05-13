import { ColumnFiltersState } from '../models/filter-model';
import { applyFilterWithOperator } from '../utils/filter-utils';
import { ColumnFilterValue } from '../components/column-filter';

/**
 * The FilterManager class is responsible for handling filtering operations
 * @template T The type of data being filtered
 */
export class FilterManager<T> {
  // Private fields for state management
  private _columnFilters: ColumnFiltersState = [];
  private _advancedFilters: Map<string, ColumnFilterValue> = new Map();
  private _globalFilter: string = '';
  private _enableFiltering: boolean = true;
  private _enableColumnFilters: boolean = true;

  /**
   * Apply the current filter configuration to data
   * @param data Data to filter
   * @param columns Column definitions with accessor functions
   * @returns Filtered data
   */
  applyFilters(data: T[], columns: any[]): T[] {
    const filteredData = [...data];

    // No filters, return all data
    if (this._columnFilters.length === 0 && this._globalFilter === '' && this._advancedFilters.size === 0) {
      return filteredData;
    }

    // Apply global filter first (across all filterable columns)
    let result = filteredData;
    if (this._globalFilter !== '') {
      result = result.filter(row => {
        // Check all filterable columns for a match
        return columns.some(column => {
          if (column.enableGlobalFilter === false) return false;

          const value = this.getValueForFiltering(row, column);
          return this.matchesFilter(value, this._globalFilter, column.dataType);
        });
      });
    }

    // Then apply column-specific filters
    if (this._columnFilters.length > 0 || this._advancedFilters.size > 0) {
      result = result.filter(row => {
        // Must pass all string column filters
        if (!this._columnFilters.every(filter => {
          const column = columns.find(col => col.id === filter.id);
          if (!column) return true; // Skip if column not found

          const value = this.getValueForFiltering(row, column);
          return this.matchesFilter(value, filter.value, column.dataType);
        })) {
          return false;
        }

        // Must pass all advanced filters
        for (const [columnId, filterValue] of this._advancedFilters.entries()) {
          const column = columns.find(col => col.id === columnId);
          if (!column) continue; // Skip if column not found

          const value = this.getValueForFiltering(row, column);
          const dataType = column.dataType || 'string';

          if (!applyFilterWithOperator(value, filterValue, dataType)) {
            return false;
          }
        }

        return true;
      });
    }

    return result;
  }

  /**
   * Extract value for filtering from a row based on column definition
   * @param row Row data
   * @param column Column definition
   * @returns Value to use for filtering
   */
  private getValueForFiltering(row: T, column: any): any {
    // Use accessor function if provided
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
   * Check if a value matches a filter
   * @param value Value to check
   * @param filter Filter string
   * @param dataType Optional data type for type-specific filtering
   * @returns True if the value matches the filter
   */
  private matchesFilter(value: any, filter: string, dataType?: string): boolean {
    if (filter === '') return true;
    if (value === null || value === undefined) return false;

    // For numbers, try specific comparisons
    if (dataType === 'number' || typeof value === 'number') {
      // Check for comparison operators
      if (filter.startsWith('>=')) {
        return value >= Number(filter.slice(2));
      } else if (filter.startsWith('<=')) {
        return value <= Number(filter.slice(2));
      } else if (filter.startsWith('>')) {
        return value > Number(filter.slice(1));
      } else if (filter.startsWith('<')) {
        return value < Number(filter.slice(1));
      } else if (filter.startsWith('=')) {
        return value === Number(filter.slice(1));
      }
    }

    // For dates, try date comparisons
    if (dataType === 'date' || value instanceof Date) {
      const dateValue = value instanceof Date ? value : new Date(value);
      if (isNaN(dateValue.getTime())) return false;

      if (filter.startsWith('>=')) {
        const filterDate = new Date(filter.slice(2));
        return !isNaN(filterDate.getTime()) && dateValue >= filterDate;
      } else if (filter.startsWith('<=')) {
        const filterDate = new Date(filter.slice(2));
        return !isNaN(filterDate.getTime()) && dateValue <= filterDate;
      } else if (filter.startsWith('>')) {
        const filterDate = new Date(filter.slice(1));
        return !isNaN(filterDate.getTime()) && dateValue > filterDate;
      } else if (filter.startsWith('<')) {
        const filterDate = new Date(filter.slice(1));
        return !isNaN(filterDate.getTime()) && dateValue < filterDate;
      }

      // Try exact date match
      const filterDate = new Date(filter);
      if (!isNaN(filterDate.getTime())) {
        return dateValue.toDateString() === filterDate.toDateString();
      }

      // Fallback to string contains for dates
      return dateValue.toISOString().toLowerCase().includes(filter.toLowerCase());
    }

    // For booleans
    if (dataType === 'boolean' || typeof value === 'boolean') {
      const boolValue = Boolean(value);
      const boolFilter = filter.toLowerCase() === 'true';
      return boolValue === boolFilter;
    }

    // Default string contains check
    const strValue = String(value).toLowerCase();
    const strFilter = filter.toLowerCase();

    return strValue.includes(strFilter);
  }

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
    this._advancedFilters.clear();

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
   * Get advanced column filters
   * @returns Map of column IDs to advanced filter values
   */
  getAdvancedFilters(): Map<string, ColumnFilterValue> {
    return new Map(this._advancedFilters);
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
   * Set an advanced column filter
   * @param columnId Column ID to filter
   * @param filter Filter configuration
   * @returns True if filter changed
   */
  setAdvancedColumnFilter(columnId: string, filter: ColumnFilterValue | null): boolean {
    if (!this._enableFiltering || !this._enableColumnFilters) return false;

    // If filter is null or empty value, remove it
    if (!filter || filter.value === '') {
      if (this._advancedFilters.has(columnId)) {
        this._advancedFilters.delete(columnId);
        return true;
      }
      return false;
    }

    // Check if filter has changed
    const currentFilter = this._advancedFilters.get(columnId);
    const filterChanged = !currentFilter ||
      JSON.stringify(currentFilter) !== JSON.stringify(filter);

    if (filterChanged) {
      this._advancedFilters.set(columnId, { ...filter });
    }

    return filterChanged;
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
    let changed = this.setColumnFilter(columnId, '');

    // Also remove any advanced filter
    if (this._advancedFilters.has(columnId)) {
      this._advancedFilters.delete(columnId);
      changed = true;
    }

    return changed;
  }

  /**
   * Clear all filters
   * @param includeGlobal Whether to clear global filter too
   * @returns True if filters changed
   */
  clearFilters(includeGlobal: boolean = true): boolean {
    let changed = this.setColumnFilters([]);

    // Clear advanced filters
    if (this._advancedFilters.size > 0) {
      this._advancedFilters.clear();
      changed = true;
    }

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

  /**
   * Get advanced filter for a column
   * @param columnId Column ID to get filter for
   * @returns Current advanced filter or null
   */
  getAdvancedColumnFilter(columnId: string): ColumnFilterValue | null {
    return this._advancedFilters.get(columnId) || null;
  }
}