// Import and register all AetherUI components
import { defineAll } from '@aetherui/core';

// Only run in browser context
if (typeof window !== 'undefined') {
  // Function to register components
  function registerComponents() {
    try {
      defineAll();

      // Dispatch ready event
      window.dispatchEvent(new CustomEvent('aetherui:ready'));

      // Mark as initialized
      (window as any).__aetherui_initialized = true;
    } catch (error) {
      console.error('[AetherUI] Error registering components:', error);
    }
  }

  // Register immediately
  registerComponents();

  // Re-register on page navigation
  document.addEventListener('astro:page-load', registerComponents);
  document.addEventListener('astro:after-swap', registerComponents);
}
