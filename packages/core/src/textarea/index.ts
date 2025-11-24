import { AeTextarea } from './ae-textarea';
export { AeTextarea };

export function defineAeTextarea() {
  if (!customElements.get('ae-textarea')) {
    customElements.define('ae-textarea', AeTextarea);
  }
}
