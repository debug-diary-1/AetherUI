export * from './ae-button';

import { AeButton } from './ae-button';

// Define function to register the button component
export const defineAeButton = () => {
  if (!customElements.get('ae-button')) {
    customElements.define('ae-button', AeButton);
  }
};

// Export types
export type { AeButton as AeButtonElement } from './ae-button'; 