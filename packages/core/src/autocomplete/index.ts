import { AeAutocomplete, defineAeAutocomplete } from './ae-autocomplete';
import { autoStyles } from './styles';
import { AutocompleteController } from './controller';
import type { AutoItem, LoadOptionsCallback } from './types';

// Event type definitions
export interface AeAutocompleteSelectEvent extends CustomEvent {
  detail: {
    value: string;
    item: AutoItem;
  }
}

export interface AeAutocompleteInputEvent extends CustomEvent {
  detail: {
    value: string;
  }
}

export interface AeAutocompleteLoadEvent extends CustomEvent {
  detail: {
    query: string;
  }
}

export interface AeAutocompleteLoadEndEvent extends CustomEvent {
  detail: {
    query: string;
    items: AutoItem[];
  }
}

declare global {
  interface HTMLElementEventMap {
    'ae-autocomplete-select': AeAutocompleteSelectEvent;
    'ae-autocomplete-input': AeAutocompleteInputEvent;
    'ae-autocomplete-load': AeAutocompleteLoadEvent;
    'ae-autocomplete-load-end': AeAutocompleteLoadEndEvent;
  }
}

// Re-export everything
export {
  AeAutocomplete,
  defineAeAutocomplete,
  autoStyles,
  AutocompleteController,
  AutoItem,
  LoadOptionsCallback
}