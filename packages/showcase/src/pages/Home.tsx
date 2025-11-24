import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1 className="hero-title">AetherUI Kitchen Sink</h1>
        <p className="hero-subtitle">
          A comprehensive showcase of headless web components built with modern standards
        </p>
        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Fully Customizable</h3>
            <p>Headless components with complete styling freedom using CSS custom properties</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Framework Agnostic</h3>
            <p>Works seamlessly with React, Vue, Angular, or vanilla JavaScript</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">♿</div>
            <h3>Accessible by Default</h3>
            <p>Built with WAI-ARIA best practices and keyboard navigation support</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Modern Standards</h3>
            <p>Leverages native web platform features and latest browser APIs</p>
          </div>
        </div>
      </div>

      <div className="component-overview">
        <h2 className="overview-title">Component Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <h3>Buttons & Badges</h3>
            <p>Interactive button elements and status badges</p>
            <span className="component-count">2 components</span>
          </div>
          <div className="category-card">
            <h3>Form Controls</h3>
            <p>Input fields, checkboxes, radios, selects, and switches</p>
            <span className="component-count">7 components</span>
          </div>
          <div className="category-card">
            <h3>Navigation</h3>
            <p>Breadcrumbs, menus, tabs, and dropdowns</p>
            <span className="component-count">5 components</span>
          </div>
          <div className="category-card">
            <h3>Feedback</h3>
            <p>Alerts, toasts, modals, and progress indicators</p>
            <span className="component-count">6 components</span>
          </div>
          <div className="category-card">
            <h3>Data Display</h3>
            <p>Tables, trees, accordions, and tooltips</p>
            <span className="component-count">5 components</span>
          </div>
          <div className="category-card">
            <h3>Advanced</h3>
            <p>Autocomplete, combo boxes, and popovers</p>
            <span className="component-count">3 components</span>
          </div>
        </div>
      </div>

      <div className="quick-demo">
        <h2 className="demo-title">Quick Demo</h2>
        <div className="demo-container">
          <ae-button>Primary Button</ae-button>
          <ae-button variant="secondary">Secondary Button</ae-button>
          <ae-badge>New</ae-badge>
          <ae-spinner></ae-spinner>
        </div>
      </div>
    </div>
  );
}

export default Home;
