// Re-export non-conflicting component exports
export * from './button';
export * from './accordion';
export * from './radio';
export * from './modal/ae-modal';
export * from './checkbox';
export * from './tabs';
export * from './alert';
export * from './dropdown';
export * from './treeview';
export * from './toast';
export * from './tooltip';

// Handle autocomplete and combo exports with naming conflicts
import * as AutocompleteExports from './autocomplete';
import * as ComboExports from './combo';

// Import component types and interfaces to re-export
import type {
  AutocompleteOption,
  AutocompleteFilterFunction,
  AeAutocompleteChangeEvent,
  AeAutocompleteSelectEvent
} from './autocomplete';

import type {
  ComboItem,
  ComboFilterFunction,
  AeComboSelectEvent,
  AeComboInputEvent
} from './combo';

// Import components and utilities to re-export
import { AeAutocomplete } from './autocomplete/ae-autocomplete';
import { defineAeAutocomplete } from './autocomplete';
import { autocompleteStyles } from './autocomplete';
import { AutocompleteController } from './autocomplete';

import { AeCombo } from './combo/ae-combo';
import { defineAeCombo } from './combo';
import { comboboxStyles } from './combo';
import { ComboController } from './combo';

// Re-export components
export { AeAutocomplete };
export { defineAeAutocomplete };
export { autocompleteStyles };
export { AutocompleteController };
export type { AutocompleteOption, AutocompleteFilterFunction, AeAutocompleteChangeEvent, AeAutocompleteSelectEvent };

export { AeCombo };
export { defineAeCombo };
export { comboboxStyles };
export { ComboController };
export type { ComboItem, ComboFilterFunction, AeComboSelectEvent, AeComboInputEvent };

// Rename the conflicting defaultFilter exports
export const autocompleteDefaultFilter = AutocompleteExports.defaultFilter;
export const comboDefaultFilter = ComboExports.defaultFilter;

// Export define all function
export { defineAll } from './define';
export { defineAeModal } from './define';

// Export all define functions
export { defineAeButton } from './button';
export { defineAeAccordion } from './accordion';
export { defineAeRadio, defineAeRadioGroup } from './radio';
export { defineAeCheckbox } from './checkbox';
export { defineAeTabs } from './tabs';
export { defineAeAlert } from './alert';
export { defineAeDropdown } from './dropdown';
export { defineAeTreeView } from './treeview';
export { defineAeToast } from './toast';
export { defineAeTooltip } from './tooltip';

// Export component classes explicitly for Storybook
export { AeButton } from './button/ae-button';
export { AeDropdown, AeMenuItem, AeMenuSeparator, AeMenuSection } from './dropdown/ae-dropdown';
export { AeAlert } from './alert/ae-alert';
export { AeTabs } from './tabs/ae-tabs';
export { AeCheckbox } from './checkbox/ae-checkbox';
export { AeRadio } from './radio/ae-radio';
export { AeRadioGroup } from './radio/ae-radio-group';
export { AeAccordion } from './accordion/ae-accordion';
export { AeModal } from './modal/ae-modal';
export { AeTreeView } from './treeview/ae-treeview';
export { AeToast } from './toast/ae-toast';
export { showToast, createToastHelpers } from './toast/api';
export { AeTooltip } from './tooltip/ae-tooltip';

// Auto-register components if in browser environment
if (typeof window !== 'undefined') {
  // Use defineAll to register all components at once
  import('./define').then(({ defineAll }) => {
    defineAll();
  });
}
