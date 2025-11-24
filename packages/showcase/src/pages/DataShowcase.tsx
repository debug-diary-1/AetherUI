function DataShowcase() {
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
          <ae-treeview>
            <ae-treeview-item label="Root Folder" expanded>
              <ae-treeview-item label="Documents" expanded>
                <ae-treeview-item label="Work">
                  <ae-treeview-item label="Project A"></ae-treeview-item>
                  <ae-treeview-item label="Project B"></ae-treeview-item>
                </ae-treeview-item>
                <ae-treeview-item label="Personal"></ae-treeview-item>
              </ae-treeview-item>
              <ae-treeview-item label="Pictures">
                <ae-treeview-item label="Vacation"></ae-treeview-item>
                <ae-treeview-item label="Family"></ae-treeview-item>
              </ae-treeview-item>
              <ae-treeview-item label="Videos"></ae-treeview-item>
            </ae-treeview-item>
          </ae-treeview>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Autocomplete</h2>
        <div className="component-demo">
          <div className="demo-label">Search with Suggestions</div>
          <ae-autocomplete
            placeholder="Search programming languages..."
            suggestions='["JavaScript", "TypeScript", "Python", "Java", "C++", "Ruby", "Go", "Rust"]'
          ></ae-autocomplete>
        </div>
      </div>
    </div>
  );
}

export default DataShowcase;
