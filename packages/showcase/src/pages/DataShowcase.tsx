import { CodeExample } from '../components/CodeExample';
import { useEffect, useRef } from 'react';

function DataShowcase() {
  const treeRef = useRef<any>(null);

  const treeData = [
    {
      id: 'root',
      label: '📁 Root',
      children: [
        {
          id: 'docs',
          label: '📁 Documents',
          children: [
            {
              id: 'work',
              label: '📁 Work',
              children: [
                { id: 'project-a', label: '📄 Project A.docx' },
                { id: 'project-b', label: '📄 Project B.pdf' },
                { id: 'notes', label: '📝 Meeting Notes.txt' },
              ],
            },
            { id: 'personal', label: '📁 Personal' },
            { id: 'resume', label: '📄 Resume.pdf' },
          ],
        },
        {
          id: 'pictures',
          label: '📁 Pictures',
          children: [
            { id: 'vacation', label: '🖼️ Vacation 2024' },
            { id: 'family', label: '🖼️ Family Photos' },
          ],
        },
        { id: 'videos', label: '📁 Videos' },
        { id: 'downloads', label: '📁 Downloads' },
      ],
    },
  ];

  useEffect(() => {
    if (treeRef.current) {
      treeRef.current.data = treeData;
      treeRef.current.expanded = ['root', 'docs', 'work'];
    }
  }, []);

  return (
    <div className="showcase-page">
      <div className="page-header">
        <h1 className="page-title">Data Display</h1>
        <p className="page-description">
          Components for displaying hierarchical and structured data
        </p>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Tree View - Slot-Based (Recommended)</h2>
        <p style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
          Declarative HTML approach - perfect for static or template-based trees. Write natural, nested HTML that's framework-agnostic.
        </p>
        <div className="component-demo">
          <div className="demo-label">Declarative HTML Tree</div>
          <ae-treeview>
            <ae-tree-item label="📁 Documents" expanded>
              <ae-tree-item label="📁 Work" expanded>
                <ae-tree-item label="📄 Project A.docx"></ae-tree-item>
                <ae-tree-item label="📄 Project B.pdf"></ae-tree-item>
                <ae-tree-item label="📝 Meeting Notes.txt"></ae-tree-item>
              </ae-tree-item>
              <ae-tree-item label="📁 Personal">
                <ae-tree-item label="📄 Resume.pdf"></ae-tree-item>
                <ae-tree-item label="🖼️ Vacation Photos"></ae-tree-item>
              </ae-tree-item>
            </ae-tree-item>
            <ae-tree-item label="📁 Pictures">
              <ae-tree-item label="🖼️ Vacation 2024"></ae-tree-item>
              <ae-tree-item label="🖼️ Family Photos"></ae-tree-item>
            </ae-tree-item>
            <ae-tree-item label="📁 Videos"></ae-tree-item>
          </ae-treeview>
          <CodeExample
            code={`<!-- Pure HTML - works anywhere! -->
<ae-treeview>
  <ae-tree-item label="📁 Documents" expanded>
    <ae-tree-item label="📁 Work" expanded>
      <ae-tree-item label="📄 Project A.docx"></ae-tree-item>
      <ae-tree-item label="📄 Project B.pdf"></ae-tree-item>
      <ae-tree-item label="📝 Meeting Notes.txt"></ae-tree-item>
    </ae-tree-item>
    <ae-tree-item label="📁 Personal">
      <ae-tree-item label="📄 Resume.pdf"></ae-tree-item>
      <ae-tree-item label="🖼️ Vacation Photos"></ae-tree-item>
    </ae-tree-item>
  </ae-tree-item>
  <ae-tree-item label="📁 Pictures">
    <ae-tree-item label="🖼️ Vacation 2024"></ae-tree-item>
    <ae-tree-item label="🖼️ Family Photos"></ae-tree-item>
  </ae-tree-item>
  <ae-tree-item label="📁 Videos"></ae-tree-item>
</ae-treeview>

<!-- Works in React, Vue, Angular, or vanilla JS -->
<!-- No framework-specific code needed! -->`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Tree View - Data-Driven</h2>
        <p style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
          Property-based approach - ideal for dynamic data from APIs or state management.
        </p>
        <div className="component-demo">
          <div className="demo-label">Dynamic Data Tree (API/State)</div>
          <ae-treeview ref={treeRef}></ae-treeview>
          <CodeExample
            code={`// For dynamic data (API, state, etc.)
import { useEffect, useRef } from 'react';

function MyComponent() {
  const treeRef = useRef(null);

  const treeData = [
    {
      id: 'root',
      label: '📁 Root',
      children: [
        {
          id: 'docs',
          label: '📁 Documents',
          children: [
            {
              id: 'work',
              label: '📁 Work',
              children: [
                { id: 'project-a', label: '📄 Project A.docx' },
                { id: 'project-b', label: '📄 Project B.pdf' }
              ]
            },
            { id: 'resume', label: '📄 Resume.pdf' }
          ]
        },
        { id: 'pictures', label: '📁 Pictures' },
        { id: 'videos', label: '📁 Videos' }
      ]
    }
  ];

  useEffect(() => {
    if (treeRef.current) {
      // Set data and expanded nodes via property assignment
      treeRef.current.data = treeData;
      treeRef.current.expanded = ['root', 'docs', 'work'];
    }
  }, []);

  return <ae-treeview ref={treeRef}></ae-treeview>;
}

// Or in vanilla JS:
const tree = document.querySelector('ae-treeview');
tree.data = treeData;
tree.expanded = ['root', 'docs'];`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">CSS Customization</h2>
        <div className="component-demo">
          <div className="demo-label">Customize with CSS custom properties</div>
          <CodeExample
            title="CSS"
            code={`/* TreeView styling */
ae-treeview {
  --ae-treeview-indent: 20px;
  --ae-treeview-caret-size: 12px;
  --ae-treeview-row-hover-bg: #f3f4f6;
  --ae-treeview-row-selected-bg: #e0e7ff;
  --ae-treeview-row-selected-fg: #4f46e5;
  --ae-treeview-caret-color: #6b7280;
  --ae-treeview-caret-open: #111827;
  --ae-treeview-focus-color: #4f46e5;
}

/* Autocomplete styling */
ae-autocomplete {
  --ae-autocomplete-bg: white;
  --ae-autocomplete-border: 1px solid #d1d5db;
  --ae-autocomplete-border-radius: 0.375rem;
  --ae-autocomplete-focus-border: #4f46e5;
  --ae-autocomplete-dropdown-bg: white;
  --ae-autocomplete-dropdown-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --ae-autocomplete-item-hover-bg: #f3f4f6;
  --ae-autocomplete-item-selected-bg: #e0e7ff;
}`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Autocomplete</h2>
        <div className="component-demo">
          <div className="demo-label">Search with Suggestions</div>
          <ae-autocomplete
            placeholder="Search programming languages..."
            options='["JavaScript", "TypeScript", "Python", "Java", "C++", "Ruby", "Go", "Rust"]'
          ></ae-autocomplete>
          <CodeExample
            code={`<!-- As HTML attribute -->
<ae-autocomplete
  placeholder="Search programming languages..."
  options='["JavaScript", "TypeScript", "Python", "Java", "C++", "Ruby", "Go", "Rust"]'
></ae-autocomplete>

<!-- Or in React with array prop -->
<ae-autocomplete
  placeholder="Search programming languages..."
  options={["JavaScript", "TypeScript", "Python", "Java", "C++", "Ruby", "Go", "Rust"]}
/>`}
          />
        </div>
      </div>
    </div>
  );
}

export default DataShowcase;
