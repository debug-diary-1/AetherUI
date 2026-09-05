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
export * from './input';
export * from './select';
export * from './textarea';
export * from './badge';
export * from './spinner';
export * from './switch';
export * from './progress';
export * from './breadcrumb';
export * from './pagination';
export * from './drawer';
export * from './popover';
export * from './menu';

// Handle autocomplete and combo exports with naming conflicts
import * as AutocompleteExports from './autocomplete';
import * as ComboExports from './combo';

// Import component types and interfaces to re-export
import type {
  AutocompleteOption,
  AutocompleteFilterFunction,
  AeAutocompleteChangeEvent,
  AeAutocompleteSelectEvent,
} from './autocomplete';

import type {
  ComboItem,
  ComboFilterFunction,
  AeComboSelectEvent,
  AeComboInputEvent,
} from './combo';

// Import components and utilities to re-export
import { AeAutocomplete } from './autocomplete/ae-autocomplete';
import { defineAeAutocomplete } from './autocomplete';
import { autocompleteStyles } from './autocomplete';

import { AeCombo } from './combo/ae-combo';
import { defineAeCombo } from './combo';
import { comboboxStyles } from './combo';

// Re-export components
export { AeAutocomplete };
export { defineAeAutocomplete };
export { autocompleteStyles };
export type {
  AutocompleteOption,
  AutocompleteFilterFunction,
  AeAutocompleteChangeEvent,
  AeAutocompleteSelectEvent,
};

export { AeCombo };
export { defineAeCombo };
export { comboboxStyles };
export type { ComboItem, ComboFilterFunction, AeComboSelectEvent, AeComboInputEvent };

// Rename the conflicting defaultFilter exports
export const autocompleteDefaultFilter = AutocompleteExports.defaultFilter;
export const comboDefaultFilter = ComboExports.defaultFilter;

// Export define all function
export { defineAll } from './define';
export { defineAeModal } from './modal';

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
export { defineAeInput } from './input';
export { defineAeSelect } from './select';
export { defineAeTextarea } from './textarea';
export { defineAeBadge } from './badge';
export { defineAeSpinner } from './spinner';
export { defineAeSwitch } from './switch';
export { defineAeProgress } from './progress';
export { defineAeBreadcrumb } from './breadcrumb';
export { defineAePagination } from './pagination';
export { defineAeDrawer } from './drawer';
export { defineAePopover } from './popover';
export { defineAeMenu } from './menu';

// Export component classes explicitly for Storybook
export { AeButton } from './button/ae-button';
export { AeDropdown, AeDropdownItem, AeMenuSeparator, AeMenuSection } from './dropdown/ae-dropdown';
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
export { AeInput } from './input/ae-input';
export { AeSelect } from './select/ae-select';
export { AeTextarea } from './textarea/ae-textarea';
export { AeBadge } from './badge/ae-badge';
export { AeSpinner } from './spinner/ae-spinner';
export { AeSwitch } from './switch/ae-switch';
export { AeProgress } from './progress/ae-progress';
export { AeBreadcrumb } from './breadcrumb/ae-breadcrumb';
export { AeBreadcrumbItem } from './breadcrumb/ae-breadcrumb-item';
export { AePagination } from './pagination/ae-pagination';
export { AeDrawer } from './drawer/ae-drawer';
export { AePopover } from './popover/ae-popover';
export { AeMenu } from './menu/ae-menu';
export { AeMenuItem as AeMenuItemComponent } from './menu/ae-menu-item';
export { AeMenuDivider } from './menu/ae-menu-divider';
