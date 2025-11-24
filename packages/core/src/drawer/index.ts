import { AeDrawer } from './ae-drawer';
export { AeDrawer };

export function defineAeDrawer() {
  if (!customElements.get('ae-drawer')) {
    customElements.define('ae-drawer', AeDrawer);
  }
}
