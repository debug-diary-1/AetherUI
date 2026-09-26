import { componentCatalog } from './catalog.generated.js';
import { renderAgentUi } from './render.js';
import type {
  AgentUiAction,
  AgentUiDocument,
  AgentUiNode,
  AgentUiRenderOptions,
  AgentUiRenderResult,
} from './types.js';
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
      annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
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
  /**
   * Registers `<prefix>_get_ui_state`, which returns the current values of rendered
   * components that have an `id`. These values come from the user. Default: `false`.
   */
  shareState?: boolean;
  /**
   * Registers `<prefix>_wait_for_action`, which returns the next declared action the user
   * triggers in the rendered document. The host's `onAction` still runs. Default: `false`.
   */
  shareActions?: boolean;
  /** Aborting the signal unregisters the tools. Rendered content stays in place. */
  signal?: AbortSignal;
}

type WebMcpTool = Parameters<WebMcpModelContext['registerTool']>[0];
type SharedAction = Omit<AgentUiAction, 'detail'> & { detail: unknown };
type WaitOutcome =
  | { ok: true; action: SharedAction }
  | { ok: false; reason: 'timeout' | 'replaced' | 'unregistered' | 'nothing-rendered' };
interface IdentifiedComponent {
  id: string;
  component: string;
  element: Element;
}

const TOOL_PREFIX = /^[A-Za-z0-9_.-]{1,100}$/;
/** Properties that hold values a user can change. */
const STATE_PROPERTIES = new Set([
  'value',
  'checked',
  'indeterminate',
  'selected',
  'expanded',
  'open',
  'currentPage',
]);
const MAX_QUEUED_ACTIONS = 20;
const DEFAULT_WAIT_SECONDS = 60;
const MAX_WAIT_SECONDS = 300;
const MAX_SHARED_DEPTH = 8;

/** Keeps JSON data (plain objects, arrays, primitives); drops events, nodes, and functions. */
function toJsonSafe(value: unknown, depth = 0): unknown {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  if (depth >= MAX_SHARED_DEPTH || typeof value !== 'object') return undefined;
  if (Array.isArray(value)) {
    return value.map((item) => toJsonSafe(item, depth + 1)).filter((item) => item !== undefined);
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) return undefined;
  const result: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    const safe = toJsonSafe(item, depth + 1);
    if (safe !== undefined) result[key] = safe;
  }
  return result;
}

/** Pairs document nodes that have an `id` with the elements rendered for them. */
function identifiedComponents(
  node: AgentUiNode,
  element: Element,
  found: IdentifiedComponent[] = [],
): IdentifiedComponent[] {
  if (node.id) found.push({ id: node.id, component: node.component, element });
  (node.children ?? [])
    .filter((child): child is AgentUiNode => typeof child !== 'string')
    .forEach((child, index) => {
      const childElement = element.children[index];
      if (childElement) identifiedComponents(child, childElement, found);
    });
  return found;
}

/**
 * Registers WebMCP tools that let an in-browser agent discover the allowed AetherUI
 * components and render validated documents into `surface`.
 *
 * Resolves to `true` when the tools are registered. Resolves to `false` without registering
 * anything when the browser does not provide `document.modelContext` or `signal` is aborted. Agent documents pass through `renderAgentUi`, so the host's
 * policy applies and declared events reach `onAction`. The agent sees component state
 * and actions only when the host sets `shareState` or `shareActions`.
 */
