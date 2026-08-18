---
title: AetherUI
description: Modern, accessible Web Components for any framework
template: splash
hero:
  tagline: Beautiful, accessible components that work everywhere
  actions:
    - text: Get Started
      link: /docs/getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: View Components
      link: /docs/components/button/
      icon: external
---

<div class="landing-page">
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-badge">Open Source UI Library</div>
    <h1 class="hero-title">Build faster with<br/><span class="gradient-text">AetherUI</span></h1>
    <p class="hero-description">
      A modern collection of headless, accessible Web Components built with Lit.
      Framework-agnostic and designed for performance.
    </p>
    <div class="hero-actions">
      <a href="getting-started/installation/" class="btn btn-primary">
        Get Started
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
      <a href="https://github.com/debug-diary-1/AetherUI" class="btn btn-secondary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        GitHub
      </a>
    </div>
    <div class="install-command">
      <code>npm install @aetherui/core</code>
      <button class="copy-btn" onclick="navigator.clipboard.writeText('npm install @aetherui/core')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
      </button>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features-section">
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
        </div>
        <h3>Framework Agnostic</h3>
        <p>Works seamlessly with React, Vue, Angular, Svelte, or vanilla JavaScript. No wrappers needed.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <h3>Lightweight</h3>
        <p>Tree-shakeable components averaging under 5KB gzipped. Ship only what you use.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
        </div>
        <h3>Accessible</h3>
        <p>WAI-ARIA compliant with full keyboard navigation and screen reader support built-in.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </div>
        <h3>Customizable</h3>
        <p>Style with CSS variables and shadow parts. Full control over appearance without complexity.</p>
      </div>
    </div>
  </section>

  <!-- Code Example Section -->
  <section class="code-section">
    <h2>Simple to Use</h2>
    <p class="section-description">Import, register, and use. It's that easy.</p>
    <div class="code-example">
      <div class="code-header">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-filename">app.js</span>
      </div>
      <pre><code><span class="code-keyword">import</span> { defineAeButton } <span class="code-keyword">from</span> <span class="code-string">'@aetherui/core'</span>;

<span class="code-comment">// Register the component</span>
defineAeButton();
</code></pre>
    </div>
    <div class="code-example">
      <div class="code-header">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-filename">index.html</span>
      </div>
      <pre><code><span class="code-tag">&lt;ae-button</span> <span class="code-attr">variant</span>=<span class="code-string">"primary"</span><span class="code-tag">&gt;</span>
  Click me
<span class="code-tag">&lt;/ae-button&gt;</span></code></pre>
    </div>
  </section>

  <!-- Components Preview -->
  <section class="components-section">
    <h2>25+ Components</h2>
    <p class="section-description">Everything you need to build modern interfaces</p>
    <div class="components-grid">
      <a href="components/button/" class="component-chip">Button</a>
      <a href="components/modal/" class="component-chip">Modal</a>
      <a href="components/dropdown/" class="component-chip">Dropdown</a>
      <a href="components/tabs/" class="component-chip">Tabs</a>
      <a href="components/accordion/" class="component-chip">Accordion</a>
      <a href="components/toast/" class="component-chip">Toast</a>
      <a href="components/tooltip/" class="component-chip">Tooltip</a>
      <a href="components/input/" class="component-chip">Input</a>
      <a href="components/select/" class="component-chip">Select</a>
      <a href="components/checkbox/" class="component-chip">Checkbox</a>
      <a href="components/radio/" class="component-chip">Radio</a>
      <a href="components/switch/" class="component-chip">Switch</a>
    </div>
    <a href="components/accordion/" class="view-all-link">
      View all components →
    </a>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <h2>Ready to get started?</h2>
    <p>Install AetherUI and start building beautiful interfaces today.</p>
    <a href="getting-started/installation/" class="btn btn-primary btn-lg">
      Read the Docs
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  </section>
</div>

