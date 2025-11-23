export { AeProgress } from './ae-progress';

export function defineAeProgress() {
  if (!customElements.get('ae-progress')) {
    customElements.define('ae-progress', AeProgress);
  }
}
