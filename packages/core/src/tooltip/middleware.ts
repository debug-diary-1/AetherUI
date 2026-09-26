import { computePosition, autoUpdate, offset, flip, shift, arrow } from '@floating-ui/dom';
import type { Placement, Strategy } from '@floating-ui/dom';

export type { Placement, Strategy } from '@floating-ui/dom';

export interface PositionOptions {
  placement: Placement;
  strategy: Strategy;
  arrowElement?: HTMLElement | null;
  offsetDistance?: number;
}

/** Resolve coordinates in the overlay's actual containing block, including transforms. */
export function positionTooltip(
  anchor: HTMLElement,
  tooltip: HTMLElement,
  options: PositionOptions,
) {
  return computePosition(anchor, tooltip, {
    placement: options.placement,
    strategy: options.strategy,
    middleware: [
      offset(options.offsetDistance ?? 8),
      flip({ padding: 5 }),
      shift({ padding: 5 }),
      options.arrowElement ? arrow({ element: options.arrowElement, padding: 4 }) : undefined,
    ],
  });
}

/** Track scrolling, resizing, and layout shifts while the overlay is mounted. */
export function createAutoUpdate(anchor: HTMLElement, tooltip: HTMLElement, update: () => void) {
  return autoUpdate(anchor, tooltip, update);
}
