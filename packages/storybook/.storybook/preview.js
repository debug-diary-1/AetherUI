// Make custom elements registration safer
const safeCustomElementsDefine = () => {
  // Store a reference to the original define method
  const originalDefine = window.customElements.define;

  // Create a safer version that handles duplicate registrations gracefully
  window.customElements.define = function(name, constructor, options) {
    // Skip registration if element is already defined
    if (window.customElements.get(name)) {
      console.warn(`Element '${name}' already defined, skipping registration`);
      return;
    }
    
    // Otherwise use the original method
    return originalDefine.call(this, name, constructor, options);
  };
};

// Apply the custom elements patch and import components
if (typeof window !== 'undefined') {
  // Apply the patch first
  safeCustomElementsDefine();
  
  // Load core components
  import('@aetherui/core')
    .then(module => {
      if (module.defineAll && typeof module.defineAll === 'function') {
        try {
          module.defineAll();
          console.log('Core components registered successfully');
        } catch (err) {
          console.warn('Error registering core components:', err);
        }
      }
    })
    .catch(err => {
      console.warn('Error loading core components:', err);
    });
}

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;