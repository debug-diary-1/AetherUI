Below is an expanded, better‑structured guide you can drop straight into your project docs or a `docs/astro‑storybook.md` file. I’ve added concrete code snippets, a full GitHub Actions workflow, repository layout diagrams, troubleshooting tables, and links to deeper resources so that a new contributor can reproduce the setup end‑to‑end.

---

# Running **Astro + Storybook** from a Single GitHub Pages Repository

> **Goal:** Serve an Astro‑generated marketing / docs site at
> `https://<user>.github.io/<repo>/` **and** an interactive Storybook component‑library at
> `https://<user>.github.io/<repo>/storybook/`, both built automatically on every push.

---

## 1. Prerequisites

| Tool                  | Min version            | Notes                                                                                                                    |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Node.js**           | 18 LTS                 | Required by both Astro & Storybook                                                                                       |
| **pnpm / npm / yarn** | latest                 | Pick one; examples use **npm**                                                                                           |
| **Astro**             |  4.1 (or later)        | Static‑only output; SSR features ( `astro image`, `server.*` ) must be disabled for GitHub Pages ([docs.astro.build][1]) |
| **Storybook**         |  8.0                   | Offers faster Vite builder & visual‑testing add‑ons ([Storybook][2])                                                     |
| **GitHub Pages**      | public or private repo | Pages must be set to **“Deploy from GitHub Actions”**                                                                    |

---

## 2. Repository Layout

```
.
├── .github/workflows/
│   └── deploy.yml          # unified Astro + Storybook pipeline
├── astro.config.mjs
├── package.json
├── src/
│   ├── pages/              # Astro routes
│   └── components/         # shared UI components
├── public/                 # static assets copied as‑is
├── .storybook/             # Storybook config
└── storybook-static/       # ⬅️ generated, ignored via .gitignore
```

> **Tip — component strategy**
> _Astro components themselves cannot (yet) render inside Storybook_ because Storybook expects runtime‑renderable components. Wrap reusable UI in React / Svelte / Vue and import those wrappers in both Astro **and** Storybook. ([fantinel.dev][3], [tiborudvari.com][4])

---

