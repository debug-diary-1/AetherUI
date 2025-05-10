import { defineAll } from '@aetherui/core';

// Function to register components
async function registerComponents() {
  try {
    // Register all components
    defineAll();
    console.log('Aether UI components registered successfully');
  } catch (error) {
    console.error('Failed to register Aether UI components:', error);
  }
}

// Register components when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', registerComponents);
} else {
  registerComponents();
}

// Export for use in other files
export { registerComponents }; 