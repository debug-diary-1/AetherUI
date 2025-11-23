import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { breadcrumbItemStyles } from './item-styles';

/**
 * A breadcrumb item component to be used within ae-breadcrumb.
 *
 * @element ae-breadcrumb-item
 *
 * @property {string} href - The URL to navigate to
 * @property {boolean} current - Whether this is the current/active page
 *
 * @slot - The breadcrumb item content
 *
 * @csspart base - The component's base wrapper (list item)
 * @csspart link - The link element
 * @csspart separator - The separator element
 *
 * @example
 * ```html
 * <ae-breadcrumb-item href="/">Home</ae-breadcrumb-item>
 * <ae-breadcrumb-item href="/products">Products</ae-breadcrumb-item>
 * <ae-breadcrumb-item current>Current Page</ae-breadcrumb-item>
 * ```
 */
@customElement('ae-breadcrumb-item')
export class AeBreadcrumbItem extends LitElement {
  static styles = breadcrumbItemStyles;

  @property({ type: String })
  accessor href = '';

  @property({ type: Boolean, reflect: true })
  accessor current = false;

  connectedCallback() {
    super.connectedCallback();
    // Automatically set current if this is the last item without href
    if (!this.href) {
      this.current = true;
    }
  }

  render() {
    const separator = this.getRootNode() instanceof ShadowRoot
      ? (this.getRootNode() as ShadowRoot).host.getAttribute('separator') || '/'
      : '/';

    return html`
      <li part="base" class="breadcrumb-item" ?aria-current="${this.current}">
        ${this.href && !this.current ? html`
          <a part="link" class="breadcrumb-link" href="${this.href}">
            <slot></slot>
          </a>
        ` : html`
          <span part="link" class="breadcrumb-text">
            <slot></slot>
          </span>
        `}
        ${!this.current ? html`
          <span part="separator" class="breadcrumb-separator" aria-hidden="true">${separator}</span>
        ` : ''}
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-breadcrumb-item': AeBreadcrumbItem;
  }
}
