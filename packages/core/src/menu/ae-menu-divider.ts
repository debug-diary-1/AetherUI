import { LitElement, html } from 'lit';
import { customElement } from '../internal/custom-element';
import { menuDividerStyles } from './divider-styles';

/**
 * A menu divider component for separating menu items.
 *
 * @element ae-menu-divider
 *
 * @csspart base - The component's base wrapper
 *
 * @example
 * ```html
 * <ae-menu>
 *   <ae-menu-item>Item 1</ae-menu-item>
 *   <ae-menu-divider></ae-menu-divider>
 *   <ae-menu-item>Item 2</ae-menu-item>
 * </ae-menu>
 * ```
 */
@customElement('ae-menu-divider')
export class AeMenuDivider extends LitElement {
  static styles = menuDividerStyles;

  render() {
    return html` <div part="base" class="menu-divider" role="separator"></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-menu-divider': AeMenuDivider;
  }
}
