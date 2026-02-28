import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { highlightCode } from '../utils/syntax-highlighter';
import type { GeneratedCode } from '../utils/code-generator';
import prismTheme from '../styles/prism-theme.css?inline';

export type CodeTab = 'css' | 'html' | 'react' | 'vue' | 'full';

const tabLangs: Record<CodeTab, string> = {
  css: 'css',
  html: 'html',
  react: 'jsx',
  vue: 'html',
  full: 'html',
};

@customElement('pg-code-panel')
export class PgCodePanel extends LitElement {
  static styles = [
    unsafeCSS(prismTheme),
    css`
      :host {
        display: flex;
        flex-direction: column;
        background: #0d0d0d;
        border-top: 1px solid var(--pg-border);
        overflow: hidden;
        position: relative;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid var(--pg-border);
        background: #0d0d0d;
        flex-shrink: 0;
      }

      .tabs {
        display: flex;
        gap: 0.75rem;
      }

      .tab {
        font-size: 0.75rem;
        color: var(--pg-text-muted);
        cursor: pointer;
        padding: 0.25rem 0.25rem;
        border: none;
        background: none;
        font-family: inherit;
        transition: color 0.15s;
      }
      .tab:hover { color: var(--pg-text); }
      .tab.active { color: var(--pg-accent); }

      .copy-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.375rem;
        border-radius: 0.25rem;
        background: transparent;
        border: 1px solid var(--pg-border);
        color: var(--pg-text-muted);
        cursor: pointer;
        transition: all 0.15s;
      }
      .copy-btn:hover {
        color: var(--pg-text);
        background: var(--pg-bg-tertiary);
      }
      .copy-btn svg { width: 14px; height: 14px; }

      pre {
        flex: 1;
        overflow: auto;
        padding: 1rem;
        margin: 0;
        font-family: var(--pg-font-mono, 'JetBrains Mono', monospace);
        font-size: 0.8125rem;
        line-height: 1.6;
        color: #e5e5e5;
      }
    `,
  ];

  @property() activeTab: CodeTab = 'css';
  @property({ attribute: false }) code?: GeneratedCode;

  private _tabs: CodeTab[] = ['css', 'html', 'react', 'vue', 'full'];

  private _setTab(tab: CodeTab) {
    this.activeTab = tab;
    this.dispatchEvent(new CustomEvent('pg-code-tab-change', {
      bubbles: true, composed: true, detail: { tab },
    }));
  }

  private async _copy() {
    const text = this._getCode();
    try {
      await navigator.clipboard.writeText(text);
      this.dispatchEvent(new CustomEvent('pg-toast-show', {
        bubbles: true, composed: true, detail: { message: 'Copied to clipboard!' },
      }));
    } catch {
      this.dispatchEvent(new CustomEvent('pg-toast-show', {
        bubbles: true, composed: true, detail: { message: 'Failed to copy' },
      }));
    }
  }

  private _getCode(): string {
    if (!this.code) return '';
    switch (this.activeTab) {
      case 'html': return this.code.html;
      case 'css': return this.code.css;
      case 'react': return this.code.react;
      case 'vue': return this.code.vue;
      case 'full': return this.code.fullExample;
    }
  }

  private _getTabLabel(tab: CodeTab): string {
    switch (tab) {
      case 'css': return 'CSS';
      case 'html': return 'HTML';
      case 'react': return 'React';
      case 'vue': return 'Vue';
      case 'full': return 'Full Example';
    }
  }

  render() {
    const code = this._getCode();
    const lang = tabLangs[this.activeTab];
    const highlighted = code ? highlightCode(code, lang) : '';

    return html`
      <div class="header">
        <div class="tabs">
          ${this._tabs.map(tab => html`
            <button class="tab ${this.activeTab === tab ? 'active' : ''}"
                    @click=${() => this._setTab(tab)}>
              ${this._getTabLabel(tab)}
            </button>
          `)}
        </div>
        <button class="copy-btn" title="Copy code" @click=${this._copy}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
      </div>
      <pre>${unsafeHTML(highlighted)}</pre>
    `;
  }
}
