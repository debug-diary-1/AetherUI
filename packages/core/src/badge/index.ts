import { AeBadge } from './ae-badge';
export { AeBadge };

export function defineAeBadge() {
  if (!customElements.get('ae-badge')) {
    customElements.define('ae-badge', AeBadge);
  }
}
