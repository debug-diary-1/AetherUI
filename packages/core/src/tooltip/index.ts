export * from './ae-tooltip.js';
import { AeTooltip } from './ae-tooltip.js';

/**
 * Registers the ae-tooltip element
 */
export function defineAeTooltip() {
  if (!customElements.get('ae-tooltip')) {
    customElements.define('ae-tooltip', AeTooltip);
  }
}
