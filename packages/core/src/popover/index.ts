import { AePopover } from './ae-popover';
export { AePopover };

export function defineAePopover() {
  if (!customElements.get('ae-popover')) {
    customElements.define('ae-popover', AePopover);
  }
}
