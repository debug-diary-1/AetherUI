# AetherUI Examples

This directory contains example projects demonstrating how to use AetherUI components with different frameworks and setups.

## Available Examples

### [React Example](./react-example/)
Learn how to integrate AetherUI components into a React application, including:
- TypeScript setup and type definitions
- Component registration
- Event handling
- Using refs with web components
- Custom hooks for registration
- SSR considerations (Next.js)

### [Vue Example](./vue-example/)
Discover how to use AetherUI with Vue 3, covering:
- Vite configuration for custom elements
- TypeScript integration
- Component registration patterns
- Using refs and composables
- Global plugin setup
- Dark theme switching
- SSR setup (Nuxt 3)

### [Vanilla JavaScript Example](./vanilla-example/)
See how to use AetherUI with plain HTML and JavaScript:
- CDN usage (coming soon)
- npm installation with build tools
- Dynamic component creation
- Form validation
- Toast notifications
- Theme switching
- Custom theming

## Quick Start

Each example directory contains a detailed README with:
- Installation instructions
- Basic usage examples
- Advanced patterns
- Common issues and solutions
- Links to resources

## Running Examples Locally

To test any example with the local AetherUI packages:

```bash
# From the repository root
pnpm install
pnpm build

# For React example
cd examples/react-example
npm install
npm run dev

# For Vue example
cd examples/vue-example
npm install
npm run dev

# For Vanilla JS example with Vite
cd examples/vanilla-example
npm install
npm run dev
```

## Framework-Specific Notes

### React
- Use camelCase for event handlers (`onAeButtonClick`)
- Add TypeScript declarations for JSX
- Consider SSR limitations with Next.js
- Web Components work best with React 19+

### Vue
- Configure `isCustomElement` in Vite/Nuxt config
- Events use kebab-case (`@ae-button-click`)
- Excellent two-way binding support
- Great SSR support with proper configuration

### Vanilla JS
- No build configuration needed
- Use standard `addEventListener`
- Works in all modern browsers
- Perfect for progressive enhancement

## Additional Resources

- [AetherUI Documentation](https://debug-diary-1.github.io/AetherUI/docs/)
- [Component API Reference](https://debug-diary-1.github.io/AetherUI/docs/components/button/)
- [Theming Guide](https://github.com/debug-diary-1/AetherUI/blob/main/docs/THEMING.md)
- [GitHub Repository](https://github.com/debug-diary-1/AetherUI)

## Contributing Examples

Have an example for another framework or use case? We'd love to see it! Please:

1. Create a new directory under `examples/`
2. Include a comprehensive README
3. Add your example to this main README
4. Submit a pull request

Examples we'd love to see:
- Angular integration
- Svelte usage
- Solid.js implementation
- Web Components with Lit
- Astro components
- Server-side rendering patterns
- Testing examples (Web Test Runner, Playwright)
- Storybook integration
- Design system implementation

## Need Help?

- 📖 [Read the docs](https://debug-diary-1.github.io/AetherUI/docs/)
- 🐛 [Report issues](https://github.com/debug-diary-1/AetherUI/issues)
- 💬 [Join discussions](https://github.com/debug-diary-1/AetherUI/discussions)
- 💡 [Request features](https://github.com/debug-diary-1/AetherUI/issues/new?template=feature_request.yml)
