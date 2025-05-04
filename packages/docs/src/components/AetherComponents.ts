// Import component definitions - focus only on button for now
import { defineAeButton } from '@aetherui/core';

/**
 * Register all Aether UI components for server-side rendering
 */
export function registerAetherComponents() {
  // Register button component
  defineAeButton();
}

/**
 * Register all Aether UI components on the client side
 * This should be called in a client-side script
 */
export async function registerClientComponents() {
  const core = await import('@aetherui/core');
  
  // Register button component on client
  core.defineAeButton();
  
  return { core };
}

// Export components for direct access if needed
export { defineAeButton };

