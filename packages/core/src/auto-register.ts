/**
 * Auto-register entry point for AetherUI components.
 * Simply import this file to automatically register all components.
 * 
 * Example: 
 * import '@aetherui/core/auto-register';
 */

import { defineAll } from './define';

// Auto-register all components if in a browser environment
if (typeof window !== 'undefined') {
  // Avoid duplicate registrations
  const REGISTRATION_MARKER = '__AETHERUI_COMPONENTS_REGISTERED';
  
  if (!(window as any)[REGISTRATION_MARKER]) {
    console.log('Auto-registering AetherUI components');
    defineAll();
    (window as any)[REGISTRATION_MARKER] = true;
  }
}

// Re-export utilities
export { defineAll } from './define';

// Also export all component classes for direct use
export * from './button';
export * from './accordion';
export * from './radio';
export * from './checkbox';
export * from './modal/ae-modal';
export * from './tabs';
export * from './alert';
export * from './dropdown';
export * from './treeview';
export * from './autocomplete';