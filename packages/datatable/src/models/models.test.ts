import { describe, it, expect } from 'vitest';
import { defaultStringFilter, defaultNumberFilter } from './filter-model';
import { defaultSortCompare } from './sort-model';
import { getPaginationInfo } from './pagination-model';

describe('DataTable Models', () => {
  describe('Filter Model', () => {
    it('defaultStringFilter should filter strings correctly', () => {
      expect(defaultStringFilter('hello world', 'hello')).toBe(true);
      expect(defaultStringFilter('hello world', 'world')).toBe(true);
      expect(defaultStringFilter('hello world', 'something')).toBe(false);
      expect(defaultStringFilter('hello world', '')).toBe(true); // Empty filter always matches
    });

    it('defaultNumberFilter should filter numbers correctly', () => {
      expect(defaultNumberFilter(10, '10')).toBe(true);
      expect(defaultNumberFilter(10, '>5')).toBe(true);
      expect(defaultNumberFilter(10, '<5')).toBe(false);
      expect(defaultNumberFilter(10, '>=10')).toBe(true);
      expect(defaultNumberFilter(10, '<=10')).toBe(true);
      expect(defaultNumberFilter(10, '5-15')).toBe(true);
      expect(defaultNumberFilter(10, '')).toBe(true); // Empty filter always matches
    });
  });

  describe('Sort Model', () => {
    it('defaultSortCompare should sort values correctly', () => {
      // String comparison
      expect(defaultSortCompare('a', 'b')).toBeLessThan(0);
      expect(defaultSortCompare('b', 'a')).toBeGreaterThan(0);
      expect(defaultSortCompare('a', 'a')).toBe(0);
      
      // Number comparison
      expect(defaultSortCompare(1, 2)).toBeLessThan(0);
      expect(defaultSortCompare(2, 1)).toBeGreaterThan(0);
      expect(defaultSortCompare(1, 1)).toBe(0);
      
      // Boolean comparison
      expect(defaultSortCompare(true, false)).toBeLessThan(0);
      expect(defaultSortCompare(false, true)).toBeGreaterThan(0);
      expect(defaultSortCompare(true, true)).toBe(0);
      
      // Date comparison
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-02');
      expect(defaultSortCompare(date1, date2)).toBeLessThan(0);
      expect(defaultSortCompare(date2, date1)).toBeGreaterThan(0);
      
      // Descending order
      expect(defaultSortCompare('a', 'b', true)).toBeGreaterThan(0);
      expect(defaultSortCompare(1, 2, true)).toBeGreaterThan(0);
    });
  });

  describe('Pagination Model', () => {
    it('getPaginationInfo should calculate pagination correctly', () => {
      const pagination = { pageIndex: 0, pageSize: 10 };
      const totalRows = 25;
      
      const info = getPaginationInfo(pagination, totalRows);
      
      expect(info.currentPage).toBe(1);
      expect(info.totalPages).toBe(3);
      expect(info.firstRowNumber).toBe(1);
      expect(info.lastRowNumber).toBe(10);
      expect(info.canPreviousPage).toBe(false);
      expect(info.canNextPage).toBe(true);
      
      // Test second page
      const pagination2 = { pageIndex: 1, pageSize: 10 };
      const info2 = getPaginationInfo(pagination2, totalRows);
      
      expect(info2.currentPage).toBe(2);
      expect(info2.firstRowNumber).toBe(11);
      expect(info2.lastRowNumber).toBe(20);
      expect(info2.canPreviousPage).toBe(true);
      expect(info2.canNextPage).toBe(true);
      
      // Test last page
      const pagination3 = { pageIndex: 2, pageSize: 10 };
      const info3 = getPaginationInfo(pagination3, totalRows);
      
      expect(info3.currentPage).toBe(3);
      expect(info3.firstRowNumber).toBe(21);
      expect(info3.lastRowNumber).toBe(25);
      expect(info3.canPreviousPage).toBe(true);
      expect(info3.canNextPage).toBe(false);
    });
  });
});