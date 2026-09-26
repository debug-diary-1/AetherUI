# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Package names, imports, and installation examples now use the owned `@aetherui-kit` npm scope.

### Fixed
- Tooltips stay anchored with absolute or fixed positioning, follow layout changes, and remain readable without theme tokens.
- Repeated core imports across independent bundles reuse registered custom elements.
- Toast subpath helpers remain available in production bundles; alert registration is synchronous.
- DataTable selection uses consistent keys and mode settings; accessible names and resize values track updates.
- Textareas revalidate when readonly or disabled constraints change.
- Input validity updates when native constraints change; empty named inputs and textareas remain in form submission.
- Agent node limits count text children and reject unknown document and node fields before rendering.
- GitHub Pages uploads Storybook from its actual build directory and requires complete site artifacts.
- Patched the docs dependency on `postcss-selector-parser` for GHSA-w9m9-85wc-3x92.

### Changed
- Removed internal controllers and DataTable utilities from public exports; core subpaths are explicitly enumerated.
- Isolated registry consumer checks from the OIDC publishing job and preserved host content in the agent example.
- Documented a runnable Vite-based vanilla example and the first-publication workflow.

## [0.1.0] - Unreleased

### Added
- **`@aetherui-kit/agent`** - validated JSON UI documents rendered to AetherUI
  components, for LLM-generated interfaces
- **`@aetherui-kit/mcp`** - MCP server exposing the component catalog and the same
  semantic validation to agent hosts
- Generated machine-readable artifacts published with the docs: `llms.txt`,
  `component-catalog.json`, `agent-ui.schema.json`, and React 19 JSX types
- Visual regression testing with Chromatic
- Release gates: coverage thresholds, cross-browser runs (Chromium/Firefox/
  WebKit), Storybook interaction tests, Playwright e2e, package-contents
  checks, generated-artifact drift detection, agent evals, and production
  dependency audit
- npm publishing via Trusted Publishing (OIDC) with provenance attestations
- Initial release of AetherUI component library
- Core components:
  - **Button** - Primary action trigger with variants (primary, secondary, ghost) and sizes
  - **Modal** - Dialog overlay with focus management and accessibility
  - **Dropdown** - Context menu with keyboard navigation and positioning
  - **Accordion** - Expandable sections with multiple/single expansion modes
  - **Tabs** - Tab navigation with horizontal/vertical orientations
  - **Checkbox** - Boolean input with checked/unchecked/indeterminate states
  - **Radio** - Mutually exclusive selection with radio groups
  - **Alert** - Status messages with info/warning/error/success variants
  - **Tooltip** - Information overlay with configurable positioning
  - **Toast** - Temporary notifications with queue system and auto-dismiss
  - **TreeView** - Hierarchical data display with expand/collapse
  - **Combo** - Combo box with filtering and keyboard navigation
  - **Autocomplete** - Auto-completing input with custom matching
- Design token system (`@aetherui-kit/tokens`)
- Tree-shakeable component architecture
- Comprehensive TypeScript support with strict mode
- Shadow DOM encapsulation for all components
- Keyboard interactions and ARIA semantics covered by browser tests; verify accessibility with application content and styling
- Extensive JSDoc documentation
- Storybook integration for component showcase
- Component tests with Web Test Runner, Node package tests, and Playwright consumer tests
- Turborepo monorepo with cached package builds
- GitHub Actions CI/CD
- Documentation site with Astro and Starlight

### Infrastructure
- Turborepo setup with pnpm workspaces
- Vite build system with optimized bundles
- Browser, package, and consumer regression tests
- oxlint and oxfmt code quality tools
- Husky pre-commit hooks
- GitHub issue and PR templates
- Comprehensive development standards (STANDARDS.md)

### Documentation
- Getting started guide
- Component API documentation
- Architecture Decision Records (ADRs)
- Contributing guidelines
- Testing guidelines
- Memory-optimized testing strategies

---

## Release Notes Format

### Types of Changes
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities

### Version History Links
[unreleased]: https://github.com/debug-diary-1/AetherUI/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/debug-diary-1/AetherUI/releases/tag/v0.1.0
