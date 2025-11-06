# Vue Example with AetherUI

This example demonstrates how to use AetherUI components in a Vue 3 application.

## Installation

```bash
npm install @aetherui/core @aetherui/tokens
# or
yarn add @aetherui/core @aetherui/tokens
# or
pnpm add @aetherui/core @aetherui/tokens
```

## Configuration

### Vite Configuration

Add custom elements configuration to `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat all tags starting with 'ae-' as custom elements
          isCustomElement: (tag) => tag.startsWith('ae-')
        }
      }
    })
  ]
});
```

### TypeScript Configuration

Add type definitions in `env.d.ts`:

```typescript
/// <reference types="vite/client" />

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AeButton: typeof import('@aetherui/core/button').AeButton;
    AeModal: typeof import('@aetherui/core/modal').AeModal;
    AeDropdown: typeof import('@aetherui/core/dropdown').AeDropdown;
    // Add other components as needed
  }
}

export {};
```

## Usage

### Basic Button Example

```vue
<template>
  <div class="app">
    <h1>AetherUI with Vue</h1>

    <ae-button
      variant="primary"
      @ae-button-click="handleClick"
    >
      Click me
    </ae-button>
  </div>
</template>

<script setup lang="ts">
import { defineAeButton } from '@aetherui/core';
import '@aetherui/tokens/light.css';

// Register the component once
defineAeButton();

const handleClick = (e: CustomEvent) => {
  console.log('Button clicked!', e.detail);
};
</script>
```

### Modal Example

```vue
<template>
  <div>
    <ae-button
      variant="primary"
      @ae-button-click="openModal"
    >
      Open Modal
    </ae-button>

    <ae-modal
      :open="isOpen"
      @ae-modal-close="closeModal"
    >
      <h2 slot="header">Modal Title</h2>
      <div slot="body">
        <p>This is a modal using AetherUI components in Vue!</p>
      </div>
      <div slot="footer">
        <ae-button
          variant="secondary"
          @ae-button-click="closeModal"
        >
          Close
        </ae-button>
      </div>
    </ae-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineAeButton, defineAeModal } from '@aetherui/core';
import '@aetherui/tokens/light.css';

defineAeButton();
defineAeModal();

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>
```

### Using Refs with Web Components

```vue
<template>
  <ae-button ref="buttonRef" variant="primary">
    Button with Ref
  </ae-button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineAeButton } from '@aetherui/core';
import type { AeButton } from '@aetherui/core/button';

defineAeButton();

const buttonRef = ref<AeButton>();

onMounted(() => {
  if (buttonRef.value) {
    console.log('Button element:', buttonRef.value);
    // Access component properties and methods
    buttonRef.value.variant = 'secondary';
  }
});
</script>
```

### Composable for Component Registration

```typescript
// composables/useAetherUI.ts
import { onBeforeMount } from 'vue';

let registered = new Set<string>();

export function useAetherUIComponent(name: string, defineFunction: () => void) {
  onBeforeMount(() => {
    if (!registered.has(name)) {
      defineFunction();
      registered.add(name);
    }
  });
}

// Usage in component:
import { useAetherUIComponent } from './composables/useAetherUI';
import { defineAeButton } from '@aetherui/core';

useAetherUIComponent('ae-button', defineAeButton);
```

### Plugin for Global Registration

```typescript
// plugins/aetherui.ts
import { App } from 'vue';
import { defineAll } from '@aetherui/core';
import '@aetherui/tokens/light.css';

export default {
  install(app: App) {
    // Register all AetherUI components globally
    defineAll();
  }
};

// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import AetherUIPlugin from './plugins/aetherui';

const app = createApp(App);
app.use(AetherUIPlugin);
app.mount('#app');
```

### Complete Form Example

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <h2>Sign Up Form</h2>

    <div class="form-field">
      <label for="name">Name</label>
      <input id="name" v-model="form.name" type="text" />
    </div>

    <div class="form-field">
      <label for="email">Email</label>
      <input id="email" v-model="form.email" type="email" />
    </div>

    <ae-checkbox
      v-model:checked="form.newsletter"
      @ae-checkbox-change="handleNewsletterChange"
    >
      Subscribe to newsletter
    </ae-checkbox>

    <div class="form-actions">
      <ae-button type="submit" variant="primary">
        Submit
      </ae-button>
      <ae-button
        type="button"
        variant="ghost"
        @ae-button-click="resetForm"
      >
        Reset
      </ae-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { defineAeButton, defineAeCheckbox } from '@aetherui/core';
import '@aetherui/tokens/light.css';

defineAeButton();
defineAeCheckbox();

const form = reactive({
  name: '',
  email: '',
  newsletter: false
});

const handleSubmit = () => {
  console.log('Form submitted:', form);
  // Handle form submission
};

const handleNewsletterChange = (e: CustomEvent) => {
  console.log('Newsletter:', e.detail.checked);
};

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.newsletter = false;
};
</script>

<style scoped>
.form-field {
  margin-bottom: 1rem;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-field input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}
</style>
```

## Dark Theme

To use the dark theme:

```typescript
import '@aetherui/tokens/dark.css';
```

### Dynamic Theme Switching

```vue
<template>
  <div :class="theme">
    <ae-button @ae-button-click="toggleTheme">
      Toggle Theme
    </ae-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { defineAeButton } from '@aetherui/core';

defineAeButton();

const theme = ref<'light' | 'dark'>('light');

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

watch(theme, (newTheme) => {
  // Dynamically load theme CSS
  const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
  if (themeLink) {
    themeLink.href = `@aetherui/tokens/${newTheme}.css`;
  }
});
</script>
```

## Custom Theming

Override CSS variables in your global styles:

```css
/* styles/main.css */
@import '@aetherui/tokens/light.css';

:root {
  --ae-button-bg-primary: #0066cc;
  --ae-button-fg-primary: white;
  --ae-button-radius: 8px;
  --ae-button-padding-x: 1.5rem;
}
```

## SSR (Nuxt 3)

For Nuxt 3, configure custom elements in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('ae-')
    }
  }
});
```

Import components client-side only:

```vue
<template>
  <ClientOnly>
    <ae-button variant="primary">Click me</ae-button>
  </ClientOnly>
</template>

<script setup>
if (process.client) {
  const { defineAeButton } = await import('@aetherui/core');
  defineAeButton();
}
</script>
```

## Resources

- [AetherUI Documentation](https://pallavL01.github.io/AetherUI/)
- [Vue and Web Components](https://vuejs.org/guide/extras/web-components.html)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)
