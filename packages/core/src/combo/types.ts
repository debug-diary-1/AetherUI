/**
 * Represents an item in the combobox dropdown
 */
export interface ComboItem {
  /** Unique identifier for the item */
  id: string;

  /** Display text for the item */
  label: string;

  /** Whether the item is disabled */
  disabled?: boolean;
}

/**
 * Filter function type for combobox
 */
export type ComboFilterFunction = (query: string, item: ComboItem) => boolean;

/**
 * Default filter implementation that does case-insensitive substring matching
 */
export const defaultFilter: ComboFilterFunction = (query: string, item: ComboItem) => {
  if (!query) return true;
  return item.label.toLowerCase().includes(query.toLowerCase());
};
