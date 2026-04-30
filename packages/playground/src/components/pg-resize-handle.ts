import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('pg-resize-handle')
export class PgResizeHandle extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      z-index: 10;
      background: transparent;
      transition: background 0.15s ease;
    }

    :host(:hover),
    :host([active]) {
      background: var(--pg-accent, #6366f1);
    }

    :host([direction='horizontal']) {
      width: 4px;
      height: 100%;
      top: 0;
      cursor: ew-resize;
    }

    :host([direction='vertical']) {
      height: 4px;
      width: 100%;
      left: 0;
      cursor: ns-resize;
    }

    :host([side='right']) {
      right: 0;
    }
    :host([side='left']) {
      left: 0;
    }
    :host([side='top']) {
      top: 0;
    }
    :host([side='bottom']) {
      bottom: 0;
    }
  `;

  @property({ reflect: true }) direction: 'horizontal' | 'vertical' = 'horizontal';
  @property({ reflect: true }) side: 'left' | 'right' | 'top' | 'bottom' = 'right';
  @property({ type: Number }) min = 100;
  @property({ type: Number }) max = 800;

  private _startPos = 0;

  render() {
    return html`<slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('pointerdown', this._onPointerDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('pointerdown', this._onPointerDown);
  }

  private _onPointerDown = (e: PointerEvent) => {
    e.preventDefault();
    this.setPointerCapture(e.pointerId);
    this.setAttribute('active', '');

    this._startPos = this.direction === 'horizontal' ? e.clientX : e.clientY;

    this.dispatchEvent(
      new CustomEvent('pg-resize-start', {
        bubbles: true,
        composed: true,
      }),
    );

    this.addEventListener('pointermove', this._onPointerMove);
    this.addEventListener('pointerup', this._onPointerUp);
    this.addEventListener('pointercancel', this._onPointerUp);
  };

  private _onPointerMove = (e: PointerEvent) => {
    const currentPos = this.direction === 'horizontal' ? e.clientX : e.clientY;
    const delta = currentPos - this._startPos;

    this.dispatchEvent(
      new CustomEvent('pg-resize', {
        bubbles: true,
        composed: true,
        detail: { delta, direction: this.direction, side: this.side },
      }),
    );
  };

  private _onPointerUp = (e: PointerEvent) => {
    this.releasePointerCapture(e.pointerId);
    this.removeAttribute('active');
    this.removeEventListener('pointermove', this._onPointerMove);
    this.removeEventListener('pointerup', this._onPointerUp);
    this.removeEventListener('pointercancel', this._onPointerUp);

    this.dispatchEvent(
      new CustomEvent('pg-resize-end', {
        bubbles: true,
        composed: true,
      }),
    );
  };
}
