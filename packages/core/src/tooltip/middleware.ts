export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type Strategy = 'absolute' | 'fixed';

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
  middlewareData: {
    arrow?: { x?: number; y?: number };
  };
}

interface Position {
  x: number;
  y: number;
}

/**
 * Get the position of a floating element relative to a reference element
 */
function computePosition(
  reference: DOMRect,
  floating: DOMRect,
  placement: Placement,
  offset: number,
): Position {
  let x = 0;
  let y = 0;

  const [side, align] = placement.split('-') as [string, string | undefined];

  switch (side) {
    case 'top':
      y = reference.top - floating.height - offset;
      x = reference.left + (reference.width - floating.width) / 2;
      break;
    case 'bottom':
      y = reference.bottom + offset;
      x = reference.left + (reference.width - floating.width) / 2;
      break;
    case 'left':
      x = reference.left - floating.width - offset;
      y = reference.top + (reference.height - floating.height) / 2;
      break;
    case 'right':
      x = reference.right + offset;
      y = reference.top + (reference.height - floating.height) / 2;
      break;
  }

  if (align === 'start') {
    if (side === 'top' || side === 'bottom') {
      x = reference.left;
    } else {
      y = reference.top;
    }
  } else if (align === 'end') {
    if (side === 'top' || side === 'bottom') {
      x = reference.right - floating.width;
    } else {
      y = reference.bottom - floating.height;
    }
  }

  return { x, y };
}

/**
 * Check if position fits in viewport
 */
function fitsInViewport(position: Position, floating: DOMRect, padding: number = 5): boolean {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  return (
    position.x >= padding &&
    position.y >= padding &&
    position.x + floating.width <= viewport.width - padding &&
    position.y + floating.height <= viewport.height - padding
  );
}

/**
 * Get opposite placement for flipping
 */
function getOppositePlacement(placement: Placement): Placement {
  const opposites: Record<string, string> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  const [side, align] = placement.split('-');
  const oppositeSide = opposites[side] || side;

  return (align ? `${oppositeSide}-${align}` : oppositeSide) as Placement;
}

/**
 * Shift position to stay in viewport
 */
function shiftToViewport(position: Position, floating: DOMRect, padding: number = 5): Position {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  let { x, y } = position;

  if (x < padding) {
    x = padding;
  } else if (x + floating.width > viewport.width - padding) {
    x = viewport.width - floating.width - padding;
  }

  if (y < padding) {
    y = padding;
  } else if (y + floating.height > viewport.height - padding) {
    y = viewport.height - floating.height - padding;
  }

  return { x, y };
}

/**
 * Calculate arrow position
 */
function calculateArrowPosition(
  reference: DOMRect,
  floating: DOMRect,
  position: Position,
  placement: Placement,
  arrowElement: HTMLElement,
): { x?: number; y?: number } {
  const arrowRect = arrowElement.getBoundingClientRect();
  const [side] = placement.split('-');

  if (side === 'top' || side === 'bottom') {
    const centerX = reference.left + reference.width / 2 - position.x;
    const minX = 4;
    const maxX = floating.width - arrowRect.width - 4;
    return { x: Math.max(minX, Math.min(maxX, centerX - arrowRect.width / 2)) };
  } else {
    const centerY = reference.top + reference.height / 2 - position.y;
    const minY = 4;
    const maxY = floating.height - arrowRect.height - 4;
    return { y: Math.max(minY, Math.min(maxY, centerY - arrowRect.height / 2)) };
  }
}

/**
 * Position the tooltip relative to its anchor
 */
export async function positionTooltip(
  anchor: HTMLElement,
  tooltip: HTMLElement,
  options: PositionOptions,
): Promise<PositionResult> {
  const offsetDistance = options.offsetDistance ?? 8;
  const anchorRect = anchor.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  let placement = options.placement;
  let position = computePosition(anchorRect, tooltipRect, placement, offsetDistance);

  // Flip if doesn't fit
  if (!fitsInViewport(position, tooltipRect)) {
    const oppositePlacement = getOppositePlacement(placement);
    const oppositePosition = computePosition(
      anchorRect,
      tooltipRect,
      oppositePlacement,
      offsetDistance,
    );

    if (fitsInViewport(oppositePosition, tooltipRect)) {
      placement = oppositePlacement;
      position = oppositePosition;
    }
  }

  // Shift to keep in viewport
  position = shiftToViewport(position, tooltipRect);

  // Calculate arrow position
  let arrowData: { x?: number; y?: number } | undefined;
  if (options.arrowElement) {
    arrowData = calculateArrowPosition(
      anchorRect,
      tooltipRect,
      position,
      placement,
      options.arrowElement,
    );
  }

  return {
    x: position.x,
    y: position.y,
    placement,
    middlewareData: {
      arrow: arrowData,
    },
  };
}

/**
 * Create auto-update cleanup function
 * Watches for scroll and resize events to reposition
 */
export function createAutoUpdate(
  anchor: HTMLElement,
  tooltip: HTMLElement,
  updateFn: () => void,
): () => void {
  const handleUpdate = () => {
    requestAnimationFrame(updateFn);
  };

  // Watch for scroll on all scrollable parents
  const scrollParents: (Window | Element)[] = [window];
  let parent = anchor.parentElement;
  while (parent) {
    const style = getComputedStyle(parent);
    if (/(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY)) {
      scrollParents.push(parent);
    }
    parent = parent.parentElement;
  }

  scrollParents.forEach((el) => {
    el.addEventListener('scroll', handleUpdate, { passive: true });
  });
  window.addEventListener('resize', handleUpdate, { passive: true });

  // Initial update
  handleUpdate();

  // Return cleanup function
  return () => {
    scrollParents.forEach((el) => {
      el.removeEventListener('scroll', handleUpdate);
    });
    window.removeEventListener('resize', handleUpdate);
  };
}

/**
 * Apply arrow positioning based on placement
 */
export function positionArrow(
  arrowElement: HTMLElement,
  placement: Placement,
  middlewareData: { arrow?: { x?: number; y?: number } },
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
    [staticSide]: '-4px',
  });
}
