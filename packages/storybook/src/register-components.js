// This file registers all components used in storybook
// Import components from the core package
import { defineAeAutocomplete } from '@aetherui/core/autocomplete';
import { defineAeAlert } from '@aetherui/core/alert';
import { defineAeCombo } from '@aetherui/core/combo';
import { defineAeTabs } from '@aetherui/core/tabs';
import { defineAeTreeView } from '@aetherui/core/treeview';
import { defineAeAccordion } from '@aetherui/core/accordion';
import { defineAeButton } from '@aetherui/core/button';
import { defineAeCheckbox } from '@aetherui/core/checkbox';
import { defineAeDropdown } from '@aetherui/core/dropdown';
import { defineAeModal } from '@aetherui/core/modal';
import { defineAeRadio } from '@aetherui/core/radio';

// Import datatable
// We'll attempt to import the datatable components but handle failures gracefully
let defineDataTableElements;
try {
  // Dynamic import would be better but Vite static analysis might not handle it
  // Using this approach to prevent blocking other components if datatable fails
  const datatableModule = import('@aetherui/datatable');
  datatableModule.then(module => {
    defineDataTableElements = module.defineDataTableElements;
    // Register datatable elements when the module is loaded
    if (defineDataTableElements) {
      defineDataTableElements();
      console.log('✓ DataTable components registered successfully');
    }
  }).catch(err => {
    console.warn('DataTable module could not be loaded:', err.message);
  });
} catch (err) {
  console.warn('Could not import DataTable module:', err.message);
}

// Function to register all components
function registerComponents() {
  console.log('Registering AetherUI components...');

  try {
    // Register each component with error handling
    const registerComponent = (name, defineFn) => {
      try {
        defineFn();
        console.log(`✓ ${name} registered successfully`);
      } catch (error) {
        console.error(`Error registering ${name}:`, error.message);
      }
    };

    // Register all components
    registerComponent('AeAutocomplete', defineAeAutocomplete);
    registerComponent('AeAlert', defineAeAlert);
    registerComponent('AeCombo', defineAeCombo);
    registerComponent('AeTabs', defineAeTabs);
    registerComponent('AeTreeView', defineAeTreeView);
    registerComponent('AeAccordion', defineAeAccordion);
    registerComponent('AeButton', defineAeButton);
    registerComponent('AeCheckbox', defineAeCheckbox);
    registerComponent('AeDropdown', defineAeDropdown);
    registerComponent('AeModal', defineAeModal);
    registerComponent('AeRadio', defineAeRadio);

    console.log('All components registered!');
  } catch (error) {
    console.error('Error during component registration:', error);
  }
}

// Register components immediately
registerComponents();