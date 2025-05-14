/**
 * Toast wrapper for Storybook to avoid dynamic imports
 */
import { AeToast } from '@aetherui/core/src/toast/ae-toast';
import { showToast, createToastHelpers } from '@aetherui/core/src/toast/api';

// Register component if not already registered
if (!customElements.get('ae-toast')) {
  customElements.define('ae-toast', AeToast);
}

// Expose the API
export {
  AeToast,
  showToast,
  createToastHelpers
};