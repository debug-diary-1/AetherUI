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

// Register custom elements
import { AeModal } from './modal/ae-modal';
import { AeButton } from './button';
import { AeCheckbox } from './checkbox';

customElements.define('ae-modal', AeModal);
customElements.define('ae-button', AeButton);
customElements.define('ae-checkbox', AeCheckbox);
