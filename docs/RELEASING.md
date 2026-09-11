# Releasing AetherUI

A release consists of six packages: `@aetherui/tokens`, `@aetherui/core`, `@aetherui/accordion`, `@aetherui/datatable`, `@aetherui/agent`, and `@aetherui/mcp`. Publish in that order so internal dependencies are available first.

## First public release

Complete the account setup before tagging a release:

1. Confirm ownership of the `@aetherui` npm scope and publishing access for all six packages. Log in with `npm login`, then verify with `npm whoami`. Never commit credentials.
2. Make the GitHub repository public when the source and its history are ready to share. Run a history scan first: `gitleaks git --log-opts='--all' --redact`. Check licensing and package contents as part of the release checks below.
3. Enable private vulnerability reporting in GitHub's repository security settings and verify the link in `SECURITY.md` from an external account. Confirm the maintainer receives notifications.
4. Verify GitHub Actions can start jobs. If a check says the job could not start because of billing or a spending limit, resolve that in account settings before relying on CI.
5. Arrange the initial publication for packages that do not yet exist on npm. Configure each package's trusted publisher to authorize GitHub owner `debug-diary-1`, repository `AetherUI`, workflow filename `publish.yml`, with direct publishing allowed. Follow [npm's trusted-publisher setup](https://docs.npmjs.com/trusted-publishers/) for the current account and package setup requirements. The workflow alone does not grant access to an npm namespace.

Verify first-publication authentication before pushing a version tag. If a package must first be created using an authenticated local publish, run the checks below and publish only that reviewed version. Do not subsequently attempt to publish the same version again from CI; npm versions are immutable.

## Verify a release

Use Node 24 or later and the pnpm version pinned by `packageManager` (currently 12.3.4).

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install chromium firefox webkit
FORCE_TEST=true TURBO_FORCE=true pnpm check:release
pnpm test:storybook:ci
```

`check:release` includes formatting, lint, type checks, browser tests, generated artifact checks, release contracts, builds, React types, agent evaluations, package validation, packed-consumer tests, a production dependency audit, coverage thresholds, three browser engines, and end-to-end flows. The separate Storybook command exercises story interaction tests.

The audit gate fails on high or critical findings. Review lower-severity findings as well, including those in private docs and tooling packages.

## Publish an update

1. Choose package versions and update `CHANGELOG.md` with the release date and actual behavior changes. Keep workspace dependency ranges valid and refresh the lockfile with pnpm.
2. Run the release checks against the intended commit and obtain a green CI result on that commit.
3. Confirm all six packages have npm trusted publishing configured. The tag-triggered workflow publishes every package, so each version in that workflow must be unpublished.
4. Tag the reviewed commit using `v<version>` and push the tag. `.github/workflows/publish.yml` rebuilds from a clean checkout, runs the full release gate in a separate job with read-only permissions, then rebuilds from the committed lockfile in the OIDC publishing job and publishes with provenance. The publishing job does not consume artifacts or caches from the verification job.
5. Check all six registry versions and test a fresh application installed from npm, including React event delivery and the MCP executable. Packed-consumer tests verify local tarballs; they cannot prove the registry publication succeeded.
6. Publish release notes and confirm the public docs and Storybook URLs show the actual sites.

If a multi-package publication partially succeeds, inspect npm before retrying. Resolve authentication or registry failures, then publish only the missing packages at the reviewed versions; blindly rerunning the entire loop can fail on already-published versions.

## Documentation deployment

GitHub Pages builds docs into `packages/docs/dist` and Storybook into root `storybook-static`. Both builds, uploads, downloads, and entry-point checks must succeed before deployment. Failed or missing artifacts stop the workflow and preserve the previous site.

## Dependency maintenance

The workspace catalog pins direct tools and libraries to stable releases. Keep
Node typings on the Node 24 LTS line, matching CI and the runtime pin, rather than
using typings for APIs available only in Node 26.

Type checking and TypeScript package builds use the native TypeScript 7 compiler
through the `@typescript/native` alias. The `typescript` alias points to
`@typescript/typescript6` for the JavaScript compiler API used by declaration
generation, artifact analysis, and browser-test transforms. TypeScript 7 does not
yet provide that stable API; this follows the
[TypeScript migration guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).

Vite 8 uses Rolldown and Oxc. Build configuration uses `rolldownOptions`, playground
chunk groups use `codeSplitting`, and consumer JSX uses `oxc.jsx`. Legacy Lit
decorator settings come from tsconfig. Declarations use `unplugin-dts/vite`;
accordion declarations retain their public core re-export instead of bundling
core's declarations. See the [Vite migration guide](https://vite.dev/guide/migration).

pnpm configuration lives in `pnpm-workspace.yaml`, with explicit `allowBuilds`
decisions. The one-day release-age policy permits only the exact reviewed
same-day versions listed in `minimumReleaseAgeExclude`. Keep transitive packages
within upstream compatibility ranges; the remaining security overrides cover
API Extractor's pinned minimatch, AJV, and lodash, plus Storybook test runner's
uuid (the patched CommonJS-compatible major). Recheck their necessity with
`pnpm audit` on each upgrade.

After changing versions, run `pnpm outdated -r`, `pnpm peers check`,
`pnpm audit`, a frozen-lockfile install, and the release checks above. Some
upstream test tools still use deprecated packages; do not force incompatible
majors solely to suppress deprecation messages.
