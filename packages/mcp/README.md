# `@aetherui-kit/mcp`

Read-only AetherUI discovery and validation for MCP hosts. The stdio server exposes:

- the full component catalog and agent document schema as resources;
- `get_component` for focused interface lookup;
- `validate_agent_ui` for the same semantic validation used by `@aetherui-kit/agent`.

Configure an MCP host to spawn the published binary:

```json
{
  "mcpServers": {
    "aetherui": {
      "command": "npx",
      "args": ["-y", "@aetherui-kit/mcp"]
    }
  }
}
```

The server writes only MCP protocol messages to stdout. It does not render UI, execute model output, or mutate projects.
