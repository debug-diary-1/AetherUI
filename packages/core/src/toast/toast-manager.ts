import { toastContainerStyles } from './styles';
import { ToastPlacement } from './ae-toast';
import './ae-toast';

/**
 * Toast options interface
 */
export interface ToastOptions {
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  placement?: ToastPlacement;
  pauseOnHover?: boolean;
}

/**
 * Toast Manager class - singleton that handles creating and managing toast elements
 */
export class ToastManager {
  private static instance: ToastManager;
  private containers: Map<ToastPlacement, HTMLElement> = new Map();
  private styleSheet: HTMLStyleElement;

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    // Create and add stylesheet
    this.styleSheet = document.createElement('style');
    this.styleSheet.textContent = toastContainerStyles.toString();
    document.head.appendChild(this.styleSheet);
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  /**
   * Show a toast with the provided options
   */
  public show(options: ToastOptions): void {
    const {
      message,
      variant = 'info',
      duration = 5000,
      placement = 'bottom-right',
      pauseOnHover = true
    } = options;

    // Get or create container for this placement
    const container = this.getContainer(placement);

    // Create toast element
    const toast = document.createElement('ae-toast');
    toast.message = message;
    toast.variant = variant;
    toast.duration = duration;
    toast.placement = placement;
    toast.pauseOnHover = pauseOnHover;

    // Listen for close event to remove the toast
    toast.addEventListener('ae-close', () => {
      // Wait for exit animation to complete
      toast.addEventListener('animationend', () => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, { once: true });
    });

    // Add toast to container
    container.appendChild(toast);
  }

  /**
   * Get or create a container for the specified placement
   */
  private getContainer(placement: ToastPlacement): HTMLElement {
    if (this.containers.has(placement)) {
      return this.containers.get(placement)!;
    }

    // Create a new container
    const container = document.createElement('div');
    container.className = 'ae-toast-container';
    container.setAttribute('data-placement', placement);
    document.body.appendChild(container);

    // Store for future use
    this.containers.set(placement, container);
    return container;
  }

  /**
   * Remove all toasts and containers
   */
  public clearAll(): void {
    this.containers.forEach(container => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    });
    this.containers.clear();
  }
}

/**
 * Convenience function to show a toast
 */
export function showToast(options: ToastOptions): void {
  ToastManager.getInstance().show(options);
}