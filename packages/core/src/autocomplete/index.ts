export { AeAutocomplete, defineAeAutocomplete } from './ae-autocomplete';
export type { AutocompleteOption, AutocompleteFilterFunction } from './types';
export { defaultFilter } from './types';
export { autocompleteStyles as autocompleteStyles } from './styles';
export { AutocompleteController } from './controller';

// Import needed for local use in type definition
import type { AutocompleteOption } from './types';

// Event type definitions
export interface AeAutocompleteChangeEvent extends CustomEvent {
  detail: {
    value: string;
    option: AutocompleteOption | null;
  }
}

export interface AeAutocompleteSelectEvent extends CustomEvent {
  detail: {
    value: string;
    option: AutocompleteOption;
  }
}

declare global {
  interface HTMLElementEventMap {
    'ae-autocomplete-change': AeAutocompleteChangeEvent;
    'ae-autocomplete-select': AeAutocompleteSelectEvent;
  }
}