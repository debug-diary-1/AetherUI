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

test('sorting is stable, ordered, and does not mutate caller data', () => {
  const rows = [
    { id: 'a', score: 2 },
    { id: 'b', score: 1 },
    { id: 'c', score: 2 },
  ];
  const columns = [{ id: 'score', accessorKey: 'score' }];

  const sorted = datatable.sortData(rows, [{ id: 'score', desc: false }], columns);

  assert.deepEqual(
    sorted.map(({ id }) => id),
    ['b', 'a', 'c'],
  );
  assert.deepEqual(
    rows.map(({ id }) => id),
    ['a', 'b', 'c'],
  );
});

test('column and global filters compose', () => {
  const rows = [
    { name: 'Ada', team: 'Platform' },
    { name: 'Grace', team: 'Compiler' },
    { name: 'Linus', team: 'Platform' },
  ];
  const columns = [
    { id: 'name', accessorKey: 'name' },
    { id: 'team', accessorKey: 'team' },
  ];

  assert.deepEqual(
    datatable.filterData(rows, [{ id: 'team', value: 'platform' }], 'ada', columns),
    [rows[0]],
  );
});

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
