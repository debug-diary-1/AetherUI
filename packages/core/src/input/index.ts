export { AeInput } from './ae-input';

export function defineAeInput() {
  if (!customElements.get('ae-input')) {
    customElements.define('ae-input', AeInput);
  }
}
