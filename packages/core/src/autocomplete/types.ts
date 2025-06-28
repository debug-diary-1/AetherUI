/**
 * Represents an option in the autocomplete dropdown
 */
export interface AutocompleteOption {
  /** Unique identifier for the option */
  id: string | number;
  
  /** Display text for the option */
  text: string;
  
  /** Optional group for categorizing options */
  group?: string;
  
  /** Whether the option is disabled */
  disabled?: boolean;
  
  /** Any additional data associated with the option */
  data?: Record<string, unknown>;
}

/**
 * Filter function type for autocomplete
 */
export type AutocompleteFilterFunction = (query: string, option: AutocompleteOption) => boolean;

/**
 * Default filter implementation that does case-insensitive substring matching
 */
export const defaultFilter: AutocompleteFilterFunction = (query: string, option: AutocompleteOption) => {
  if (!query) return true;
  return option.text.toLowerCase().includes(query.toLowerCase());
};