import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { popoverStyles } from './styles';

/**
 * A popover component for displaying floating content relative to a trigger element.
 *
 * @element ae-popover
 *
 * @property {boolean} open - Whether the popover is open
 * @property {string} trigger - How the popover is triggered (click, hover, manual)
 * @property {string} placement - Placement of the popover relative to trigger (top, bottom, left, right, etc.)
 * @property {boolean} arrow - Whether to show an arrow pointing to the trigger
 * @property {number} offset - Distance in pixels from the trigger
 * @property {boolean} closeOnClickOutside - Whether to close when clicking outside
 *
 * @fires {CustomEvent<void>} ae-popover-open - Fired when the popover opens
 * @fires {CustomEvent<void>} ae-popover-close - Fired when the popover closes
 *
 * @slot trigger - The trigger element
 * @slot - The popover content
 *
 * @csspart trigger - The trigger container
 * @csspart popover - The popover container
 * @csspart arrow - The arrow element
 *
 * @example
 * ```html
 * <ae-popover>
 *   <button slot="trigger">Click me</button>
 *   <div>Popover content</div>
 * </ae-popover>
 * ```
 */
@customElement('ae-popover')
export class AePopover extends LitElement {
  static styles = popoverStyles;

  @property({ type: Boolean, reflect: true })
  accessor open = false;

  @property({ type: String })
  accessor trigger: 'click' | 'hover' | 'manual' = 'click';

  @property({ type: String })
  accessor placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' = 'bottom';

  @property({ type: Boolean })
  accessor arrow = true;

  @property({ type: Number })
  accessor offset = 8;

  @property({ type: Boolean, attribute: 'close-on-click-outside' })
  accessor closeOnClickOutside = true;

  @query('[part="trigger"]')
  private accessor triggerElement!: HTMLElement;

  @query('[part="popover"]')
  private accessor popoverElement!: HTMLElement;

  @state()
  private accessor popoverStyles = '';

  private _handleDocumentClick = this.handleDocumentClick.bind(this);
  private _hoverTimeout?: number;

  connectedCallback() {
    super.connectedCallback();
    if (this.closeOnClickOutside) {
      document.addEventListener('click', this._handleDocumentClick);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocumentClick);
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('open') && this.open) {
      // Defer positioning to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        this.updatePosition();
      });
    }
  }

  private updatePosition() {
    if (!this.triggerElement || !this.popoverElement) return;

    const triggerRect = this.triggerElement.getBoundingClientRect();
    const popoverRect = this.popoverElement.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (this.placement) {
      case 'top':
        top = triggerRect.top - popoverRect.height - this.offset;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'top-start':
        top = triggerRect.top - popoverRect.height - this.offset;
        left = triggerRect.left;
        break;
      case 'top-end':
        top = triggerRect.top - popoverRect.height - this.offset;
        left = triggerRect.right - popoverRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + this.offset;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + this.offset;
        left = triggerRect.left;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + this.offset;
        left = triggerRect.right - popoverRect.width;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left - popoverRect.width - this.offset;
        break;
      case 'left-start':
        top = triggerRect.top;
        left = triggerRect.left - popoverRect.width - this.offset;
        break;
      case 'left-end':
        top = triggerRect.bottom - popoverRect.height;
        left = triggerRect.left - popoverRect.width - this.offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + this.offset;
        break;
      case 'right-start':
        top = triggerRect.top;
        left = triggerRect.right + this.offset;
        break;
      case 'right-end':
        top = triggerRect.bottom - popoverRect.height;
        left = triggerRect.right + this.offset;
        break;
    }

    this.popoverStyles = `top: ${top}px; left: ${left}px;`;
  }

  private handleTriggerClick(event: Event) {
    event.stopPropagation();
    if (this.trigger === 'click') {
      this.toggle();
    }
  }

  private handleTriggerMouseEnter() {
    if (this.trigger === 'hover') {
      if (this._hoverTimeout) {
        clearTimeout(this._hoverTimeout);
      }
      this.show();
    }
  }

  private handleTriggerMouseLeave() {
    if (this.trigger === 'hover') {
      this._hoverTimeout = window.setTimeout(() => {
        this.hide();
      }, 200);
    }
  }

  private handlePopoverMouseEnter() {
    if (this.trigger === 'hover' && this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
    }
  }

  private handlePopoverMouseLeave() {
    if (this.trigger === 'hover') {
      this._hoverTimeout = window.setTimeout(() => {
        this.hide();
      }, 200);
    }
  }

  private handleDocumentClick(event: Event) {
    if (!this.open || !this.closeOnClickOutside) return;

    const path = event.composedPath();
    if (!path.includes(this)) {
      this.hide();
    }
  }

  public toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  public show() {
    if (!this.open) {
      this.open = true;
      this.dispatchEvent(new CustomEvent('ae-popover-open', { bubbles: true, composed: true }));
    }
  }

  public hide() {
    if (this.open) {
      this.open = false;
      this.dispatchEvent(new CustomEvent('ae-popover-close', { bubbles: true, composed: true }));
    }
  }

  render() {
    return html`
      <div
        part="trigger"
        class="popover-trigger"
        @click="${this.handleTriggerClick}"
        @mouseenter="${this.handleTriggerMouseEnter}"
        @mouseleave="${this.handleTriggerMouseLeave}"
      >
        <slot name="trigger"></slot>
      </div>

      ${this.open ? html`
        <div
          part="popover"
          class="popover-content"
          style="${this.popoverStyles}"
          @mouseenter="${this.handlePopoverMouseEnter}"
          @mouseleave="${this.handlePopoverMouseLeave}"
        >
          ${this.arrow ? html`
            <div part="arrow" class="popover-arrow"></div>
          ` : ''}
          <slot></slot>
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-popover': AePopover;
  }
}
