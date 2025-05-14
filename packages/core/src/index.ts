// Re-export everything from components
export * from './button';
export * from './accordion';
export * from './radio';
export * from './modal/ae-modal';
export * from './checkbox';
export * from './tabs';
export * from './alert';
export * from './dropdown';
export * from './treeview';
export * from './autocomplete';
export * from './combo';
export * from './toast';

// Export define functions
export { defineAeButton } from './button';
export { defineAeAccordion } from './accordion';
export { defineAeRadio, defineAeRadioGroup } from './radio';
export { defineAeModal } from './define';
export { defineAeCheckbox } from './checkbox';
export { defineAeTabs } from './tabs';
export { defineAeAlert } from './alert';
export { defineAeDropdown } from './dropdown';
export { defineAeTreeView } from './treeview';
export { defineAeAutocomplete } from './autocomplete';
export { defineAeCombo } from './combo';
export { defineAeToast } from './toast';

// Export define all function
export { defineAll } from './define';

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
export { AeAutocomplete } from './autocomplete/ae-autocomplete';
export { AeCombo } from './combo/ae-combo';
export { AeToast } from './toast/ae-toast';
export { showToast, createToastHelpers } from './toast/api';

// Auto-register components if in browser environment
if (typeof window !== 'undefined') {
  // Use defineAll to register all components at once
  import('./define').then(({ defineAll }) => {
    defineAll();
  });
}
