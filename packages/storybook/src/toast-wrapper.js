/**
 * Toast wrapper for Storybook to avoid dynamic imports
 */
import { AeToast, defineAeToast } from '@aetherui/core/toast';

// Register component if not already registered
defineAeToast();

// Create our own helper functions for Storybook
export function showToast(options) {
  // Create and show a toast element
  const toast = new AeToast();

  // Apply all options to the toast element
  if (options.variant) toast.variant = options.variant;
  if (options.duration !== undefined) toast.duration = options.duration;
  if (options.placement) toast.placement = options.placement;
  if (options.pauseOnHover !== undefined) toast.pauseOnHover = options.pauseOnHover;

  // Handle message content - support HTML content
  if (options.message) {
    // For HTML content, add it to the light DOM
    if (options.message.includes('<')) {
      // Clear the message property so it doesn't interfere
      toast.message = '';

      // Create a container for the HTML content
      const container = document.createElement('div');
      container.innerHTML = options.message.trim();

      // Append the HTML content to the toast
      toast.appendChild(container.firstElementChild || container);
    } else {
      // Plain text message
      toast.message = options.message;
    }
  }

  // Add to DOM
  document.body.appendChild(toast);

  // Return the toast element in case we need to manipulate it
  return toast;
}

// Create variant helpers
export function createToastHelpers() {
  return {
    info(message, options = {}) {
      showToast({ ...options, message, variant: 'info' });
    },
    success(message, options = {}) {
      showToast({ ...options, message, variant: 'success' });
    },
    warning(message, options = {}) {
      showToast({ ...options, message, variant: 'warning' });
    },
    error(message, options = {}) {
      showToast({ ...options, message, variant: 'error' });
    },

    // Helper for HTML content
    html(htmlContent, options = {}) {
      showToast({ ...options, message: htmlContent });
    },
  };
}

// Export AeToast component
export { AeToast };
