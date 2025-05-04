// Re-export everything from components
export * from './button';
export * from './accordion';
export * from './radio';
export * from './modal/ae-modal';

// Export define functions
export { defineAeButton } from './button';
export { defineAeAccordion } from './accordion';
export { defineAeRadio, defineAeRadioGroup } from './radio';
export { defineAeModal } from './define';

// Export define all function
export { defineAll } from './define';

// Register custom elements
import { AeModal } from './modal/ae-modal';

customElements.define('ae-modal', AeModal);
