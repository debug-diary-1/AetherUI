import { AeSelect } from './ae-select';
export { AeSelect };

export function defineAeSelect() {
  if (!customElements.get('ae-select')) {
    customElements.define('ae-select', AeSelect);
  }
}
