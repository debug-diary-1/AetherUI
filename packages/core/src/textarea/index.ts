export { AeTextarea } from './ae-textarea';

export function defineAeTextarea() {
  if (!customElements.get('ae-textarea')) {
    customElements.define('ae-textarea', AeTextarea);
  }
}
