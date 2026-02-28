import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type DeviceSize = 'mobile' | 'tablet' | 'desktop' | 'full';

const sizeMap: Record<DeviceSize, string> = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1024px',
  full: '100%',
};

@customElement('pg-device-frame')
export class PgDeviceFrame extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 1.5rem;
      overflow: auto;
    }

    .frame {
      width: 100%;
      max-width: var(--frame-max-width, 100%);
      transition: max-width 0.3s ease;
    }

    :host([size="mobile"]) .frame,
    :host([size="tablet"]) .frame,
    :host([size="desktop"]) .frame {
      border: 1px solid var(--pg-border, #333);
      border-radius: 0.75rem;
      background: var(--pg-preview-bg, #1a1a1a);
      padding: 1.5rem;
    }

    :host([size="full"]) .frame {
      max-width: 100%;
    }
  `;

  @property({ reflect: true }) size: DeviceSize = 'full';

  protected updated() {
    const maxWidth = sizeMap[this.size] || '100%';
    this.style.setProperty('--frame-max-width', maxWidth);
  }

  render() {
    return html`<div class="frame"><slot></slot></div>`;
  }
}
