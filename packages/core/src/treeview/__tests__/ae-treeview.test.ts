/**
 * Web component test for ae-treeview using @open-wc/testing
 */
import { html, fixture, expect, oneEvent, elementUpdated } from '@open-wc/testing';
import '../ae-treeview.js';
import { AeTreeView } from '../ae-treeview.js';
import type { TreeNode } from '../node.js';

describe('ae-treeview', () => {
  let treeView: AeTreeView;
  const simpleNodes: TreeNode[] = [
    {
      id: '1',
      label: 'Root Node',
      children: [
        { id: '1.1', label: 'Child 1' },
        { id: '1.2', label: 'Child 2', children: [{ id: '1.2.1', label: 'Grandchild' }] },
      ],
    },
  ];

  beforeEach(async () => {
    // Create a fresh component before each test
    treeView = await fixture<AeTreeView>(html`<ae-treeview></ae-treeview>`);
  });

  it('should be defined', () => {
    expect(treeView).to.exist;
    expect(treeView.shadowRoot).to.exist;
  });

  it('should render empty state when no data is provided', async () => {
    await elementUpdated(treeView);
    const emptyState = treeView.shadowRoot?.querySelector('[part="empty"]');
    expect(emptyState).to.exist;
    expect(emptyState?.textContent).to.include('No items');
  });

  it('should render nodes when provided', async () => {
    treeView.data = simpleNodes;
    await elementUpdated(treeView);

    const nodeElements = treeView.shadowRoot?.querySelectorAll('.tree-node');
    expect(nodeElements?.length).to.be.greaterThan(0);
    expect(nodeElements?.[0].textContent).to.include('Root Node');
  });

  it('should expand/collapse nodes when caret is clicked', async () => {
    treeView.data = simpleNodes;
    await elementUpdated(treeView);

    // Find the caret for the root node
    const caret = treeView.shadowRoot?.querySelector('.tree-caret') as HTMLElement;
    expect(caret).to.exist;

    // Initially not expanded
    expect(treeView.expanded.length).to.equal(0);

    // Click to expand
    caret.click();
    await elementUpdated(treeView);

    // Should be expanded now
    expect(treeView.expanded).to.include('1');
    expect(treeView.expanded.length).to.equal(1);
  });

  it('should emit expand event when expansion changes', async () => {
    treeView.data = simpleNodes;
    await elementUpdated(treeView);

    const caret = treeView.shadowRoot?.querySelector('.tree-caret') as HTMLElement;

    setTimeout(() => caret.click());

    const event = await oneEvent(treeView, 'ae-treeview-expand');
    expect(event).to.exist;
    expect(event.detail.expanded).to.include('1');
  });

  it('should support selecting nodes', async () => {
    treeView.data = simpleNodes;
    await elementUpdated(treeView);

    // Find a label to select
    const label = treeView.shadowRoot?.querySelector('.tree-label') as HTMLElement;

    setTimeout(() => label.click());

    const event = await oneEvent(treeView, 'ae-treeview-select');
    expect(event).to.exist;
    expect(event.detail.selected).to.include('1');
  });

  it('should support multi-selection when enabled', async () => {
    treeView.data = simpleNodes;
    treeView.selectionMode = 'multiple';
    treeView.expanded = ['1']; // Expand root to see children
    await elementUpdated(treeView);

    // Select first node
    const firstLabel = treeView.shadowRoot?.querySelector('.tree-label') as HTMLElement;
    firstLabel.click();
    await elementUpdated(treeView);

    // Select second node
    const secondLabel = treeView.shadowRoot?.querySelectorAll('.tree-label')[1] as HTMLElement;
    secondLabel.click();
    await elementUpdated(treeView);

    // Check that both are selected
    expect(treeView.selected.length).to.equal(2);
  });

  it('should show loading state when loading is true', async () => {
    treeView.loading = true;
    await elementUpdated(treeView);

    const loadingState = treeView.shadowRoot?.querySelector('[part="loading"]');
    expect(loadingState).to.exist;
  });
});
