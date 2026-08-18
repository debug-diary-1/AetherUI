#!/usr/bin/env bash
set -e

echo "🏗️  Building AetherUI Preview (Storybook + Documentation + Playground)"

# Build core first (dependency for all)
echo "🔧 Building Core..."
pnpm --filter @aetherui/core build

# Build Storybook
echo "📚 Building Storybook..."
pnpm build-storybook

# Build Documentation (force to ensure output exists)
echo "📖 Building Documentation..."
pnpm --filter @aetherui/docs run docs:build

# Build Playground
echo "🎨 Building Playground..."
pnpm --filter @aetherui/playground build

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

# Create landing page
echo "🎨 Creating landing page..."
cat > preview-build/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AetherUI - Headless Web Components</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      background: #0a0a0a;
      color: #fafafa;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .container {
      max-width: 1100px;
      width: 100%;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.025em;
    }

    .header p {
      font-size: 1.125rem;
      color: #a1a1aa;
      line-height: 1.6;
      max-width: 600px;
      margin: 0 auto;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .card {
      background: #18181b;
      border-radius: 1rem;
      border: 1px solid #27272a;
      padding: 2rem;
      transition: all 0.2s;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
    }

    .card:hover {
      border-color: #3f3f46;
      transform: translateY(-2px);
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
    }

    .card.featured {
      border-color: #6366f1;
      background: linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, transparent 50%);
    }

    .card.featured:hover {
      border-color: #818cf8;
    }

    .card-badge {
      display: inline-flex;
      align-items: center;
      background: #6366f1;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 1rem;
      width: fit-content;
    }

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1.25rem;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #fafafa;
    }

    .card-description {
      color: #a1a1aa;
      font-size: 0.9375rem;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .card-features {
      list-style: none;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .card-features li {
      padding: 0.5rem 0;
      color: #71717a;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
    }

    .card-features li:before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 4px;
      background: #6366f1;
      border-radius: 50%;
      margin-right: 0.75rem;
    }

    .card-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #27272a;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      font-size: 0.875rem;
      text-decoration: none;
      transition: all 0.15s;
      border: 1px solid #3f3f46;
    }

    .card-button:hover {
      background: #3f3f46;
    }

    .card.featured .card-button {
      background: #6366f1;
      border-color: #6366f1;
    }

    .card.featured .card-button:hover {
      background: #4f46e5;
    }

    .footer {
      text-align: center;
      margin-top: 3rem;
      color: #71717a;
      font-size: 0.875rem;
    }

    .footer a {
      color: #a1a1aa;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.15s;
    }

    .footer a:hover {
      color: #fafafa;
    }

    @media (max-width: 1024px) {
      .cards {
        grid-template-columns: 1fr;
      }

      .card.featured {
        order: -1;
      }
    }

    @media (max-width: 768px) {
      .header h1 {
        font-size: 2rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AetherUI</h1>
      <p>A headless, themeable web component library. Design your components visually, explore with Storybook, or dive into the docs.</p>
    </div>

    <div class="cards">
      <a href="/playground/" class="card featured">
        <span class="card-badge">Recommended</span>
        <div class="card-icon">🎨</div>
        <h2 class="card-title">Playground</h2>
        <p class="card-description">
          Design and customize components visually. Export ready-to-use CSS and HTML.
        </p>
        <ul class="card-features">
          <li>Visual CSS variable editor</li>
          <li>Real-time preview</li>
          <li>Code generation</li>
          <li>Export to HTML file</li>
        </ul>
        <span class="card-button">Open Playground →</span>
      </a>

      <a href="/storybook/" class="card">
        <div class="card-icon">📚</div>
        <h2 class="card-title">Storybook</h2>
        <p class="card-description">
          Interactive component explorer with full API documentation and controls.
        </p>
        <ul class="card-features">
          <li>Live component states</li>
          <li>Interactive controls</li>
          <li>API documentation</li>
          <li>Accessibility testing</li>
        </ul>
        <span class="card-button">Open Storybook →</span>
      </a>

      <a href="/docs/" class="card">
        <div class="card-icon">📖</div>
        <h2 class="card-title">Documentation</h2>
        <p class="card-description">
          Comprehensive guides, API references, and integration examples.
        </p>
        <ul class="card-features">
          <li>Installation guides</li>
          <li>Framework integration</li>
          <li>Theme customization</li>
          <li>Best practices</li>
        </ul>
        <span class="card-button">View Docs →</span>
      </a>
    </div>

    <div class="footer">
      <p>
        Built by the AetherUI Contributors ·
        <a href="https://github.com/debug-diary-1/AetherUI" target="_blank">GitHub</a>
      </p>
    </div>
  </div>
</body>
</html>
EOF

echo "✅ Preview build complete!"
echo "📁 Output: preview-build/"
echo "   - preview-build/index.html (landing page)"
echo "   - preview-build/playground/ (Playground)"
echo "   - preview-build/storybook/ (Storybook)"
echo "   - preview-build/docs/ (Documentation)"
