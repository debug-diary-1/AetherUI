import { AeModal } from './ae-modal';
import { modalStyles } from './styles';

export { AeModal, modalStyles };

/**
 * Register the modal component with the CustomElements registry
 * 
 * @example
 * ```ts
 * import { defineAeModal } from '@aetherui/core';
 * 
 * defineAeModal(); // Now <ae-modal> is available
 * ```
 */
export function defineAeModal(): void {
  if (!customElements.get('ae-modal')) {
    customElements.define('ae-modal', AeModal);
  }
}

export type { AeModal as AeModalElement };