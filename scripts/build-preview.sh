#!/usr/bin/env bash
set -e

echo "🏗️  Building AetherUI Preview (Storybook + Kitchen Sink)"

# Build Storybook
echo "📚 Building Storybook..."
pnpm build-storybook

# Build Kitchen Sink Showcase
echo "🍽️  Building Kitchen Sink Showcase..."
pnpm showcase:build

# Create preview directory structure
echo "📦 Creating preview directory..."
rm -rf preview-build
mkdir -p preview-build

# Copy Storybook build
echo "📋 Copying Storybook..."
cp -r storybook-static preview-build/storybook

# Copy Showcase build
echo "📋 Copying Showcase..."
cp -r packages/showcase/dist preview-build/showcase

# Create landing page
echo "🎨 Creating landing page..."
cat > preview-build/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AetherUI Preview - Storybook & Kitchen Sink</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
      color: white;
      margin-bottom: 3rem;
    }

    .header h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    }

    .header p {
      font-size: 1.25rem;
      opacity: 0.95;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 2.5rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s, box-shadow 0.3s;
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .card:hover {
      transform: translateY(-10px);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
    }

    .card-icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
    }

    .card-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #333;
    }

    .card-description {
      color: #666;
      font-size: 1.125rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .card-features {
      list-style: none;
      margin-bottom: 1.5rem;
    }

    .card-features li {
      padding: 0.5rem 0;
      color: #555;
      font-size: 0.95rem;
    }

    .card-features li:before {
      content: "✓ ";
      color: #667eea;
      font-weight: bold;
      margin-right: 0.5rem;
    }

    .card-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 2rem;
      border-radius: 10px;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .footer {
      text-align: center;
      margin-top: 3rem;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
    }

    .footer a {
      color: white;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 2px solid rgba(255, 255, 255, 0.5);
      transition: border-color 0.2s;
    }

    .footer a:hover {
      border-bottom-color: white;
    }

    @media (max-width: 768px) {
      .header h1 {
        font-size: 2.5rem;
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
      <p>Choose your experience: Interactive components or comprehensive showcase</p>
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

      <a href="/showcase/" class="card">
        <div class="card-icon">🍽️</div>
        <h2 class="card-title">Kitchen Sink</h2>
        <p class="card-description">
          Complete showcase demonstrating all components with custom React integration
        </p>
        <ul class="card-features">
          <li>All 28+ components in action</li>
          <li>Custom gradient styling</li>
          <li>React integration patterns</li>
          <li>Real-world examples</li>
        </ul>
        <span class="card-button">View Showcase →</span>
      </a>
    </div>

    <div class="footer">
      <p>
        Built with ❤️ by the AetherUI Contributors ·
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
echo "   - preview-build/showcase/ (Kitchen Sink)"
