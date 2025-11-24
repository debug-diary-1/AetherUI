function NavigationShowcase() {
  return (
    <div className="showcase-page">
      <div className="page-header">
        <h1 className="page-title">Navigation</h1>
        <p className="page-description">
          Navigation components including breadcrumbs, menus, and dropdowns
        </p>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Breadcrumb</h2>
        <div className="component-demo">
          <div className="demo-label">Navigation Trail</div>
          <ae-breadcrumb>
            <ae-breadcrumb-item href="/">Home</ae-breadcrumb-item>
            <ae-breadcrumb-item href="/products">Products</ae-breadcrumb-item>
            <ae-breadcrumb-item href="/products/electronics">Electronics</ae-breadcrumb-item>
            <ae-breadcrumb-item current>Laptops</ae-breadcrumb-item>
          </ae-breadcrumb>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Menu</h2>
        <div className="component-demo">
          <div className="demo-label">Menu Component</div>
          <ae-menu>
            <ae-menu-item value="new">New File</ae-menu-item>
            <ae-menu-item value="open">Open File</ae-menu-item>
            <ae-menu-divider></ae-menu-divider>
            <ae-menu-item value="save">Save</ae-menu-item>
            <ae-menu-item value="saveas">Save As...</ae-menu-item>
            <ae-menu-divider></ae-menu-divider>
            <ae-menu-item value="exit">Exit</ae-menu-item>
          </ae-menu>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Dropdown</h2>
        <div className="component-demo">
          <div className="demo-label">Dropdown Menu</div>
          <ae-dropdown>
            <ae-button slot="trigger">Actions</ae-button>
            <ae-dropdown-item value="edit">Edit</ae-dropdown-item>
            <ae-dropdown-item value="duplicate">Duplicate</ae-dropdown-item>
            <ae-dropdown-separator></ae-dropdown-separator>
            <ae-dropdown-item value="delete">Delete</ae-dropdown-item>
          </ae-dropdown>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Pagination</h2>
        <div className="component-demo">
          <div className="demo-label">Page Navigation</div>
          <ae-pagination
            total="100"
            page="1"
            pageSize="10"
          ></ae-pagination>
        </div>
      </div>
    </div>
  );
}

export default NavigationShowcase;
