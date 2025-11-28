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
  offset: number
): Position {
  let x = 0;
  let y = 0;

  const [side, align] = placement.split('-') as [string, string | undefined];

  // Calculate base position based on side
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

  // Adjust for alignment
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
 * Check if the floating element fits within the viewport
 */
function fitsInViewport(
  position: Position,
  floating: DOMRect,
  padding: number = 8
): { fits: boolean; overflow: { top: boolean; bottom: boolean; left: boolean; right: boolean } } {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  return {
    fits:
      position.x >= padding &&
      position.y >= padding &&
      position.x + floating.width <= viewport.width - padding &&
      position.y + floating.height <= viewport.height - padding,
    overflow: {
      top: position.y < padding,
      bottom: position.y + floating.height > viewport.height - padding,
      left: position.x < padding,
      right: position.x + floating.width > viewport.width - padding,
    },
  };
}

/**
 * Get the opposite placement for flipping
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
 * Shift position to keep within viewport
 */
function shiftToViewport(
  position: Position,
  floating: DOMRect,
  padding: number = 8
): Position {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  let { x, y } = position;

  // Shift horizontally
  if (x < padding) {
    x = padding;
  } else if (x + floating.width > viewport.width - padding) {
    x = viewport.width - floating.width - padding;
  }

  // Shift vertically
  if (y < padding) {
    y = padding;
  } else if (y + floating.height > viewport.height - padding) {
    y = viewport.height - floating.height - padding;
  }

  return { x, y };
}

/**
 * Updates the position of a floating element relative to a reference element
 */
export async function updatePosition(
  reference: HTMLElement,
  floating: HTMLElement,
  placement: Placement = 'bottom-start',
  strategy: Strategy = 'absolute',
  offsetDistance: number = 4
): Promise<() => void> {
  const abortController = new AbortController();
  const { signal } = abortController;

  try {
    // Make floating element visible for measurement
    Object.assign(floating.style, {
      position: strategy,
      visibility: 'hidden',
      top: '0',
      left: '0',
      margin: '0',
      zIndex: '9999',
    });

    const referenceRect = reference.getBoundingClientRect();
    const floatingRect = floating.getBoundingClientRect();

    // Calculate initial position
    let position = computePosition(referenceRect, floatingRect, placement, offsetDistance);
    let finalPlacement = placement;

    // Check if it fits, flip if needed
    const { fits, overflow } = fitsInViewport(position, floatingRect);
    if (!fits) {
      const oppositePlacement = getOppositePlacement(placement);
      const oppositePosition = computePosition(referenceRect, floatingRect, oppositePlacement, offsetDistance);
      const oppositeFits = fitsInViewport(oppositePosition, floatingRect);

      if (oppositeFits.fits ||
          (overflow.top && !oppositeFits.overflow.bottom) ||
          (overflow.bottom && !oppositeFits.overflow.top) ||
          (overflow.left && !oppositeFits.overflow.right) ||
          (overflow.right && !oppositeFits.overflow.left)) {
        position = oppositePosition;
        finalPlacement = oppositePlacement;
      }
    }

    // Shift to keep in viewport
    position = shiftToViewport(position, floatingRect);

    if (signal.aborted) return () => {};

    // Apply final position
    Object.assign(floating.style, {
      position: strategy,
      left: `${position.x}px`,
      top: `${position.y}px`,
      margin: '0',
      visibility: 'visible',
    });
  } catch (_error) {
    // Error handled silently
  }

  return () => abortController.abort();
}
