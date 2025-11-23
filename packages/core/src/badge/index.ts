export { AeBadge } from './ae-badge';

export function defineAeBadge() {
  if (!customElements.get('ae-badge')) {
    customElements.define('ae-badge', AeBadge);
  }
}
