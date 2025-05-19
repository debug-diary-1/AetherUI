/**
 * This file is an alternative component registration approach
 * that directly imports default exports from packages to avoid build issues
 */

// Import directly from the package exports
try {
  // Import from package exports directly
  console.log('Loading components directly from package exports');
  
  // Core components
  import('@aetherui/core/radio').then(m => console.log('Radio loaded')).catch(e => console.warn('Radio import failed:', e));
  import('@aetherui/core/alert').then(m => console.log('Alert loaded')).catch(e => console.warn('Alert import failed:', e));
  import('@aetherui/core/button').then(m => console.log('Button loaded')).catch(e => console.warn('Button import failed:', e));
  import('@aetherui/core/tabs').then(m => console.log('Tabs loaded')).catch(e => console.warn('Tabs import failed:', e));
  import('@aetherui/core/accordion').then(m => console.log('Accordion loaded')).catch(e => console.warn('Accordion import failed:', e));
  import('@aetherui/core/checkbox').then(m => console.log('Checkbox loaded')).catch(e => console.warn('Checkbox import failed:', e));
  import('@aetherui/core/dropdown').then(m => console.log('Dropdown loaded')).catch(e => console.warn('Dropdown import failed:', e));
  import('@aetherui/core/modal').then(m => console.log('Modal loaded')).catch(e => console.warn('Modal import failed:', e));
  import('@aetherui/core/autocomplete').then(m => console.log('Autocomplete loaded')).catch(e => console.warn('Autocomplete import failed:', e));
  import('@aetherui/core/combo').then(m => console.log('Combo loaded')).catch(e => console.warn('Combo import failed:', e));
  import('@aetherui/core/treeview').then(m => console.log('TreeView loaded')).catch(e => console.warn('TreeView import failed:', e));
  
  // Toast is part of the core package
  import('@aetherui/core/toast').then(m => console.log('Toast loaded')).catch(e => console.warn('Toast import failed:', e));
  
  // Tooltip is part of the core package
  import('@aetherui/core/tooltip').then(m => console.log('Tooltip loaded')).catch(e => console.warn('Tooltip import failed:', e));
  
  console.log('Package exports import completed');
} catch (error) {
  console.error('Error with package imports:', error);
}