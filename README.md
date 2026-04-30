<div align="center">

# AetherUI

**A headless, framework-agnostic Web Component library built with Lit**

[![CI](https://github.com/pallavL01/AetherUI/actions/workflows/ci.yml/badge.svg)](https://github.com/pallavL01/AetherUI/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@aetherui/core?label=%40aetherui%2Fcore)](https://www.npmjs.com/package/@aetherui/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[Documentation](https://pallavL01.github.io/AetherUI/) · [Storybook](https://pallavL01.github.io/AetherUI/storybook/) · [Kitchen Sink](#-kitchen-sink-showcase) · [Examples](#examples) · [Contributing](CONTRIBUTING.md)

</div>

---

## ✨ Features

- 🌐 **Framework-Agnostic** - Works with React, Vue, Angular, Svelte, or vanilla JavaScript
- 🎨 **Truly Headless** - Complete styling control with unstyled mode or pre-built themes
- 🎭 **Three Theming Options** - Use pre-built (light/dark), minimal foundation, or fully custom
- ♿️ **Accessible** - WCAG 2.1 Level AA compliant with full keyboard navigation
- 📦 **Tree-Shakeable** - Import only what you need for optimal bundle sizes
- 🎯 **TypeScript** - Fully typed with excellent IntelliSense support
- 🧪 **Well-Tested** - Comprehensive test coverage with Vitest and Web Test Runner
- 📚 **Well-Documented** - Extensive documentation with interactive examples
- 🔍 **PR Preview Deployments** - Automatic Storybook preview for every pull request
- 🚀 **Modern** - Built on Web Standards (Custom Elements, Shadow DOM)

## 📦 Installation

```bash
npm install @aetherui/core @aetherui/tokens
```

Or with pnpm:

```bash
pnpm add @aetherui/core @aetherui/tokens
```

Or with yarn:

```bash
yarn add @aetherui/core @aetherui/tokens
```

## 🚀 Quick Start

### Import and Register Components

```typescript
import { defineAeButton, defineAeModal } from '@aetherui/core';
import '@aetherui/tokens/light.css'; // Import theme

// Register only the components you need
defineAeButton();
defineAeModal();
```

Or register all components at once:

```typescript
import { defineAll } from '@aetherui/core';
import '@aetherui/tokens/light.css';

defineAll();
```

### Use in HTML

```html
<ae-button variant="primary">Click me</ae-button>

<ae-modal open>
  <h2 slot="header">Welcome to AetherUI</h2>
  <div slot="body">
    <p>Build beautiful UIs with framework-agnostic web components!</p>
  </div>
  <div slot="footer">
    <ae-button variant="secondary">Close</ae-button>
  </div>
</ae-modal>
```

### Tree-Shakeable Imports

Import individual components for optimal bundle sizes:

```typescript
import { AeButton } from '@aetherui/core/button';
import { AeModal } from '@aetherui/core/modal';
```

## 🧩 Available Components

| Component        | Description                                    |
| ---------------- | ---------------------------------------------- |
| **Button**       | Primary action trigger with variants and sizes |
| **Modal**        | Dialog overlay with focus management           |
| **Dropdown**     | Context menus with positioning                 |
| **Accordion**    | Expandable sections                            |
| **Tabs**         | Tab navigation with horizontal/vertical modes  |
| **Checkbox**     | Boolean input with indeterminate state         |
| **Radio**        | Mutually exclusive selection                   |
| **Alert**        | Status messages with variants                  |
| **Tooltip**      | Information overlays                           |
| **Toast**        | Temporary notifications                        |
| **TreeView**     | Hierarchical data display                      |
| **Combo**        | Combo box with filtering                       |
| **Autocomplete** | Auto-completing input                          |

## 🍽️ Kitchen Sink Showcase

Want to see **all components in action** with custom styling? Check out our comprehensive Kitchen Sink showcase - a beautiful React app demonstrating every component with custom gradient themes!

```bash
# Run the showcase locally
pnpm showcase

# Or build it
pnpm showcase:build
```

The showcase will be available at **`http://localhost:3000`**

**What's included:**

- 🎨 All 28+ components with custom styling
- 🌈 Beautiful gradient UI proving headless architecture
- 📱 Responsive design
- 🔄 Live interactive demos with state management
- 💻 React integration patterns
- ⚡ TypeScript examples

Perfect for:

- Seeing what's possible with AetherUI's headless components
- Learning React integration patterns
- Understanding CSS custom property customization
- Getting inspiration for your own designs

## 💡 Examples

### Using with React

```tsx
import { defineAeButton } from '@aetherui/core';
import '@aetherui/tokens/light.css';

defineAeButton();

function App() {
  const handleClick = (e: CustomEvent) => {
    console.log('Button clicked!', e.detail);
  };

  return (
    <ae-button variant="primary" onAeButtonClick={handleClick}>
      Click me
    </ae-button>
  );
}
```

### Using with Vue

```vue
<template>
  <ae-button variant="primary" @ae-button-click="handleClick"> Click me </ae-button>
</template>

<script setup>
import { defineAeButton } from '@aetherui/core';
import '@aetherui/tokens/light.css';

defineAeButton();

const handleClick = (e) => {
  console.log('Button clicked!', e.detail);
};
</script>
```

### Using with Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/@aetherui/tokens/dist/light.css" />
  </head>
  <body>
    <ae-button variant="primary">Click me</ae-button>

    <script type="module">
      import { defineAeButton } from '@aetherui/core';

      defineAeButton();

      document.querySelector('ae-button').addEventListener('ae-button-click', (e) => {
        console.log('Button clicked!', e.detail);
      });
    </script>
  </body>
</html>
```

## 🎨 Theming

AetherUI uses CSS custom properties for theming:

```css
/* Import base theme */
@import '@aetherui/tokens/light.css';

/* Customize tokens */
:root {
  --ae-button-bg-primary: #0066cc;
  --ae-button-fg-primary: white;
  --ae-button-radius: 8px;
  --ae-button-padding-x: 1.5rem;
}
```

Or use the dark theme:

```typescript
import '@aetherui/tokens/dark.css';
```

## 📚 Documentation

- **[Getting Started Guide](https://pallavL01.github.io/AetherUI/)**
- **[Component API Documentation](https://pallavL01.github.io/AetherUI/components/)**
- **[Theming Guide](./docs/THEMING.md)** - Complete theming strategies and examples
- **[CSS Properties Reference](./docs/CSS_PROPERTIES.md)** - All CSS custom properties
- **[Headless Mode Guide](./docs/HEADLESS.md)** - Unstyled mode and complete customization
- **[Preview Deployments](./docs/PREVIEW_DEPLOYMENTS.md)** - Automatic PR previews setup
- **[Accessibility Guide](https://pallavL01.github.io/AetherUI/accessibility/)**
- **[Migration Guide](https://pallavL01.github.io/AetherUI/migration/)**

## 🛠️ Development

### Prerequisites

- Node.js >= 22.0.0
- pnpm 10.30.2

### Setup

```bash
# Clone the repository
git clone https://github.com/pallavL01/AetherUI.git
cd AetherUI

# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Run tests
pnpm test

# Build all packages
pnpm build

# Run Storybook
pnpm storybook

# Run Kitchen Sink showcase
pnpm showcase
```

### Preview Deployments

Every PR automatically gets a **live Storybook preview** deployed to Vercel or Netlify:

- 🔍 Review components visually before merging
- 🎨 Test with different themes (light/dark/minimal)
- ♿️ Check accessibility
- 📱 Test responsive behavior

**[Setup Guide](./docs/QUICK_SETUP_VERCEL.md)** - 5-minute Vercel integration

### Project Structure

```
AetherUI/
├── packages/
│   ├── core/          # Core component library
│   ├── tokens/        # Design tokens
│   ├── docs/          # Documentation site
│   ├── storybook/     # Component showcase
│   └── showcase/      # Kitchen Sink React app
├── .github/           # GitHub Actions workflows
├── CONTRIBUTING.md    # Contribution guidelines
├── CODE_OF_CONDUCT.md # Community guidelines
└── STANDARDS.md       # Development standards
```

## 🧪 Testing

We use a dual testing strategy:

```bash
# Run all tests
pnpm test

# Run only unit/API tests (fast, memory-efficient)
pnpm test:api

# Run web component tests (browser-based)
pnpm test:wc

# Run tests with memory optimization
pnpm test:memory
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

Found a security vulnerability? Please refer to our [Security Policy](SECURITY.md) for responsible disclosure.

## 💬 Community

- 🐛 [Report a Bug](https://github.com/pallavL01/AetherUI/issues/new?template=bug_report.yml)
- 💡 [Request a Feature](https://github.com/pallavL01/AetherUI/issues/new?template=feature_request.yml)
- 📖 [Documentation](https://pallavL01.github.io/AetherUI/)
- 💬 [Discussions](https://github.com/pallavL01/AetherUI/discussions)

## 🙏 Acknowledgements

- Built with [Lit](https://lit.dev)
- Positioned with [Floating UI](https://floating-ui.com)
- Tested with [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)
- Documentation powered by [Astro](https://astro.build) and [Starlight](https://starlight.astro.build)
- Monorepo managed with [Nx](https://nx.dev)

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/pallavL01/AetherUI?style=social)
![GitHub forks](https://img.shields.io/github/forks/pallavL01/AetherUI?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/pallavL01/AetherUI?style=social)

---

<div align="center">

Made with ❤️ by the AetherUI Contributors

[⬆ back to top](#aetherui)

</div>
