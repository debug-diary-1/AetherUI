// Re-export components
export { AeToast } from './ae-toast';
export { ToastManager } from './toast-manager';

// Re-export API functions explicitly
import { showToast, createToastHelpers } from './api';
export { showToast, createToastHelpers };

// Export types
export type { ToastOptions } from './toast-manager';
export type { ToastVariant, ToastPlacement } from './ae-toast';

// Import the AeToast class directly to avoid dynamic imports in Storybook
import { AeToast } from './ae-toast';

// Define function to register the custom element once
export const defineAeToast = () => {
  if (!customElements.get('ae-toast')) {
    customElements.define('ae-toast', AeToast);
  }
};
