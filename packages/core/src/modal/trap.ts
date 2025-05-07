/**
 * Focus trap utility for modal dialogs
 * Keeps focus within the modal when open and restores focus when closed
 */

// Store the element to return focus to when the modal closes
let previouslyFocusedElement: HTMLElement | null = null;

/**
 * Stores the current active element to return focus to when the modal closes
 */
export function savePreviousFocus() {
  previouslyFocusedElement = document.activeElement as HTMLElement;
}

/**
 * Restores focus to the previously focused element before the modal was opened
 */
export function restorePreviousFocus() {
  if (previouslyFocusedElement && previouslyFocusedElement.focus) {
    previouslyFocusedElement.focus();
  }
}

/**
 * Sets up a focus trap that keeps tab navigation within the specified container
 * @param container - The element to trap focus within
 * @param initialFocusSelector - Optional selector for element to focus on first
 */
export function setupFocusTrap(container: HTMLElement, initialFocusSelector?: string) {
  // Store all focusable elements in the container
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) {
    return;
  }

  const firstFocusableElement = focusableElements[0] as HTMLElement;
  const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  // Focus the initial element or the first focusable element
  if (initialFocusSelector) {
    const initialFocusElement = container.querySelector(initialFocusSelector) as HTMLElement;
    if (initialFocusElement && initialFocusElement.focus) {
      initialFocusElement.focus();
    } else {
      firstFocusableElement.focus();
    }
  } else {
    firstFocusableElement.focus();
  }

  // Handle tab key to trap focus
  const handleTrapFocus = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    // Shift + Tab keys
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    } 
    // Tab key
    else {
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  };

  // Attach event listener
  container.addEventListener('keydown', handleTrapFocus);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTrapFocus);
  };
} 