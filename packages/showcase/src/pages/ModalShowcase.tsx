import { useState } from 'react';
import { CodeExample } from '../components/CodeExample';

function ModalShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="showcase-page">
      <div className="page-header">
        <h1 className="page-title">Modals & Drawers</h1>
        <p className="page-description">
          Dialog and drawer components for overlay content
        </p>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Modal Dialog</h2>
        <div className="component-demo">
          <div className="demo-label">Click to open modal</div>
          <ae-button onClick={() => setModalOpen(true)}>
            Open Modal
          </ae-button>

          <ae-modal
            open={modalOpen}
            onAeModalClose={() => setModalOpen(false)}
          >
            <h2 slot="header">Modal Title</h2>
            <div slot="body">
              <p style={{ marginBottom: '1rem', color: '#666' }}>
                This is a modal dialog with custom styling. It can contain any content.
              </p>
            </div>
            <div slot="footer" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <ae-button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </ae-button>
              <ae-button onClick={() => setModalOpen(false)}>
                Confirm
              </ae-button>
            </div>
          </ae-modal>

          <CodeExample
            title="React Example"
            code={`import { useState } from 'react';

function MyComponent() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ae-button onClick={() => setModalOpen(true)}>
        Open Modal
      </ae-button>

      <ae-modal
        open={modalOpen}
        onAeModalClose={() => setModalOpen(false)}
      >
        <h2 slot="header">Modal Title</h2>
        <div slot="body">
          <p>Modal content goes here...</p>
        </div>
        <div slot="footer">
          <ae-button onClick={() => setModalOpen(false)}>
            Close
          </ae-button>
        </div>
      </ae-modal>
    </>
  );
}`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Drawer</h2>
        <div className="component-demo">
          <div className="demo-label">Click to open drawer</div>
          <ae-button onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </ae-button>

          <ae-drawer
            open={drawerOpen}
            placement="right"
            onAeDrawerClose={() => setDrawerOpen(false)}
          >
            <h2 slot="header">Drawer Content</h2>
            <div>
              <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                Drawers slide in from the side and are great for navigation or additional content.
              </p>
            </div>
            <div slot="footer">
              <ae-button onClick={() => setDrawerOpen(false)}>
                Close
              </ae-button>
            </div>
          </ae-drawer>

          <CodeExample
            code={`<ae-drawer
  open={drawerOpen}
  placement="right"
  onAeDrawerClose={() => setDrawerOpen(false)}
>
  <h2 slot="header">Drawer Title</h2>
  <div>
    <p>Drawer content...</p>
  </div>
  <div slot="footer">
    <ae-button onClick={() => setDrawerOpen(false)}>Close</ae-button>
  </div>
</ae-drawer>`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Popover</h2>
        <div className="component-demo">
          <div className="demo-label">Hover or click for popover</div>
          <ae-popover>
            <ae-button slot="trigger">Trigger Popover</ae-button>
            <div style={{ padding: '1rem' }}>
              <p>This is popover content</p>
            </div>
          </ae-popover>

          <CodeExample
            code={`<ae-popover>
  <ae-button slot="trigger">Trigger Popover</ae-button>
  <div style={{ padding: '1rem' }}>
    <p>This is popover content</p>
  </div>
</ae-popover>`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Tooltip</h2>
        <div className="component-demo">
          <div className="demo-label">Hover for tooltip</div>
          <ae-tooltip text="This is a helpful tooltip">
            <ae-button>Hover me</ae-button>
          </ae-tooltip>

          <CodeExample
            code={`<ae-tooltip text="This is a helpful tooltip">
  <ae-button>Hover me</ae-button>
</ae-tooltip>`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">CSS Customization</h2>
        <div className="component-demo">
          <div className="demo-label">Customize with CSS custom properties</div>
          <CodeExample
            title="CSS"
            code={`/* Modal styling */
ae-modal {
  --ae-modal-bg: white;
  --ae-modal-border-radius: 0.5rem;
  --ae-modal-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --ae-modal-max-width: 500px;
  --ae-modal-padding: 1.5rem;
}

/* Drawer styling */
ae-drawer {
  --ae-drawer-bg: white;
  --ae-drawer-width: 320px;
  --ae-drawer-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1);
}

/* Tooltip styling */
ae-tooltip {
  --ae-tooltip-bg: #111827;
  --ae-tooltip-fg: white;
  --ae-tooltip-border-radius: 0.375rem;
  --ae-tooltip-padding: 0.5rem 0.75rem;
  --ae-tooltip-font-size: 0.8125rem;
}

/* Popover styling */
ae-popover {
  --ae-popover-bg: white;
  --ae-popover-border: 1px solid #e5e7eb;
  --ae-popover-border-radius: 0.5rem;
  --ae-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}`}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalShowcase;
