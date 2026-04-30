# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Visual regression testing with Chromatic
- Additional component variants and sizes
- Enhanced theming system
- Performance optimizations

## [0.1.0] - 2024-TBD

### Added

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
- Design token system (`@aetherui/tokens`)
- Tree-shakeable component architecture
- Comprehensive TypeScript support with strict mode
- Shadow DOM encapsulation for all components
- WCAG 2.1 Level AA accessibility compliance
- Extensive JSDoc documentation
- Storybook integration for component showcase
- Comprehensive test suite with Vitest and Web Test Runner
- Nx monorepo with optimized build pipeline
- GitHub Actions CI/CD
- Documentation site with Astro and Starlight

### Infrastructure

- Nx monorepo setup with pnpm workspaces
- Vite build system with optimized bundles
- Automated testing with memory optimization
- ESLint and Prettier code quality tools
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

[unreleased]: https://github.com/pallavL01/AetherUI/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/pallavL01/AetherUI/releases/tag/v0.1.0
