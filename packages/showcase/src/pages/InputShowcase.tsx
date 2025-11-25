import { useState } from 'react';
import { CodeExample } from '../components/CodeExample';

function InputShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div className="showcase-page">
      <div className="page-header">
        <h1 className="page-title">Text Inputs</h1>
        <p className="page-description">
          Text input and textarea components with custom styling and form integration
        </p>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Input Field</h2>
        <div className="component-demo">
          <div className="demo-label">Basic Text Input</div>
          <ae-input
            placeholder="Enter your name..."
            value={inputValue}
            onAeInputInput={(e: any) => setInputValue(e.target.value)}
          />
          <p style={{ marginTop: '1rem', color: '#666' }}>Current value: {inputValue}</p>
          <CodeExample
            code={`const [value, setValue] = useState('');

<ae-input
  placeholder="Enter your name..."
  value={value}
  onAeInputInput={(e) => setValue(e.target.value)}
/>`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Input Types</h2>
        <div className="component-grid">
          <div className="component-demo">
            <div className="demo-label">Email Input</div>
            <ae-input type="email" placeholder="email@example.com" />
          </div>
          <div className="component-demo">
            <div className="demo-label">Password Input</div>
            <ae-input type="password" placeholder="Enter password" />
          </div>
          <div className="component-demo">
            <div className="demo-label">Number Input</div>
            <ae-input type="number" placeholder="Enter amount" />
          </div>
        </div>
        <CodeExample
          code={`<ae-input type="email" placeholder="email@example.com" />
<ae-input type="password" placeholder="Enter password" />
<ae-input type="number" placeholder="Enter amount" />`}
        />
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Textarea</h2>
        <div className="component-demo">
          <div className="demo-label">Multi-line Text Input</div>
          <ae-textarea
            placeholder="Enter your message..."
            rows="5"
            value={textareaValue}
            onAeTextareaInput={(e: any) => setTextareaValue(e.target.value)}
            maxlength="500"
            show-count
          />
          <CodeExample
            code={`const [value, setValue] = useState('');

<ae-textarea
  placeholder="Enter your message..."
  rows="5"
  value={value}
  onAeTextareaInput={(e) => setValue(e.target.value)}
  maxlength="500"
  show-count
/>`}
          />
        </div>
      </div>

      <div className="showcase-section">
        <h2 className="section-title">Input States</h2>
        <div className="component-grid">
          <div className="component-demo">
            <div className="demo-label">Disabled Input</div>
            <ae-input disabled placeholder="Disabled input" value="Cannot edit" />
          </div>
          <div className="component-demo">
            <div className="demo-label">Required Input</div>
            <ae-input label="Email Address" required placeholder="Required field" />
          </div>
        </div>
        <CodeExample
          code={`<ae-input disabled placeholder="Disabled input" value="Cannot edit" />
<ae-input label="Email Address" required placeholder="Required field" />`}
        />
      </div>

      <div className="showcase-section">
        <h2 className="section-title">React Integration Example</h2>
        <div className="component-demo">
          <div className="demo-label">Controlled Inputs with Validation</div>
          <CodeExample
            title="React Integration"
            code={`import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ae-input
        placeholder="Your name"
        value={formData.name}
        onAeInputInput={handleInputChange('name')}
        required
      />
      {errors.name && <span>{errors.name}</span>}

      <ae-input
        type="email"
        placeholder="your@email.com"
        value={formData.email}
        onAeInputInput={handleInputChange('email')}
        required
      />
      {errors.email && <span>{errors.email}</span>}

      <ae-textarea
        placeholder="Your message"
        rows="5"
        value={formData.message}
        onAeTextareaInput={handleInputChange('message')}
      />

      <button type="submit">Send Message</button>
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
ae-input,
ae-textarea {
  --ae-input-border: 1px solid #d1d5db;
  --ae-input-border-radius: 0.375rem;
  --ae-input-padding: 0.5rem 0.75rem;
  --ae-input-font-size: 0.875rem;
  --ae-input-bg: white;
  --ae-input-color: #111827;
  --ae-input-placeholder-color: #9ca3af;

  /* Focus states */
  --ae-input-focus-border: #111827;
  --ae-input-focus-shadow: 0 0 0 1px #111827;

  /* Error states */
  --ae-input-error-border: #ef4444;
  --ae-input-error-shadow: 0 0 0 1px #ef4444;
}

/* Disabled state styling */
ae-input[disabled],
ae-textarea[disabled] {
  --ae-input-bg: #f3f4f6;
  --ae-input-color: #9ca3af;
  opacity: 0.6;
}

/* Inline styling for specific inputs */
<ae-input
  style={{
    '--ae-input-border': '2px solid #3b82f6',
    '--ae-input-border-radius': '0.5rem',
    '--ae-input-focus-border': '#2563eb'
  }}
  placeholder="Custom styled input"
/>

<ae-textarea
  style={{
    '--ae-input-padding': '1rem',
    '--ae-input-border-radius': '0.75rem'
  }}
  rows="5"
/>`}
          />
        </div>
      </div>
    </div>
  );
}

export default InputShowcase;
