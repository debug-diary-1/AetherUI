import { LitElement, html } from 'lit';
import { customElement } from '../internal/custom-element';
import { menuStyles } from './styles';

/**
 * A menu container component for grouping menu items.
 *
 * @element ae-menu
 *
 * @slot - The menu items (ae-menu-item elements)
 *
 * @csspart base - The component's base wrapper
 *
 * @example
 * ```html
 * <ae-menu>
 *   <ae-menu-item>Edit</ae-menu-item>
 *   <ae-menu-item>Copy</ae-menu-item>
 *   <ae-menu-divider></ae-menu-divider>
 *   <ae-menu-item>Delete</ae-menu-item>
 * </ae-menu>
 * ```
 */
@customElement('ae-menu')
export class AeMenu extends LitElement {
  static styles = menuStyles;

  render() {
    return html`
      <div part="base" class="menu-base" role="menu">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-menu': AeMenu;
  }
}
