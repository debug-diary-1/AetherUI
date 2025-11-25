import { CodeExample } from '../components/CodeExample';

function DataShowcase() {
  const treeData = [
    {
      id: 'root',
      label: 'Root Folder',
      children: [
        {
          id: 'docs',
          label: 'Documents',
          children: [
            {
              id: 'work',
              label: 'Work',
              children: [
                { id: 'project-a', label: 'Project A' },
                { id: 'project-b', label: 'Project B' },
              ],
            },
            { id: 'personal', label: 'Personal' },
          ],
        },
        {
          id: 'pictures',
          label: 'Pictures',
          children: [
            { id: 'vacation', label: 'Vacation' },
            { id: 'family', label: 'Family' },
          ],
        },
        { id: 'videos', label: 'Videos' },
      ],
    },
  ];

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
          <div className="demo-label">Hierarchical Data</div>
          <ae-treeview
            data={JSON.stringify(treeData)}
            expanded={JSON.stringify(['root', 'docs'])}
          ></ae-treeview>
          <CodeExample
            code={`// Define your tree structure
const treeData = [
  {
    id: 'root',
    label: 'Root Folder',
    children: [
      {
        id: 'docs',
        label: 'Documents',
        children: [
          {
            id: 'work',
            label: 'Work',
            children: [
              { id: 'project-a', label: 'Project A' },
              { id: 'project-b', label: 'Project B' }
            ]
          },
          { id: 'personal', label: 'Personal' }
        ]
      },
      {
        id: 'pictures',
        label: 'Pictures',
        children: [
          { id: 'vacation', label: 'Vacation' },
          { id: 'family', label: 'Family' }
        ]
      },
      { id: 'videos', label: 'Videos' }
    ]
  }
];

// In React, pass as JSON string for HTML attribute
<ae-treeview
  data={JSON.stringify(treeData)}
  expanded={JSON.stringify(['root', 'docs'])}
></ae-treeview>

// Or use property assignment in vanilla JS
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
