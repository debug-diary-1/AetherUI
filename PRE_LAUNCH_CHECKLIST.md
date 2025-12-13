# AetherUI Pre-Launch Checklist

Use this checklist to ensure your repository is ready for public open source release.

## ✅ Documentation

- [x] CODE_OF_CONDUCT.md created
- [x] SECURITY.md with vulnerability reporting process
- [x] CONTRIBUTING.md with contribution guidelines
- [x] LICENSE file (MIT)
- [x] CHANGELOG.md with version history
- [x] README.md with badges, examples, and clear installation instructions
- [x] STANDARDS.md with development standards
- [x] **DONE: Updated SECURITY.md with contact email** (security@pallavl01.dev)
- [x] **DONE: Updated CODE_OF_CONDUCT.md with enforcement contact** (aetherui-conduct@pallavl01.dev)

## ✅ Repository Configuration

- [x] .gitignore properly configured
- [x] .npmignore files for all publishable packages
- [x] Dependabot configuration (.github/dependabot.yml)
- [x] Issue templates configured
- [x] Pull request template configured
- [ ] **TODO: Enable GitHub Discussions** (Settings → Features → Discussions)
- [ ] **TODO: Add repository description and topics** (Settings → About)
- [ ] **TODO: Add repository social media image** (Settings → Social Preview)

### Repository Settings Checklist

Go to **Settings → General**:
- [ ] Enable "Issues"
- [ ] Enable "Discussions" (recommended)
- [ ] Enable "Preserve this repository" (optional - for archival)
- [ ] Set default branch to `main`
- [ ] Allow squash merging
- [ ] Allow merge commits (optional)
- [ ] Automatically delete head branches after merge

Go to **Settings → Branches**:
- [ ] Add branch protection rule for `main`:
  - [ ] Require pull request reviews before merging (at least 1)
  - [ ] Require status checks to pass before merging
  - [ ] Require branches to be up to date before merging
  - [ ] Require conversation resolution before merging
  - [ ] Do not allow bypassing the above settings

Go to **Settings → Actions → General**:
- [ ] Allow all actions and reusable workflows
- [ ] Allow GitHub Actions to create and approve pull requests (for Dependabot)

Go to **Settings → Code security**:
- [ ] Enable Dependabot alerts
- [ ] Enable Dependabot security updates
- [ ] Enable secret scanning (if available)

## ✅ NPM Configuration

