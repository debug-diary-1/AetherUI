# Aether UI – Product Requirements Document (PRD) & Functional Specification

## 1 · Executive Summary

**Aether UI** is a headless, framework‑agnostic Web Component library built on **Lit** and distributed under the **`@aetherui`** npm scope. Components expose behavior, accessibility contracts, and styling hooks while letting consumers handle presentation. The library targets modern web apps that need durable, theme‑able primitives without tying to a single front‑end framework.

---

## 2 · PRD

### 2.1 Problem Statement

Teams often reinvent basic UI primitives or adopt bulky framework‑bound libraries. This creates duplicated accessibility effort, inconsistent design systems, and locked‑in tech stacks. We need a lightweight, standard‑compliant, design‑token‑driven component backbone that any React/Vue/Svelte/HTML project can drop in.

### 2.2 Goals & Objectives

| ID   | Goal                                                             | KPI / Success Metric                             |
| ---- | ---------------------------------------------------------------- | ------------------------------------------------ |
|  G‑1 | Release **v1.0.0** of core package within 12 weeks               | GA date met; npm downloads > 5 k within 3 months |
|  G‑2 | Achieve **axe‑core 100** accessibility score for every component | 0 critical violations in CI                      |
|  G‑3 | Keep **core bundle ≤ 15 KB** (gzip)                              | Bundle audit in CI                               |
|  G‑4 | CI pipeline duration **≤ 5 min**                                 | GH Actions avg runtime                           |

### 2.3 Personas

| Persona                                   | Description                                   | Needs                                               |
| ----------------------------------------- | --------------------------------------------- | --------------------------------------------------- |
| **Front‑End Engineer (FE‑ENG)**           | Implements features in React/Vue/Svelte apps. | Drop‑in components, TypeScript types, tree‑shaking. |
| **Design System Lead (DS‑LEAD)**          | Maintains brand tokens across properties.     | Token theming, shadow‑parts, clear CONTRIBUTING.    |
| **QA / Accessibility Engineer (A11Y‑QA)** | Ensures WCAG compliance.                      | Built‑in a11y patterns, automated tests.            |

### 2.4 User Stories (excerpt)

* **US‑01** As an FE‑ENG, I can install `@aetherui/button` and call `defineAeButton()` so my app uses `<ae-button>` without bundling React.
* **US‑02** As a DS‑LEAD, I can override `--ae-color-primary` to switch themes site‑wide.
* **US‑03** As an A11Y‑QA, I can run `pnpm test:a11y` and get zero critical issues.

### 2.5 Scope & Out‑of‑Scope

*In‑scope*: **Alert**, Accordion, Button, Checkbox, **Combobox** (`ae-combo`), Dropdown, **Data‑Table** (`ae-data-table`), Dialog/Modal, Radio Group, Tabs, Tooltip, Tour, Treeview, Layout primitives (Stack/Grid), Design‑token pipeline, Astro Starlight docs.

*Out‑of‑scope*: Data Grid, Rich Text Editor, mobile‑native gesture components.

### 2.6 Assumptions & Dependencies

* Consumers use evergreen browsers (ES2019+).
* NPM scope **`@aetherui`** is available and owned.
* Vercel Remote Cache credentials provisioned.

### 2.7 Milestones

| Date       | Milestone              | Deliverables                                |
| ---------- | ---------------------- | ------------------------------------------- |
|  T0 + 1 wk | Repo bootstrap         | Turborepo skeleton, tokens pkg, CI skeleton |
|  + 3 wk    | Core MVP               | `@aetherui/button`, docs home               |
|  + 6 wk    | Accessibility sign‑off | Accordion, Dialog, Checkbox                 |
|  + 8 wk    | **Beta v0.10.0**       | 80 % components, Storybook visual tests     |
|  + 12 wk   | **GA v1.0.0**          | Stable API, CONTRIBUTING, versioning        |

### 2.8 Risks & Mitigations

| Risk                                | Impact          | Mitigation                                                      |
| ----------------------------------- | --------------- | --------------------------------------------------------------- |
| Starlight lacks built‑in versioning | Doc drift       | Route‑based versions + custom switcher until upstream ships     |
| Two‑letter `ae-` tag collision      | Naming conflict | Periodic npm/GH audit; fallback to `aether-` if conflict arises |

