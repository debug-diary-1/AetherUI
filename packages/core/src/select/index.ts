export { AeSelect } from './ae-select';

export function defineAeSelect() {
  if (!customElements.get('ae-select')) {
    customElements.define('ae-select', AeSelect);
  }
}
