import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { componentConfigs, categories, type ComponentConfig } from '../data/component-configs';

@customElement('pg-sidebar')
export class PgSidebar extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background: var(--pg-bg-secondary);
      border-right: 1px solid var(--pg-border);
      overflow-y: auto;
      padding: 1rem;
      position: relative;
    }

    .section {
      margin-bottom: 1rem;
    }

    .section-title {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--pg-text-muted);
      margin-bottom: 0.5rem;
      padding: 0 0.5rem;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .item {
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.8125rem;
      transition: all 0.15s ease;
      border: 1px solid transparent;
    }

    .item:hover {
      background: var(--pg-bg-tertiary);
    }

    .item.active {
      background: var(--pg-accent);
      color: white;
    }

    .tag {
      font-size: 0.6875rem;
      color: var(--pg-text-muted);
      font-family: var(--pg-font-mono);
    }

    .item.active .tag {
      color: rgba(255, 255, 255, 0.7);
    }

    .empty {
      padding: 1rem;
      text-align: center;
      color: var(--pg-text-muted);
      font-size: 0.8125rem;
    }
  `;

  @property() selected = '';
  @property() searchQuery = '';

  private _filteredByCategory(category: string): ComponentConfig[] {
    const q = this.searchQuery.toLowerCase();
    return componentConfigs.filter(
      (c) =>
        c.category === category &&
        (!q ||
          c.name.toLowerCase().includes(q) ||
          c.tag.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)),
    );
  }

  private _onClick(e: Event) {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-component]');
    if (!target) return;
    const name = target.dataset.component!;
    this.dispatchEvent(
      new CustomEvent('pg-component-select', {
        bubbles: true,
        composed: true,
        detail: { name },
      }),
    );
  }

  render() {
    const hasResults = categories.some((cat) => this._filteredByCategory(cat).length > 0);

    if (!hasResults) {
      return html`<div class="empty">No components match "${this.searchQuery}"</div>`;
    }

    return html`
      <div @click=${this._onClick}>
        ${categories.map((category) => {
          const components = this._filteredByCategory(category);
          if (components.length === 0) return null;
          return html`
            <div class="section">
              <div class="section-title">${category}</div>
              <div class="list">
                ${components.map(
                  (c) => html`
                    <div
                      class="item ${c.name === this.selected ? 'active' : ''}"
                      data-component="${c.name}"
                    >
                      ${c.name}
                      <span class="tag">${c.tag}</span>
                    </div>
                  `,
                )}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