export async function registerAgentUiTools(
  surface: Element,
  options: AgentUiWebMcpOptions,
): Promise<boolean> {
  const {
    toolPrefix = 'aetherui',
    surfaceDescription,
    shareState = false,
    shareActions = false,
    signal,
    onAction: hostOnAction,
    ...policy
  } = options;
  if (!TOOL_PREFIX.test(toolPrefix)) {
    throw new TypeError(`Invalid WebMCP tool prefix "${toolPrefix}".`);
  }
  const modelContext = (document as Document & { modelContext?: WebMcpModelContext }).modelContext;
  if (!modelContext || signal?.aborted) return false;

  const allowed = new Set(policy.allowedComponents);
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

  const stateProperties = new Map<string, readonly string[]>(
    componentCatalog.map((component) => [
      component.tagName,
      component.properties.map(({ name }) => name).filter((name) => STATE_PROPERTIES.has(name)),
    ]),
  );

  let current: { result: AgentUiRenderResult; identified: IdentifiedComponent[] } | undefined;
  let queuedActions: SharedAction[] = [];
  const waiters = new Set<(outcome: WaitOutcome) => void>();
  const endWaits = (reason: 'replaced' | 'unregistered'): void => {
    // Each waiter removes itself; deleting the visited entry is safe during Set iteration.
    for (const resolve of waiters) resolve({ ok: false, reason });
  };

  const registration = new AbortController();
  const unregister = (): void => registration.abort();
  registration.signal.addEventListener('abort', () => endWaits('unregistered'), { once: true });
  signal?.addEventListener('abort', unregister, { once: true });

  const renderOptions: AgentUiRenderOptions = {
    ...policy,
    onAction(action) {
      hostOnAction?.(action);
      if (!shareActions) return;
      const shared: SharedAction = { ...action, detail: toJsonSafe(action.detail) ?? null };
      const [waiter] = waiters;
      if (waiter) {
        waiter({ ok: true, action: shared });
        return;
      }
      queuedActions.push(shared);
      if (queuedActions.length > MAX_QUEUED_ACTIONS) queuedActions.shift();
    },
  };

  const readState = () => {
    if (!current) return { ok: false as const, reason: 'nothing-rendered' as const };
    const components: Record<string, { component: string; state: Record<string, unknown> }> = {};
    for (const { id, component, element } of current.identified) {
      if (Object.hasOwn(components, id)) continue;
      const state: Record<string, unknown> = {};
      for (const name of stateProperties.get(component) ?? []) {
        const value = toJsonSafe((element as unknown as Record<string, unknown>)[name]);
        if (value !== undefined) state[name] = value;
      }
      components[id] = { component, state };
    }
    return { ok: true as const, components };
  };

  const waitForAction = (seconds: number, callSignal: AbortSignal): Promise<WaitOutcome> => {
    callSignal.throwIfAborted();
    if (!current) return Promise.resolve({ ok: false, reason: 'nothing-rendered' });
    const queued = queuedActions.shift();
    if (queued) return Promise.resolve({ ok: true, action: queued });
    return new Promise((resolve, reject) => {
      const finish = (outcome: WaitOutcome): void => {
        cleanup();
        resolve(outcome);
      };
      const cancel = (): void => {
        cleanup();
        reject(callSignal.reason);
      };
      const timer = setTimeout(() => finish({ ok: false, reason: 'timeout' }), seconds * 1000);
      const cleanup = (): void => {
        clearTimeout(timer);
        waiters.delete(finish);
        callSignal.removeEventListener('abort', cancel);
      };
      waiters.add(finish);
      callSignal.addEventListener('abort', cancel, { once: true });
    });
  };

  const tools: WebMcpTool[] = [
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
        shareState || shareActions
          ? 'Give components an id to identify them in their state and actions.'
          : undefined,
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
          const result = renderAgentUi(surface, input, renderOptions);
          current = {
            result,
            identified: identifiedComponents(
              (input as unknown as AgentUiDocument).root,
              result.element,
            ),
          };
          queuedActions = [];
          endWaits('replaced');
          previous?.result.dispose();
          return JSON.stringify({ ok: true, nodeCount: result.nodeCount });
        } catch (error) {
          if (!(error instanceof AgentUiValidationError)) throw error;
          return JSON.stringify({ ok: false, issues: error.issues });
        }
      },
    },
  ];

  if (shareState) {
    tools.push({
      name: `${toolPrefix}_get_ui_state`,
      title: 'Read UI state',
      description:
        'Read the current values of rendered components that have an id, such as input text, checked boxes, and open panels. The values come from the user and are untrusted.',
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      async execute() {
        return JSON.stringify(readState());
      },
    });
  }

  if (shareActions) {
    tools.push({
      name: `${toolPrefix}_wait_for_action`,
      title: 'Wait for a user action',
      description:
        'Wait for the user to trigger one of the declared actions in the rendered document and return it. Actions that already happened are returned first, in order. When no action arrives, the result gives the reason: "timeout", "replaced", "unregistered", or "nothing-rendered".',
      inputSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          timeoutSeconds: {
            type: 'integer',
            minimum: 1,
            maximum: MAX_WAIT_SECONDS,
            description: `How long to wait. Default: ${DEFAULT_WAIT_SECONDS}.`,
          },
        },
      },
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      async execute(input, { signal: callSignal }) {
        const requested = Number(input?.timeoutSeconds ?? DEFAULT_WAIT_SECONDS);
        const seconds = Number.isFinite(requested)
          ? Math.min(Math.max(requested, 1), MAX_WAIT_SECONDS)
          : DEFAULT_WAIT_SECONDS;
        const outcome = await waitForAction(seconds, callSignal);
        return JSON.stringify(
          outcome.ok && shareState ? { ...outcome, state: readState() } : outcome,
        );
      },
    });
  }

  try {
    for (const tool of tools) {
      if (registration.signal.aborted) break;
      await modelContext.registerTool(tool, { signal: registration.signal });
    }
  } catch (error) {
    unregister();
    signal?.removeEventListener('abort', unregister);
    throw error;
  }
  // The host may abort while registration is in progress; aborting removes the tools.
  return !registration.signal.aborted;
}
