# Quick Nx Cloud Setup for AetherUI

## Why You're Seeing Token Errors

The CI is configured to use Nx Cloud for faster builds, but the current token is invalid or expired.

## Quick Fix (5 minutes)

### 1. Get a Free Nx Cloud Token

1. Go to https://cloud.nx.app
2. Sign up with GitHub (easiest)
3. Create a new workspace called "AetherUI"
4. Go to Settings → Access Tokens
5. Generate a new token and copy it

### 2. Add to GitHub

1. Go to https://github.com/pallavL01/AetherUI/settings/secrets/actions
2. Click "New repository secret"
3. Name: `NX_CLOUD_ACCESS_TOKEN`
4. Value: [Paste your token]
5. Click "Add secret"

### 3. Re-run CI

The next CI run will use Nx Cloud and be 30-50% faster!

## Without Nx Cloud

If you don't want to use Nx Cloud, the CI will still work - it just won't have:
- Remote caching (rebuilds everything each time)
- Distributed execution (runs on single machine)
- Shared cache between team members

The builds will still pass, just slower.

## Questions?

See the full guide at `docs/nx-cloud-token-setup.md`