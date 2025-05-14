/**
 * This module provides polyfills specifically for lit-html compatibility in tests
 * It's designed to be imported directly in component test files that use lit-html
 */

// Ensure document.createTreeWalker is available and working properly
if (typeof document !== 'undefined' && (!document.createTreeWalker || 
   (document.createTreeWalker && typeof document.createTreeWalker !== 'function'))) {
  document.createTreeWalker = function(root: any, whatToShow: number, filter: any) {
    return {
      root,
      currentNode: root,
      whatToShow: whatToShow || -1, // NodeFilter.SHOW_ALL
      filter,
      nextNode: () => null,
      previousNode: () => null,
      parentNode: () => null,
      firstChild: () => null,
      lastChild: () => null,
      nextSibling: () => null,
      previousSibling: () => null
    };
  };
}

// Ensure window has required properties
if (typeof window !== 'undefined') {
  // Make sure location exists for hrefs
  if (!window.location) {
    (window as any).location = { href: 'http://localhost/' };
  }
}

// Add necessary NodeFilter constants
if (typeof NodeFilter === 'undefined') {
  (window as any).NodeFilter = {
    SHOW_ALL: -1,
    SHOW_ELEMENT: 1,
    FILTER_ACCEPT: 1,
    FILTER_REJECT: 2,
    FILTER_SKIP: 3
  };
}