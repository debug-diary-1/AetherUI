<div align="center">

# AetherUI

**A headless, framework-agnostic Web Component library built with Lit**

[![CI](https://github.com/debug-diary-1/AetherUI/actions/workflows/ci.yml/badge.svg)](https://github.com/debug-diary-1/AetherUI/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@aetherui/core?label=%40aetherui%2Fcore)](https://www.npmjs.com/package/@aetherui/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Documentation](https://debug-diary-1.github.io/AetherUI/docs/) · [Storybook](https://debug-diary-1.github.io/AetherUI/storybook/) · [Playground](https://aetherui-seven.vercel.app/playground/) · [Examples](#-examples) · [Contributing](CONTRIBUTING.md)

</div>

---

## ✨ Features

- 🌐 **Framework-Agnostic** - Works with React, Vue, Angular, Svelte, or vanilla JavaScript
- 🎨 **Truly Headless** - Complete styling control with unstyled mode or pre-built themes
- 🎭 **Three Theming Options** - Use pre-built (light/dark), minimal foundation, or fully custom
- ♿️ **Accessible** - Keyboard interactions and ARIA semantics covered by browser tests
- 📦 **Tree-Shakeable** - Import only what you need for optimal bundle sizes
- 🎯 **TypeScript** - Fully typed with excellent IntelliSense support
- 🧪 **Well-Tested** - Browser-based test suite with Web Test Runner + Playwright
- 📚 **Well-Documented** - Extensive documentation with interactive examples
- 🔍 **PR Preview Deployments** - Automatic Storybook preview for every pull request
- 🚀 **Modern** - Built on Web Standards (Custom Elements, Shadow DOM)
- 🤖 **Agent-Ready** - Machine-readable contracts, validated runtime-generated UI, and MCP discovery

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

`@aetherui/core` ships 25 components, each importable from its own subpath (e.g. `@aetherui/core/button`):

| Category | Components |
|----------|------------|
| **Actions & navigation** | Button, Dropdown, Menu, Breadcrumb, Pagination, Tabs |
| **Overlays** | Modal, Drawer, Popover, Tooltip, Toast |
| **Forms** | Input, Textarea, Select, Checkbox, Radio, Switch, Combo, Autocomplete |
| **Feedback & data display** | Alert, Badge, Progress, Spinner, Accordion, TreeView |

See the [component docs](https://debug-diary-1.github.io/AetherUI/docs/components/button/) for props, events, slots, and CSS parts of each.

### Packages

| Package | What it is |
|---------|------------|
| **`@aetherui/core`** | The 25 components above, plus generated React 19 JSX types |
| **`@aetherui/tokens`** | Design tokens and the light / dark / minimal themes |
| **`@aetherui/datatable`** | Sortable, selectable data table |
| **`@aetherui/accordion`** | Standalone accordion (re-exports the core implementation) |
| **`@aetherui/agent`** | Render a validated JSON UI document to AetherUI components — for LLM-generated interfaces |
| **`@aetherui/mcp`** | MCP server exposing the component catalog and the same validation to agent hosts |

## 🤖 Agent-generated UI

AetherUI ships a machine-readable contract so a model can generate an interface
without inventing components or props. `@aetherui/agent` validates a JSON UI
document against the component catalog — unknown components, unknown or
wrongly-typed props, unsafe URLs, and oversized documents are rejected before
anything renders.

```ts
import { defineAeAlert } from '@aetherui/core';
import { renderAgentUi } from '@aetherui/agent';

defineAeAlert();

renderAgentUi(
  document.body,
  {
    version: '1',
    root: {
      component: 'ae-alert',
      props: { variant: 'success' },
      children: ['Saved.'],
    },
  },
);
```

Machine-readable references are published with the docs:
[`llms.txt`](https://debug-diary-1.github.io/AetherUI/docs/llms.txt),
[`component-catalog.json`](https://debug-diary-1.github.io/AetherUI/docs/component-catalog.json),
[`agent-ui.schema.json`](https://debug-diary-1.github.io/AetherUI/docs/agent-ui.schema.json).
See [Generating UI safely](https://debug-diary-1.github.io/AetherUI/docs/agentic-ui/generate-safely/).

## 🎛️ Playground

Want to see **every component in action**? The interactive playground lets you tweak props live and copies out the matching HTML.

- **Online:** https://aetherui-seven.vercel.app/playground/
- **Locally:**

```bash
pnpm --filter @aetherui/playground dev
```

There is also a full [Storybook](https://debug-diary-1.github.io/AetherUI/storybook/) with a story per component and an accessibility addon.

## 💡 Examples

### Using with React

Use React 19+ and include `@aetherui/core/react` in your TypeScript `types` configuration.

```tsx
import { defineAeButton } from '@aetherui/core';
import '@aetherui/tokens/light.css';

defineAeButton();

function App() {
  const handleClick = (e: CustomEvent) => {
    console.log('Button clicked!', e.detail);
  };

  return (
    <ae-button
      variant="primary"
      onae-button-click={handleClick}
    >
      Click me
    </ae-button>
  );
}
```

### Using with Vue

```vue
<template>
  <ae-button
    variant="primary"
    @ae-button-click="handleClick"
  >
    Click me
  </ae-button>
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
  <link rel="stylesheet" href="node_modules/@aetherui/tokens/dist/light.css">
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

- **[Getting Started Guide](https://debug-diary-1.github.io/AetherUI/docs/)**
- **[Component API Documentation](https://debug-diary-1.github.io/AetherUI/docs/components/button/)**
- **[Theming Guide](./docs/THEMING.md)** - Complete theming strategies and examples
- **[CSS Properties Reference](./docs/CSS_PROPERTIES.md)** - All CSS custom properties
- **[Headless Mode Guide](./docs/HEADLESS.md)** - Unstyled mode and complete customization
- **[Preview Deployments](./docs/PREVIEW_DEPLOYMENTS.md)** - Automatic PR previews setup
- **[Framework Integrations](https://debug-diary-1.github.io/AetherUI/docs/getting-started/integrations/react/)** - React, Vue, Angular, Svelte, Solid, vanilla
- **[Agentic UI Guide](./packages/docs/src/content/docs/agentic-ui/generate-safely.mdx)** - Validate and render structured model output
- **[LLM Index](./packages/docs/public/llms.txt)** - Machine-readable documentation and catalog pointers
- **[Architecture](./ARCHITECTURE.md)** and **[Component Standards](./STANDARDS.md)** - How the library is built

## 🛠️ Development

### Prerequisites

- Node.js >= 24.0.0
- pnpm 10.30.3 (pinned via `packageManager`; `corepack enable` will pick it up)

### Setup

```bash
# Clone the repository
git clone https://github.com/debug-diary-1/AetherUI.git
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

# Run the docs site
pnpm docs:dev

# Run the interactive playground
pnpm --filter @aetherui/playground dev
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
│   ├── core/          # Core component library (@aetherui/core)
│   ├── tokens/        # Design tokens + themes (@aetherui/tokens)
│   ├── datatable/     # Data table (@aetherui/datatable)
│   ├── accordion/     # Standalone accordion (@aetherui/accordion)
│   ├── docs/          # Documentation site (Astro + Starlight)
│   ├── storybook/     # Storybook stories
│   └── playground/    # Interactive playground (Vite + Lit)
├── examples/          # Framework integration guides
├── .github/           # GitHub Actions workflows
├── CONTRIBUTING.md    # Contribution guidelines
├── CODE_OF_CONDUCT.md # Community guidelines
└── STANDARDS.md       # Development standards
```

## 🧪 Testing

Component tests run in a real browser (Chromium via Playwright) using [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) and `@open-wc/testing`:

```bash
# Run all package tests
pnpm test

# Run tests with memory optimization (constrained machines / CI)
pnpm test:memory

# Watch mode for a single package
pnpm --filter @aetherui/core test:watch

# Storybook interaction tests / Playwright e2e
pnpm test:storybook
pnpm test:e2e
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

- 🐛 [Report a Bug](https://github.com/debug-diary-1/AetherUI/issues/new?template=bug_report.yml)
- 💡 [Request a Feature](https://github.com/debug-diary-1/AetherUI/issues/new?template=feature_request.yml)
- 📖 [Documentation](https://debug-diary-1.github.io/AetherUI/docs/)
- 💬 [Discussions](https://github.com/debug-diary-1/AetherUI/discussions)

## 🙏 Acknowledgements

- Built with [Lit](https://lit.dev)
- Positioned with [Floating UI](https://floating-ui.com)
- Tested with [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)
- Documentation powered by [Astro](https://astro.build) and [Starlight](https://starlight.astro.build)
- Monorepo managed with [Turborepo](https://turbo.build) · linted & formatted with [oxlint / oxfmt](https://oxc.rs)

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/debug-diary-1/AetherUI?style=social)
![GitHub forks](https://img.shields.io/github/forks/debug-diary-1/AetherUI?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/debug-diary-1/AetherUI?style=social)

---

<div align="center">

Made with ❤️ by the AetherUI Contributors

[⬆ back to top](#aetherui)

</div>
