# React Example with AetherUI

This example demonstrates how to use AetherUI components in a React application.

## Installation

```bash
npm install @aetherui/core @aetherui/tokens
# or
yarn add @aetherui/core @aetherui/tokens
# or
pnpm add @aetherui/core @aetherui/tokens
```

## Usage

### TypeScript Setup

Use React 19 or later. Include the generated declarations in your `vite-env.d.ts` or another TypeScript setup file:

```typescript
/// <reference types="vite/client" />
/// <reference types="@aetherui/core/react" />
```

### Basic Button Example

```tsx
import { defineAeButton } from '@aetherui/core';
import '@aetherui/tokens/light.css';

// Register the component once when app loads
defineAeButton();

function App() {
  const handleClick = (e: CustomEvent) => {
    console.log('Button clicked!', e.detail);
  };

  return (
    <div className="App">
      <h1>AetherUI with React</h1>

      <ae-button
        variant="primary"
        onae-button-click={handleClick}
      >
        Click me
      </ae-button>
    </div>
  );
}

export default App;
```

### Modal Example

```tsx
import { useState } from 'react';
import { defineAeButton, defineAeModal } from '@aetherui/core';
import '@aetherui/tokens/light.css';

defineAeButton();
defineAeModal();

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <ae-button
        variant="primary"
        onae-button-click={handleOpen}
      >
        Open Modal
      </ae-button>

      <ae-modal
        open={isOpen}
        onae-modal-close={handleClose}
      >
        <h2 slot="header">Modal Title</h2>
        <div slot="body">
          <p>This is a modal using AetherUI components in React!</p>
        </div>
        <div slot="footer">
          <ae-button
            variant="secondary"
            onae-button-click={handleClose}
          >
            Close
          </ae-button>
        </div>
      </ae-modal>
    </div>
  );
}

export default ModalExample;
```

### Using Refs with Web Components

```tsx
import { useRef, useEffect } from 'react';
import { defineAeButton } from '@aetherui/core';
import type { AeButton } from '@aetherui/core/button';

defineAeButton();

function RefExample() {
  const buttonRef = useRef<AeButton>(null);

  useEffect(() => {
    if (buttonRef.current) {
      console.log('Button element:', buttonRef.current);
      // Access component properties and methods
      buttonRef.current.variant = 'secondary';
    }
  }, []);

  return (
    <ae-button ref={buttonRef}>
      Button with Ref
    </ae-button>
  );
}
```

### Custom Hook for Component Registration

```tsx
// hooks/useAetherUI.ts
import { useEffect, useRef } from 'react';

export function useAetherUIComponent(defineFunction: () => void) {
  const registeredRef = useRef(false);

  useEffect(() => {
    if (!registeredRef.current) {
      defineFunction();
      registeredRef.current = true;
    }
  }, [defineFunction]);
}

// Usage in component:
import { useAetherUIComponent } from './hooks/useAetherUI';
import { defineAeButton } from '@aetherui/core';

function MyComponent() {
  useAetherUIComponent(defineAeButton);

  return <ae-button variant="primary">Click me</ae-button>;
}
```

## Dark Theme

To use the dark theme, simply import it instead:

```tsx
import '@aetherui/tokens/dark.css';
```

## Custom Theming

Override CSS variables in your global CSS:

```css
/* styles/globals.css */
@import '@aetherui/tokens/light.css';

:root {
  --ae-button-bg-primary: #0066cc;
  --ae-button-fg-primary: white;
  --ae-button-radius: 8px;
  --ae-button-padding-x: 1.5rem;
}
```

## Common Issues

### TypeScript Errors

If you get TypeScript errors about custom elements, make sure you've added the type declarations shown above.

### Event Handlers

React preserves the case and dashes of custom event names. For AetherUI events like `ae-button-click`, use the exact event name with an `on` prefix in React 19+:

```tsx
<ae-button onae-button-click={handler}>Click</ae-button>
```

### SSR (Next.js)

Web Components don't work with SSR. Use dynamic imports:

```tsx
import dynamic from 'next/dynamic';

const ClientOnlyComponent = dynamic(
  () => import('./ClientComponent'),
  { ssr: false }
);
```

## Resources

- [AetherUI Documentation](https://debug-diary-1.github.io/AetherUI/docs/)
- [React and Web Components](https://reactjs.org/docs/web-components.html)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)
