export { AeSwitch } from './ae-switch';

export function defineAeSwitch() {
  if (!customElements.get('ae-switch')) {
    customElements.define('ae-switch', AeSwitch);
  }
}
