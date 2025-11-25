import { CodeExample } from '../components/CodeExample';

function TabsShowcase() {
  return (
    <div className="showcase-page">
      <div className="page-header">
        <h1 className="page-title">Tabs</h1>
        <p className="page-description">
          Tabbed interface components for organizing content
        </p>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Basic Tabs</h2>
        <div className="component-demo">
          <ae-tabs>
            <ae-tab slot="tab" id="tab1">Profile</ae-tab>
            <ae-tab slot="tab" id="tab2">Settings</ae-tab>
            <ae-tab slot="tab" id="tab3">Messages</ae-tab>

            <ae-tab-panel slot="panel" panel-id="tab1">
              <div style={{ padding: '1.5rem' }}>
                <h3>Profile Information</h3>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  View and edit your profile details here.
                </p>
              </div>
            </ae-tab-panel>

            <ae-tab-panel slot="panel" panel-id="tab2">
              <div style={{ padding: '1.5rem' }}>
                <h3>Settings</h3>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  Configure your account settings and preferences.
                </p>
              </div>
            </ae-tab-panel>

            <ae-tab-panel slot="panel" panel-id="tab3">
              <div style={{ padding: '1.5rem' }}>
                <h3>Messages</h3>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  Read your messages and notifications.
                </p>
              </div>
            </ae-tab-panel>
          </ae-tabs>
          <CodeExample
            code={`<ae-tabs>
  <ae-tab slot="tab" id="tab1">Profile</ae-tab>
  <ae-tab slot="tab" id="tab2">Settings</ae-tab>
  <ae-tab slot="tab" id="tab3">Messages</ae-tab>

  <ae-tab-panel slot="panel" panel-id="tab1">
    <div>Profile content...</div>
  </ae-tab-panel>

  <ae-tab-panel slot="panel" panel-id="tab2">
    <div>Settings content...</div>
  </ae-tab-panel>

  <ae-tab-panel slot="panel" panel-id="tab3">
    <div>Messages content...</div>
  </ae-tab-panel>
</ae-tabs>`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">CSS Customization</h2>
        <div className="component-demo">
          <div className="demo-label">Customize with CSS custom properties</div>
          <CodeExample
            title="CSS"
            code={`/* Global styles or in your CSS file */
ae-tabs {
  --ae-tabs-border-color: #e5e7eb;
  --ae-tabs-active-color: #111827;
  --ae-tabs-inactive-color: #6b7280;
  --ae-tabs-active-border: 2px solid #111827;
  --ae-tabs-font-size: 0.875rem;
  --ae-tabs-font-weight: 500;
  --ae-tabs-padding: 0.75rem 1rem;
  --ae-tabs-border-bottom: 1px solid #e5e7eb;
}

/* Or inline with style attribute in React */
<ae-tabs
  style={{
    '--ae-tabs-active-color': '#5e7ce2',
    '--ae-tabs-active-border': '2px solid #5e7ce2'
  }}
>
  {/* tabs content */}
</ae-tabs>`}
          />
        </div>
      </div>
    </div>
  );
}

export default TabsShowcase;
