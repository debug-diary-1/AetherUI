import { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * Position in the grid
 */
export interface GridPosition {
  rowIndex: number;
  colIndex: number;
}

/**
 * Navigation options
 */
export interface KeyboardNavigationOptions {
  /** Number of rows */
  rowCount: number;
  
  /** Number of columns */
  colCount: number;
  
  /** Whether to wrap around when reaching edges */
  wrap?: boolean;
  
  /** Function to check if a cell is focusable */
  isCellFocusable?: (position: GridPosition) => boolean;
}

/**
 * A controller for handling keyboard navigation
 */
export class KeyboardController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _options: KeyboardNavigationOptions = {
    rowCount: 0,
    colCount: 0,
    wrap: false
  };
  private _currentPosition: GridPosition = { rowIndex: -1, colIndex: -1 };
  private _enabled = false;
  private _lastFocusedCell: HTMLElement | null = null;
  
  /**
   * Creates a new KeyboardController
   * @param host The reactive controller host
   */
  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }
  
  /**
   * Initialize keyboard navigation
   * @param options Keyboard navigation options
   */
  initialize(options: KeyboardNavigationOptions): void {
    this._options = {
      ...this._options,
      ...options
    };
    
    this._enabled = true;
  }
  
  /**
   * Handle keydown event
   * @param event Keyboard event
   * @returns True if the event was handled
   */
  handleKeyDown(event: KeyboardEvent): boolean {
    if (!this._enabled) return false;
    
    switch (event.key) {
      case 'ArrowUp':
        this.moveUp();
        event.preventDefault();
        return true;
        
      case 'ArrowDown':
        this.moveDown();
        event.preventDefault();
        return true;
        
      case 'ArrowLeft':
        this.moveLeft();
        event.preventDefault();
        return true;
        
      case 'ArrowRight':
        this.moveRight();
        event.preventDefault();
        return true;
        
      case 'Home':
        if (event.ctrlKey) {
          this.moveToFirstCell();
        } else {
          this.moveToRowStart();
        }
        event.preventDefault();
        return true;
        
      case 'End':
        if (event.ctrlKey) {
          this.moveToLastCell();
        } else {
          this.moveToRowEnd();
        }
        event.preventDefault();
        return true;
        
      case 'PageUp':
        this.movePagesUp();
        event.preventDefault();
        return true;
        
      case 'PageDown':
        this.movePagesDown();
        event.preventDefault();
        return true;
        
      case 'Enter':
      case ' ':
        if (this._lastFocusedCell) {
          this._lastFocusedCell.click();
          event.preventDefault();
          return true;
        }
        return false;
        
      default:
        return false;
    }
  }
  
  /**
   * Move focus up
   */
  moveUp(): void {
    if (this._currentPosition.rowIndex <= 0) {
      if (this._options.wrap) {
        this.setPosition({ 
          rowIndex: this._options.rowCount - 1, 
          colIndex: this._currentPosition.colIndex 
        });
      }
      return;
    }
    
    const newPos = { 
      rowIndex: this._currentPosition.rowIndex - 1, 
      colIndex: this._currentPosition.colIndex 
    };
    
    this.setPosition(newPos);
  }
  
  /**
   * Move focus down
   */
  moveDown(): void {
    if (this._currentPosition.rowIndex >= this._options.rowCount - 1) {
      if (this._options.wrap) {
        this.setPosition({ 
          rowIndex: 0, 
          colIndex: this._currentPosition.colIndex 
        });
      }
      return;
    }
    
    const newPos = { 
      rowIndex: this._currentPosition.rowIndex + 1, 
      colIndex: this._currentPosition.colIndex 
    };
    
    this.setPosition(newPos);
  }
  
  /**
   * Move focus left
   */
  moveLeft(): void {
    if (this._currentPosition.colIndex <= 0) {
      if (this._options.wrap) {
        this.setPosition({ 
          rowIndex: this._currentPosition.rowIndex, 
          colIndex: this._options.colCount - 1 
        });
      }
      return;
    }
    
    const newPos = { 
      rowIndex: this._currentPosition.rowIndex, 
      colIndex: this._currentPosition.colIndex - 1 
    };
    
    this.setPosition(newPos);
  }
  
  /**
   * Move focus right
   */
  moveRight(): void {
    if (this._currentPosition.colIndex >= this._options.colCount - 1) {
      if (this._options.wrap) {
        this.setPosition({ 
          rowIndex: this._currentPosition.rowIndex, 
          colIndex: 0 
        });
      }
      return;
    }
    
    const newPos = { 
      rowIndex: this._currentPosition.rowIndex, 
      colIndex: this._currentPosition.colIndex + 1 
    };
    
    this.setPosition(newPos);
  }
  
  /**
   * Move to first cell of row
   */
  moveToRowStart(): void {
    this.setPosition({ 
      rowIndex: this._currentPosition.rowIndex, 
      colIndex: 0 
    });
  }
  
  /**
   * Move to last cell of row
   */
  moveToRowEnd(): void {
    this.setPosition({ 
      rowIndex: this._currentPosition.rowIndex, 
      colIndex: this._options.colCount - 1 
    });
  }
  
  /**
   * Move to first cell of grid
   */
  moveToFirstCell(): void {
    this.setPosition({ rowIndex: 0, colIndex: 0 });
  }
  
  /**
   * Move to last cell of grid
   */
  moveToLastCell(): void {
    this.setPosition({ 
      rowIndex: this._options.rowCount - 1, 
      colIndex: this._options.colCount - 1 
    });
  }
  
  /**
   * Move up multiple rows (pageUp)
   */
  movePagesUp(): void {
    const pageSize = 5; // Arbitrary page size
    const newRow = Math.max(0, this._currentPosition.rowIndex - pageSize);
    
    this.setPosition({ 
      rowIndex: newRow, 
      colIndex: this._currentPosition.colIndex 
    });
  }
  
  /**
   * Move down multiple rows (pageDown)
   */
  movePagesDown(): void {
    const pageSize = 5; // Arbitrary page size
    const newRow = Math.min(
      this._options.rowCount - 1,
      this._currentPosition.rowIndex + pageSize
    );
    
    this.setPosition({ 
      rowIndex: newRow, 
      colIndex: this._currentPosition.colIndex 
    });
  }
  
  /**
   * Focus a specific cell based on position
   * @param cell Element representing the cell
   */
  focusCell(cell: HTMLElement): void {
    if (!cell) return;
    
    // Remove focus from previous cell
    if (this._lastFocusedCell) {
      this._lastFocusedCell.setAttribute('tabindex', '-1');
      this._lastFocusedCell.classList.remove('keyboard-focused');
    }
    
    // Focus new cell
    cell.setAttribute('tabindex', '0');
    cell.classList.add('keyboard-focused');
    cell.focus();
    
    this._lastFocusedCell = cell;
  }
  
  /**
   * Set the current position
   * @param position New grid position
   */
  setPosition(position: GridPosition): void {
    // Check bounds
    if (
      position.rowIndex < 0 || 
      position.rowIndex >= this._options.rowCount ||
      position.colIndex < 0 || 
      position.colIndex >= this._options.colCount
    ) {
      return;
    }
    
    // Check if cell is focusable
    if (
      this._options.isCellFocusable && 
      !this._options.isCellFocusable(position)
    ) {
      return;
    }
    
    this._currentPosition = position;
    this._host.requestUpdate();
    
    // Dispatch event
    this._host.dispatchEvent(new CustomEvent('keyboard-navigation-move', {
      detail: {
        position: this._currentPosition
      },
      bubbles: true,
      composed: true
    }));
  }
  
  /**
   * Get the current position
   */
  getPosition(): GridPosition {
    return { ...this._currentPosition };
  }
  
  /**
   * Check if keyboard navigation is enabled
   */
  isEnabled(): boolean {
    return this._enabled;
  }
  
  /**
   * Set whether keyboard navigation is enabled
   */
  setEnabled(enabled: boolean): void {
    this._enabled = enabled;
  }
  
  /**
   * Get a cell element based on position
   */
  getCellElement(position: GridPosition): HTMLElement | null {
    const { rowIndex, colIndex } = position;
    
    // This is a simple implementation assuming row and column indices are attributes
    return (this._host as any).shadowRoot?.querySelector(
      `[data-row-index="${rowIndex}"][data-col-index="${colIndex}"]`
    ) || null;
  }
  
  /**
   * Called when the host is connected to the DOM
   */
  hostConnected(): void {
    // Nothing to do
  }
  
  /**
   * Called when the host is disconnected from the DOM
   */
  hostDisconnected(): void {
    // Clean up
    this._lastFocusedCell = null;
  }
}