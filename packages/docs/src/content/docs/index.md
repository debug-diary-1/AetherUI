---
title: Aether UI
description: A headless, framework-agnostic Web Component library built on Lit
template: splash
hero:
  tagline: A modern, accessible, and framework-agnostic UI library
  image:
    file: ../../assets/logo.svg
  actions:
    - text: Get Started
      link: /getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: View on GitHub
      link: https://github.com/your-org/aetherui
      icon: github
      variant: secondary
---

import { Card, CardGrid } from '@astrojs/starlight/components';

## Why Aether UI?

<CardGrid stagger>
  <Card title="Framework Agnostic" icon="puzzle">
    Built with Web Components, works with any framework - React, Vue, Angular, or vanilla JavaScript.
  </Card>

  <Card title="Accessible by Default" icon="accessibility">
    Every component follows WAI-ARIA guidelines and is thoroughly tested for accessibility.
  </Card>

  <Card title="Headless & Themeable" icon="palette">
    Style components your way using CSS custom properties and shadow parts.
  </Card>

  <Card title="TypeScript First" icon="document">
    Full TypeScript support with accurate types and excellent IDE integration.
  </Card>
</CardGrid>

## Quick Start

```bash
# Install the core package
npm install @aetherui/core

# Or with pnpm
pnpm add @aetherui/core
```

```js
// Import and define the button component
import { defineAeButton } from '@aetherui/core';
defineAeButton();

// Use it in your HTML
<ae-button>Click me!</ae-button>
```
