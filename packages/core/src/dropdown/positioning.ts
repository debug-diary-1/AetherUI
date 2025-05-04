import { computePosition, flip, offset, shift, Placement, Strategy } from '@floating-ui/dom';

/**
 * Updates the position of a floating element relative to a reference element
 * using floating-ui
 */
export async function updatePosition(
  reference: HTMLElement,
  floating: HTMLElement,
  placement: Placement = 'bottom-start',
  strategy: Strategy = 'absolute',
  offsetDistance: number = 4
): Promise<void> {
  // Create a new AbortController to cancel ongoing computations
  const abortController = new AbortController();
  const { signal } = abortController;

  try {
    const { x, y } = await computePosition(reference, floating, {
      placement,
      strategy,
      middleware: [
        offset(offsetDistance),
        flip({ padding: 8 }),
        shift({ padding: 8 })
      ]
    });

    // Ensure we haven't been aborted
    if (signal.aborted) return;

    // Set position
    Object.assign(floating.style, {
      position: strategy,
      left: `${x}px`,
      top: `${y}px`,
      margin: '0'
    });
  } catch (error) {
    console.error('Error positioning dropdown:', error);
  }

  return abortController.abort.bind(abortController);
} 