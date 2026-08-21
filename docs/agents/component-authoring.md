# Component authoring for agents

## Interface

Each AetherUI custom element is a deep module. Its interface includes more than exported TypeScript names:

- tag and registration function;
- properties, reflected attributes, defaults, and valid values;
- emitted events and event detail;
- slots, CSS parts, and CSS properties;
- focus, keyboard, form, and accessibility behavior;
- ordering constraints and error modes.

Describe those facts in source JSDoc using Custom Elements Manifest annotations. The generated manifest is the source for package metadata, LLM documentation, runtime validation, and framework types.

## Implementation

Keep rendering and lifecycle orchestration in the element. Move substantial pure state transitions or algorithms into an internal controller only when that produces locality. Controllers are implementation details rather than a second public interface.

Use one canonical implementation for a behavior. Re-export it from additional packages instead of maintaining divergent copies.

## Verification

Tests cross the same seam as consumers. Assert on DOM state, roles, accessible names, focus, keyboard behavior, emitted events, and public properties. Tests should survive controller or rendering refactors.

Every new or changed element needs:

1. a registration test;
2. property/attribute tests;
3. event-detail tests;
4. keyboard and focus tests where interactive;
5. an accessibility assertion;
6. an executable usage example represented in the generated catalog.

Run `pnpm check` when the module's interface and implementation agree and all generated artifacts are current.
