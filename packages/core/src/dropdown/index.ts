import { AeDropdown, AeMenuItem, AeMenuSeparator } from './ae-dropdown';
import { dropdownStyles } from './styles';

export { AeDropdown, AeMenuItem, AeMenuSeparator, dropdownStyles };

/**
 * Register all dropdown-related components with the CustomElements registry
 * 
 * @example
 * ```ts
 * import { defineAeDropdown } from '@aetherui/core';
 * 
 * defineAeDropdown(); // Now <ae-dropdown>, <ae-menu-item>, and <ae-menu-separator> are available
 * ```
 */
export function defineAeDropdown(): void {
  if (!customElements.get('ae-dropdown')) {
    customElements.define('ae-dropdown', AeDropdown);
  }
  
  if (!customElements.get('ae-menu-item')) {
    customElements.define('ae-menu-item', AeMenuItem);
  }
  
  if (!customElements.get('ae-menu-separator')) {
    customElements.define('ae-menu-separator', AeMenuSeparator);
  }
} 