---
title: Aether UI
description: A headless, framework-agnostic Web Component library built on Lit
template: splash
hero:
  tagline: Create beautiful, accessible UIs with Web Components that work anywhere
  image:
    file: ../../assets/logo.svg
  actions:
    - text: Get Started
      link: /getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: View Components
      link: /components/treeview/
      icon: puzzle
      variant: secondary
    - text: GitHub
      link: https://github.com/your-org/aetherui
      icon: github
      variant: minimal
---

<div class="hero-logo">
  <div class="logo-container">
    <img src="/logo-large.svg" alt="AetherUI Logo" width="120" height="120">
  </div>
  <h1 class="logo-text">AetherUI</h1>
</div>

<section class="features-section">
  <div class="feature-item">
    <div class="feature-icon">⚡</div>
    <div class="feature-content">
      <h3>Lightweight & Fast</h3>
      <p>Zero framework dependencies (≤15KB gzipped)</p>
    </div>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🌐</div>
    <div class="feature-content">
      <h3>Framework Agnostic</h3>
      <p>Works with React, Vue, Angular & vanilla JS</p>
    </div>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">♿</div>
    <div class="feature-content">
      <h3>WCAG Compliant</h3>
      <p>100% WAI-ARIA compliance built-in</p>
    </div>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🎨</div>
    <div class="feature-content">
      <h3>Fully Themeable</h3>
      <p>CSS custom properties and shadow parts</p>
    </div>
  </div>
</section>

<div class="intro-section">
  <h2 class="intro-heading">Build UIs that last</h2>
  <p>
    AetherUI is a headless Web Component library built on Lit with a focus on accessibility, 
    performance, and framework independence. Use it with React, Vue, Angular, or vanilla JS.
  </p>

  <div class="code-snippet">
```bash
# Install the core package
npm install @aetherui/core
```

```js
// Import only what you need
import { defineAeButton } from '@aetherui/core';
defineAeButton();
```
  </div>
</div>

<div class="demo-preview">
  <div class="code-window">
    <div class="window-header">
      <div class="window-dots">
        <span class="window-dot dot-red"></span>
        <span class="window-dot dot-yellow"></span>
        <span class="window-dot dot-green"></span>
      </div>
      <div class="window-title">example.html</div>
    </div>
    <div class="window-content">
      <div class="code-block">
        <span>&lt;ae-accordion&gt;</span>
        <span>  &lt;span slot="header"&gt;Why choose AetherUI?&lt;/span&gt;</span>
        <span>  &lt;div&gt;</span>
        <span>    &lt;ul&gt;</span>
        <span>      &lt;li&gt;Zero framework dependencies (≤15KB gzipped)&lt;/li&gt;</span>
        <span>      &lt;li&gt;100% WAI-ARIA compliance&lt;/li&gt;</span>
        <span>      &lt;li&gt;Ships with React, Vue, Angular & Svelte adapters&lt;/li&gt;</span>
        <span>      &lt;li&gt;Theme with CSS custom properties and shadow parts&lt;/li&gt;</span>
        <span>    &lt;/ul&gt;</span>
        <span>  &lt;/div&gt;</span>
        <span>&lt;/ae-accordion&gt;</span>
      </div>
    </div>
  </div>
</div>

## Key Features

<div class="key-features-grid">
  <div class="key-feature-card">
    <div class="key-feature-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="8" height="12" rx="2"/><rect x="14" y="2" width="8" height="20" rx="2"/><rect x="2" y="18" width="8" height="4" rx="2"/></svg>
    </div>
    <h3>Framework Agnostic</h3>
    <p>Works with any front-end framework or vanilla JavaScript. Adapt to changing tech stacks without rewriting UI components.</p>
  </div>
  
  <div class="key-feature-card">
    <div class="key-feature-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="4" r="1"/><path d="M3 12a9 9 0 0 1 9-9 9.5 9.5 0 0 1 4 .5"/><path d="M9 12a3 3 0 0 1 3-3 3 3 0 0 1 3 3v6"/><path d="M15 9 9 15"/></svg>
    </div>
    <h3>Accessibility Built-in</h3>
    <p>Every component meets WCAG standards and passes axe-core tests. Keyboard navigation, ARIA attributes, and focus management work out of the box.</p>
  </div>
  
  <div class="key-feature-card">
    <div class="key-feature-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/></svg>
    </div>
    <h3>Headless & Themeable</h3>
    <p>Style components your way with CSS custom properties and shadow parts. Fully customizable while maintaining accessible behavior.</p>
  </div>
  
  <div class="key-feature-card">
    <div class="key-feature-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-.09-.05-.15-.06-.11-.03A.76.76 0 0 0 21 7h-5a1 1 0 0 0 0 2h2.83l-4 4.71-4.32-2.57a1 1 0 0 0-1.28.22l-5 6a1 1 0 0 0 .13 1.41A1 1 0 0 0 5 19a1 1 0 0 0 .77-.36l4.45-5.34 4.27 2.56a1 1 0 0 0 1.27-.21L20 9.7V12a1 1 0 0 0 2 0V8h-.01Z"/></svg>
    </div>
    <h3>Tiny Bundle Size</h3>
    <p>The core bundle is ≤15KB gzipped. Import only what you need with tree-shaking support for optimal performance.</p>
  </div>
