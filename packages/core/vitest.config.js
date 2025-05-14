import { defineConfig } from 'vitest/config';

// Debugging createTreeWalker mockup
if (typeof document !== 'undefined') {
  document.createTreeWalker = function(root, whatToShow, filter) {
    return {
      root,
      currentNode: root,
      whatToShow,
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

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      './test-setup.js', 
      '../../vitest.dom-setup.js',
    ],
    environmentOptions: {
      jsdom: {
        customResourceLoader: {
          /**
           * Custom implementation of createTreeWalker for jsdom
           * This can be needed by lit-html
           */
          onAfterExecute: (window) => {
            if (!window.document.createTreeWalker) {
              window.document.createTreeWalker = function(root, whatToShow, filter) {
                return {
                  root,
                  currentNode: root,
                  whatToShow,
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
          }
        }
      }
    },
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**'
    ],
    reporters: ['verbose'],
    passWithNoTests: true
  }
});