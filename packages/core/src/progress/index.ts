import { AeProgress } from './ae-progress';
export { AeProgress };

export function defineAeProgress() {
  if (!customElements.get('ae-progress')) {
    customElements.define('ae-progress', AeProgress);
  }
}
