import { AeInput } from './ae-input';
export { AeInput };

export function defineAeInput() {
  if (!customElements.get('ae-input')) {
    customElements.define('ae-input', AeInput);
  }
}