<style>
  /* Hide default Starlight elements */
  .sl-hero,
  [data-hero] {
    display: none !important;
  }

  /* Landing page container */
  .landing-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* Hero Section */
  .hero-section {
    text-align: center;
    padding: 4rem 0 5rem;
  }

  .hero-badge {
    display: inline-block;
    padding: 0.375rem 1rem;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    color: #1d4ed8;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  :root[data-theme='dark'] .hero-badge {
    background: linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%);
    color: #93c5fd;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin: 0 0 1.5rem;
    color: var(--sl-color-text-heading);
  }

  .gradient-text {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: 1.25rem;
    color: var(--sl-color-text-light);
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.15s ease;
    border: none;
    cursor: pointer;
  }

  .btn-primary {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    color: white;
    box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.35);
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px 0 rgba(37, 99, 235, 0.45);
  }

  .btn-secondary {
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    border: 1px solid var(--sl-color-border);
  }

  .btn-secondary:hover {
    background: var(--sl-color-bg-offset);
    border-color: var(--sl-color-gray-4);
  }

  .btn-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  /* Install command */
  .install-command {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--sl-color-bg-offset);
    border: 1px solid var(--sl-color-border);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
  }

  .install-command code {
    font-family: var(--sl-font-mono);
    font-size: 0.9rem;
    color: var(--sl-color-text);
  }

  .copy-btn {
    background: transparent;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: var(--sl-color-text-light);
    transition: color 0.15s ease;
  }

  .copy-btn:hover {
    color: var(--sl-color-text);
  }

  /* Features Section */
  .features-section {
    padding: 4rem 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
    background: var(--sl-color-bg);
    border: 1px solid var(--sl-color-border);
    border-radius: 0.75rem;
    transition: all 0.2s ease;
  }

  .feature-card:hover {
    border-color: var(--sl-color-accent);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
  }

  .feature-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    color: #2563eb;
  }

  :root[data-theme='dark'] .feature-icon {
    background: linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%);
    color: #60a5fa;
  }

  .feature-card h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: var(--sl-color-text-heading);
  }

  .feature-card p {
    font-size: 0.9375rem;
    color: var(--sl-color-text-light);
    margin: 0;
    line-height: 1.5;
  }

  /* Code Section */
  .code-section {
    padding: 4rem 0;
    text-align: center;
  }

  .code-section h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .section-description {
    color: var(--sl-color-text-light);
    margin: 0 0 2rem;
    font-size: 1.125rem;
  }

  .code-example {
    max-width: 500px;
    margin: 0 auto 1rem;
    text-align: left;
    border-radius: 0.75rem;
    overflow: hidden;
    border: 1px solid var(--sl-color-border);
    background: var(--sl-color-bg-offset);
  }

  .code-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--sl-color-gray-2);
    border-bottom: 1px solid var(--sl-color-border);
  }

  .code-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--sl-color-gray-4);
  }

  .code-filename {
    margin-left: auto;
    font-size: 0.8125rem;
    color: var(--sl-color-text-light);
    font-family: var(--sl-font-mono);
  }

  .code-example pre {
    margin: 0;
    padding: 1.25rem;
    background: transparent !important;
    border: none !important;
  }

  .code-example code {
    font-family: var(--sl-font-mono);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .code-keyword { color: #7c3aed; }
  .code-string { color: #059669; }
  .code-comment { color: #64748b; }
  .code-tag { color: #2563eb; }
  .code-attr { color: #d97706; }

  :root[data-theme='dark'] .code-keyword { color: #a78bfa; }
  :root[data-theme='dark'] .code-string { color: #34d399; }
  :root[data-theme='dark'] .code-tag { color: #60a5fa; }
  :root[data-theme='dark'] .code-attr { color: #fbbf24; }

  /* Components Section */
  .components-section {
    padding: 4rem 0;
    text-align: center;
  }

  .components-section h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .components-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 2rem;
  }

  .component-chip {
    padding: 0.5rem 1rem;
    background: var(--sl-color-bg);
    border: 1px solid var(--sl-color-border);
    border-radius: 9999px;
    font-size: 0.875rem;
    color: var(--sl-color-text);
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .component-chip:hover {
    border-color: var(--sl-color-accent);
    color: var(--sl-color-accent);
    background: var(--sl-color-accent-low);
  }

  .view-all-link {
    display: inline-block;
    margin-top: 1.5rem;
    color: var(--sl-color-accent);
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.15s ease;
  }

  .view-all-link:hover {
    opacity: 0.8;
  }

  /* CTA Section */
  .cta-section {
    text-align: center;
    padding: 4rem 2rem;
    margin: 2rem 0;
    background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%);
    border-radius: 1rem;
  }

  :root[data-theme='dark'] .cta-section {
    background: linear-gradient(135deg, #1e293b 0%, #312e81 100%);
  }

  .cta-section h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .cta-section p {
    color: var(--sl-color-text-light);
    margin: 0 0 1.5rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }

    .hero-description {
      font-size: 1.125rem;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    .code-example {
      margin: 0 0 1rem;
    }
  }

  @media (max-width: 480px) {
    .hero-title {
      font-size: 2rem;
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
    }

    .btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
