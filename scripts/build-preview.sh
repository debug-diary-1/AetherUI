#!/usr/bin/env bash
set -e

echo "🏗️  Building AetherUI Preview (Storybook + Documentation)"

# Build Storybook
echo "📚 Building Storybook..."
pnpm build-storybook

# Build Documentation
echo "📖 Building Documentation..."
pnpm docs:build

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

# Create landing page
echo "🎨 Creating landing page..."
cat > preview-build/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AetherUI Preview - Storybook & Documentation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      background: #fafafa;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .container {
      max-width: 900px;
      width: 100%;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #111827;
      letter-spacing: -0.025em;
    }

    .header p {
      font-size: 1rem;
      color: #6b7280;
      line-height: 1.6;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: white;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
      padding: 2rem;
      transition: all 0.2s;
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .card:hover {
      border-color: #d1d5db;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1.25rem;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #111827;
    }

    .card-description {
      color: #6b7280;
      font-size: 0.9375rem;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .card-features {
      list-style: none;
      margin-bottom: 1.5rem;
    }

    .card-features li {
      padding: 0.5rem 0;
      color: #4b5563;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
    }

    .card-features li:before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 4px;
      background: #111827;
      border-radius: 50%;
      margin-right: 0.75rem;
    }

    .card-button {
      display: inline-flex;
      align-items: center;
      background: #111827;
      color: white;
      padding: 0.625rem 1.25rem;
      border-radius: 0.375rem;
      font-weight: 500;
      font-size: 0.875rem;
      text-decoration: none;
      transition: all 0.15s;
    }

    .card-button:hover {
      background: #1f2937;
    }

    .footer {
      text-align: center;
      margin-top: 3rem;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .footer a {
      color: #111827;
      text-decoration: none;
      font-weight: 500;
      border-bottom: 1px solid #d1d5db;
      transition: border-color 0.15s;
    }

    .footer a:hover {
      border-bottom-color: #111827;
    }

    @media (max-width: 768px) {
      .header h1 {
        font-size: 2rem;
      }

      .cards {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AetherUI Preview</h1>
      <p>Choose your experience: Interactive playground or comprehensive documentation</p>
    </div>

    <div class="cards">
      <a href="/storybook/" class="card">
        <div class="card-icon">📚</div>
        <h2 class="card-title">Storybook</h2>
        <p class="card-description">
          Interactive component explorer with full API documentation and controls
        </p>
        <ul class="card-features">
          <li>Live component playground</li>
          <li>Interactive controls & knobs</li>
          <li>API documentation</li>
          <li>Accessibility testing</li>
        </ul>
        <span class="card-button">Open Storybook →</span>
      </a>

      <a href="/docs/" class="card">
        <div class="card-icon">📖</div>
        <h2 class="card-title">Documentation</h2>
        <p class="card-description">
          Complete documentation with interactive examples, guides, and API references
        </p>
        <ul class="card-features">
          <li>Interactive component examples</li>
          <li>Installation & setup guides</li>
          <li>Theme customization</li>
          <li>Accessibility best practices</li>
        </ul>
        <span class="card-button">View Documentation →</span>
      </a>
    </div>

    <div class="footer">
      <p>
        Built by the AetherUI Contributors ·
        <a href="https://github.com/pallavL01/AetherUI" target="_blank">GitHub</a>
      </p>
    </div>
  </div>
</body>
</html>
EOF

echo "✅ Preview build complete!"
echo "📁 Output: preview-build/"
echo "   - preview-build/index.html (landing page)"
echo "   - preview-build/storybook/ (Storybook)"
echo "   - preview-build/docs/ (Documentation)"
