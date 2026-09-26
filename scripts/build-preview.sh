#!/usr/bin/env bash
set -e

echo "🏗️  Building AetherUI Preview (Storybook + Documentation + Playground)"

# Build core, tokens, and agent first (docs and playground import them)
echo "🔧 Building Core + Tokens..."
pnpm exec turbo build --filter=@aetherui-kit/core --filter=@aetherui-kit/tokens --filter=@aetherui-kit/agent

# Build Storybook
echo "📚 Building Storybook..."
pnpm build-storybook

# Build Documentation (force to ensure output exists)
echo "📖 Building Documentation..."
pnpm --filter @aetherui-kit/docs run docs:build

# Build Playground
echo "🎨 Building Playground..."
pnpm --filter @aetherui-kit/playground build

# Create preview directory structure
echo "📦 Creating preview directory..."
rm -rf preview-build
mkdir -p preview-build

# Copy Storybook build
echo "📋 Copying Storybook..."
cp -r storybook-static preview-build/storybook

# Copy Documentation build
echo "📋 Copying Documentation..."
cp -r packages/docs/dist preview-build/docs

# Copy Playground build
echo "📋 Copying Playground..."
cp -r packages/playground/dist preview-build/playground

# Copy the landing page (single source of truth, shared with GitHub Pages)
echo "🎨 Copying landing page..."
cp landing/index.html preview-build/index.html

echo "✅ Preview build complete!"
echo "📁 Output: preview-build/"
echo "   - preview-build/index.html (landing page)"
echo "   - preview-build/playground/ (Playground)"
echo "   - preview-build/storybook/ (Storybook)"
echo "   - preview-build/docs/ (Documentation)"
