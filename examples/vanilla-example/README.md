# Vanilla JavaScript Example with AetherUI

This example demonstrates how to use AetherUI components in plain HTML and JavaScript.

## Installation

### Via npm/yarn/pnpm

```bash
npm install @aetherui/core @aetherui/tokens
# or
yarn add @aetherui/core @aetherui/tokens
# or
pnpm add @aetherui/core @aetherui/tokens
```

### Via CDN (Coming Soon)

```html
<link rel="stylesheet" href="https://unpkg.com/@aetherui/tokens/dist/light.css">
<script type="module" src="https://unpkg.com/@aetherui/core/dist/index.js"></script>
```

## Basic Usage

### Simple HTML Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AetherUI Vanilla JS Example</title>

  <!-- Import AetherUI theme -->
  <link rel="stylesheet" href="./node_modules/@aetherui/tokens/dist/light.css">

  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .demo-section {
      margin: 2rem 0;
      padding: 2rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <h1>AetherUI with Vanilla JavaScript</h1>

  <div class="demo-section">
    <h2>Button Example</h2>
    <ae-button id="myButton" variant="primary">
      Click me
    </ae-button>
    <p id="buttonOutput"></p>
  </div>

  <div class="demo-section">
    <h2>Modal Example</h2>
    <ae-button id="openModalBtn" variant="secondary">
      Open Modal
    </ae-button>

    <ae-modal id="myModal">
      <h2 slot="header">Welcome to AetherUI</h2>
      <div slot="body">
        <p>This is a modal built with Web Components!</p>
      </div>
      <div slot="footer">
        <ae-button id="closeModalBtn" variant="ghost">
          Close
        </ae-button>
      </div>
    </ae-modal>
  </div>

  <script type="module">
    // Import and register components
    import { defineAeButton, defineAeModal } from './node_modules/@aetherui/core/dist/index.js';

    defineAeButton();
    defineAeModal();

    // Button example
    const button = document.getElementById('myButton');
    const buttonOutput = document.getElementById('buttonOutput');

    button.addEventListener('ae-button-click', (e) => {
      console.log('Button clicked!', e.detail);
      buttonOutput.textContent = `Button clicked at ${new Date().toLocaleTimeString()}`;
    });

    // Modal example
    const modal = document.getElementById('myModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    openModalBtn.addEventListener('ae-button-click', () => {
      modal.open = true;
    });

    closeModalBtn.addEventListener('ae-button-click', () => {
      modal.open = false;
    });

    modal.addEventListener('ae-modal-close', () => {
      console.log('Modal closed');
    });
  </script>
</body>
</html>
```

## Using with Build Tools (Vite)

### Project Setup

```bash
npm create vite@latest my-aetherui-app -- --template vanilla-ts
cd my-aetherui-app
npm install @aetherui/core @aetherui/tokens
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AetherUI Vite Example</title>
</head>
<body>
  <div id="app">
    <h1>AetherUI with Vite</h1>

    <ae-button id="counterBtn" variant="primary">
      Count is: <span id="count">0</span>
    </ae-button>

    <ae-dropdown id="menu">
      <ae-button slot="trigger" variant="secondary">
        Menu
      </ae-button>
      <ae-menu-item>Action 1</ae-menu-item>
      <ae-menu-item>Action 2</ae-menu-item>
      <ae-menu-separator></ae-menu-separator>
      <ae-menu-item>Action 3</ae-menu-item>
    </ae-dropdown>
  </div>

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

### src/main.ts

```typescript
import { defineAeButton, defineAeDropdown } from '@aetherui/core';
import '@aetherui/tokens/light.css';
import './style.css';

// Register components
defineAeButton();
defineAeDropdown();

// Counter example
let count = 0;
const counterBtn = document.getElementById('counterBtn') as HTMLElement;
const countSpan = document.getElementById('count') as HTMLElement;

counterBtn?.addEventListener('ae-button-click', () => {
  count++;
  if (countSpan) {
    countSpan.textContent = count.toString();
  }
});

// Dropdown example
const dropdown = document.getElementById('menu');
dropdown?.addEventListener('ae-dropdown-select', (e: Event) => {
  const customEvent = e as CustomEvent;
  console.log('Selected:', customEvent.detail);
});
```

## Advanced Examples

### Dynamic Component Creation

```javascript
import { defineAeButton } from '@aetherui/core';

defineAeButton();

// Create button dynamically
const button = document.createElement('ae-button');
button.setAttribute('variant', 'primary');
button.textContent = 'Dynamic Button';

button.addEventListener('ae-button-click', (e) => {
  console.log('Dynamic button clicked!', e.detail);
});

document.body.appendChild(button);
```

