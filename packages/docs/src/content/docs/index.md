---
title: Aether UI
description: A lightweight collection of Web Components that work everywhere
template: splash
hero:
  tagline: Headless, accessible Web Components built with Lit. Works with any framework.
  actions:
    - text: Get Started
      link: /getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: View on GitHub
      link: https://github.com/your-org/aetherui
      icon: external
---

<div class="hero-section">
  <h1 class="hero-title">AetherUI</h1>
  <p class="hero-subtitle">A lightweight collection of Web Components that work everywhere</p>
</div>

<div class="install-section">
  <div class="install-content">
    <pre><code>npm install @aetherui/core</code></pre>
  </div>
</div>

<div class="example-section">
  <div class="example-code">
    <pre><code><span class="token comment">// Import and use any component</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineAeButton <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@aetherui/core'</span><span class="token punctuation">;</span>
<span class="token function">defineAeButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Use it in your HTML</span>
<span class="token tag">&lt;ae-button variant="primary"&gt;</span>Click me<span class="token tag">&lt;/ae-button&gt;</span></code></pre>
  </div>
</div>

<div class="features-grid">
  <div class="feature">
    <h3>Framework Agnostic</h3>
    <p>Works with React, Vue, Angular, or vanilla JavaScript. True web standards.</p>
  </div>
  
  <div class="feature">
    <h3>Lightweight</h3>
    <p>Each component is ≤15KB gzipped. Import only what you need.</p>
  </div>
  
  <div class="feature">
    <h3>Accessible</h3>
    <p>WAI-ARIA compliant with full keyboard navigation out of the box.</p>
  </div>
  
  <div class="feature">
    <h3>Customizable</h3>
    <p>Style with CSS variables and shadow parts. Make it yours.</p>
  </div>
</div>

<div class="cta-section">
  <a href="/getting-started/installation/" class="primary-button">Documentation →</a>
  <a href="/components/button/" class="secondary-button">Components</a>
</div>

<style>
  /* Reset colorful theme - minimal monochrome design */
  :root {
    --text-primary: #1a1a1a;
    --text-secondary: #666;
    --bg-primary: #fff;
    --bg-secondary: #f7f7f7;
    --border-color: #e5e5e5;
    --accent: #000;
    --code-bg: #f4f4f4;
  }

  [data-theme='dark'] {
    --text-primary: #fff;
    --text-secondary: #999;
    --bg-primary: #0a0a0a;
    --bg-secondary: #1a1a1a;
    --border-color: #2a2a2a;
    --accent: #fff;
    --code-bg: #1e1e1e;
  }

  /* Hide default Starlight hero */
  .sl-hero {
    display: none;
  }

  /* Clean hero section */
  .hero-section {
    text-align: center;
    padding: 4rem 0 2rem;
  }

  .hero-title {
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0 0 1rem;
    color: var(--text-primary);
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin: 0;
    font-weight: 400;
  }

  /* Install section */
  .install-section {
    text-align: center;
    padding: 2rem 0;
  }

  .install-content pre {
    display: inline-block;
    background: var(--code-bg);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem 2rem;
    margin: 0;
  }

  .install-content code {
    font-family: var(--sl-font-mono);
    font-size: 1rem;
    color: var(--text-primary);
    background: none;
    padding: 0;
  }

  /* Example section */
  .example-section {
    max-width: 600px;
    margin: 3rem auto;
  }

  .example-code pre {
    background: var(--code-bg);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 0;
  }

  .example-code code {
    font-family: var(--sl-font-mono);
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text-primary);
    background: none;
    padding: 0;
  }

  .token.comment {
    color: var(--text-secondary);
  }

  .token.keyword {
    color: var(--text-primary);
    font-weight: 500;
  }

  .token.string {
    color: var(--text-primary);
  }

  .token.punctuation {
    color: var(--text-secondary);
  }

  .token.function {
    color: var(--text-primary);
  }

  .token.tag {
    color: var(--text-primary);
  }

  /* Features grid */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    margin: 4rem auto;
    max-width: 1000px;
  }

  .feature {
    text-align: center;
  }

  .feature h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: var(--text-primary);
  }

  .feature p {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.6;
  }

  /* CTA section */
  .cta-section {
    text-align: center;
    margin: 4rem 0 2rem;
  }

  .primary-button,
  .secondary-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 400;
    transition: all 0.2s ease;
    margin: 0 0.5rem;
  }

  .primary-button {
    background: var(--accent);
    color: var(--bg-primary);
    border: 1px solid var(--accent);
  }

  .primary-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .secondary-button {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-color);
  }

  .secondary-button:hover {
    background: var(--bg-secondary);
  }

  /* Remove all animations and colorful elements */
  @keyframes none {}
  
  .logo-container,
  .key-feature-card::before,
  .intro-heading::after,
  .feature-icon,
  .key-feature-icon,
  .window-dots,
  .dot-red,
  .dot-yellow,
  .dot-green {
    display: none !important;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 3rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
    }

    .features-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .install-content pre {
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
    }
  }
</style>