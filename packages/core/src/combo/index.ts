export { AeCombo, defineAeCombo } from './ae-combo';
export type { ComboItem, ComboFilterFunction } from './types';
export { defaultFilter } from './types';
export { comboStyles as comboboxStyles } from './styles';
export { ComboController } from './controller';

// Event type definitions
export interface AeComboSelectEvent extends CustomEvent {
  detail: {
    value: string;
    item: ComboItem | null;
  }
}

export interface AeComboInputEvent extends CustomEvent {
  detail: {
    value: string;
  }
}

declare global {
  interface HTMLElementEventMap {
    'ae-combo-select': AeComboSelectEvent;
    'ae-combo-input': AeComboInputEvent;
  }
}