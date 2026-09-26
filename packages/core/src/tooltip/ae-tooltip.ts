import { LitElement, html, type PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { customElement } from '../internal/custom-element';
import { styleMap } from 'lit/directives/style-map.js';
import { tooltipStyles } from './styles.js';
import { positionTooltip, createAutoUpdate, type Placement, type Strategy } from './middleware.js';

/**
 * A lightweight tooltip component that shows contextual information on hover/focus
 *
 * @element ae-tooltip
 * @fires ae-tooltip-show - Fired when tooltip opens
 * @fires ae-tooltip-hide - Fired when tooltip closes
 *
 * @slot - Default slot for the anchor element that triggers the tooltip
 * @part overlay - The tooltip container
 * @part arrow - The tooltip arrow indicator
 * @part content - The tooltip content wrapper
 *
 * @cssvar --ae-tooltip-bg - Background color (default: black)
 * @cssvar --ae-tooltip-fg - Text color (default: white)
 * @cssvar --ae-tooltip-radius - Border radius (default: 4px)
 * @cssvar --ae-tooltip-shadow - Box shadow (default: 0 2px 8px rgba(0,0,0,.15))
 * @cssvar --ae-tooltip-padding - Internal padding (default: 0.375rem 0.5rem)
 * @cssvar --ae-tooltip-z-index - Z-index (default: 1200)
 * @cssvar --ae-tooltip-font-size - Font size (default: 0.8125rem)
 */
@customElement('ae-tooltip')
export class AeTooltip extends LitElement {
  static styles = tooltipStyles;

  /** The text content to display in the tooltip */
  @property()
  accessor text = '';

  /** Whether the tooltip is currently visible */
  @property({ type: Boolean, reflect: true })
  accessor open = false;

  /** Delay in milliseconds before showing on hover/focus */
  @property({ type: Number, attribute: 'hover-delay' })
  accessor hoverDelay = 100;

  /** Delay in milliseconds before hiding on mouse leave/blur */
  @property({ type: Number, attribute: 'hide-delay' })
  accessor hideDelay = 100;

  /** Preferred placement of the tooltip */
  @property()
  accessor placement: Placement = 'top';

  /** Positioning strategy (absolute or fixed) */
  @property()
  accessor strategy: Strategy = 'fixed';

  /** Whether the tooltip is disabled */
  @property({ type: Boolean })
  accessor disabled = false;

  /** Whether to show an arrow pointing to the anchor */
  @property({ type: Boolean, attribute: 'show-arrow' })
  accessor showArrow = true;

  /** Animation type (fade or scale) */
  @property({ reflect: true })
  accessor animation: 'fade' | 'scale' = 'fade';

  @state()
  private _tooltipStyles: Record<string, string> = {
    visibility: 'hidden',
  };

  @state()
  private _arrowStyles: Record<string, string> = {};

  @query('[part="overlay"]')
  private _overlay?: HTMLElement;

  @query('[part="arrow"]')
  private _arrow?: HTMLElement;

  @query('slot')
  private _slot?: HTMLSlotElement;

  private _anchorElement?: HTMLElement;
  private _positionVersion = 0;
  private _tooltipId = this._generateId();
  private _hoverTimer?: number;
  private _hideTimer?: number;
  private _cleanupAutoUpdate?: () => void;
  private _isHovering = false;
  private _isFocused = false;

  // Bind event handlers to preserve context
  private _handleMouseEnter = this._onMouseEnter.bind(this);
  private _handleMouseLeave = this._onMouseLeave.bind(this);
  private _handleFocus = this._onFocus.bind(this);
  private _handleBlur = this._onBlur.bind(this);
  private _handleKeyDown = this._onKeyDown.bind(this);
  private _handleSlotChange = this._onSlotChange.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this._setupEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeEventListeners();
    this._removeAnchorEventListeners();
    this._cleanupPositioning();
    this._clearTimers();
  }

  protected firstUpdated() {
    // Wait for the next tick to ensure slot content is ready
    requestAnimationFrame(() => {
      this._findAnchorElement();
    });
  }

  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has('open')) {
      this._cleanupPositioning();
      if (this.open) {
        this._tooltipStyles = { visibility: 'hidden', left: '0', top: '0' };
      }
      this._updateAriaDescribedBy(this.open);
      this._emitOpenChange();
    }

    if (
      this.open &&
      ['open', 'placement', 'strategy', 'showArrow', 'text'].some((key) =>
        changedProperties.has(key),
      )
    ) {
      void this.updateComplete.then(() => {
        if (this.open) this._updatePosition();
      });
    }

    if (changedProperties.has('disabled') && this.disabled) {
      this.open = false;
    }
  }

  render() {
    return html`
      <slot @slotchange=${this._handleSlotChange}></slot>
      ${
        this.open
          ? html`
              <div
                id=${this._tooltipId}
                part="overlay"
                role="tooltip"
                style=${styleMap({ ...this._tooltipStyles, position: this.strategy })}
              >
                ${
                  this.showArrow
                    ? html` <div part="arrow" style=${styleMap(this._arrowStyles)}></div> `
                    : ''
                }
                <span part="content">${this.text}</span>
              </div>
            `
          : ''
      }
    `;
  }

  /** Show the tooltip */
  show() {
    if (!this.disabled && this.text) {
      this.open = true;
    }
  }

  /** Hide the tooltip */
  hide() {
    this.open = false;
  }

  /** Toggle the tooltip visibility */
  toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  private _findAnchorElement() {
    const assignedElements = this._slot?.assignedElements({ flatten: true }) || [];
    const slotted = assignedElements[0] as HTMLElement;

    if (this._anchorElement !== slotted) {
      this._removeAnchorEventListeners();
      this._anchorElement = slotted || this;
      this._setupAnchorEventListeners();
    }
  }

  private _onSlotChange() {
    this._findAnchorElement();
  }

  private _setupEventListeners() {
    document.addEventListener('keydown', this._handleKeyDown);
  }

  private _removeEventListeners() {
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  private _setupAnchorEventListeners() {
    if (!this._anchorElement) return;

    this._anchorElement.addEventListener('mouseenter', this._handleMouseEnter);
    this._anchorElement.addEventListener('mouseleave', this._handleMouseLeave);
    this._anchorElement.addEventListener('focus', this._handleFocus, true);
    this._anchorElement.addEventListener('blur', this._handleBlur, true);
  }

  private _removeAnchorEventListeners() {
    if (!this._anchorElement) return;

    this._anchorElement.removeEventListener('mouseenter', this._handleMouseEnter);
    this._anchorElement.removeEventListener('mouseleave', this._handleMouseLeave);
    this._anchorElement.removeEventListener('focus', this._handleFocus, true);
    this._anchorElement.removeEventListener('blur', this._handleBlur, true);
  }

  private _onMouseEnter() {
    if (this.disabled || !this.text) return;

    this._isHovering = true;
    this._clearTimers();

    if (this.hoverDelay > 0) {
      this._hoverTimer = window.setTimeout(() => {
        if (this._isHovering) {
          this.show();
        }
      }, this.hoverDelay);
    } else {
      this.show();
    }
  }

  private _onMouseLeave() {
    this._isHovering = false;
    this._clearTimers();

    if (this.hideDelay > 0) {
      this._hideTimer = window.setTimeout(() => {
        if (!this._isHovering && !this._isFocused) {
          this.hide();
        }
      }, this.hideDelay);
    } else if (!this._isFocused) {
      this.hide();
    }
  }

  private _onFocus() {
    if (this.disabled || !this.text) return;

    this._isFocused = true;
    this._clearTimers();

    if (this.hoverDelay > 0) {
      this._hoverTimer = window.setTimeout(() => {
        if (this._isFocused) {
          this.show();
        }
      }, this.hoverDelay);
    } else {
      this.show();
    }
  }

  private _onBlur() {
    this._isFocused = false;
    this._clearTimers();

    if (this.hideDelay > 0) {
      this._hideTimer = window.setTimeout(() => {
        if (!this._isHovering && !this._isFocused) {
          this.hide();
        }
      }, this.hideDelay);
    } else if (!this._isHovering) {
      this.hide();
    }
  }

  private _onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.open) {
      event.stopPropagation();
      this.hide();
    }
  }

  private _clearTimers() {
    if (this._hoverTimer !== undefined) {
      clearTimeout(this._hoverTimer);
      this._hoverTimer = undefined;
    }
    if (this._hideTimer !== undefined) {
      clearTimeout(this._hideTimer);
      this._hideTimer = undefined;
    }
  }

  private _updatePosition() {
    if (!this._anchorElement) this._findAnchorElement();
    const anchor = this._anchorElement;
    const overlay = this._overlay;
    if (!this.open || !anchor || !overlay) return;
    this._updateAriaDescribedBy(true);

    this._cleanupPositioning();
    const version = this._positionVersion;
    const updatePosition = async () => {
      const result = await positionTooltip(anchor, overlay, {
        placement: this.placement,
        strategy: this.strategy,
        arrowElement: this.showArrow ? this._arrow : null,
      });
      // Ignore work completed after closing, reopening, or restarting positioning.
      if (version !== this._positionVersion || !this.open || this._overlay !== overlay) return;
      this._tooltipStyles = {
        left: `${result.x}px`,
        top: `${result.y}px`,
        visibility: 'visible',
      };
      this._arrowStyles = {};
      if (this.showArrow && result.middlewareData.arrow) {
        const { x, y } = result.middlewareData.arrow;
        const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[
          result.placement.split('-')[0]
        ]!;
        this._arrowStyles = {
          left: x != null ? `${x}px` : '',
          top: y != null ? `${y}px` : '',
          [staticSide]: '-4px',
        };
      }
    };
    this._cleanupAutoUpdate = createAutoUpdate(anchor, overlay, updatePosition);
  }

  private _cleanupPositioning() {
    this._positionVersion++;
    if (this._cleanupAutoUpdate) {
      this._cleanupAutoUpdate();
      this._cleanupAutoUpdate = undefined;
    }
  }

  private _updateAriaDescribedBy(add: boolean) {
    if (!this._anchorElement) return;

    const tooltipId = this._tooltipId;

    if (add) {
      const currentDescribedBy = this._anchorElement.getAttribute('aria-describedby');
      const newDescribedBy = [
        ...new Set([...(currentDescribedBy?.split(/\s+/).filter(Boolean) ?? []), tooltipId]),
      ].join(' ');
      this._anchorElement.setAttribute('aria-describedby', newDescribedBy);
    } else {
      const currentDescribedBy = this._anchorElement.getAttribute('aria-describedby');
      if (currentDescribedBy) {
        const newDescribedBy = currentDescribedBy
          .split(' ')
          .filter((id) => id !== tooltipId)
          .join(' ');

        if (newDescribedBy) {
          this._anchorElement.setAttribute('aria-describedby', newDescribedBy);
        } else {
          this._anchorElement.removeAttribute('aria-describedby');
        }
      }
    }
  }

  private static _idCounter = 0;

  private _generateId(): string {
    return `ae-tooltip-${AeTooltip._idCounter++}`;
  }

  private _emitOpenChange() {
    const event = new CustomEvent(this.open ? 'ae-tooltip-show' : 'ae-tooltip-hide', {
      detail: { open: this.open },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-tooltip': AeTooltip;
  }
}
