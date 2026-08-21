# Core module workflow

Read `../../docs/agents/component-authoring.md` before changing a custom element.

Keep each element's interface in its source JSDoc. Run `pnpm generate:agent-artifacts` after changing tags, properties, events, slots, CSS parts, or CSS properties. Generated files must have no manual edits.

Test through DOM-visible behavior: properties, attributes, events, rendered roles, focus, keyboard interaction, slots, and registration. Prefer a focused browser test during iteration:

```bash
pnpm --filter @aetherui/core test -- --files src/<module>/**/*.test.ts
```

Completion requires the focused test plus root `pnpm check`.
