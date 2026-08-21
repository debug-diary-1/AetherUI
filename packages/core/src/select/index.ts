import { AeSelect } from './ae-select';
export { AeSelect };
export type { SelectOption } from './ae-select';

export function defineAeSelect() {
  if (!customElements.get('ae-select')) {
    customElements.define('ae-select', AeSelect);
  }
}
