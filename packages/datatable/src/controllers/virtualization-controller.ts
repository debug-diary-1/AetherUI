import { ReactiveController, ReactiveControllerHost } from 'lit';
import { calculateVirtualization, VirtualizationOptions, VirtualizationResult } from '../utils/virtualization-utils';

/**
 * A controller for managing virtualized rendering of table rows
 */
export class VirtualizationController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _options: VirtualizationOptions = {
    totalRows: 0,
    rowHeight: 48, // Default row height in pixels
    viewportHeight: 400, // Default viewport height
    overscan: 10 // Number of extra rows to render for smooth scrolling
  };
  private _scrollTop = 0;
  private _result: VirtualizationResult = {
    startIndex: 0,
    endIndex: 0,
    totalHeight: 0,
    offsetY: 0
  };
  private _observer: ResizeObserver | null = null;
  private _viewportElement: HTMLElement | null = null;
  private _enabled = false;

  /**
   * Creates a new VirtualizationController
   * @param host The reactive controller host
   */
  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  /**
   * Enable or disable virtualization
   */
  setEnabled(enabled: boolean): void {
    const wasEnabled = this._enabled;
    this._enabled = enabled;

    if (enabled && !wasEnabled) {
      this._setupResizeObserver();
    } else if (!enabled && wasEnabled) {
      this._disconnectResizeObserver();
    }

    this._host.requestUpdate();
  }

  /**
   * Initialize virtualization with options
   * @param options Virtualization options
   */
  initialize(
    options: Partial<VirtualizationOptions> = {},
    viewportElement: HTMLElement | null = null
  ): void {
    this._options = {
      ...this._options,
      ...options
    };

    if (viewportElement) {
      this._viewportElement = viewportElement;
      this._setupResizeObserver();
    }

    this._recalculate();
  }

  /**
   * Update the total number of rows
   * @param totalRows New total row count
   */
  setTotalRows(totalRows: number): void {
    this._options.totalRows = totalRows;
    this._recalculate();
  }

  /**
   * Update the row height
   * @param rowHeight New row height in pixels
   */
  setRowHeight(rowHeight: number): void {
    this._options.rowHeight = rowHeight;
    this._recalculate();
  }

  /**
   * Handle scroll event
   * @param scrollTop Current scroll position
   */
  handleScroll(scrollTop: number): void {
    if (!this._enabled) return;

    this._scrollTop = scrollTop;
    this._recalculate();
  }

  /**
   * Recalculate virtualization based on current state
   */
  private _recalculate(): void {
    if (!this._enabled) return;

    this._result = calculateVirtualization(this._options, this._scrollTop);
    this._host.requestUpdate();
  }

  /**
   * Setup resize observer to update virtualization on container resize
   */
  private _setupResizeObserver(): void {
    if (!this._viewportElement || !this._enabled) return;

    // Disconnect any existing observer
    this._disconnectResizeObserver();

    // Create a new observer
    this._observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === this._viewportElement) {
          const { height } = entry.contentRect;
          if (height > 0 && height !== this._options.viewportHeight) {
            this._options.viewportHeight = height;
            this._recalculate();
          }
        }
      }
    });

    // Start observing
    this._observer.observe(this._viewportElement);
  }

  /**
   * Disconnect resize observer
   */
  private _disconnectResizeObserver(): void {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  /**
   * Get the current virtualization result
   */
  getResult(): VirtualizationResult {
    return { ...this._result };
  }

  /**
   * Get the visible range of items to render
   */
  getVisibleRange(): { start: number; end: number } {
    return {
      start: this._result.startIndex,
      end: this._result.endIndex
    };
  }

  /**
   * Get virtualization style for the container
   */
  getContainerStyle(): { height: string } {
    return {
      height: `${this._result.totalHeight}px`
    };
  }

  /**
   * Get virtualization style for the items container
   */
  getItemsStyle(): { transform: string } {
    return {
      transform: `translateY(${this._result.offsetY}px)`
    };
  }

  /**
   * Check if virtualization is enabled
   */
  isEnabled(): boolean {
    return this._enabled;
  }

  /**
   * Get the current row height
   */
  getRowHeight(): number {
    return this._options.rowHeight;
  }

  /**
   * Get options
   */
  getOptions(): VirtualizationOptions {
    return { ...this._options };
  }

  /**
   * Called when the host is connected to the DOM
   */
  hostConnected(): void {
    if (this._enabled && this._viewportElement) {
      this._setupResizeObserver();
    }
  }

  /**
   * Called when the host is disconnected from the DOM
   */
  hostDisconnected(): void {
    this._disconnectResizeObserver();
  }
}