import { validateAgentUi } from './validate.js';
import type {
  AgentUiAction,
  AgentUiDocument,
  AgentUiNode,
  AgentUiRenderOptions,
  AgentUiRenderResult,
} from './types.js';
import { AgentUiValidationError } from './types.js';

export const AGENT_UI_ACTION_EVENT = 'aetherui-agent-action';

export function renderAgentUi(
  container: Element,
  input: unknown,
  options: AgentUiRenderOptions = {},
): AgentUiRenderResult {
  const validation = validateAgentUi(input, options);
  if (!validation.ok) throw new AgentUiValidationError(validation.issues);

  const disposers: Array<() => void> = [];
  const build = (node: AgentUiNode): HTMLElement => {
    const element = document.createElement(node.component);
    if (node.id) element.id = node.id;
    if (node.slot) element.slot = node.slot;

    for (const [name, value] of Object.entries(node.props ?? {})) {
      (element as unknown as Record<string, unknown>)[name] = value;
    }

    for (const [eventName, actionId] of Object.entries(node.actions ?? {})) {
      const listener = (event: Event): void => {
        if (event.composedPath()[0] !== element) return;
        const action: AgentUiAction = {
          actionId,
          componentId: node.id,
          component: node.component,
          eventName,
          detail: event instanceof CustomEvent ? event.detail : undefined,
        };
        options.onAction?.(action);
        container.dispatchEvent(
          new CustomEvent<AgentUiAction>(AGENT_UI_ACTION_EVENT, {
            detail: action,
            bubbles: true,
            composed: true,
          }),
        );
      };
      element.addEventListener(eventName, listener);
      disposers.push(() => element.removeEventListener(eventName, listener));
    }

    for (const child of node.children ?? []) {
      element.append(typeof child === 'string' ? document.createTextNode(child) : build(child));
    }
    return element;
  };

  const element = build((validation.document as AgentUiDocument).root);
  container.replaceChildren(element);

  return {
    element,
    nodeCount: validation.nodeCount,
    dispose(): void {
      disposers.forEach((dispose) => dispose());
      element.remove();
    },
  };
}
