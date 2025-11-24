import { AePagination } from './ae-pagination';
export { AePagination };

export function defineAePagination() {
  if (!customElements.get('ae-pagination')) {
    customElements.define('ae-pagination', AePagination);
  }
}
