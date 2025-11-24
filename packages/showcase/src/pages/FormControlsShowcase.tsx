import { useState } from 'react';

function FormControlsShowcase() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');

  return (
    <div className="showcase-page">
      <div className="page-header">
        <h1 className="page-title">Form Controls</h1>
        <p className="page-description">
          Checkbox, radio, switch, and select components with native form integration
        </p>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Checkbox</h2>
        <div className="component-demo">
          <div className="demo-label">Checkbox Input</div>
          <ae-checkbox
            checked={checkboxChecked}
            onAeCheckboxChange={(e: any) => setCheckboxChecked(e.target.checked)}
          >
            I agree to the terms and conditions
          </ae-checkbox>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Checked: {checkboxChecked ? 'Yes' : 'No'}
          </p>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Switch</h2>
        <div className="component-demo">
          <div className="demo-label">Toggle Switch</div>
          <ae-switch
            checked={switchChecked}
            onAeSwitchChange={(e: any) => setSwitchChecked(e.target.checked)}
          >
            Enable notifications
          </ae-switch>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Status: {switchChecked ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Radio Group</h2>
        <div className="component-demo">
          <div className="demo-label">Radio Button Group</div>
          <ae-radio
            value={radioValue}
            onAeRadioChange={(e: any) => setRadioValue(e.target.value)}
          >
            <ae-radio-option value="option1">Option 1</ae-radio-option>
            <ae-radio-option value="option2">Option 2</ae-radio-option>
            <ae-radio-option value="option3">Option 3</ae-radio-option>
          </ae-radio>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Selected: {radioValue}
          </p>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Select Dropdown</h2>
        <div className="component-demo">
          <div className="demo-label">Select Component</div>
          <ae-select
            placeholder="Choose an option..."
            value={selectValue}
            onAeSelectChange={(e: any) => setSelectValue(e.target.value)}
          >
            <ae-select-option value="react">React</ae-select-option>
            <ae-select-option value="vue">Vue</ae-select-option>
            <ae-select-option value="angular">Angular</ae-select-option>
            <ae-select-option value="svelte">Svelte</ae-select-option>
          </ae-select>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Selected framework: {selectValue || 'None'}
          </p>
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Combo Box</h2>
        <div className="component-demo">
          <div className="demo-label">Combo Box with Search</div>
          <ae-combo placeholder="Search countries...">
            <ae-combo-option value="us">United States</ae-combo-option>
            <ae-combo-option value="uk">United Kingdom</ae-combo-option>
            <ae-combo-option value="ca">Canada</ae-combo-option>
            <ae-combo-option value="au">Australia</ae-combo-option>
            <ae-combo-option value="de">Germany</ae-combo-option>
          </ae-combo>
        </div>
      </div>
    </div>
  );
}

export default FormControlsShowcase;
