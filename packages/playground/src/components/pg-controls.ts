import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ComponentConfig, CSSVariable } from '../data/component-configs';

@customElement('pg-controls')
export class PgControls extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background: var(--pg-bg-secondary);
      border-left: 1px solid var(--pg-border);
      overflow: hidden;
      position: relative;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid var(--pg-border);
      flex-shrink: 0;
    }

    .tab {
      flex: 1;
      padding: 0.75rem;
      font-size: 0.8125rem;
      font-weight: 500;
      background: transparent;
      border: none;
      color: var(--pg-text-muted);
      cursor: pointer;
      transition: all 0.15s ease;
      font-family: inherit;
    }
    .tab:hover {
      color: var(--pg-text);
    }
    .tab.active {
      color: var(--pg-accent);
      box-shadow: inset 0 -2px 0 var(--pg-accent);
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .section {
      margin-bottom: 1.25rem;
    }

    .section-title {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--pg-text-muted);
      margin-bottom: 0.75rem;
    }

    .control {
      margin-bottom: 0.875rem;
    }

    .control-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8125rem;
      margin-bottom: 0.375rem;
    }

    .control-value {
      font-family: var(--pg-font-mono);
      font-size: 0.6875rem;
      color: var(--pg-text-muted);
    }

    .color-control {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .color-swatch {
      width: 32px;
      height: 32px;
      border-radius: 0.375rem;
      border: 1px solid var(--pg-border);
      cursor: pointer;
      overflow: hidden;
      flex-shrink: 0;
    }

    .color-swatch input[type='color'] {
      width: 150%;
      height: 150%;
      margin: -25%;
      border: none;
      cursor: pointer;
    }

    .text-input {
      width: 100%;
      padding: 0.375rem 0.5rem;
      background: var(--pg-bg-tertiary);
      border: 1px solid var(--pg-border);
      border-radius: 0.25rem;
      color: var(--pg-text);
      font-size: 0.75rem;
      font-family: var(--pg-font-mono);
      outline: none;
    }
    .text-input:focus {
      border-color: var(--pg-accent);
    }

    .color-text {
      flex: 1;
    }

    input[type='range'] {
      width: 100%;
      -webkit-appearance: none;
      appearance: none;
      height: 4px;
      background: var(--pg-bg-tertiary);
      border-radius: 2px;
      outline: none;
    }

    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--pg-accent);
      cursor: pointer;
    }

    select {
      width: 100%;
      padding: 0.375rem 0.5rem;
      background: var(--pg-bg-tertiary);
      border: 1px solid var(--pg-border);
      border-radius: 0.25rem;
      color: var(--pg-text);
      font-size: 0.8125rem;
      cursor: pointer;
    }

    /* Variant list */
    .variant-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .variant-item {
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.8125rem;
      transition: all 0.15s ease;
      border: 1px solid transparent;
    }
    .variant-item:hover {
      background: var(--pg-bg-tertiary);
    }
    .variant-item.active {
      background: var(--pg-accent);
      color: white;
    }
  `;

  @property({ attribute: false }) config?: ComponentConfig;
  @property({ attribute: false }) cssValues: Record<string, string> = {};
  @property() selectedVariant?: string;
  @property() activeTab: 'style' | 'variants' = 'style';

  private _dispatch(varName: string, value: string) {
    this.dispatchEvent(
      new CustomEvent('pg-control-change', {
        bubbles: true,
        composed: true,
        detail: { name: varName, value },
      }),
    );
  }

  private _selectVariant(name: string | undefined) {
    this.dispatchEvent(
      new CustomEvent('pg-variant-select', {
        bubbles: true,
        composed: true,
        detail: { name },
      }),
    );
  }

  private _renderColorControl(v: CSSVariable) {
    const value = this.cssValues[v.name] || v.default;
    return html`
      <div class="control">
        <div class="control-label">
          <span>${v.label}</span>
          <span class="control-value">${value}</span>
        </div>
        <div class="color-control">
          <div class="color-swatch" style="background: ${value}">
            <input
              type="color"
              .value=${value.startsWith('#') ? value : '#000000'}
              @input=${(e: Event) => this._dispatch(v.name, (e.target as HTMLInputElement).value)}
            />
          </div>
          <input
            class="text-input color-text"
            type="text"
            .value=${value}
            @input=${(e: Event) => this._dispatch(v.name, (e.target as HTMLInputElement).value)}
          />
        </div>
      </div>
    `;
  }

  private _renderSizeControl(v: CSSVariable) {
    const value = this.cssValues[v.name] || v.default;
    return html`
      <div class="control">
        <div class="control-label">
          <span>${v.label}</span>
          <span class="control-value">${value}${v.unit || ''}</span>
        </div>
        <input
          type="range"
          min=${v.min || 0}
          max=${v.max || 100}
          .value=${value}
          @input=${(e: Event) => this._dispatch(v.name, (e.target as HTMLInputElement).value)}
        />
      </div>
    `;
  }

  private _renderSelectControl(v: CSSVariable) {
    const value = this.cssValues[v.name] || v.default;
    return html`
      <div class="control">
        <div class="control-label"><span>${v.label}</span></div>
        <select
          @change=${(e: Event) => this._dispatch(v.name, (e.target as HTMLSelectElement).value)}
        >
          ${v.options?.map(
            (opt) => html` <option value=${opt} ?selected=${opt === value}>${opt}</option> `,
          )}
        </select>
      </div>
    `;
  }

  private _renderStyleTab() {
    if (!this.config) return null;
    const colors = this.config.cssVariables.filter((v) => v.type === 'color');
    const sizes = this.config.cssVariables.filter((v) => v.type === 'size' || v.type === 'number');
    const selects = this.config.cssVariables.filter((v) => v.type === 'select');

    return html`
      ${
        colors.length
          ? html`
              <div class="section">
                <div class="section-title">Colors</div>
                ${colors.map((v) => this._renderColorControl(v))}
              </div>
            `
          : null
      }
      ${
        sizes.length
          ? html`
              <div class="section">
                <div class="section-title">Sizing</div>
                ${sizes.map((v) => this._renderSizeControl(v))}
              </div>
            `
          : null
      }
      ${
        selects.length
          ? html`
              <div class="section">
                <div class="section-title">Options</div>
                ${selects.map((v) => this._renderSelectControl(v))}
              </div>
            `
          : null
      }
    `;
  }

  private _renderVariantsTab() {
    if (!this.config?.variants)
      return html`<div style="padding:1rem;color:var(--pg-text-muted);font-size:0.8125rem;">
        No variants available
      </div>`;
    return html`
      <div class="section">
        <div class="section-title">Component Variants</div>
        <div class="variant-list">
          <div
            class="variant-item ${!this.selectedVariant ? 'active' : ''}"
            @click=${() => this._selectVariant(undefined)}
          >
            Default
          </div>
          ${this.config.variants.map(
            (v) => html`
              <div
                class="variant-item ${this.selectedVariant === v.name ? 'active' : ''}"
                @click=${() => this._selectVariant(v.name)}
              >
                ${v.name}
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }

  render() {
    const hasVariants = !!this.config?.variants?.length;

    return html`
      <div class="tabs">
        <button
          class="tab ${this.activeTab === 'style' ? 'active' : ''}"
          @click=${() => {
            this.activeTab = 'style';
          }}
        >
          Style
        </button>
        ${
          hasVariants
            ? html`
                <button
                  class="tab ${this.activeTab === 'variants' ? 'active' : ''}"
                  @click=${() => {
                    this.activeTab = 'variants';
                  }}
                >
                  Variants
                </button>
              `
            : null
        }
      </div>
      <div class="content">
        ${this.activeTab === 'style' ? this._renderStyleTab() : this._renderVariantsTab()}
      </div>
    `;
  }
}
