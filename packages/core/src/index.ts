// Re-export everything from components
export * from './button';
export * from './accordion';
export * from './radio';
export * from './modal/ae-modal';
export * from './checkbox';
export * from './tabs';
export * from './alert';

// Export define functions
export { defineAeButton } from './button';
export { defineAeAccordion } from './accordion';
export { defineAeRadio, defineAeRadioGroup } from './radio';
export { defineAeModal } from './define';
export { defineAeCheckbox } from './checkbox';
export { defineAeTabs } from './tabs';
export { defineAeAlert } from './alert';

// Export define all function
export { defineAll } from './define';

// Register custom elements
import { AeModal } from './modal/ae-modal';
import { AeButton } from './button';
import { AeCheckbox } from './checkbox';

customElements.define('ae-modal', AeModal);
customElements.define('ae-button', AeButton);
customElements.define('ae-checkbox', AeCheckbox);
