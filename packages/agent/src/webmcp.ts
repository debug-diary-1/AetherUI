import { componentCatalog } from './catalog.generated.js';
import { renderAgentUi } from './render.js';
import type { AgentUiRenderOptions, AgentUiRenderResult } from './types.js';
import { AgentUiValidationError } from './types.js';
import { agentUiSchema, componentGuide } from './webmcp.generated.js';

/** The subset of the WebMCP `document.modelContext` interface this module uses. */
interface WebMcpModelContext {
  registerTool(
    tool: {
      name: string;
      title?: string;
      description: string;
      inputSchema?: object;
      execute(input: Record<string, unknown>, options: { signal: AbortSignal }): Promise<string>;
      annotations?: { readOnlyHint?: boolean };
    },
    options?: { signal?: AbortSignal },
  ): Promise<void>;
}

export interface AgentUiWebMcpOptions extends Omit<AgentUiRenderOptions, 'allowedComponents'> {
  /** Components the agent may render. Required: the host decides what can appear on the page. */
  allowedComponents: readonly string[];
  /** Prefix for the tool names `<prefix>_list_components` and `<prefix>_render_ui`. Default: `aetherui`. */
  toolPrefix?: string;
  /** What the surface is for, added to the render tool description. */
  surfaceDescription?: string;
  /** Aborting the signal unregisters both tools. Rendered content stays in place. */
  signal?: AbortSignal;
}

const TOOL_PREFIX = /^[A-Za-z0-9_.-]{1,100}$/;

/**
 * Registers WebMCP tools that let an in-browser agent discover the allowed AetherUI
 * components and render validated documents into `surface`.
 *
 * Resolves to `false` without registering anything when the browser does not provide
 * `document.modelContext`. Agent documents pass through `renderAgentUi`, so the host's
 * policy applies and declared events reach `onAction`, never the agent.
 */
export async function registerAgentUiTools(
  surface: Element,
  options: AgentUiWebMcpOptions,
): Promise<boolean> {
  const { toolPrefix = 'aetherui', surfaceDescription, signal, ...renderOptions } = options;
  if (!TOOL_PREFIX.test(toolPrefix)) {
    throw new TypeError(`Invalid WebMCP tool prefix "${toolPrefix}".`);
  }
  const modelContext = (document as Document & { modelContext?: WebMcpModelContext }).modelContext;
  if (!modelContext) return false;

  const allowed = new Set(renderOptions.allowedComponents);
  const tagNames = componentCatalog
    .map((component) => component.tagName)
    .filter((tagName) => allowed.has(tagName));
  const components = tagNames.map((tagName) => {
    const contract = componentCatalog.find((component) => component.tagName === tagName)!;
    const guide = componentGuide.find((component) => component.tagName === tagName);
    return {
      tagName,
      description: guide?.description ?? '',
      properties: contract.properties.map(({ name, type }) => ({ name, type })),
      events: contract.events.map(({ name }) => name),
      slots: guide?.slots ?? [],
    };
  });
  const inputSchema = structuredClone(agentUiSchema) as unknown as {
    $defs: { node: { properties: { component: { enum: string[] } } } };
  };
  inputSchema.$defs.node.properties.component.enum = tagNames;

  let current: AgentUiRenderResult | undefined;
  const registration = new AbortController();
  const unregister = (): void => registration.abort();
  signal?.addEventListener('abort', unregister, { once: true });
  if (signal?.aborted) unregister();

  const tools: Parameters<WebMcpModelContext['registerTool']>[0][] = [
    {
      name: `${toolPrefix}_list_components`,
      title: 'List available UI components',
      description:
        'List the AetherUI components this page allows an agent to render, with their properties, events, and slots.',
      annotations: { readOnlyHint: true },
      async execute() {
        return JSON.stringify(components);
      },
    },
    {
      name: `${toolPrefix}_render_ui`,
      title: 'Render UI',
      description: [
        'Replace the page surface with a validated AetherUI document. Each node names an allowed component; declared events map to action identifiers that the page handles. On rejection the surface is unchanged and the result lists the issues to fix.',
        surfaceDescription,
      ]
        .filter(Boolean)
        .join(' '),
      inputSchema,
      annotations: { readOnlyHint: false },
      async execute(input, { signal: callSignal }) {
        callSignal.throwIfAborted();
        try {
          const previous = current;
          current = renderAgentUi(surface, input, renderOptions);
          previous?.dispose();
          return JSON.stringify({ ok: true, nodeCount: current.nodeCount });
        } catch (error) {
          if (!(error instanceof AgentUiValidationError)) throw error;
          return JSON.stringify({ ok: false, issues: error.issues });
        }
      },
    },
  ];

  try {
    for (const tool of tools) {
      await modelContext.registerTool(tool, { signal: registration.signal });
    }
  } catch (error) {
    unregister();
    signal?.removeEventListener('abort', unregister);
    throw error;
  }
  return true;
}
