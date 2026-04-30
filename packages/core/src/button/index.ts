import { AeButton } from './ae-button';
export { AeButton };
export { buttonStyles } from './styles';

/**
 * Register the button component with the CustomElements registry
 *
 * @example
 * ```ts
 * import { defineAeButton } from '@aetherui/core';
 *
 * defineAeButton(); // Now <ae-button> is available
 * ```
 */
export function defineAeButton(): void {
  if (!customElements.get('ae-button')) {
    customElements.define('ae-button', AeButton);
  }
}

// Export types
export type { AeButton as AeButtonElement };

// Define button event types for TypeScript users
export interface AeButtonClickEvent extends CustomEvent {
  detail: {
    sourceEvent: Event;
  };
}
