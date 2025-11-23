export { AeSpinner } from './ae-spinner';

export function defineAeSpinner() {
  if (!customElements.get('ae-spinner')) {
    customElements.define('ae-spinner', AeSpinner);
  }
}
