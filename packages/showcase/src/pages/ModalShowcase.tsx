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
            <div style={{ padding: '2rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>Modal Title</h2>
              <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                This is a modal dialog with custom styling. It can contain any content.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <ae-button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </ae-button>
                <ae-button onClick={() => setModalOpen(false)}>
                  Confirm
                </ae-button>
              </div>
            </div>
          </ae-modal>

          <CodeExample
            title="React Example"
            code={`import { useState } from 'react';
import { defineAeModal } from '@aetherui/core';

defineAeModal();

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
        <div style={{ padding: '2rem' }}>
          <h2>Modal Title</h2>
          <p>Modal content goes here...</p>
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
            position="right"
            onAeDrawerClose={() => setDrawerOpen(false)}
          >
            <div style={{ padding: '2rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>Drawer Content</h2>
              <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                Drawers slide in from the side and are great for navigation or additional content.
              </p>
              <ae-button onClick={() => setDrawerOpen(false)}>
                Close
              </ae-button>
            </div>
          </ae-drawer>

          <CodeExample
            code={`<ae-drawer
  open={drawerOpen}
  position="right"
  onAeDrawerClose={() => setDrawerOpen(false)}
>
  <div style={{ padding: '2rem' }}>
    <h2>Drawer Title</h2>
    <p>Drawer content...</p>
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
          <ae-tooltip content="This is a helpful tooltip">
            <ae-button>Hover me</ae-button>
          </ae-tooltip>

          <CodeExample
            code={`<ae-tooltip content="This is a helpful tooltip">
  <ae-button>Hover me</ae-button>
</ae-tooltip>`}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalShowcase;
