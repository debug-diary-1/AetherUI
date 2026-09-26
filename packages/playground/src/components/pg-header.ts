import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DeviceSize } from './pg-device-frame';

@customElement('pg-header')
export class PgHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      background: var(--pg-bg-secondary);
      border-bottom: 1px solid var(--pg-border);
      height: 60px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 600;
      font-size: 1.125rem;
    }

    .logo svg {
      width: 28px;
      height: 28px;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .search {
      padding: 0.4rem 0.75rem;
      background: var(--pg-bg-tertiary);
      border: 1px solid var(--pg-border);
      border-radius: 0.375rem;
      color: var(--pg-text);
      font-size: 0.8125rem;
      font-family: inherit;
      width: 180px;
      outline: none;
    }
    .search:focus {
      border-color: var(--pg-accent);
    }
    .search::placeholder {
      color: var(--pg-text-muted);
    }

    .device-btns {
      display: flex;
      gap: 2px;
      background: var(--pg-bg-tertiary);
      border-radius: 0.375rem;
      padding: 2px;
    }

    .device-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 28px;
      border: none;
      background: transparent;
      color: var(--pg-text-muted);
      cursor: pointer;
      border-radius: 0.25rem;
      transition: all 0.15s ease;
    }
    .device-btn:hover {
      color: var(--pg-text);
    }
    .device-btn.active {
      background: var(--pg-accent);
      color: white;
    }
    .device-btn svg {
      width: 16px;
      height: 16px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      border: 1px solid transparent;
      font-family: inherit;
    }

    a.btn {
      text-decoration: none;
    }

    .btn-secondary {
      background: var(--pg-bg-tertiary);
      color: var(--pg-text);
      border-color: var(--pg-border);
    }
    .btn-secondary:hover {
      background: var(--pg-border);
    }

    .btn-primary {
      background: var(--pg-accent);
      color: white;
    }
    .btn-primary:hover {
      background: var(--pg-accent-hover);
    }

    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 0.375rem;
      background: var(--pg-bg-tertiary);
      border: 1px solid var(--pg-border);
      cursor: pointer;
      color: var(--pg-text);
      transition: all 0.15s ease;
    }
    .icon-btn:hover {
      background: var(--pg-border);
    }
    .icon-btn svg {
      width: 18px;
      height: 18px;
    }
  `;

  @property() searchQuery = '';
  @property() deviceSize: DeviceSize = 'full';
  @property({ type: Boolean }) isDarkMode = true;

  private _searchTimeout?: ReturnType<typeof setTimeout>;

  private _onSearchInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('pg-search', {
          bubbles: true,
          composed: true,
          detail: { query: val },
        }),
      );
    }, 150);
  }

  private _setDevice(size: DeviceSize) {
    this.dispatchEvent(
      new CustomEvent('pg-device-change', {
        bubbles: true,
        composed: true,
        detail: { size },
      }),
    );
  }

  private _toggleTheme() {
    this.dispatchEvent(
      new CustomEvent('pg-theme-toggle', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _copyCSS() {
    this.dispatchEvent(new CustomEvent('pg-copy-css', { bubbles: true, composed: true }));
  }

  private _export() {
    this.dispatchEvent(new CustomEvent('pg-export', { bubbles: true, composed: true }));
  }

  private _reset() {
    this.dispatchEvent(new CustomEvent('pg-reset', { bubbles: true, composed: true }));
  }

  render() {
    const d = this.deviceSize;
    return html`
      <div class="logo">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="aeG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#6366f1" />
              <stop offset="100%" stop-color="#8b5cf6" />
            </linearGradient>
          </defs>
          <g fill="url(#aeG)">
            <path
              d="M 4 25 Q 3 25 3 24 Q 3 23.5 3.5 22.5 L 11 7 Q 11.5 6 12.5 6 Q 13.5 6 14 7 L 21.5 22.5 Q 22 23.5 22 24 Q 22 25 21 25 Q 20 25 19.5 24 L 17.5 19 L 7.5 19 L 5.5 24 Q 5 25 4 25 Z M 9 16 L 16 16 L 12.5 8 Z"
            />
            <path
              d="M 18 11 Q 18 10 19 10 L 28 10 Q 29 10 29 11 Q 29 12 28 12 L 20.5 12 L 20.5 15 L 27 15 Q 28 15 28 16 Q 28 17 27 17 L 20.5 17 L 20.5 20 L 28 20 Q 29 20 29 21 Q 29 22 28 22 L 19 22 Q 18 22 18 21 Z"
            />
            <path
              d="M 3 26 Q 3 25.5 3.5 25.5 L 27 25.5 Q 29 25.5 29 26 Q 29 26.5 27 26.5 L 5 26.5 Q 3 26.5 3 26 Z"
              opacity="0.3"
            />
          </g>
        </svg>
        <span>AetherUI Playground</span>
      </div>

      <div class="actions">
        <input
          class="search"
          type="text"
          placeholder="Search components..."
          .value=${this.searchQuery}
          @input=${this._onSearchInput}
        />

        <div class="device-btns">
          <button
            class="device-btn ${d === 'mobile' ? 'active' : ''}"
            title="Mobile"
            @click=${() => this._setDevice('mobile')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </button>
          <button
            class="device-btn ${d === 'tablet' ? 'active' : ''}"
            title="Tablet"
            @click=${() => this._setDevice('tablet')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </button>
          <button
            class="device-btn ${d === 'desktop' ? 'active' : ''}"
            title="Desktop"
            @click=${() => this._setDevice('desktop')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </button>
          <button
            class="device-btn ${d === 'full' ? 'active' : ''}"
            title="Full width"
            @click=${() => this._setDevice('full')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        </div>

        <button class="icon-btn" title="Toggle theme" @click=${this._toggleTheme}>
          ${
            this.isDarkMode
              ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>`
              : html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>`
          }
        </button>

        <a class="btn btn-secondary" href="webmcp.html">WebMCP demo</a>
        <button class="btn btn-secondary" @click=${this._reset}>Reset</button>
        <button class="btn btn-secondary" @click=${this._copyCSS}>Copy CSS</button>
        <button class="btn btn-primary" @click=${this._export}>Export</button>
      </div>
    `;
  }
}
