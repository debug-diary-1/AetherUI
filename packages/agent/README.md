# `@aetherui-kit/agent`

Validated rendering for agent-generated AetherUI documents. The module exposes two interfaces:

- `validateAgentUi(input, policy)` validates structure, component and property allowlists, declared events, URL protocols, depth, and node count.
- `renderAgentUi(container, input, options)` validates first, replaces the container contents, and converts declared component events into structured action data.

Register the AetherUI elements your application allows before rendering:

```ts
import { defineAeButton, defineAeInput } from '@aetherui-kit/core';
import { renderAgentUi } from '@aetherui-kit/agent';

defineAeButton();
defineAeInput();

renderAgentUi(document.querySelector('#surface')!, {
  version: '1',
  root: {
    component: 'ae-button',
    id: 'save',
    children: ['Save'],
    actions: { 'ae-button-click': 'save-profile' },
  },
}, {
  allowedComponents: ['ae-button', 'ae-input'],
  onAction(action) {
    console.log(action.actionId, action.detail);
  },
});
```

Agent documents are JSON data. The renderer rejects unknown interface fields and never evaluates handlers, scripts, or HTML. Use `agent-ui.schema.json` for structured model output and keep the runtime validator at the rendering seam.

The default `maxNodes` is 100 and counts the root, nested components, and every text child (including empty strings). The returned `nodeCount` uses the same definition; it excludes component shadow DOM. Validation stops visiting siblings once the budget is exceeded, and rendering leaves existing content intact on failure. `maxDepth` limits component nesting to 12 by default, and `maxPropertyDepth` limits JSON property nesting to 32. Hosts should also bound incoming JSON size before parsing it.

## WebMCP (experimental)

[WebMCP](https://developer.chrome.com/docs/ai/webmcp) lets a page register tools that an in-browser agent can call. `@aetherui-kit/agent/webmcp` registers two tools for a surface on your page:

- `aetherui_list_components` (read-only) describes the allowed components: properties, events, and slots.
- `aetherui_render_ui` renders an agent document into the surface through `renderAgentUi`. Its input schema is `agent-ui.schema.json`, narrowed to the allowed components. A rejected document leaves the surface unchanged and returns the validation issues, so the agent can correct it.

```ts
import { defineAeButton } from '@aetherui-kit/core';
import { registerAgentUiTools } from '@aetherui-kit/agent/webmcp';

defineAeButton();

const tools = new AbortController();
const registered = await registerAgentUiTools(document.querySelector('#surface')!, {
  allowedComponents: ['ae-button'],
  surfaceDescription: 'Actions for the current order.',
  signal: tools.signal,
  onAction(action) {
    if (action.actionId === 'save-profile') saveProfile();
  },
});
```

The agent can also follow up on what the user does, if the host opts in:

- `shareState: true` registers `aetherui_get_ui_state`, which returns the current `value`, `checked`, `selected`, `expanded`, `open`, and similar values of rendered components that have an `id`.
- `shareActions: true` registers `aetherui_wait_for_action`, which returns the next declared action the user triggers, such as `{ "actionId": "confirm-refund", "componentId": "confirm" }`. Actions that happen before the agent asks are queued; a wait ends with `timeout`, `replaced`, or `unregistered` otherwise. With `shareState`, the result also includes the current state.

Both tools are marked `untrustedContentHint`, because their values come from the user. Event details are reduced to JSON data. The host's `onAction` still runs for every action.

`allowedComponents` is required. The host policy (`maxNodes`, `maxDepth`, URL protocols) applies to every agent document, and declared events reach `onAction` on the page, never the agent. The call resolves to `true` once the tools are registered, and to `false` without registering anything when the browser does not provide `document.modelContext` or `signal` is already aborted. Aborting `signal` unregisters both tools and leaves rendered content in place. Use `toolPrefix` to register several surfaces on one page, for example `checkout_render_ui`.

WebMCP is a Chrome origin trial (Chrome 149+) and may change. Enable it locally with `chrome://flags/#enable-webmcp-testing`. In Chrome 154, declarative WebMCP forms (`<form toolname>`) include only native form controls; AetherUI form elements inside such a form are not part of the tool's input schema, so use this imperative module for agent access to AetherUI surfaces.