---

## 3 · Functional Specification

### 3.1 Purpose & Vision

Deliver a **vendor‑neutral, accessible, performance‑minded** component layer.

### 3.2 Component Naming & Distribution

| Element Tag   | Package                                               | Import Helper                           |
| ------------- | ----------------------------------------------------- | --------------------------------------- |
| `<ae-button>` | `@aetherui/button` (also bundled in `@aetherui/core`) | `import '@aetherui/button/define.js';`  |
| `<ae-dialog>` | `@aetherui/dialog`                                    | idem                                    |
| Design tokens | `@aetherui/tokens`                                    | `@import '@aetherui/tokens/light.css';` |

### 3.3 Architecture Overview

```
repo-root/
├─ packages/
│  ├─ core/              # grouped build of all components
│  ├─ button/            # per‑component dist (optional add‑on)
│  ├─ tokens/            # Style Dictionary → CSS vars
│  ├─ utils/             # shared Lit controllers
│  └─ docs/              # Astro + Starlight site
└─ turbo.json            # pipeline (build, test, docs)
```

* **Turborepo 2.5** orchestrates tasks with remote cache.
* All builds target `es2019` with ESM output and `.d.ts` bundles.

### 3.4 Detailed Requirements

#### 3.4.1 Functional

| ID   | Requirement                                                | Criteria                               |
| ---- | ---------------------------------------------------------- | -------------------------------------- |
| FR‑1 | Each package exposes `define*()` to register element once. | Double import causes no error.         |
| FR‑2 | Headless by default; styling via parts & vars.             | Token override demos pass visual diff. |
| FR‑3 | WAI‑ARIA 1.2 compliance.                                   | Axe‑core tests 0 critical issues.      |

#### 3.4.2 Non‑Functional

* **Performance** ≤ 50 ms first interaction, ≤ 15 KB core bundle.
* **Browser Support** Chrome, Edge, Safari 15+, Firefox ESR.
* **CI time** ≤ 5 min with Vercel Remote Cache.

### 3.5 Component Spec Template

| Field            | Value (example: **ae‑accordion**)                                      |
| ---------------- | ---------------------------------------------------------------------- |
| **Tag**          | `ae-accordion`                                                         |
| **Props**        | `open:boolean`, `disabled`, `defaultOpen`, `expandIcon:TemplateResult` |
| **Events**       | `ae-toggle` detail `{ open }`                                          |
| **Slots**        | `header` (required), default `body`                                    |
| **Shadow Parts** | `header`, `panel`                                                      |
| **Tokens**       | `--ae-accordion-border`, `--ae-accordion-duration`                     |
| **A11y**         | APG Disclosure pattern                                                 |

*(Each real component spec will instantiate this template.)*

### 3.6 Build & Tooling

| Area                     | Tool                                                      | Version                     |
| ------------------------ | --------------------------------------------------------- | --------------------------- |
| **Bundler & Dev Server** | **Vite 5** (`vite build --library`) + **vite-plugin-dts** | Unified across all packages |
| Testing                  | Vitest, @testing-library/dom, Playwright, axe-core        | latest                      |
| Lint                     | ESLint, Prettier                                          | latest                      |
| Docs                     | Astro 5.7 + Starlight 0.34                                |                             |
| Release                  | Changesets 3, npm provenance                              |                             |

#### 3.6.1 Package‑level Vite Strategy

Every component package (e.g., `packages/button`, `packages/alert`) ships its own library build while sharing the same base config to avoid drift.

*`package.json` scripts*

```jsonc
"scripts": {
  "dev": "vite",
  "build": "vite build --config vite.lib.config.ts"
}
```

*`vite.lib.config.ts` template*

```ts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AeButton', // change per package
      fileName: 'index',
      formats: ['es']
    },
    target: 'es2019',
    outDir: 'dist',
    rollupOptions: {
      external: [/^lit/]
    }
  },
  plugins: [dts({ entryRoot: 'src' })]
});
```

*Highlights*

* **Single‑source DX** – `vite dev` hot‑reloads demos, `vite build` creates production bundle.
* **Typed declarations** – auto‑generated with `vite-plugin-dts` to keep IDEs happy.
* **Externalization** – prevents Lit from being bundled multiple times.

