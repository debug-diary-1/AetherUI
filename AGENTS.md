# AetherUI agent guide

## Workflow

1. Locate the module's public interface: tag, properties, events, slots, CSS parts, tokens, invariants, and error modes.
2. Change source annotations together with implementation. `packages/core/custom-elements.json` and downstream agent artifacts are generated.
3. Test observable behavior through the public interface. Keep controllers and managers behind internal seams.
4. Run the narrowest relevant test while iterating, then run `pnpm check` before handing off.

## Context pointers

- Component implementation or public-interface changes: read `docs/agents/component-authoring.md` and the nearest tests.
- Generated catalog, LLM documentation, or schema changes: read `scripts/generate-agent-artifacts.mjs`; edit its inputs rather than generated outputs.
- Runtime-generated UI changes: read `packages/agent/README.md`; preserve validation before rendering and action identifiers instead of executable handlers.
- Release changes: reconcile package contents with `scripts/check-packages.mjs` and perform a consumer smoke test.

## Invariants

- A module presents one stable interface; implementation helpers remain internal.
- Custom element registration is idempotent.
- Agent-provided UI is data, never executable HTML or JavaScript.
- Accessibility behavior is part of the interface and requires interaction tests.
- The repository stays free of credentials, generated build output, and undocumented public exports.
