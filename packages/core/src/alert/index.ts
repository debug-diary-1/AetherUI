import { AeAlert } from './ae-alert';
export * from './ae-alert';

/** Register the alert synchronously; repeated calls reuse the registered element. */
export function defineAeAlert(): void {
  if (!customElements.get('ae-alert')) customElements.define('ae-alert', AeAlert);
}
