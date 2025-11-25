import { CodeExample } from '../components/CodeExample';

function AccordionShowcase() {
  return (
    <div className="showcase-page">
      <div className="page-header">
        <h1 className="page-title">Accordion</h1>
        <p className="page-description">
          Collapsible content sections for organizing information
        </p>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Basic Accordion</h2>
        <div className="component-demo">
          <ae-accordion>
            <ae-accordion-item open>
              <span slot="header">What is AetherUI?</span>
              <div style={{ padding: '1rem' }}>
                AetherUI is a headless web component library that provides fully customizable,
                accessible components that work with any framework.
              </div>
            </ae-accordion-item>

            <ae-accordion-item>
              <span slot="header">How do I customize components?</span>
              <div style={{ padding: '1rem' }}>
                Components can be styled using CSS custom properties (CSS variables) for complete
                control over appearance while maintaining functionality.
              </div>
            </ae-accordion-item>

            <ae-accordion-item>
              <span slot="header">Is it accessible?</span>
              <div style={{ padding: '1rem' }}>
                Yes! All components follow WAI-ARIA best practices and include proper keyboard
                navigation and screen reader support.
              </div>
            </ae-accordion-item>

            <ae-accordion-item disabled>
              <span slot="header">Can I use it with React?</span>
              <div style={{ padding: '1rem' }}>
                This item is disabled to demonstrate the disabled state.
              </div>
            </ae-accordion-item>
          </ae-accordion>
          <CodeExample
            code={`<ae-accordion>
  <ae-accordion-item open>
    <span slot="header">What is AetherUI?</span>
    <div>Content for the first item...</div>
  </ae-accordion-item>

  <ae-accordion-item>
    <span slot="header">How do I customize components?</span>
    <div>Content for the second item...</div>
  </ae-accordion-item>

  <ae-accordion-item>
    <span slot="header">Is it accessible?</span>
    <div>Content for the third item...</div>
  </ae-accordion-item>

  <ae-accordion-item disabled>
    <span slot="header">Disabled item</span>
    <div>This item is disabled...</div>
  </ae-accordion-item>
</ae-accordion>`}
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
ae-accordion {
  --ae-accordion-border: 1px solid #e5e7eb;
  --ae-accordion-border-radius: 0.5rem;
  --ae-accordion-header-font-size: 0.9375rem;
  --ae-accordion-header-font-weight: 600;
  --ae-accordion-header-color: #111827;
  --ae-accordion-header-padding: 1rem 1.25rem;
  --ae-accordion-header-hover-bg: #f9fafb;
  --ae-accordion-header-active-bg: #f3f4f6;
  --ae-accordion-panel-padding: 0 1.25rem 1rem;
}

/* Customize header content styling */
ae-accordion-item [slot="header"] {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
}

/* Or inline with style attribute */
<ae-accordion
  style={{
    '--ae-accordion-header-active-bg': '#e0e7ff',
    '--ae-accordion-header-color': '#4f46e5'
  }}
>
  {/* accordion items */}
</ae-accordion>`}
          />
        </div>
      </div>
    </div>
  );
}

export default AccordionShowcase;
