// Import component definitions from the core package
import {
  defineAeButton,
  defineAeCheckbox,
  defineAeAccordion,
  defineAeModal,
  defineAeRadio,
  defineAeRadioGroup,
  defineAeTabs,
  defineAeAlert,
  defineAeDropdown,
  defineAll
} from '@aetherui/core';

/**
 * Register all Aether UI components for server-side rendering
 */
export function registerAetherComponents() {
  // Register all components
  defineAll();
}

/**
 * Register all Aether UI components on the client side
 * This should be called in a client-side script
 */
export async function registerClientComponents() {
  const core = await import('@aetherui/core');
  
  // Register all components
  core.defineAll();
  
  return { core };
}

// Export individual define functions for direct access if needed
export {
  defineAeButton,
  defineAeCheckbox,
  defineAeAccordion,
  defineAeModal,
  defineAeRadio,
  defineAeRadioGroup,
  defineAeTabs,
  defineAeAlert,
  defineAeDropdown,
  defineAll
};

