import { useState } from 'react';
import { CodeExample } from '../components/CodeExample';

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
          <CodeExample
            code={`const [checked, setChecked] = useState(false);

<ae-checkbox
  checked={checked}
  onAeCheckboxChange={(e) => setChecked(e.target.checked)}
>
  I agree to the terms
</ae-checkbox>`}
          />
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
          <CodeExample
            code={`const [value, setValue] = useState('option1');

<ae-radio
  value={value}
  onAeRadioChange={(e) => setValue(e.target.value)}
>
  <ae-radio-option value="option1">Option 1</ae-radio-option>
  <ae-radio-option value="option2">Option 2</ae-radio-option>
  <ae-radio-option value="option3">Option 3</ae-radio-option>
</ae-radio>`}
          />
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
          <CodeExample
            code={`const [value, setValue] = useState('');

<ae-select
  placeholder="Choose an option..."
  value={value}
  onAeSelectChange={(e) => setValue(e.target.value)}
>
  <ae-select-option value="react">React</ae-select-option>
  <ae-select-option value="vue">Vue</ae-select-option>
  <ae-select-option value="angular">Angular</ae-select-option>
</ae-select>`}
          />
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

      <div className="showcase-section">
        <h2 className="section-title">React Integration Example</h2>
        <div className="component-demo">
          <div className="demo-label">Complete Form with State Management</div>
          <CodeExample
            title="React Integration"
            code={`import { useState } from 'react';

function MyForm() {
  const [agreed, setAgreed] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [plan, setPlan] = useState('basic');
  const [framework, setFramework] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ agreed, notifications, plan, framework });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ae-checkbox
        checked={agreed}
        onAeCheckboxChange={(e) => setAgreed(e.target.checked)}
      >
        I agree to the terms
      </ae-checkbox>

      <ae-switch
        checked={notifications}
        onAeSwitchChange={(e) => setNotifications(e.target.checked)}
      >
        Enable notifications
      </ae-switch>

      <ae-radio
        value={plan}
        onAeRadioChange={(e) => setPlan(e.target.value)}
      >
        <ae-radio-option value="basic">Basic</ae-radio-option>
        <ae-radio-option value="pro">Pro</ae-radio-option>
        <ae-radio-option value="enterprise">Enterprise</ae-radio-option>
      </ae-radio>

      <ae-select
        value={framework}
        onAeSelectChange={(e) => setFramework(e.target.value)}
      >
        <ae-select-option value="react">React</ae-select-option>
        <ae-select-option value="vue">Vue</ae-select-option>
      </ae-select>

      <button type="submit">Submit</button>
    </form>
  );
}`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Custom Styling</h2>
        <div className="component-demo">
          <div className="demo-label">CSS Custom Properties</div>
          <CodeExample
            title="CSS Customization"
            code={`/* Global styling in your CSS file */
ae-checkbox,
ae-radio,
ae-switch {
  --ae-checkbox-checked-bg: #111827;
  --ae-checkbox-border-radius: 0.25rem;
  --ae-checkbox-border: 1px solid #d1d5db;
  --ae-checkbox-hover-border: #111827;
  --ae-checkbox-size: 1.25rem;
}

ae-select {
  --ae-input-border: 1px solid #d1d5db;
  --ae-input-border-radius: 0.375rem;
  --ae-input-padding: 0.5rem 0.75rem;
  --ae-input-font-size: 0.875rem;
  --ae-input-focus-border: #111827;
  --ae-input-focus-shadow: 0 0 0 1px #111827;
  --ae-input-bg: white;
}

/* Inline styling in React */
<ae-checkbox
  style={{
    '--ae-checkbox-checked-bg': '#10b981',
    '--ae-checkbox-border-radius': '50%'
  }}
>
  Custom styled checkbox
</ae-checkbox>

<ae-select
  style={{
    '--ae-input-border': '2px solid #3b82f6',
    '--ae-input-border-radius': '0.5rem'
  }}
  placeholder="Select option..."
>
  <ae-select-option value="1">Option 1</ae-select-option>
</ae-select>`}
          />
        </div>
      </div>
    </div>
  );
}

export default FormControlsShowcase;
