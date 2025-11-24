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
            <ae-tab id="tab1" active>Profile</ae-tab>
            <ae-tab id="tab2">Settings</ae-tab>
            <ae-tab id="tab3">Messages</ae-tab>

            <ae-tab-panel tab-id="tab1">
              <div style={{ padding: '1.5rem' }}>
                <h3>Profile Information</h3>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  View and edit your profile details here.
                </p>
              </div>
            </ae-tab-panel>

            <ae-tab-panel tab-id="tab2">
              <div style={{ padding: '1.5rem' }}>
                <h3>Settings</h3>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  Configure your account settings and preferences.
                </p>
              </div>
            </ae-tab-panel>

            <ae-tab-panel tab-id="tab3">
              <div style={{ padding: '1.5rem' }}>
                <h3>Messages</h3>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  Read your messages and notifications.
                </p>
              </div>
            </ae-tab-panel>
          </ae-tabs>
        </div>
      </div>
    </div>
  );
}

export default TabsShowcase;
