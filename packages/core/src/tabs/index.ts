import { AeTabs } from './ae-tabs';
import { AeTab } from './ae-tab';
import { AeTabPanel } from './ae-tab-panel';
import { tabStyles } from './styles';

export { AeTabs, AeTab, AeTabPanel, tabStyles };

/**
 * Register all tabs components with the CustomElements registry
 * 
 * @example
 * ```ts
 * import { defineAeTabs } from '@aetherui/core';
 * 
 * defineAeTabs(); // Now <ae-tabs>, <ae-tab>, and <ae-tab-panel> are available
 * ```
 */
export function defineAeTabs(): void {
  if (!customElements.get('ae-tabs')) {
    customElements.define('ae-tabs', AeTabs);
  }
  
  if (!customElements.get('ae-tab')) {
    customElements.define('ae-tab', AeTab);
  }
  
  if (!customElements.get('ae-tab-panel')) {
    customElements.define('ae-tab-panel', AeTabPanel);
  }
} 