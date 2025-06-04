import { describe, it, expect } from 'vitest';
import { calculateVirtualization } from '../src/utils/virtualization-utils';

const options = {
  totalRows: 100,
  rowHeight: 20,
  viewportHeight: 100,
  overscan: 5
};

describe('calculateVirtualization', () => {
  it('calculates indexes at top of list', () => {
    const result = calculateVirtualization(options, 0);
    expect(result).toEqual({
      startIndex: 0,
      endIndex: 9,
      totalHeight: 2000,
      offsetY: 0
    });
  });

  it('handles scroll positions correctly', () => {
    const result = calculateVirtualization(options, 60);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(12);
    expect(result.offsetY).toBe(0);
  });

  it('applies overscan when scrolled further down', () => {
    const result = calculateVirtualization(options, 400);
    expect(result.startIndex).toBe(15);
    expect(result.endIndex).toBe(29);
    expect(result.offsetY).toBe(300);
  });
});
