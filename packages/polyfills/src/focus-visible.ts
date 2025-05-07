// Basic polyfill for :focus-visible
export function polyfillFocusVisible() {
  if ('focusVisible' in document.documentElement.style) {
    return;
  }

  // Track whether the user is using keyboard navigation
  let hadKeyboardEvent = false;
  
  const keyboardModalityWhitelist = [
    'Tab',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Enter',
    'Space',
    'Escape',
    'Home',
    'End',
    'PageUp',
    'PageDown',
  ];

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (keyboardModalityWhitelist.includes(e.key)) {
      hadKeyboardEvent = true;
    }
  }, true);

  document.addEventListener('mousedown', () => {
    hadKeyboardEvent = false;
  }, true);

  document.addEventListener('focusin', (e: FocusEvent) => {
    if (hadKeyboardEvent && e.target instanceof HTMLElement) {
      e.target.classList.add('focus-visible');
    }
  });

  document.addEventListener('focusout', (e: FocusEvent) => {
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove('focus-visible');
    }
  });
} 