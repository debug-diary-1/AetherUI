# AetherUI Pre-Launch Checklist

Status of the open-source launch under **github.com/debug-diary-1/AetherUI**. Items marked ✅ were verified on 2026-08-17; unchecked items are what's left and can only be done by a maintainer with account access.

## ✅ Done in-repo

- [x] LICENSE (MIT) at root and inside every publishable package (`core`, `tokens`, `accordion`, `datatable`)
- [x] README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, CHANGELOG, STANDARDS, ARCHITECTURE
- [x] Security reports go to GitHub private vulnerability reporting (no email dependency)
- [x] All repo/docs URLs point at `debug-diary-1/AetherUI`; docs at `https://debug-diary-1.github.io/AetherUI/docs/`, Storybook at `/storybook/`, playground at `https://aetherui-seven.vercel.app/playground/`
- [x] Issue templates (bug, feature, accessibility, component request), PR template, Dependabot config
- [x] Package metadata: `publishConfig`, `files`, `exports`, types, keywords, `repository`, LICENSE and README on all **6** publishable packages (`core`, `tokens`, `datatable`, `accordion`, `agent`, `mcp`)
- [x] CI (`ci.yml`): oxlint → theme validation → tests → build → Storybook build/tests → Chromatic; green on `main`
- [x] `deploy.yml` builds docs (with `DOCS_SITE`/`DOCS_BASE` for the `/AetherUI/` prefix) + Storybook and deploys both to GitHub Pages; the racing `deploy-storybook.yml` was removed
- [x] `publish.yml` publishes tokens → core → accordion → datatable → agent → mcp with provenance, via npm **Trusted Publishing (OIDC)** — no long-lived token in the repo
- [x] All GitHub Actions pinned to full commit SHAs; workflows declare least-privilege `permissions`; the publishing job restores no dependency caches
- [x] No secrets / `.env` files in the repo or history; published packages depend only on `lit`
- [x] `pnpm lint`, `pnpm format:check`, `pnpm build`, `pnpm test` pass locally

## 🔲 Maintainer actions (GitHub)

Settings → General
- [ ] Fix description typo / set topics *(may already be done via API — verify)*
- [ ] Enable **Discussions** (README and issue-template config link to it)
- [ ] Allow squash merging; auto-delete head branches

Settings → Code security
- [ ] Enable **Private vulnerability reporting** (SECURITY.md relies on it — only available once the repo is public)
- [ ] Enable Dependabot alerts + security updates, secret scanning

Settings → Branches
- [ ] Protect `main`: require PR + passing `CI` status check (optional for a solo maintainer, recommended once contributors arrive)

Housekeeping
- [ ] Delete stale remote branches (`claude/*`, `cursor/*`, merged/failed `dependabot/*`) — they'll be visible once public
- [ ] Close or fix the failing Dependabot PRs (astro 7 breaks the docs build; several have stale lockfiles)

## 🔲 Maintainer actions (npm)

- [ ] Create an npm account and claim the **@aetherui-kit** org (scope is currently unclaimed — 0 packages)
- [ ] For **each** `@aetherui-kit/*` package on npmjs.com, configure the trusted publisher:
      GitHub Actions · owner `debug-diary-1` · repo `AetherUI` · workflow `publish.yml`.
      (First publish of a brand-new package name may need a manual `npm publish`
      to create it before a trusted publisher can be attached.)
- [x] ~~Generate an npm token and add it as `NPM_TOKEN`~~ — not needed: publishing
      authenticates via OIDC, so there is no long-lived npm credential to leak
- [ ] Optional: sign up for Codecov and add `CODECOV_TOKEN` (upload is `fail_ci_if_error: false`, so CI passes without it)

Dry-run what will ship:

```bash
pnpm build
for p in tokens core accordion datatable agent mcp; do (cd packages/$p && pnpm pack --dry-run); done
```

## 🔲 First release (v0.1.0)

1. Fill in the `[0.1.0]` release date in `CHANGELOG.md`
2. `git tag -a v0.1.0 -m "Release v0.1.0" && git push origin v0.1.0`
   - **Pushing the tag is what publishes.** `publish.yml` triggers on `v*` tags,
     runs the full gate suite, then publishes all six packages.
   - Provenance and OIDC both require the repo to be **public** at publish time.
3. Draft a GitHub Release for `v0.1.0` (title `AetherUI v0.1.0 – Initial Release`,
   body from CHANGELOG) for the changelog audience — publishing already happened
   at step 2.
4. Verify: `npm view @aetherui-kit/core`, then `npm i @aetherui-kit/core @aetherui-kit/tokens` in a scratch project

## 🔲 Go public

- [ ] Settings → General → Danger Zone → **Change visibility → Public**
- [ ] Immediately after: enable Private vulnerability reporting (above), confirm the README badges render, and confirm https://debug-diary-1.github.io/AetherUI/docs/ loads with styles after the next `deploy.yml` run
- [ ] Announce (Show HN, r/webdev, dev.to, webcomponents.org, madewithlit.com)

## Known non-blockers to revisit after launch

- Mixed element-registration model: 22 components self-register via `@customElement` on import *and* expose `defineAeX()`; `@aetherui-kit/core` declares `sideEffects: false`. Decide on one model before 1.0.
- `ROADMAP.md` predates most of the current component set — refresh or remove.
- `examples/*` are integration guides (README-only), not runnable apps.
- Dev-dependency audit findings (astro 5.x, `shell-quote` via `concurrently`) — none affect published packages.
