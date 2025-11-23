export { AePopover } from './ae-popover';

export function defineAePopover() {
  if (!customElements.get('ae-popover')) {
    customElements.define('ae-popover', AePopover);
  }
}
