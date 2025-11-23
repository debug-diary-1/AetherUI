import { AeDropdown, AeDropdownItem, AeMenuSeparator, AeMenuSection } from './ae-dropdown';
import { dropdownStyles } from './styles';

export { AeDropdown, AeDropdownItem, AeMenuSeparator, AeMenuSection, dropdownStyles };

/**
 * Register all dropdown-related components with the CustomElements registry
 *
 * @example
 * ```ts
 * import { defineAeDropdown } from '@aetherui/core';
 *
 * defineAeDropdown(); // Now <ae-dropdown>, <ae-dropdown-item>, <ae-menu-separator>, and <ae-menu-section> are available
 * ```
 */
export function defineAeDropdown(): void {
  if (!customElements.get('ae-dropdown')) {
    customElements.define('ae-dropdown', AeDropdown);
  }

  if (!customElements.get('ae-dropdown-item')) {
    customElements.define('ae-dropdown-item', AeDropdownItem);
  }

  if (!customElements.get('ae-menu-separator')) {
    customElements.define('ae-menu-separator', AeMenuSeparator);
  }

  if (!customElements.get('ae-menu-section')) {
    customElements.define('ae-menu-section', AeMenuSection);
  }
} 