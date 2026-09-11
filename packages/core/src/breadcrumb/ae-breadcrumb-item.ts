import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../internal/custom-element';
import { breadcrumbItemStyles } from './item-styles';

/**
 * A breadcrumb item component to be used within ae-breadcrumb.
 *
 * @element ae-breadcrumb-item
 *
 * @property {string} href - The URL to navigate to
 * @property {boolean} current - Whether this is the current/active page
 * @property {string} ariaLabel - Accessible label for the breadcrumb item link
 *
 * @slot - The breadcrumb item content
 *
 * @csspart base - The component's base wrapper (list item)
 * @csspart link - The link element
 * @csspart separator - The separator element
 *
 * @example
 * ```html
 * <ae-breadcrumb-item href="/" aria-label="Home">Home</ae-breadcrumb-item>
 * <ae-breadcrumb-item href="/products" aria-label="Products">Products</ae-breadcrumb-item>
 * <ae-breadcrumb-item current aria-label="Current Page">Current Page</ae-breadcrumb-item>
 * ```
 */
@customElement('ae-breadcrumb-item')
export class AeBreadcrumbItem extends LitElement {
  static styles = breadcrumbItemStyles;

  @property({ type: String })
  accessor href = '';

  @property({ type: Boolean, reflect: true })
  accessor current = false;

  @property({ type: String, attribute: 'aria-label' })
  accessor ariaLabel = '';

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    // Get separator from parent ae-breadcrumb element
    const parent = this.closest('ae-breadcrumb');
    const separator = parent?.getAttribute('separator') || '/';

    return html`
      <li part="base" class="breadcrumb-item" aria-current="${this.current ? 'page' : nothing}">
        ${
          this.href && !this.current
            ? html`
                <a
                  part="link"
                  class="breadcrumb-link"
                  href="${this.href}"
                  aria-label="${this.ariaLabel || nothing}"
                >
                  <slot></slot>
                </a>
              `
            : html`
                <span part="link" class="breadcrumb-text" aria-label="${this.ariaLabel || nothing}">
                  <slot></slot>
                </span>
              `
        }
        ${
          !this.current
            ? html`
                <span part="separator" class="breadcrumb-separator" aria-hidden="true"
                  >${separator}</span
                >
              `
            : ''
        }
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-breadcrumb-item': AeBreadcrumbItem;
  }
}
