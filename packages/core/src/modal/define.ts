import { AeModal } from './ae-modal';

export function defineAeModal() {
  if (!customElements.get('ae-modal')) {
    customElements.define('ae-modal', AeModal);
  }
} 