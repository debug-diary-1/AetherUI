import { useState } from 'react';
import './CodeExample.css';

interface CodeExampleProps {
  code: string;
  title?: string;
}

export function CodeExample({ code, title = 'View Code' }: CodeExampleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="code-example">
      <button
        className="code-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <svg
          className={`code-toggle-icon ${isOpen ? 'open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {title}
      </button>
      {isOpen && (
        <div className="code-content">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
