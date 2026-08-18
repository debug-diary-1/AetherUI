# Aether UI Documentation Deployment

This document describes how to deploy the Aether UI documentation to GitHub Pages.

## Automated Deployment

The documentation is automatically deployed to GitHub Pages using GitHub Actions. The workflow is defined in `.github/workflows/deploy-docs.yml`.

The workflow is triggered on:
- Pushes to the `main` branch
- Manual triggers from the GitHub Actions tab

## Manual Deployment

To manually deploy the documentation:

1. Build the docs:
   ```bash
   pnpm docs:build
   ```

2. Run the deployment script:
   ```bash
   pnpm deploy:docs
   ```

This will:
- Build the documentation
- Add a `.nojekyll` file to prevent GitHub Pages from using Jekyll
- Switch to the `gh-pages` branch
- Copy the built documentation to the `docs` directory
- Commit and push the changes
- Switch back to the previous branch

## Configuration

The site is configured in `packages/docs/astro.config.mjs`. The `site`/`base` fields default to the Vercel preview layout (`/docs/`) and are overridden via `DOCS_SITE` / `DOCS_BASE` env vars in `.github/workflows/deploy.yml` for GitHub Pages (`https://debug-diary-1.github.io/AetherUI/docs/`).

## GitHub Pages Setup

The GitHub repository should be configured to use GitHub Pages with the following settings:
- Source: Deploy from a branch
- Branch: gh-pages
- Directory: /docs

## Troubleshooting

If the deployment fails, check:
1. The GitHub Actions logs for any errors
2. The branch permissions (ensure the workflow has permission to push to gh-pages)
3. The GitHub Pages settings in the repository settings

For local build issues:
1. Run `pnpm clean` to clean all builds
2. Run `pnpm install` to ensure dependencies are up to date
3. Try building again with `pnpm docs:build`