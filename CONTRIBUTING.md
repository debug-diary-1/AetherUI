# Contributing to AetherUI

Thank you for your interest in contributing to AetherUI! We welcome contributions from the community and are grateful for any help you can provide.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## How to Contribute

### Reporting Issues

Before creating an issue, please:
- Check the existing issues to avoid duplicates
- Use the issue search feature to see if a similar issue has already been reported
- Include as much detail as possible in your report

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: Run `pnpm install`
3. **Make your changes**: Follow the coding standards and patterns in the codebase
4. **Write/update tests**: Ensure your changes are covered by tests
5. **Run tests**: Use `pnpm test` (or `pnpm test:memory` for constrained environments)
6. **Run linting**: Use `pnpm lint` and fix any issues
7. **Format code**: Use `pnpm format`
   Before submitting, run `pnpm check`. For release changes, run `pnpm check:release`.
8. **Commit your changes**: Use conventional commit messages (see below)
9. **Push to your fork** and submit a pull request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/AetherUI.git
cd AetherUI

# Install dependencies
pnpm install

# Install the browsers used by the test suites
pnpm exec playwright install chromium firefox webkit

# Start development
pnpm dev

# Run tests
pnpm test

# Build all packages
pnpm build
```

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, missing semicolons, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add new tooltip component
fix: resolve modal focus trap issue
docs: update README with new examples
```

### Component Development Guidelines

When creating or modifying components:

1. Follow the component structure in `packages/core/src/[component]/`
2. Use the naming conventions from [STANDARDS.md](STANDARDS.md)
3. Ensure accessibility compliance (WAI-ARIA)
4. Add proper TypeScript types
5. Include JSDoc comments
6. Write comprehensive tests
7. Update documentation if needed

### Testing

- Write browser-based component tests with @open-wc/testing + Web Test Runner (see existing `__tests__` folders)
- Aim for high test coverage
- Test accessibility features
- Test keyboard navigation
- Test event handling

### Documentation

- Update the README if you change functionality
- Add JSDoc comments to all public APIs
- Include examples in your documentation
- Update the component specs if modifying behavior

## Getting Help

If you need help with your contribution:

1. Check the [documentation](https://debug-diary-1.github.io/AetherUI/docs/)
2. Read the [component authoring guide](docs/agents/component-authoring.md) for codebase guidance
3. Open a discussion in the GitHub Discussions tab
4. Reach out in issues with questions

## Recognition

Contributors will be recognized in:
- The project's contributor list
- Release notes for significant contributions
- Our documentation site

Thank you for contributing to AetherUI!
