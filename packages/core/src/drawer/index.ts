export { AeDrawer } from './ae-drawer';

export function defineAeDrawer() {
  if (!customElements.get('ae-drawer')) {
    customElements.define('ae-drawer', AeDrawer);
  }
}
