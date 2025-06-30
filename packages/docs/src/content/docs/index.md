---
title: AetherUI
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
  <div class="logo-container">
    <img src="/logo-large.svg" alt="AetherUI Logo" width="80" height="80" />
  </div>
  <h1 class="hero-title">AetherUI</h1>
  <p class="hero-subtitle">Lightweight Web Components that work everywhere</p>
</div>

<div class="install-section">
  <pre><code>$ npm install @aetherui/core</code></pre>
</div>

<div class="example-section">
  <pre><code># Import and register components
import { defineAeButton } from '@aetherui/core';
defineAeButton();

# Use in your HTML
&lt;ae-button variant="primary"&gt;Click me&lt;/ae-button&gt;</code></pre>
</div>

<div class="features-list">
  <div class="feature-item">
    <span class="feature-marker">[×]</span>
    <div>
      <strong>Framework Agnostic</strong>
      <span>Works with React, Vue, Angular, or vanilla JS</span>
    </div>
  </div>
  
  <div class="feature-item">
    <span class="feature-marker">[×]</span>
    <div>
      <strong>Lightweight</strong>
      <span>Each component ≤15KB gzipped</span>
    </div>
  </div>
  
  <div class="feature-item">
    <span class="feature-marker">[×]</span>
    <div>
      <strong>Accessible</strong>
      <span>WAI-ARIA compliant with keyboard navigation</span>
    </div>
  </div>
  
  <div class="feature-item">
    <span class="feature-marker">[×]</span>
    <div>
      <strong>Customizable</strong>
      <span>Style with CSS variables and shadow parts</span>
    </div>
  </div>
</div>

<div class="cta-section">
  <a href="/getting-started/installation/" class="primary-link">[Documentation →]</a>
  <a href="/components/button/" class="secondary-link">[Components]</a>
</div>

<style>
  /* Monospace-first design with high contrast */
  :root {
    /* Light mode - WCAG AAA compliant */
    --text-primary: #000000;
    --text-secondary: #595959;
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --border-color: #d4d4d4;
    --accent: #000000;
    --code-bg: #f0f0f0;
    --link-color: #0066cc;
    --link-hover: #0052a3;
  }

  :root[data-theme='dark'] {
    /* Dark mode - WCAG AAA compliant */
    --text-primary: #ffffff;
    --text-secondary: #a6a6a6;
    --bg-primary: #0d0d0d;
    --bg-secondary: #1a1a1a;
    --border-color: #333333;
    --accent: #ffffff;
    --code-bg: #1f1f1f;
    --link-color: #66b3ff;
    --link-hover: #99ccff;
  }

  /* Force monospace everywhere */
  * {
    font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 
                 'DejaVu Sans Mono', monospace !important;
  }

  /* Hide default Starlight hero */
  .sl-hero {
    display: none;
  }

  /* Hero section with logo */
  .hero-section {
    text-align: center;
    padding: 3rem 0 2rem;
  }

  .logo-container {
    display: inline-block;
    margin-bottom: 1.5rem;
  }

  .logo-container svg {
    color: var(--text-primary);
  }

  .hero-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--text-primary);
    margin: 0 0 0.75rem;
    letter-spacing: -0.02em;
  }

  .hero-subtitle {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0;
    letter-spacing: 0.05em;
  }

  /* Install section */
  .install-section {
    text-align: center;
    padding: 2rem 0;
  }

  .install-section pre {
    display: inline-block;
    background: var(--code-bg);
    border: 1px solid var(--border-color);
    padding: 1rem 2rem;
    margin: 0;
  }

  .install-section code {
    font-size: 0.875rem;
    color: var(--text-primary);
    background: none;
    padding: 0;
  }

  /* Example section */
  .example-section {
    max-width: 600px;
    margin: 3rem auto;
  }

  .example-section pre {
    background: var(--code-bg);
    border: 1px solid var(--border-color);
    padding: 1.5rem;
    overflow-x: auto;
    margin: 0;
  }

  .example-section code {
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--text-primary);
    background: none;
    padding: 0;
    white-space: pre;
  }

  /* Features list */
  .features-list {
    max-width: 600px;
    margin: 4rem auto;
    padding: 0 1rem;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .feature-marker {
    color: var(--text-secondary);
    flex-shrink: 0;
    font-size: 0.875rem;
  }

  .feature-item strong {
    display: block;
    color: var(--text-primary);
    font-weight: bold;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }

  .feature-item span {
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.4;
  }

  /* CTA section */
  .cta-section {
    text-align: center;
    margin: 4rem 0 2rem;
  }

  .primary-link,
  .secondary-link {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    font-size: 0.875rem;
    transition: opacity 0.2s ease;
    margin: 0 0.5rem;
  }

  .primary-link {
    color: var(--bg-primary);
    background: var(--accent);
    border: 1px solid var(--accent);
  }

  .primary-link:hover {
    opacity: 0.8;
  }

  .secondary-link {
    color: var(--text-primary);
    background: transparent;
    border: 1px solid var(--border-color);
  }

  .secondary-link:hover {
    background: var(--bg-secondary);
  }

  /* Ensure all text meets WCAG AAA standards */
  p, span, div {
    line-height: 1.5;
  }

  /* Focus styles for accessibility */
  a:focus,
  button:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* Print styles */
  @media print {
    .ascii-logo {
      font-family: monospace !important;
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .ascii-logo {
      font-size: 0.75rem;
    }

    .install-section pre {
      padding: 0.75rem 1rem;
      font-size: 0.75rem;
    }

    .example-section pre {
      padding: 1rem;
      font-size: 0.75rem;
    }

    .primary-link,
    .secondary-link {
      display: block;
      margin: 0.5rem auto;
      max-width: 200px;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    :root {
      --text-primary: #000000;
      --text-secondary: #000000;
      --bg-primary: #ffffff;
      --bg-secondary: #ffffff;
      --border-color: #000000;
      --code-bg: #ffffff;
    }

    :root[data-theme='dark'] {
      --text-primary: #ffffff;
      --text-secondary: #ffffff;
      --bg-primary: #000000;
      --bg-secondary: #000000;
      --border-color: #ffffff;
      --code-bg: #000000;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: none !important;
    }
  }
</style>