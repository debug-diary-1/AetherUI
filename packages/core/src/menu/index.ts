export { AeMenu } from './ae-menu';
export { AeMenuItem } from './ae-menu-item';
export { AeMenuDivider } from './ae-menu-divider';

export function defineAeMenu() {
  if (!customElements.get('ae-menu')) {
    customElements.define('ae-menu', AeMenu);
  }
  if (!customElements.get('ae-menu-item')) {
    customElements.define('ae-menu-item', AeMenuItem);
  }
  if (!customElements.get('ae-menu-divider')) {
    customElements.define('ae-menu-divider', AeMenuDivider);
  }
}
