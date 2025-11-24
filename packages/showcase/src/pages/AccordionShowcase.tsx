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
            <ae-accordion-item header="What is AetherUI?" expanded>
              <div style={{ padding: '1rem' }}>
                AetherUI is a headless web component library that provides fully customizable,
                accessible components that work with any framework.
              </div>
            </ae-accordion-item>

            <ae-accordion-item header="How do I customize components?">
              <div style={{ padding: '1rem' }}>
                Components can be styled using CSS custom properties (CSS variables) for complete
                control over appearance while maintaining functionality.
              </div>
            </ae-accordion-item>

            <ae-accordion-item header="Is it accessible?">
              <div style={{ padding: '1rem' }}>
                Yes! All components follow WAI-ARIA best practices and include proper keyboard
                navigation and screen reader support.
              </div>
            </ae-accordion-item>

            <ae-accordion-item header="Can I use it with React?" disabled>
              <div style={{ padding: '1rem' }}>
                This item is disabled to demonstrate the disabled state.
              </div>
            </ae-accordion-item>
          </ae-accordion>
        </div>
      </div>
    </div>
  );
}

export default AccordionShowcase;