- [x] package.json files have proper metadata (description, author, keywords, homepage, repository)
- [x] publishConfig added to all packages
- [x] files array configured to include only dist/
- [ ] **TODO: Create npm account** (https://www.npmjs.com/signup)
- [ ] **TODO: Claim @aetherui organization on npm** (https://www.npmjs.com/org/create)
- [ ] **TODO: Generate npm token** (npm.com → Access Tokens → Generate New Token → Automation)
- [ ] **TODO: Add NPM_TOKEN to GitHub Secrets** (Settings → Secrets → Actions → New repository secret)

### NPM Pre-Publish Checklist

```bash
# Build all packages
pnpm build

# Test package contents (do NOT actually publish yet)
cd packages/core
pnpm pack --dry-run

# Check what files will be published
npm publish --dry-run

# Repeat for other packages (tokens, accordion, datatable)
```

## ✅ CI/CD

- [x] GitHub Actions workflows configured:
  - [x] ci.yml - Lint, test, build
  - [x] deploy.yml - Deploy documentation
  - [x] publish.yml - Publish to npm
  - [x] deploy-storybook.yml - Deploy Storybook
- [x] Coverage reporting configured (Codecov)
- [ ] **TODO: Sign up for Codecov** (https://about.codecov.io/)
- [ ] **TODO: Add CODECOV_TOKEN to GitHub Secrets**
- [ ] **TODO: Add Nx Cloud token** (optional, for distributed caching)
  - Sign up at https://nx.app/
  - Add NX_CLOUD_ACCESS_TOKEN to GitHub Secrets

## ✅ Testing

- [x] Test suite passes locally
- [ ] **TODO: Run full test suite**: `pnpm test`
- [ ] **TODO: Check test coverage**: Review coverage reports
- [ ] **TODO: Fix any failing tests**
- [ ] **TODO: Ensure all CI checks pass on main branch**

## ✅ Code Quality

- [x] ESLint configured with strict rules
- [x] Prettier configured
- [x] TypeScript strict mode enabled
- [x] no-explicit-any is an error (not warning)
- [ ] **TODO: Run linting**: `pnpm lint`
- [ ] **TODO: Format code**: `pnpm format`
- [ ] **TODO: Fix any linting errors**

## ✅ Examples

- [x] React example created (examples/react-example/)
- [x] Vue example created (examples/vue-example/)
- [x] Vanilla JS example created (examples/vanilla-example/)
- [ ] **TODO: Test each example works correctly**
- [ ] **TODO: Consider adding more examples** (Angular, Svelte, Next.js, Nuxt)

## ✅ Documentation Site

- [ ] **TODO: Build documentation**: `pnpm docs:build`
- [ ] **TODO: Test documentation locally**: `pnpm docs:dev`
- [ ] **TODO: Verify all component docs are complete**
- [ ] **TODO: Check all links work**
- [ ] **TODO: Add getting started guide**
- [ ] **TODO: Add API documentation**
- [ ] **TODO: Deploy documentation** (should happen automatically on push to main)

## ✅ Storybook

- [ ] **TODO: Build Storybook**: `pnpm build-storybook`
- [ ] **TODO: Test Storybook locally**: `pnpm storybook`
- [ ] **TODO: Verify all components have stories**
- [ ] **TODO: Check all interactive examples work**
- [ ] **TODO: Deploy Storybook** (workflow is configured)

## ✅ Security Audit

- [x] No sensitive data in repository (API keys, tokens, credentials)
- [x] .env files properly gitignored
- [x] Security policy documented
- [ ] **TODO: Run security audit**: `pnpm audit`
- [ ] **TODO: Fix any critical/high vulnerabilities**
- [ ] **TODO: Review all dependencies**

## ✅ Legal & Licensing

- [x] MIT License file present
- [x] Copyright year is current (2024)
- [ ] **TODO: Verify all dependencies are MIT-compatible**
- [ ] **TODO: Review all third-party code attributions**

## ✅ Version 1.0.0 Release Preparation

- [ ] **TODO: Update version in all package.json files to 1.0.0**
- [ ] **TODO: Update CHANGELOG.md with release date**
- [ ] **TODO: Create git tag**: `git tag -a v1.0.0 -m "Release v1.0.0"`
- [ ] **TODO: Push tag**: `git push origin v1.0.0`

## ✅ First Release (v0.1.0 or v1.0.0)

### Pre-Release Steps

1. **Update Contact Emails**
   - [ ] SECURITY.md - Add your email for vulnerability reports
   - [ ] CODE_OF_CONDUCT.md - Add enforcement contact email

2. **Test Builds**
   ```bash
   # Clean everything
   pnpm clean
   rm -rf node_modules
   rm -rf packages/*/node_modules
   rm pnpm-lock.yaml

   # Fresh install and build
   pnpm install
   pnpm build
   pnpm test
   ```

3. **Version Bump**
   ```bash
   # Update all package.json versions
   # packages/core/package.json → 0.1.0 (or 1.0.0)
   # packages/tokens/package.json → 0.1.0 (or 1.0.0)
   # packages/accordion/package.json → 0.1.0 (or 1.0.0)
   # packages/datatable/package.json → 0.1.0 (or 1.0.0)
   ```

4. **Create GitHub Release**
   - [ ] Go to Releases → Draft a new release
   - [ ] Create tag: v0.1.0 (or v1.0.0)
   - [ ] Release title: "AetherUI v0.1.0 - Initial Release"
   - [ ] Description: Copy relevant section from CHANGELOG.md
   - [ ] Publish release (this will trigger npm publish workflow if configured)

5. **Manual NPM Publish** (if not using automated workflow)
   ```bash
   # Login to npm
   npm login

   # Publish each package
   cd packages/tokens && npm publish --access public
   cd ../core && npm publish --access public
   cd ../accordion && npm publish --access public
   cd ../datatable && npm publish --access public
   ```

6. **Verify Published Packages**
   - [ ] Check https://www.npmjs.com/package/@aetherui/core
   - [ ] Check https://www.npmjs.com/package/@aetherui/tokens
   - [ ] Install in a test project: `npm install @aetherui/core @aetherui/tokens`
   - [ ] Test basic functionality works

## ✅ Post-Launch

### Announcement

- [ ] **Post on social media**:
  - [ ] Twitter/X
  - [ ] LinkedIn
  - [ ] Dev.to
  - [ ] Reddit (r/webdev, r/javascript)
  - [ ] Hacker News (Show HN)

- [ ] **Submit to directories**:
  - [ ] https://madewithlit.com (for Lit-based projects)
  - [ ] https://bestofjs.org
  - [ ] https://www.webcomponents.org

### Monitoring

- [ ] **Monitor for issues** (GitHub Issues)
- [ ] **Respond to community feedback**
- [ ] **Track npm download stats**
- [ ] **Monitor CI/CD pipelines**
- [ ] **Check Dependabot PRs weekly**
- [ ] **Review security alerts promptly**

### Documentation

- [ ] **Create a blog post** explaining the project
- [ ] **Record demo video** (optional but recommended)
- [ ] **Create GIF demos** for README
- [ ] **Write tutorials** for common use cases

## 🎯 Quick Command Reference

```bash
# Development
pnpm install          # Install dependencies
pnpm dev             # Start dev servers
pnpm build           # Build all packages
pnpm test            # Run tests
pnpm lint            # Lint code
pnpm format          # Format code

# Documentation
pnpm docs:dev        # Start docs dev server
pnpm docs:build      # Build docs
pnpm storybook       # Start Storybook

# Publishing (automated via GitHub Actions)
git tag v0.1.0
git push origin v0.1.0

# Publishing (manual)
cd packages/core && npm publish --access public
```

## 📝 Notes

- Remember to announce the project on relevant communities
- Be prepared to respond to issues and questions quickly initially
- Consider setting up a Discord or Slack for community
- Plan roadmap for future releases
- Thank contributors regularly

---

## Final Checklist Before Going Public

- [ ] All TODO items above are completed
- [ ] Repository is tested end-to-end
- [ ] Documentation is complete and accurate
- [ ] CI/CD pipelines are green
- [ ] No sensitive data in repository
- [ ] Contact emails are updated
- [ ] npm packages are published
- [ ] GitHub repository is made public
- [ ] Announcement is ready to post

🎉 **Ready to launch!**

---

*This checklist was generated for the AetherUI project open source preparation.*
