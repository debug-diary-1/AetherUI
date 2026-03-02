import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { ComponentConfig } from '../data/component-configs';
import type { DeviceSize } from './pg-device-frame';
import { formatVariableValue } from '../utils/code-generator';
import './pg-device-frame';

@customElement('pg-preview')
export class PgPreview extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background: var(--pg-bg);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1.5rem;
      border-bottom: 1px solid var(--pg-border);
      background: var(--pg-bg-secondary);
      min-height: 48px;
    }

    .title {
      font-size: 0.875rem;
      font-weight: 600;
    }

    .description {
      color: var(--pg-text-muted);
      font-size: 0.75rem;
    }

    .canvas {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background:
        radial-gradient(circle at 1px 1px, var(--pg-preview-pattern) 1px, transparent 0);
      background-size: 24px 24px;
      overflow: auto;
    }

    .component-wrapper {
      padding: 2rem;
    }
  `;

  @property({ attribute: false }) config?: ComponentConfig;
  @property() selectedVariant?: string;
  @property({ attribute: false }) cssValues: Record<string, string> = {};
  @property() deviceSize: DeviceSize = 'full';

  private _getHtml(): string {
    if (!this.config) return '';
    if (this.selectedVariant) {
      const v = this.config.variants?.find(v => v.name === this.selectedVariant);
      if (v) return v.html;
    }
    return this.config.defaultHtml;
  }

  protected updated() {
    if (!this.config) return;
    this._applyCSSVariables();
    this._wireInteractive();
  }

  private _applyCSSVariables() {
    const wrapper = this.shadowRoot?.querySelector('.component-wrapper') as HTMLElement;
    if (!wrapper || !this.config) return;

    this.config.cssVariables.forEach((variable) => {
      const value = this.cssValues[variable.name] || variable.default;
      const finalValue = formatVariableValue(variable, value);
      wrapper.style.setProperty(variable.name, finalValue);

      wrapper.querySelectorAll('*').forEach(el => {
        if (el.tagName.toLowerCase().startsWith('ae-')) {
          (el as HTMLElement).style.setProperty(variable.name, finalValue);
        }
      });
    });
  }

  private _wireInteractive() {
    if (!this.config?.interactive) return;
    const wrapper = this.shadowRoot?.querySelector('.component-wrapper');
    if (!wrapper) return;

    const name = this.config.name;

    if (name === 'Modal') {
      const trigger = wrapper.querySelector('#modal-trigger') as HTMLElement;
      const modal = wrapper.querySelector('ae-modal') as HTMLElement & { open: boolean };
      const close = wrapper.querySelector('#modal-close') as HTMLElement;
      if (trigger && modal) {
        trigger.onclick = () => { modal.open = true; };
      }
      if (close && modal) {
        close.onclick = () => { modal.open = false; };
      }
    }

    if (name === 'Drawer') {
      const trigger = wrapper.querySelector('#drawer-trigger') as HTMLElement;
      const drawer = wrapper.querySelector('ae-drawer') as HTMLElement & { open: boolean };
      const close = wrapper.querySelector('#drawer-close') as HTMLElement;
      if (trigger && drawer) {
        trigger.onclick = () => { drawer.open = true; };
      }
      if (close && drawer) {
        close.onclick = () => { drawer.open = false; };
      }
    }

    if (name === 'Toast') {
      const trigger = wrapper.querySelector('#toast-trigger') as HTMLElement;
      const toast = wrapper.querySelector('ae-toast') as HTMLElement & { open: boolean };
      if (trigger && toast) {
        trigger.onclick = () => { toast.open = true; };
      }
    }
  }

  render() {
    if (!this.config) return html`<div class="canvas"></div>`;
    return html`
      <div class="header">
        <span class="title">${this.config.name}</span>
        <span class="description">${this.config.description}</span>
      </div>
      <div class="canvas">
        <pg-device-frame .size=${this.deviceSize}>
          <div class="component-wrapper">
            ${unsafeHTML(this._getHtml())}
          </div>
        </pg-device-frame>
      </div>
    `;
  }
}
