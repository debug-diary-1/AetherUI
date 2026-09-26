import { componentCatalog, validateAgentUi } from '@aetherui-kit/agent';
import { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import agentUiSchema from '../agent-ui.schema.json' with { type: 'json' };
import fullCatalog from '../component-catalog.json' with { type: 'json' };

const catalogText = `${JSON.stringify(fullCatalog, null, 2)}\n`;
const schemaText = `${JSON.stringify(agentUiSchema, null, 2)}\n`;
const urlProtocolSchema = z
  .string()
  .trim()
  .regex(/^[a-z][a-z\d+.-]*:?$/i, 'Expected a URL protocol such as https or https:')
  .transform((protocol) => `${protocol.replace(/:$/, '').toLowerCase()}:`);

export function createAetherUiMcpServer(): McpServer {
  const server = new McpServer(
    {
      name: 'aetherui',
      version: '0.1.0',
      websiteUrl: 'https://github.com/debug-diary-1/AetherUI',
    },
    {
      instructions:
        'Read the component catalog before composing AetherUI. Validate every agent UI document before handing it to a renderer.',
    },
  );

  server.registerResource(
    'component-catalog',
    'aetherui://component-catalog',
    {
      title: 'AetherUI component catalog',
      description: 'Properties, events, slots, CSS parts, and accessibility-oriented interfaces.',
      mimeType: 'application/json',
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: 'application/json', text: catalogText }],
    }),
  );

  server.registerResource(
    'agent-ui-schema',
    'aetherui://agent-ui-schema',
    {
      title: 'AetherUI agent document schema',
      description: 'JSON Schema for constrained model-generated AetherUI documents.',
      mimeType: 'application/schema+json',
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: 'application/schema+json', text: schemaText }],
    }),
  );

  server.registerTool(
    'get_component',
    {
      title: 'Get AetherUI component',
      description: 'Return the canonical interface contract for one AetherUI custom element.',
      inputSchema: z.object({
        tagName: z.string().describe('Custom element tag, for example ae-button.'),
      }),
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ tagName }) => {
      const component = fullCatalog.components.find((entry) => entry.tagName === tagName);
      if (!component) {
        const known = componentCatalog.map((entry) => entry.tagName).join(', ');
        return {
          content: [{ type: 'text', text: `Unknown component "${tagName}". Known tags: ${known}` }],
          isError: true,
        };
      }
      return {
        content: [{ type: 'text', text: JSON.stringify(component, null, 2) }],
        structuredContent: { component },
      };
    },
  );

  server.registerTool(
    'validate_agent_ui',
    {
      title: 'Validate AetherUI agent document',
      description:
        'Check a model-generated document against component, property, event, URL, depth, and node policies.',
      inputSchema: z.object({
        document: z.unknown().describe('Candidate AetherUI agent document.'),
        allowedComponents: z.array(z.string()).optional(),
        allowedUrlProtocols: z.array(urlProtocolSchema).optional(),
        maxDepth: z
          .number()
          .int()
          .positive()
          .describe('Maximum component nesting; root depth is 1.')
          .optional(),
        maxNodes: z
          .number()
          .int()
          .positive()
          .describe('Maximum element and text nodes, including the root.')
          .optional(),
        maxPropertyDepth: z.number().int().positive().optional(),
      }),
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({
      document,
      allowedComponents,
      allowedUrlProtocols,
      maxDepth,
      maxNodes,
      maxPropertyDepth,
    }) => {
      const result = validateAgentUi(document, {
        allowedComponents,
        allowedUrlProtocols,
        maxDepth,
        maxNodes,
        maxPropertyDepth,
      });
      const structuredContent = result.ok
        ? { ok: true, nodeCount: result.nodeCount }
        : { ok: false, issues: result.issues };
      return {
        content: [{ type: 'text', text: JSON.stringify(structuredContent, null, 2) }],
        structuredContent,
        ...(result.ok ? {} : { isError: true }),
      };
    },
  );

  return server;
}
