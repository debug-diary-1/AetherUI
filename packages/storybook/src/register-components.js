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
// Import AeToast directly
import { AeToast } from '@aetherui/core/src/toast/ae-toast';

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
    // Register AeToast directly
    try {
      if (!customElements.get('ae-toast')) {
        customElements.define('ae-toast', AeToast);
        console.log(`✓ AeToast registered successfully`);
      }
    } catch (error) {
      console.error(`Error registering AeToast:`, error.message);
    }
    
    console.log('All components registered!');
  } catch (error) {
    console.error('Error during component registration:', error);
  }
}

// Register components immediately
registerComponents();