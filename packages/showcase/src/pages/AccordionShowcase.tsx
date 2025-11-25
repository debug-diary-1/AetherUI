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
    </div>
  );
}

export default AccordionShowcase;
