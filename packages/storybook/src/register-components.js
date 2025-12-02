// This file registers all components used in storybook
console.log('Registering AetherUI components...');

// Import and register all components at once
import('@aetherui/core').then(module => {
  if (module.defineAll) {
    module.defineAll();
    console.log('✓ All components registered using defineAll');
  } else {
    console.error('defineAll function not found in @aetherui/core');
  }
}).catch(error => {
  console.error('Failed to import @aetherui/core:', error);
  
  // Fallback: try to load source components
  import('./source-components.js')
    .then(() => console.log('Loaded source-components.js as fallback'))
    .catch(e => console.error('Failed to load source-components.js:', e));
});

// Check component registration status after a delay
setTimeout(() => {
  const components = [
    'ae-autocomplete', 'ae-alert', 'ae-combo', 'ae-tabs', 'ae-treeview',
    'ae-accordion', 'ae-button', 'ae-checkbox', 'ae-dropdown', 'ae-modal',
    'ae-radio', 'ae-radio-group', 'ae-tooltip', 'ae-toast', 'ae-input',
    'ae-select', 'ae-textarea', 'ae-badge', 'ae-spinner', 'ae-switch',
    'ae-progress', 'ae-breadcrumb', 'ae-pagination', 'ae-drawer', 'ae-popover',
    'ae-menu', 'ae-tab', 'ae-tab-panel'
  ];
  
  const registeredComponents = components.filter(tag => customElements.get(tag));
  const missingComponents = components.filter(tag => !customElements.get(tag));
  
  if (registeredComponents.length > 0) {
    console.log('✓ Registered components:', registeredComponents);
  }
  
  if (missingComponents.length > 0) {
    console.warn('⚠ Missing components:', missingComponents);
  } else {
    console.log('✅ All components registered successfully!');
  }
}, 1000);