The umbrella package `packages/core` re‑exports each component so consumers can pick *per‑component* (tree‑shakable) or the *kitchen‑sink* bundle.

### 3.7 CI/CD Workflow CI/CD Workflow

1. **setup** – pnpm install, turbo cache restore.
2. **lint** – ESLint strict.
3. **test** – unit + a11y + e2e.
4. **build** – turbo build (core, tokens, docs).
5. **release** – auto‑publish on main when changesets present.
6. **docs‑deploy** – Astro build → Vercel.

### 3.8 Documentation IA

```
/components/ae-button.mdx
/components/ae-dialog.mdx
/tokens/colors.mdx
/getting-started/installation.mdx
```

Each component page auto‑renders props, events, parts tables from Typedoc JSON.

### 3.9 Developer Playground

| Option                       | Why we recommend it                                                                                                         | Notes                                                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **StackBlitz WebContainers** | Runs full pnpm + Vite toolchain **in‑browser** (no local installs), supports ESM imports and hot reload for Lit components. | We'll host a ready‑to‑fork repo at `stackblitz.com/github/aetherui/playground` so contributors can prototype or reproduce issues instantly. |
| **Storybook 8 Cloud**        | Zero‑setup hosted Storybook showing every `<ae-*>` component with controls and a11y panel.                                  | Deployed via Chromatic or Vercel Storybook builder; linked from docs and PR templates.                                                      |
| **CodeSandbox Projects**     | Familiar UI, quick boot for simple HTML snippets.                                                                           | Ideal for minimal bug repros shared in GitHub issues.                                                                                       |

A prominent **"Playground"** link will appear in the Starlight sidebar and each component's hero section, pointing to the StackBlitz instance.

### 3.10 Styling & Theming Best Practices

#### 3.10.1 Shadow DOM Philosophy

* **Encapsulate logic, expose hooks.** Keep critical layout/behavior inside Shadow DOM but surface deliberate styling seams.
* **Use `display: contents` var‑hooks sparingly.** Avoid leaking internals; prefer single‑root wrappers when practical.

#### 3.10.2 Expose Styling Hooks via `::part()`

| Pattern                      | Usage                                       | Example                                                                     |
| ---------------------------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| `::part(base)`               | Base interactive surface (e.g., `<button>`) | `.dark ae-button::part(base) { background: #222; }`                         |
| `::part(icon)`               | SVG icon slot                               | `ae-button[variant="icon"]::part(icon) { width: 16px; }`                    |
| `:host([variant="primary"])` | Theme/variant guard                         | `ae-button[variant="primary"]::part(base) { --ae-color-primary: #0055ff; }` |

* **Custom Props First.** Document token variables (`--ae-*`) before suggesting `::part` overrides. This keeps themes consistent and central.
* **Cascade Layers.** Recommend consumers create a `@layer theme.aether` block so overrides win against resets without `!important`.
* **Avoid breaking changes.** Once a `part` name ships it is a contractual API—additive only.

#### 3.10.3 Global Theme Switchers

Use attribute scoping:

```css
/* light */
:root[data-theme="light"] { --ae-color-bg: #fff; }
/* dark */
:root[data-theme="dark"] { --ae-color-bg: #000; }
```

Shadow‑dom styles rely on these global variables; toggling `data-theme` instant‑updates components with no JS.

---

### 3.11 Framework Adapters

The core library is framework‑agnostic, but thin wrappers improve DX and SSR.

| Framework   | Package             | Approach                                                                      | Example                                              |
| ----------- | ------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------- |
| **React**   | `@aetherui/react`   | Wrap `ae-*` in `forwardRef`, use `reactify` util                              | `import { AeButton } from '@aetherui/react';`        |
| **Angular** | `@aetherui/angular` | Angular Module declares `CUSTOM_ELEMENTS_SCHEMA`, exports `AeButtonComponent` | `template: '<ae-button (click)="...">…</ae-button>'` |
| **Vue 3**   | `@aetherui/vue`     | Global plugin registers all, or import on‑demand via `defineAsyncComponent`   | `app.use(AetherUIVue)`                               |
| **Svelte**  | `@aetherui/svelte`  | Provide `.svelte` wrappers, export props as component props                   | `<AeButton on:click/>`                               |

