/**
 * Represents an autocomplete suggestion item
 */
export interface AutoItem {
  /** Unique identifier for the item */
  id: string;
  
  /** Display text for the item */
  label: string;
  
  /** Whether the item is disabled */
  disabled?: boolean;
}

/**
 * Callback type for async loading options
 */
export type LoadOptionsCallback = (query: string) => Promise<AutoItem[]>;