</div>

<div class="cta-container">
  <a href="/getting-started/installation/" class="cta-button">Start Building →</a>
  <a href="/components/treeview/" class="cta-link">Browse Components</a>
</div>

<style>
  /* Hero logo section */
  .hero-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem auto 3rem;
    text-align: center;
  }
  
  .logo-container {
    position: relative;
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
    animation: float 6s ease-in-out infinite;
  }
  
  .logo-container svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 5px 15px rgba(0, 85, 255, 0.3));
  }
  
  .logo-text {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(90deg, var(--sl-color-accent), var(--sl-color-accent-high));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    letter-spacing: -0.03em;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  /* Features section */
  .features-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 3rem 0;
  }
  
  .feature-item {
    background: var(--sl-color-bg);
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: var(--ae-shadow-sm);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid var(--sl-color-border);
  }
  
  .feature-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--ae-shadow-md);
  }
  
  .feature-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    display: inline-block;
    background: var(--sl-color-accent-low);
    color: var(--sl-color-accent);
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .feature-content h3 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
    font-weight: 600;
  }
  
  .feature-content p {
    margin: 0;
    font-size: 0.95rem;
    color: var(--sl-color-text-light);
  }
  
  /* Key Features grid */
  .key-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }
  
  .key-feature-card {
    background: var(--sl-color-bg);
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: var(--ae-shadow-sm);
    transition: all 0.3s ease;
    border: 1px solid var(--sl-color-border);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  
  .key-feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--sl-color-accent-low), var(--sl-color-accent));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .key-feature-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--ae-shadow-md);
  }
  
  .key-feature-card:hover::before {
    opacity: 1;
  }
  
  .key-feature-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--sl-color-accent-low);
    color: var(--sl-color-accent);
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    width: 2rem;
    height: 2rem;
  }
  
  .key-feature-card h3 {
    font-size: 1.5rem;
    margin: 0 0 1rem;
    font-weight: 600;
  }
  
  .key-feature-card p {
    margin: 0;
    color: var(--sl-color-text-light);
    line-height: 1.6;
  }
  
  /* Intro section */
  .intro-section {
    margin: 3rem 0;
    text-align: center;
  }
  
  .intro-heading {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 800;
    color: var(--sl-color-accent);
    display: inline-block;
    position: relative;
  }

  .intro-heading::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, var(--sl-color-accent), var(--sl-color-accent-high));
    border-radius: 2px;
  }
  
  .intro-section p {
    font-size: 1.2rem;
    max-width: 650px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
  
  .code-snippet {
    max-width: 600px;
    margin: 0 auto;
    text-align: left;
  }
  
  /* Demo preview */
  .demo-preview {
    margin: 3rem auto;
    max-width: 750px;
  }
  
  .code-window {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    background: #1e1e1e;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .code-window:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
  
  .window-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background: #2d2d2d;
  }

  .window-dots {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .window-title {
    color: #aaa;
    font-size: 0.8rem;
    font-family: var(--sl-font-mono);
  }
  
  .window-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .dot-red {
    background-color: #ff5f56;
  }
  
  .dot-yellow {
    background-color: #ffbd2e;
  }
  
  .dot-green {
    background-color: #27c93f;
  }
  
  .window-content {
    padding: 1.5rem;
    overflow: auto;
  }
  
  .code-block {
    display: flex;
    flex-direction: column;
    font-family: var(--sl-font-mono);
    font-size: 0.9rem;
    line-height: 1.5;
    color: #e6e6e6;
  }
  
  .code-block span {
    white-space: pre;
  }
  
  /* CTA Section */
  .cta-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    margin: 3rem 0 1rem;
  }
  
  .cta-button {
    display: inline-block;
    padding: 0.8rem 1.8rem;
    background: var(--sl-color-accent);
    color: white;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }
  
  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .cta-link {
    display: inline-flex;
    align-items: center;
    color: var(--sl-color-accent);
    font-weight: 600;
    text-decoration: none;
    padding: 0.8rem 1.8rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }
  
  .cta-link:hover {
    background: var(--sl-color-bg-offset);
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .features-section {
      grid-template-columns: 1fr;
    }
    
    .key-features-grid {
      grid-template-columns: 1fr;
    }
    
    .intro-heading {
      font-size: 2rem;
    }
    
    .intro-section p {
      font-size: 1rem;
    }
  }
</style>
