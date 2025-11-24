import { AeSwitch } from './ae-switch';
export { AeSwitch };

export function defineAeSwitch() {
  if (!customElements.get('ae-switch')) {
    customElements.define('ae-switch', AeSwitch);
  }
}
