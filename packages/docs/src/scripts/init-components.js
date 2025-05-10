/**
 * Global component initialization script for AetherUI documentation
 * This ensures all components are defined across the documentation site
 */

// Track initialization status
let componentsInitialized = false;

/**
 * Initialize all AetherUI components
 */
export async function initAetherComponents() {
  if (componentsInitialized) {
    return;
  }

  try {
    console.log('Initializing AetherUI components...');
    
    // Use the auto-register module
    await import('@aetherui/core/auto-register');
    componentsInitialized = true;
    
    // Apply fallback styling for components that might not be defined yet
    applyFallbackStyling();
    
    console.log('AetherUI components initialized successfully');
  } catch (error) {
    console.error('Failed to initialize AetherUI components:', error);
    
    // Fallback to manual registration if auto-register fails
    try {
      console.warn('Auto-register failed, falling back to direct import');
      
      // Import the core library
      const core = await import('@aetherui/core');
      
      // Use defineAll if available
      if (typeof core.defineAll === 'function') {
        console.log('Defining all AetherUI components manually');
        core.defineAll();
        componentsInitialized = true;
      } else {
        console.warn('defineAll function not found, falling back to individual definitions');
        
        // Define individual components
        const components = [
          'defineAeButton',
          'defineAeAccordion',
          'defineAeAlert',
          'defineAeCheckbox', 
          'defineAeCombo',
          'defineAeDropdown',
          'defineAeModal',
          'defineAeRadio',
          'defineAeRadioGroup',
          'defineAeTabs',
          'defineAeTreeView'
        ];
        
        for (const define of components) {
          if (typeof core[define] === 'function') {
            console.log(`Defining ${define}`);
            core[define]();
          }
        }
        
        componentsInitialized = true;
      }
    } catch (fallbackError) {
      console.error('Complete initialization failure:', fallbackError);
    }
  }
}

/**
 * Apply fallback styling for components that might not be fully defined yet
 */
function applyFallbackStyling() {
  const style = document.createElement('style');
  style.textContent = `
    /* Fallback styles for AetherUI components */
    ae-button:not(:defined) {
      display: inline-block;
      background: var(--ae-button-bg-primary, #5e7ce2);
      color: var(--ae-button-fg-primary, white);
      padding: var(--ae-button-padding-y, 0.5rem) var(--ae-button-padding-x, 1rem);
      border-radius: var(--ae-button-radius, 0.375rem);
      font-family: inherit;
      font-size: inherit;
      cursor: pointer;
      border: none;
    }
    
    /* Fallback for ae-combo */
    ae-combo:not(:defined) {
      display: inline-block;
      width: 100%;
      position: relative;
    }
    
    ae-combo:not(:defined) input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-family: inherit;
      font-size: inherit;
    }
    
    /* Ensure proper spacing in button groups */
    .button-group {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
  `;
  document.head.appendChild(style);
}

// Initialize on DOM content loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initAetherComponents);
  document.addEventListener('astro:page-load', initAetherComponents);
}