export * from './ae-checkbox';

import { AeCheckbox } from './ae-checkbox';

// Define function to register the checkbox component
export const defineAeCheckbox = () => {
  if (!customElements.get('ae-checkbox')) {
    customElements.define('ae-checkbox', AeCheckbox);
  }
};

// Export types
export type { AeCheckbox as AeCheckboxElement } from './ae-checkbox';
