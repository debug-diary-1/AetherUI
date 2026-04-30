export * from './ae-alert';

// Define function to register the custom element once
export const defineAeAlert = () => {
  if (!customElements.get('ae-alert')) {
    // The element will be defined when the file is imported
    import('./ae-alert');
  }
};
