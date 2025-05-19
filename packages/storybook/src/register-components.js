// This file registers all components used in storybook
// We'll use the simplest approach - directly importing from component packages

console.log('Registering AetherUI components...');

// Simple component registration using try/catch for each component
function registerComponent(name, importFn) {
  try {
    importFn();
    console.log(`✓ ${name} registered successfully`);
    return true;
  } catch (error) {
    console.error(`Error registering ${name}:`, error.message);
    return false;
  }
}

// Import and register components from the core package
try {
  // Core components
  import('@aetherui/core/autocomplete').then(m => {
    if (m && m.defineAeAutocomplete) m.defineAeAutocomplete();
    console.log('Autocomplete imported');
  }).catch(e => console.error('Autocomplete import failed:', e));
  
  import('@aetherui/core/alert').then(m => {
    if (m && m.defineAeAlert) m.defineAeAlert();
    console.log('Alert imported');
  }).catch(e => console.error('Alert import failed:', e));
  
  import('@aetherui/core/combo').then(m => {
    if (m && m.defineAeCombo) m.defineAeCombo();
    console.log('Combo imported');
  }).catch(e => console.error('Combo import failed:', e));
  
  import('@aetherui/core/tabs').then(m => {
    if (m && m.defineAeTabs) m.defineAeTabs();
    console.log('Tabs imported');
  }).catch(e => console.error('Tabs import failed:', e));
  
  import('@aetherui/core/treeview').then(m => {
    if (m && m.defineAeTreeView) m.defineAeTreeView();
    console.log('TreeView imported');
  }).catch(e => console.error('TreeView import failed:', e));
  
  import('@aetherui/core/accordion').then(m => {
    if (m && m.defineAeAccordion) m.defineAeAccordion();
    console.log('Accordion imported');
  }).catch(e => console.error('Accordion import failed:', e));
  
  import('@aetherui/core/button').then(m => {
    if (m && m.defineAeButton) m.defineAeButton();
    console.log('Button imported');
  }).catch(e => console.error('Button import failed:', e));
  
  import('@aetherui/core/checkbox').then(m => {
    if (m && m.defineAeCheckbox) m.defineAeCheckbox();
    console.log('Checkbox imported');
  }).catch(e => console.error('Checkbox import failed:', e));
  
  import('@aetherui/core/dropdown').then(m => {
    if (m && m.defineAeDropdown) m.defineAeDropdown();
    console.log('Dropdown imported');
  }).catch(e => console.error('Dropdown import failed:', e));
  
  import('@aetherui/core/modal').then(m => {
    if (m && m.defineAeModal) m.defineAeModal();
    console.log('Modal imported');
  }).catch(e => console.error('Modal import failed:', e));
  
  import('@aetherui/core/radio').then(m => {
    if (m && m.defineAeRadio) m.defineAeRadio();
    console.log('Radio imported');
  }).catch(e => console.error('Radio import failed:', e));
  
  import('@aetherui/core/tooltip').then(m => {
    if (m && m.defineAeTooltip) m.defineAeTooltip();
    console.log('Tooltip imported');
  }).catch(e => console.error('Tooltip import failed:', e));
  
  // Toast is loaded separately through toast-wrapper.js
  console.log('✓ AeToast registered via toast-wrapper.js');
} catch (error) {
  console.error('Error during component registration:', error);
}
// Import AeToast through the package exports
// Toast component is registered in toast-wrapper.js directly

// Check component registration status after a delay
setTimeout(() => {
  // Check if components are defined
  const components = [
    'ae-autocomplete', 'ae-alert', 'ae-combo', 'ae-tabs', 'ae-treeview',
    'ae-accordion', 'ae-button', 'ae-checkbox', 'ae-dropdown', 'ae-modal', 'ae-radio', 'ae-tooltip'
  ];
  
  const missingComponents = components.filter(tag => !customElements.get(tag));
  
  if (missingComponents.length > 0) {
    console.warn('Some components were not registered:', missingComponents);
    // Try direct registration from source-components.js instead
    import('./source-components.js')
      .then(() => console.log('Loaded source-components.js as fallback'))
      .catch(e => console.error('Failed to load source-components.js:', e));
  } else {
    console.log('All components registered successfully!');
  }
}, 1000);