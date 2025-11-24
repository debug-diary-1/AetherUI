import { AeBreadcrumb } from './ae-breadcrumb';
import { AeBreadcrumbItem } from './ae-breadcrumb-item';
export { AeBreadcrumb, AeBreadcrumbItem };

export function defineAeBreadcrumb() {
  if (!customElements.get('ae-breadcrumb')) {
    customElements.define('ae-breadcrumb', AeBreadcrumb);
  }
  if (!customElements.get('ae-breadcrumb-item')) {
    customElements.define('ae-breadcrumb-item', AeBreadcrumbItem);
  }
}