## 3. Astro Configuration (`astro.config.mjs`)

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<user>.github.io',
  base: '/<repo>/', // critical for correct asset URLs on Pages
  trailingSlash: 'always', // prevents 404s on refresh in sub‑paths
  build: { format: 'directory' },
});
```

Common gotchas and remed­ies:

| Symptom          | Probable cause                                | Fix                                                      |
| ---------------- | --------------------------------------------- | -------------------------------------------------------- |
| Images 404       | `site`/`base` incorrect                       | Ensure both values exactly match repo slug               |
| CSS not loading  | Missing `<link rel="stylesheet" …>` base path | Verify `base` in config + `<link>` paths                 |
| SPA reload → 404 | Not a SPA; you’re using Astro pages           | Keep `trailingSlash:"always"` or add `404.html` fallback |

---

## 4. Storybook Setup

### 4.1 Install & initialise

```bash
npx storybook@latest init --builder vite
npm install -D @storybook/manager @storybook/addon-essentials
```

### 4.2 `.storybook/main.ts`

```ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'], // reuse Astro assets
  viteFinal: (config) => {
    // required for GitHub Pages sub‑folder
    config.base = '/<repo>/storybook/';
    return config;
  },
};
export default config;
```

### 4.3 Build script

```jsonc
// package.json
{
  "scripts": {
    "build": "astro build",
    "build-storybook": "storybook build --output-dir storybook-static",
  },
}
```

---

## 5. Unified GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Build & Deploy Astro + Storybook

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write # required for GitHub Pages
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - run: npm ci
      - run: npm run build
      - run: npm run build-storybook

      # upload Astro root
      - uses: actions/upload-pages-artifact@v3
        with:
          name: github-pages
          path: ./dist # Astro output

      # upload Storybook to a sub‑dir inside same artifact
      - uses: actions/upload-pages-artifact@v3
        with:
          name: github-pages
          path: ./storybook-static
          destination-dir: storybook # → /storybook/index.html

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## 6. Local Development DX

| Task                   | Command                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Start Astro dev server | `npm run dev`                                                                                                                        |
| Start Storybook        | `npm run storybook`                                                                                                                  |
| Run both concurrently  | `npm run dev && npm run storybook` via tmux / two shells or `npm pkg set scripts.start="concurrently \"npm:dev\" \"npm:storybook\""` |

---

## 7. Advanced / Nice‑to‑Have Extras

1. **Preview builds for PRs**
   Add a second workflow with `on: pull_request` that uploads to the Pages _Preview_ environment (supports multiple concurrent previews).

2. **Chromatic** for hosted Storybook + visual regression, skipping GitHub Pages for Storybook entirely.

3. **Monorepo pattern**
   If the component library will be published to npm, move it to `/packages/ui` and keep Astro in `/apps/website`.

4. **Caching**
   Use `actions/cache@v4` with `dist/` & `storybook-static/` keyed by `package-lock.json` to shave CI time.

---

## 8. Troubleshooting Matrix

| Issue                                                                             | Cause                               | Resolution                                         |
| --------------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------- |
| `404 Not Found` for every page                                                    | Wrong `base` in Astro config        | Match `/repo/` exactly ([GitHub][5])               |
| Storybook assets load at root (`/logo.svg`) instead of `/repo/storybook/logo.svg` | Missing `viteFinal` `base` override | See §4.2                                           |
| GH Actions overwrites Astro files with Storybook (or vice‑versa)                  | Separate artefacts not merged       | Use **two** `upload-pages-artifact` steps (see §5) |
| Astro’s `@astrojs/image` fails to build                                           | Static adapter only                 | Replace with `<img>` or remote image service       |

---

## 9. Further Reading

- Astro official GitHub Pages guide ([docs.astro.build][1])
- `withastro/action` README ([docs.astro.build][1])
- Storybook “Publish” docs ([Storybook][6])
- Deploying Storybook to sub‑directories discussion ([GitHub][7])
- Article: _“Storybook + Astro Image – why it’s tricky”_ ([tiborudvari.com][4])
- Medium: _AWSM Docs – Storybook × Astro_ ([Medium][8])

---

### 🚀 You’re set!

Copy the config snippets above, push to **main**, and GitHub Pages will publish:

- `/` — your Astro site
- `/storybook/` — full Storybook UI

Every commit re‑builds both targets automatically. Ping me if you hit any snags or want PR‑preview / Chromatic set‑up next.

[1]: https://docs.astro.build/en/guides/deploy/github/?utm_source=chatgpt.com 'Deploy your Astro Site to GitHub Pages | Docs'
[2]: https://storybook.js.org/docs/migration-guide?utm_source=chatgpt.com 'Migration guide for Storybook 8.0 | Storybook docs'
[3]: https://fantinel.dev/storybook-astro-svelte?utm_source=chatgpt.com 'Setting up Storybook on an Astro project - Matt Fantinel'
[4]: https://tiborudvari.com/blog/how-to-work-with-storybook-and-astro-image/?utm_source=chatgpt.com 'How to work with Storybook and Astro Image - Tibor Udvari'
[5]: https://github.com/storybookjs/storybook/issues/18356?utm_source=chatgpt.com 'Support for Astro components · Issue #18356 · storybookjs/storybook'
[6]: https://storybook.js.org/docs/sharing/publish-storybook?utm_source=chatgpt.com 'Publish Storybook | Storybook docs'
[7]: https://github.com/storybookjs/storybook/discussions/17433?utm_source=chatgpt.com 'Deploying Storybook in a subdirectory #17433 - GitHub'
[8]: https://medium.com/front-end-weekly/how-to-build-awsm-docs-07375167a6b2?utm_source=chatgpt.com 'How to build AWSM docs with Storybook and Astro - Medium'