### Form with Validation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Form Example</title>
  <link rel="stylesheet" href="./node_modules/@aetherui/tokens/dist/light.css">
  <style>
    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-group input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
  </style>
</head>
<body>
  <form id="signupForm">
    <h2>Sign Up</h2>

    <div class="form-group">
      <label for="name">Name</label>
      <input id="name" type="text" required>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" type="email" required>
    </div>

    <ae-checkbox id="newsletter">
      Subscribe to newsletter
    </ae-checkbox>

    <ae-checkbox id="terms" required>
      I agree to the terms and conditions
    </ae-checkbox>

    <div class="form-actions">
      <ae-button id="submitBtn" variant="primary">
        Submit
      </ae-button>
      <ae-button id="resetBtn" variant="ghost" type="button">
        Reset
      </ae-button>
    </div>
  </form>

  <ae-toast id="successToast" variant="success"></ae-toast>

  <script type="module">
    import {
      defineAeButton,
      defineAeCheckbox,
      defineAeToast,
      showToast
    } from './node_modules/@aetherui/core/dist/index.js';

    defineAeButton();
    defineAeCheckbox();
    defineAeToast();

    const form = document.getElementById('signupForm');
    const resetBtn = document.getElementById('resetBtn');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      console.log('Form submitted:', data);

      showToast({
        message: 'Sign up successful!',
        variant: 'success',
        duration: 3000
      });
    });

    resetBtn.addEventListener('ae-button-click', () => {
      form.reset();
    });
  </script>
</body>
</html>
```

### Toast Notifications

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Toast Example</title>
  <link rel="stylesheet" href="./node_modules/@aetherui/tokens/dist/light.css">
  <style>
    .button-group {
      display: flex;
      gap: 1rem;
      margin: 2rem 0;
    }
  </style>
</head>
<body>
  <h1>Toast Notifications</h1>

  <div class="button-group">
    <ae-button id="successBtn" variant="primary">
      Success Toast
    </ae-button>
    <ae-button id="errorBtn" variant="primary">
      Error Toast
    </ae-button>
    <ae-button id="warningBtn" variant="secondary">
      Warning Toast
    </ae-button>
    <ae-button id="infoBtn" variant="ghost">
      Info Toast
    </ae-button>
  </div>

  <script type="module">
    import {
      defineAeButton,
      showToast,
      createToastHelpers
    } from './node_modules/@aetherui/core/dist/index.js';

    defineAeButton();

    // Create toast helper methods
    const toast = createToastHelpers();

    document.getElementById('successBtn').addEventListener('ae-button-click', () => {
      toast.success('Operation completed successfully!');
    });

    document.getElementById('errorBtn').addEventListener('ae-button-click', () => {
      toast.error('An error occurred!');
    });

    document.getElementById('warningBtn').addEventListener('ae-button-click', () => {
      toast.warning('Please be careful!');
    });

    document.getElementById('infoBtn').addEventListener('ae-button-click', () => {
      toast.info('Here is some information.');
    });
  </script>
</body>
</html>
```

## Dark Theme

To use the dark theme, change the CSS import:

```html
<link rel="stylesheet" href="./node_modules/@aetherui/tokens/dist/dark.css">
```

### Dynamic Theme Switching

```javascript
let currentTheme = 'light';
const themeLink = document.createElement('link');
themeLink.rel = 'stylesheet';
themeLink.id = 'theme-css';
themeLink.href = './node_modules/@aetherui/tokens/dist/light.css';
document.head.appendChild(themeLink);

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  themeLink.href = `./node_modules/@aetherui/tokens/dist/${currentTheme}.css`;
}

// Add a button to toggle theme
const themeBtn = document.createElement('ae-button');
themeBtn.textContent = 'Toggle Theme';
themeBtn.addEventListener('ae-button-click', toggleTheme);
document.body.appendChild(themeBtn);
```

## Custom Theming

Create a custom CSS file:

```css
/* custom-theme.css */
@import './node_modules/@aetherui/tokens/dist/light.css';

:root {
  --ae-button-bg-primary: #ff6b6b;
  --ae-button-fg-primary: white;
  --ae-button-bg-primary-hover: #ff5252;
  --ae-button-radius: 12px;
  --ae-modal-background: #ffffff;
  --ae-modal-border-radius: 16px;
}
```

Then import it in your HTML:

```html
<link rel="stylesheet" href="./custom-theme.css">
```

## Browser Support

AetherUI works in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- ES Modules

This includes:
- Chrome/Edge 79+
- Firefox 63+
- Safari 13.1+

## Resources

- [AetherUI Documentation](https://pallavL01.github.io/AetherUI/)
- [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)
