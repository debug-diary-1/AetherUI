import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.HTMLElement ??= class HTMLElement {};

const registry = new Map();
globalThis.customElements ??= {
  define(name, constructor) {
    if (registry.has(name)) throw new Error(`Custom element already defined: ${name}`);
    registry.set(name, constructor);
  },
  get(name) {
    return registry.get(name);
  },
};

const datatable = await import('../dist/index.js');

test('the built entry point registers each public custom element', () => {
  assert.equal(customElements.get('ae-datatable'), datatable.AeDataTable);
  assert.equal(customElements.get('ae-datatable-header'), datatable.AeDatatableHeader);
  assert.equal(customElements.get('ae-datatable-row'), datatable.AeDatatableRow);
  assert.equal(customElements.get('ae-datatable-cell'), datatable.AeDatatableCell);
  assert.equal(datatable.defineDataTableElements(), true);
});

// Sorting and filtering are exercised through the rendered table in scripts/consumer-smoke.test.mjs.

test('pagination clamps the visible row range at the end of a data set', () => {
  assert.deepEqual(datatable.getPaginationInfo({ page: 3, pageSize: 10, totalItems: 23 }), {
    currentPage: 3,
    totalPages: 3,
    firstRowIndex: 20,
    lastRowIndex: 22,
    firstRowNumber: 21,
    lastRowNumber: 23,
    canPreviousPage: true,
    canNextPage: false,
  });
});
