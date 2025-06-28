# Nx Cloud Setup Guide

This guide explains how to enable Nx Cloud for distributed caching and task execution, which can reduce CI build times by 30-50%.

## Setup Steps

### 1. Get an Nx Cloud Access Token

1. Visit [https://nx.app](https://nx.app) and create an account
2. Create a new workspace or connect to existing organization `MpAIVrTJI3`
3. Get your access token from the workspace settings

### 2. Add the Token to GitHub Secrets

1. Go to your GitHub repository settings
2. Navigate to Settings → Secrets and variables → Actions
3. Add a new secret named `NX_CLOUD_ACCESS_TOKEN` with your token value

### 3. Verify Setup

Once the token is added, the CI workflow will automatically:
- Enable Nx Cloud remote caching
- Start distributed agents for parallel execution
- Cache build artifacts across CI runs

## Benefits

With Nx Cloud enabled, you'll see:
- **30-50% faster CI builds** through remote caching
- **Distributed task execution** across multiple agents
- **Shared cache** between team members and CI
- **Build insights** and performance analytics

## Local Development

To use Nx Cloud locally:

```bash
export NX_CLOUD_ACCESS_TOKEN="your-token-here"
pnpm build
```

## Monitoring

View your builds and cache hits at [https://nx.app](https://nx.app) in your workspace dashboard.