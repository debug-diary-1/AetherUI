import { CodeExample } from '../components/CodeExample';

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
          <CodeExample
            code={`<ae-button>Primary Button</ae-button>
<ae-button variant="secondary">Secondary Button</ae-button>
<ae-button variant="ghost">Ghost Button</ae-button>`}
          />
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
          <CodeExample
            code={`<ae-button disabled>Disabled Primary</ae-button>
<ae-button variant="secondary" disabled>Disabled Secondary</ae-button>`}
          />
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
            <CodeExample
              code={`<ae-badge>New</ae-badge>
<ae-badge variant="success">Active</ae-badge>
<ae-badge variant="warning">Pending</ae-badge>
<ae-badge variant="error">Error</ae-badge>`}
            />
          </div>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">React Integration</h2>
        <div className="component-demo">
          <div className="demo-label">With Event Handlers</div>
          <div className="demo-row">
            <ae-button onClick={() => alert('Button clicked!')}>
              Click Me
            </ae-button>
          </div>
          <CodeExample
            title="React Example"
            code={`import { defineAeButton } from '@aetherui/core';

// Register the component
defineAeButton();

function MyComponent() {
  const handleClick = (e) => {
    console.log('Button clicked!', e);
  };

  return (
    <ae-button onClick={handleClick}>
      Click Me
    </ae-button>
  );
}`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Custom Styling</h2>
        <div className="component-demo">
          <div className="demo-label">CSS Custom Properties</div>
          <div className="demo-row">
            <ae-button style={{ '--ae-button-bg': '#10b981', '--ae-button-color': 'white' } as any}>
              Custom Color
            </ae-button>
          </div>
          <CodeExample
            title="CSS Customization"
            code={`/* Global styling in your CSS */
ae-button {
  --ae-button-bg: #111827;
  --ae-button-color: white;
  --ae-button-border-radius: 0.375rem;
  --ae-button-padding: 0.5rem 1rem;
  --ae-button-font-weight: 500;
  --ae-button-hover-bg: #1f2937;
}

ae-button[variant="secondary"] {
  --ae-button-bg: white;
  --ae-button-color: #111827;
  --ae-button-border: 1px solid #d1d5db;
}

/* Or inline styling in React */
<ae-button
  style={{
    '--ae-button-bg': '#10b981',
    '--ae-button-color': 'white'
  }}
>
  Custom Color
</ae-button>`}
          />
        </div>
      </div>
    </div>
  );
}

export default ButtonShowcase;
