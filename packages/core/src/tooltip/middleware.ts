import {
  computePosition,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  type Placement,
  type Middleware,
  type Strategy
} from '@floating-ui/dom';

export interface PositionOptions {
  placement: Placement;
  strategy: Strategy;
  arrowElement?: HTMLElement | null;
  offsetDistance?: number;
}

export interface PositionResult {
  x: number;
  y: number;
  placement: Placement;
  middlewareData: any;
}

/**
 * Create middleware configuration for floating UI
 */
export function createMiddleware(options: PositionOptions): Middleware[] {
  const middleware: Middleware[] = [];

  // Offset from the anchor element
  if (options.offsetDistance !== undefined) {
    middleware.push(offset(options.offsetDistance));
  } else {
    middleware.push(offset(8)); // Default offset
  }

  // Flip when there's not enough space
  middleware.push(flip({
    fallbackPlacements: ['top', 'bottom', 'left', 'right'],
    padding: 5
  }));

  // Shift to keep within viewport
  middleware.push(shift({
    padding: 5
  }));

  // Arrow positioning
  if (options.arrowElement) {
    middleware.push(arrow({
      element: options.arrowElement,
      padding: 4
    }));
  }

  return middleware;
}

/**
 * Position the tooltip relative to its anchor
 */
export async function positionTooltip(
  anchor: HTMLElement,
  tooltip: HTMLElement,
  options: PositionOptions
): Promise<PositionResult> {
  const middleware = createMiddleware(options);

  const result = await computePosition(anchor, tooltip, {
    placement: options.placement,
    strategy: options.strategy,
    middleware
  });

  return result;
}

/**
 * Create auto-update cleanup function
 */
export function createAutoUpdate(
  anchor: HTMLElement,
  tooltip: HTMLElement,
  updateFn: () => void
): () => void {
  return autoUpdate(anchor, tooltip, updateFn);
}

/**
 * Apply arrow positioning based on placement
 */
export function positionArrow(
  arrowElement: HTMLElement,
  placement: Placement,
  middlewareData: any
) {
  if (!middlewareData.arrow) return;

  const { x, y } = middlewareData.arrow;
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]]!;

  Object.assign(arrowElement.style, {
    left: x != null ? `${x}px` : '',
    top: y != null ? `${y}px` : '',
    right: '',
    bottom: '',
    [staticSide]: '-4px'
  });
}
