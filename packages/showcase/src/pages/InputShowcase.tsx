import { useState } from 'react';

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
          />
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Character count: {textareaValue.length}
          </p>
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
            <ae-input required placeholder="Required field" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputShowcase;
