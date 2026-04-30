import { showToast as showToastBase, ToastOptions } from './toast-manager';

/**
 * Helper type for toast options without the variant property
 */
export type ToastOptionsWithoutVariant = Omit<ToastOptions, 'variant' | 'message'>;

/**
 * Convenience helper function to show a toast
 */
export function showToast(options: ToastOptions): void {
  // Check if we're in test mode with a mock
  if (
    typeof window !== 'undefined' &&
    (window as unknown as Record<string, unknown>).__mockToastManager
  ) {
    (
      (window as unknown as Record<string, unknown>).__mockToastManager as {
        show: (opts: ToastOptions) => void;
      }
    ).show(options);
  } else {
    showToastBase(options);
  }
}

/**
 * Creates toast helper functions for each variant
 */
export function createToastHelpers() {
  return {
    /**
     * Show an info toast
     */
    info(message: string, options: ToastOptionsWithoutVariant = {}): void {
      showToast({ ...options, message, variant: 'info' });
    },

    /**
     * Show a success toast
     */
    success(message: string, options: ToastOptionsWithoutVariant = {}): void {
      showToast({ ...options, message, variant: 'success' });
    },

    /**
     * Show a warning toast
     */
    warning(message: string, options: ToastOptionsWithoutVariant = {}): void {
      showToast({ ...options, message, variant: 'warning' });
    },

    /**
     * Show an error toast
     */
    error(message: string, options: ToastOptionsWithoutVariant = {}): void {
      showToast({ ...options, message, variant: 'error' });
    },
  };
}
