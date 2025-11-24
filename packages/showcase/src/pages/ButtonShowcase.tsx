function ButtonShowcase() {
  return (
    <div className="showcase-page">
      <div className="page-header">
        <h1 className="page-title">Buttons & Badges</h1>
        <p className="page-description">
          Interactive button components and status badge elements with custom styling
        </p>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Button Variants</h2>
        <div className="component-demo">
          <div className="demo-label">Primary, Secondary & Ghost</div>
          <div className="demo-row">
            <ae-button>Primary Button</ae-button>
            <ae-button variant="secondary">Secondary Button</ae-button>
            <ae-button variant="ghost">Ghost Button</ae-button>
          </div>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Button States</h2>
        <div className="component-demo">
          <div className="demo-label">Disabled State</div>
          <div className="demo-row">
            <ae-button disabled>Disabled Primary</ae-button>
            <ae-button variant="secondary" disabled>Disabled Secondary</ae-button>
          </div>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Badges</h2>
        <div className="component-grid">
          <div className="component-demo">
            <div className="demo-label">Status Badges</div>
            <div className="demo-row">
              <ae-badge>New</ae-badge>
              <ae-badge variant="success">Active</ae-badge>
              <ae-badge variant="warning">Pending</ae-badge>
              <ae-badge variant="error">Error</ae-badge>
            </div>
          </div>
        </div>
      </div>

      <div className="showcase-section" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <h2 className="section-title" style={{ color: 'white', borderBottomColor: 'rgba(255,255,255,0.3)' }}>
          Custom Styled Example
        </h2>
        <div className="component-demo" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' }}>
          <div className="demo-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Buttons with gradient background context
          </div>
          <div className="demo-row">
            <ae-button>Gradient Primary</ae-button>
            <ae-button variant="ghost">Ghost on Dark</ae-button>
            <ae-badge>Premium</ae-badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonShowcase;
