export * from './ae-toast';
export * from './toast-manager';
export * from './api';

// Define function to register the custom element once
export const defineAeToast = () => {
  if (!customElements.get('ae-toast')) {
    // The element will be defined when the file is imported
    import('./ae-toast');
  }
};