*Each adapter re‑exports TypeScript types generated from core so editors keep intellisense consistent.*

---

### 3.12 Contribution Model

* RFC → PR → Review (a11y, design, code owners).
* Conventional commit messages enforced by commitlint.
* Version bump rules: MAJOR (breaking), MINOR (new component), PATCH (bug/ docs).

---

## 4 · Appendices

* Glossary (headless, shadow part, token, remote cache)
* Link: WAI‑ARIA Authoring Practices 1.2
* Issue templates and PR checklist drafts

## 4 · Operational Excellence & Governance Enhancements

### 4.1 Performance Gates

```jsonc
// turbo.json (excerpt)
"perf": {
  "dependsOn": ["build"],
  "outputs": [],
  "env": {
    "CI": "true"
  },
  "cache": false
}
```

*Runs `bundlesize --fail-if-exceeds 15KB` plus Web‑Test‑Runner interaction tests. CI fails on regression.*

### 4.2 Design‑Token Governance

* **Taxonomy**: `core → semantic → component`. Example: `--ae-color-base-100` (core neutral) → `--ae-color-surface` (semantic) → used in `ae-dialog`.
* **Versioning**: additive only; deprecate via alias vars for one MINOR cycle.

### 4.3 Internationalization & RTL

```html
<!-- docs/rtl-demo.astro -->
<html dir="rtl" data-theme="light">
  <ae-accordion>…</ae-accordion>
</html>
```

Playwright test asserts chevron flips and focus order remains logical.

### 4.4 Polyfill Strategy

Package **`@aetherui/polyfills`** lazy‑imports `:focus-visible` and `constructable‑stylesheets` only when feature‑detect fails:

```ts
if (!('adoptedStyleSheets' in Document.prototype))
  await import('@aetherui/polyfills/constructable');
```

### 4.5 Security Policy

`SECURITY.md` template:

```md
Contact: https://github.com/debug-diary-1/AetherUI/security/advisories/new (GitHub private vulnerability reporting)
Embargo Period: 30 days
```

CI step `npm audit --omit dev` gate added.

### 4.6 Quality Gates Dashboard

GitHub workflow adds **`checks-report`** step that collates ESLint, Vitest, axe, bundlesize, Lighthouse and posts a summary comment.

### 4.7 Typed API Docs

`pnpm typedoc && typedoc-to-md --out docs/api` — linked via Starlight sidebar.

### 4.8 Release Channels

* **`latest`**: stable releases (`1.x`).
* **`next`**: every commit to `main` publishes canary (`1.1.0-next.<sha>`).

### 4.9 Design Handoff (Figma Tokens)

Tokens package exports `figma-tokens.json`; designers sync via *Figma Tokens* plugin → "Pull from URL".

### 4.10 Migration Codemods

`@aetherui/codemods` bundles jscodeshift transforms; release notes reference command:

```bash
npx @aetherui/codemods@latest icon-slot-v2 path/to/**/*.tsx
```

### 4.11 Architecture Decision Records (ADR)

ADR template stored in `/adr/000-template.md`; new decisions follow numeric sequence.

### 4.12 Issue Templates

GitHub templates:

* **bug\_report.yml** – StackBlitz repro required
* **feature\_request.yml**
* **accessibility.yml** – prompts for WCAG success criteria

---

## 5 · Changelog

| Version           | Date (relative) | Highlights                                                                               |
| ----------------- | --------------- | ---------------------------------------------------------------------------------------- |
| **0.1.0**         | T0 + 1 wk       | Project scaffold: Turborepo skeleton, tokens package, CI pipeline                        |
| **0.2.0**         | T0 + 3 wk       | Added `ae-button`, tokens pipeline wired into docs, StackBlitz playground                |
| **0.5.0**         | T0 + 6 wk       | Added `ae-accordion`, `ae-dialog`, `ae-checkbox`; integrated axe‑core + Playwright tests |
| **0.10.0** (Beta) | T0 + 8 wk       | 80 % components, Storybook visual diff baseline, first public npm pre-release            |
| **1.0.0** (GA)    | T0 + 12 wk      | Stable API lock, CONTRIBUTING guide, semantic release workflow                           |
