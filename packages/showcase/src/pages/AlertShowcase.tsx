import { CodeExample } from '../components/CodeExample';

function AlertShowcase() {
  return (
    <div className="showcase-page">
      <div className="page-header">
        <h1 className="page-title">Alerts & Messages</h1>
        <p className="page-description">
          Alert components for displaying important messages and notifications
        </p>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Alert Variants</h2>
        <div className="component-demo">
          <div className="demo-column">
            <ae-alert variant="info">
              This is an informational alert message
            </ae-alert>
            <ae-alert variant="success">
              Success! Your changes have been saved
            </ae-alert>
            <ae-alert variant="warning">
              Warning: Please review your input
            </ae-alert>
            <ae-alert variant="error">
              Error: Something went wrong
            </ae-alert>
          </div>
          <CodeExample
            code={`<ae-alert variant="info">
  This is an informational alert message
</ae-alert>

<ae-alert variant="success">
  Success! Your changes have been saved
</ae-alert>

<ae-alert variant="warning">
  Warning: Please review your input
</ae-alert>

<ae-alert variant="error">
  Error: Something went wrong
</ae-alert>`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Toast Notifications</h2>
        <div className="component-demo">
          <div className="demo-label">Toast Container</div>
          <ae-toast-container position="top-right">
            <ae-toast variant="success">
              Item added to cart!
            </ae-toast>
          </ae-toast-container>
          <p style={{ color: '#666', marginTop: '1rem' }}>
            Toast notifications appear temporarily with custom positioning
          </p>
          <CodeExample
            code={`<ae-toast-container position="top-right">
  <ae-toast variant="success">
    Item added to cart!
  </ae-toast>
</ae-toast-container>`}
          />
        </div>
      </div>
    </div>
  );
}

export default AlertShowcase;
