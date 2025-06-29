// Debug component registration
console.log('=== Starting component registration debug ===');

// First, try to import and call individual define functions
async function debugRegistration() {
  console.log('Attempting to register autocomplete...');
  try {
    const autocompleteModule = await import('@aetherui/core/autocomplete');
    console.log('Autocomplete module loaded:', autocompleteModule);
    
    if (autocompleteModule.defineAeAutocomplete) {
      autocompleteModule.defineAeAutocomplete();
      console.log('✓ defineAeAutocomplete called');
    } else {
      console.error('✗ defineAeAutocomplete not found in module');
    }
    
    // Check if the component is defined
    setTimeout(() => {
      const isDefined = customElements.get('ae-autocomplete');
      console.log('ae-autocomplete defined?', !!isDefined);
      if (isDefined) {
        console.log('ae-autocomplete constructor:', isDefined);
      }
    }, 100);
  } catch (error) {
    console.error('Error with autocomplete:', error);
  }

  console.log('\nAttempting to register combo...');
  try {
    const comboModule = await import('@aetherui/core/combo');
    console.log('Combo module loaded:', comboModule);
    
    if (comboModule.defineAeCombo) {
      comboModule.defineAeCombo();
      console.log('✓ defineAeCombo called');
    } else {
      console.error('✗ defineAeCombo not found in module');
    }
    
    // Check if the component is defined
    setTimeout(() => {
      const isDefined = customElements.get('ae-combo');
      console.log('ae-combo defined?', !!isDefined);
      if (isDefined) {
        console.log('ae-combo constructor:', isDefined);
      }
    }, 100);
  } catch (error) {
    console.error('Error with combo:', error);
  }

  // Try creating an instance
  console.log('\nTrying to create instances...');
  setTimeout(() => {
    try {
      const auto = document.createElement('ae-autocomplete');
      console.log('Created autocomplete element:', auto);
      document.body.appendChild(auto);
      console.log('Autocomplete appended to body');
    } catch (error) {
      console.error('Error creating autocomplete:', error);
    }

    try {
      const combo = document.createElement('ae-combo');
      console.log('Created combo element:', combo);
      document.body.appendChild(combo);
      console.log('Combo appended to body');
    } catch (error) {
      console.error('Error creating combo:', error);
    }
  }, 500);
}

debugRegistration();

export { debugRegistration };