import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { breadcrumbStyles } from './styles';

/**
 * A breadcrumb navigation component for showing the current page's location in the site hierarchy.
 *
 * @element ae-breadcrumb
 *
 * @property {string} separator - The separator character or icon between items (default: '/')
 *
 * @slot - The breadcrumb items (ae-breadcrumb-item elements)
 *
 * @csspart base - The component's base wrapper
 * @csspart list - The breadcrumb list element
 *
 * @example
 * ```html
 * <ae-breadcrumb>
 *   <ae-breadcrumb-item href="/">Home</ae-breadcrumb-item>
 *   <ae-breadcrumb-item href="/products">Products</ae-breadcrumb-item>
 *   <ae-breadcrumb-item>Electronics</ae-breadcrumb-item>
 * </ae-breadcrumb>
 * ```
 */
@customElement('ae-breadcrumb')
export class AeBreadcrumb extends LitElement {
  static styles = breadcrumbStyles;

  @property({ type: String })
  accessor separator = '/';

  render() {
    return html`
      <nav part="base" class="breadcrumb-base" aria-label="Breadcrumb">
        <ol part="list" class="breadcrumb-list">
          <slot></slot>
        </ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-breadcrumb': AeBreadcrumb;
  }
}
