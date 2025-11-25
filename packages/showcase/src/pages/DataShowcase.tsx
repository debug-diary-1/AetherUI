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
        <h2 className="section-title">Tree View</h2>
        <div className="component-demo">
          <div className="demo-label">File System Explorer</div>
          <ae-treeview ref={treeRef}></ae-treeview>
          <CodeExample
            code={`// For React, use useRef and useEffect for complex data
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
      treeRef.current.expanded = ['root', 'docs'];
    }
  }, []);

  return <ae-treeview ref={treeRef}></ae-treeview>;
}`}
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
