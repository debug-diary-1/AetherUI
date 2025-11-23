export { AePagination } from './ae-pagination';

export function defineAePagination() {
  if (!customElements.get('ae-pagination')) {
    customElements.define('ae-pagination', AePagination);
  }
}
