import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AeTreeView } from '../ae-treeview';

// Make sure the component is defined
if (!customElements.get('ae-treeview')) {
  customElements.define('ae-treeview', AeTreeView);
}

// Simple fixture helper for tests
async function fixture<T extends HTMLElement>(html: string): Promise<T> {
  const template = document.createElement('template');
  template.innerHTML = html;
  const element = template.content.firstElementChild as T;
  document.body.appendChild(element);
  
  if (element.updateComplete) {
    await element.updateComplete;
  }
  
  return element;
}

describe('ae-treeview', () => {
  let element: AeTreeView;
  
  const sampleData = [
    {
      id: 'parent1',
      label: 'Parent Node 1',
      children: [
        { id: 'child1', label: 'Child Node 1' },
        { id: 'child2', label: 'Child Node 2' }
      ]
    },
    {
      id: 'parent2',
      label: 'Parent Node 2',
      children: [
        { id: 'child3', label: 'Child Node 3' }
      ]
    }
  ];

  beforeEach(async () => {
    element = await fixture<AeTreeView>(`<ae-treeview></ae-treeview>`);
    element.data = sampleData;
    await element.updateComplete;
  });

  it('should have default property values', () => {
    expect(element.expanded).toEqual([]);
    expect(element.selected).toEqual([]);
    expect(element.selectionMode).toBe('single');
    expect(element.indentSize).toBe(20);
    expect(element.loading).toBe(false);
    expect(element.emptyMessage).toBe('No items');
  });

  it('should render with sample data', () => {
    const tree = element.shadowRoot!.querySelector('[role="tree"]');
    expect(tree).not.toBeNull();
    
    const treeItems = element.shadowRoot!.querySelectorAll('[role="treeitem"]');
    expect(treeItems.length).toBe(2); // Only parent nodes are visible initially
  });

  it('should expand a node when clicked', async () => {
    // Get the first caret
    const caret = element.shadowRoot!.querySelector('.tree-caret') as HTMLElement;
    expect(caret).not.toBeNull();
    
    // Mock the event listener
    const expandHandler = vi.fn();
    element.addEventListener('ae-treeview-expand', expandHandler);
    
    // Click the caret
    caret.click();
    await element.updateComplete;
    
    // Check if expanded state updated
    expect(element.expanded).toContain('parent1');
    expect(expandHandler).toHaveBeenCalledTimes(1);
    
    // Check if children are now visible
    const treeItems = element.shadowRoot!.querySelectorAll('[role="treeitem"]');
    expect(treeItems.length).toBe(4); // 2 parents + 2 children of first parent
  });

  it('should select a node when clicked', async () => {
    // Get the first label
    const label = element.shadowRoot!.querySelector('.tree-label') as HTMLElement;
    expect(label).not.toBeNull();
    
    // Mock the event listener
    const selectHandler = vi.fn();
    element.addEventListener('ae-treeview-select', selectHandler);
    
    // Click the label
    label.click();
    await element.updateComplete;
    
    // Check if selected state updated
    expect(element.selected).toContain('parent1');
    expect(selectHandler).toHaveBeenCalledTimes(1);
    expect(selectHandler.mock.calls[0][0].detail.selected).toEqual(['parent1']);
  });

  it('should respect selection mode', async () => {
    element.selectionMode = 'multiple';
    await element.updateComplete;
    
    // Get the labels
    const labels = element.shadowRoot!.querySelectorAll('.tree-label');
    
    // Click the first label
    (labels[0] as HTMLElement).click();
    await element.updateComplete;
    
    // Click the second label (should not deselect the first one)
    (labels[1] as HTMLElement).click();
    await element.updateComplete;
    
    // Check if both nodes are selected
    expect(element.selected).toContain('parent1');
    expect(element.selected).toContain('parent2');
    expect(element.selected.length).toBe(2);
  });

  it('should render loading state', async () => {
    element.loading = true;
    await element.updateComplete;
    
    const loadingElement = element.shadowRoot!.querySelector('.tree-loading');
    expect(loadingElement).not.toBeNull();
  });

  it('should render empty state', async () => {
    element.data = [];
    await element.updateComplete;
    
    const emptyElement = element.shadowRoot!.querySelector('.tree-empty');
    expect(emptyElement).not.toBeNull();
    expect(emptyElement!.textContent!.trim()).toBe('No items');
  });
});