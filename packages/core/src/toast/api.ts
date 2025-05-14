import { showToast as showToastBase, ToastOptions } from './toast-manager';

/**
 * Helper type that omits the variant from toast options
 */
export type ToastOptionsWithoutVariant = Omit<ToastOptions, 'variant'>;

/**
 * Convenience helper function to show a toast
 */
export function showToast(options: ToastOptions): void {
  showToastBase(options);
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
    }
  };
}