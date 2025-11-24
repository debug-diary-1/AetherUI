import { AeSpinner } from './ae-spinner';
export { AeSpinner };

export function defineAeSpinner() {
  if (!customElements.get('ae-spinner')) {
    customElements.define('ae-spinner', AeSpinner);
  }
}
