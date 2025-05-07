/**
 * Scroll lock utility for modal dialogs
 * Prevents body scrolling when a modal is open
 */

// Store original body styles
let originalBodyStyles: {
  overflow: string;
  paddingRight: string;
} | null = null;

/**
 * Locks body scrolling when a modal is open
 * Adds padding to the body to prevent layout shifts
 */
export function lockBodyScroll() {
  if (originalBodyStyles) {
    // Already locked
    return;
  }

  // Store original styles before modification
  originalBodyStyles = {
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight
  };

  // Measure scrollbar width
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
  // Apply scrollbar width as padding to avoid layout shift
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  
  // Prevent scrolling
  document.body.style.overflow = 'hidden';
}

/**
 * Unlocks body scrolling when a modal is closed
 * Restores the original body styles
 */
export function unlockBodyScroll() {
  if (!originalBodyStyles) {
    // Not locked
    return;
  }

  // Restore original styles
  document.body.style.overflow = originalBodyStyles.overflow;
  document.body.style.paddingRight = originalBodyStyles.paddingRight;
  
  // Reset stored styles
  originalBodyStyles = null;
} 