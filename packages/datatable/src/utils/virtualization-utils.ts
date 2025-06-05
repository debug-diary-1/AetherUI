/**
 * Virtualization options
 */
export interface VirtualizationOptions {
  /** Total number of rows */
  totalRows: number;
  
  /** Height of a single row in pixels */
  rowHeight: number;
  
  /** Height of the visible container in pixels */
  viewportHeight: number;
  
  /** Additional rows to render above/below the visible area */
  overscan: number;
}

/**
 * Virtualization result
 */
export interface VirtualizationResult {
  /** Start index to render */
  startIndex: number;
  
  /** End index to render */
  endIndex: number;
  
  /** Total height of the virtual scroll area in pixels */
  totalHeight: number;
  
  /** Offset from the top to position rendered items */
  offsetY: number;
}

/**
 * Calculates virtualization parameters for rendering
 * @param options Virtualization options
 * @param scrollTop Current scroll position
 * @returns Virtualization calculation result
 */
export function calculateVirtualization(
  options: VirtualizationOptions,
  scrollTop: number
): VirtualizationResult {
  const { totalRows, rowHeight, viewportHeight, overscan } = options;
  
  // Calculate the total height
  const totalHeight = totalRows * rowHeight;
  
  // Calculate visible indexes
  const visibleRowsCount = Math.ceil(viewportHeight / rowHeight);
  const startIndex = Math.floor(scrollTop / rowHeight);
  // End index of the visible range (without overscan)
  const endIndex = Math.min(startIndex + visibleRowsCount - 1, totalRows - 1);
  
  // Calculate overscan (extra items for smooth scrolling)
  const overscanStart = Math.max(0, startIndex - overscan);
  const overscanEnd = Math.min(totalRows - 1, endIndex + overscan);
  
  // Calculate offset for positioning
  const offsetY = overscanStart * rowHeight;
  
  return {
    startIndex: overscanStart,
    endIndex: overscanEnd,
    totalHeight,
    offsetY
  };
}