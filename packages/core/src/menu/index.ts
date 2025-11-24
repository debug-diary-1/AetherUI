import { AeMenu } from './ae-menu';
import { AeMenuItem } from './ae-menu-item';
import { AeMenuDivider } from './ae-menu-divider';
export { AeMenu, AeMenuItem, AeMenuDivider };

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
