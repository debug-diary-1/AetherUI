---
title: AetherUI Documentation
description: A headless, framework-agnostic Web Component library built on Lit
template: splash
hero:
  tagline: Powerful web components without the framework baggage
  image:
    file: ../../assets/logo.svg
  actions:
    - text: Get Started
      link: /getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: View Components
      link: /components/
      icon: puzzle
      variant: secondary
    - text: GitHub
      link: https://github.com/your-org/aetherui
      icon: github
      variant: minimal
---

import { Card, CardGrid } from '@astrojs/starlight/components';

## Build Better Web Experiences

<CardGrid stagger>
  <Card title="Framework Agnostic" icon="puzzle">
    Works seamlessly with any framework or vanilla JavaScript. No vendor lock-in.
  </Card>

  <Card title="Accessible by Default" icon="accessibility">
    WAI-ARIA compliant and thoroughly tested for inclusivity. Perfect WCAG score.
  </Card>

  <Card title="Fully Themeable" icon="palette">
    Style with CSS variables and shadow parts. Complete control over look and feel.
  </Card>

  <Card title="TypeScript Native" icon="document">
    First-class TypeScript support with accurate types for perfect IDE integration.
  </Card>
</CardGrid>

## Quick Setup

```bash
# Install the core package
npm install @aetherui/core

# Or with pnpm
pnpm add @aetherui/core
```

```js
// Import and define components you need
import { defineAeButton, defineAeTreeview } from '@aetherui/core';

// Register once
defineAeButton();
defineAeTreeview();

// Use anywhere in your HTML
<ae-button variant="primary">Get Started</ae-button>

<ae-treeview aria-label="File explorer">
  <!-- Tree content here -->
</ae-treeview>
```

## Framework Adapters

<CardGrid>
  <Card title="React" icon="seti:react">
    ```jsx
    // React wrapper
    import { AeButton } from '@aetherui/react';
    
    function App() {
      return <AeButton onClick={() => alert('Clicked!')}>Click Me</AeButton>;
    }
    ```
  </Card>

  <Card title="Vue" icon="seti:vue">
    ```vue
    <!-- Vue component -->
    <script setup>
    import { AeButton } from '@aetherui/vue';
    </script>
    
    <template>
      <AeButton @click="handleClick">Click Me</AeButton>
    </template>
    ```
  </Card>
</CardGrid>
