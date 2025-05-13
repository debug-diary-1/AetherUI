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
  defineAeTreeView,
  defineAeCombo,
  defineAll
} from '@aetherui/core';

// Datatable may not be available in SSR context
let defineDataTableElements: () => boolean;
try {
  const datatable = require('@aetherui/datatable');
  defineDataTableElements = datatable.defineDataTableElements;
} catch (e) {
  // Datatable package is not available, create a no-op function
  defineDataTableElements = () => false;
}

/**
 * Register all Aether UI components for server-side rendering
 */
export function registerAetherComponents() {
  // Register all components
  defineAll();

  // Try to register datatable components if available
  try {
    defineDataTableElements();
  } catch (e) {
    // Ignore errors if datatable is not available
  }
}

/**
 * Register all Aether UI components on the client side
 * This should be called in a client-side script
 */
export async function registerClientComponents() {
  const core = await import('@aetherui/core');

  // Register all components
  core.defineAll();

  // Try to load and register datatable components
  try {
    const datatable = await import('@aetherui/datatable');
    if (datatable.defineDataTableElements) {
      datatable.defineDataTableElements();
    }
    return { core, datatable };
  } catch (e) {
    // Return core only if datatable is not available
    return { core };
  }
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
  defineAeTreeView,
  defineAeCombo,
  defineAll
};

