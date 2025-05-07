# AetherUI Storybook

This package contains the Storybook documentation and visual testing environment for the AetherUI component library.

## Getting Started

To run Storybook locally:

```bash
# From the root directory
pnpm storybook

# Or directly from this package
pnpm --filter @aetherui/storybook storybook
```

This will start the Storybook development server at http://localhost:6006.

## Visual Testing

Storybook provides a visual testing environment for all AetherUI components. Use it to:

1. Explore components and their variants
2. Test interactive states
3. Check accessibility with the a11y addon
4. View component documentation

## Adding New Stories

To add stories for a new component:

1. Create a new file in `src/stories/ComponentName.stories.js`
2. Import the component from `@aetherui/core`
3. Define the story with all relevant variants and states
4. Ensure component is registered using its respective `define` function

Example:

```js
import { html } from 'lit';
import { defineAeComponent } from '@aetherui/core';

// Register the component
defineAeComponent();

export default {
  title: 'Components/ComponentName',
  tags: ['autodocs'],
  // ... configuration
};

export const Default = {
  args: {
    // ... default args
  }
};
```

## Building for Deployment

To build Storybook for deployment:

```bash
pnpm build-storybook
```

This creates a static web application in the `storybook-static` directory that can be deployed to any static hosting service. 