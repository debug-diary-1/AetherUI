export type AgentUiJsonValue =
  | string
  | number
  | boolean
  | null
  | AgentUiJsonValue[]
  | { [key: string]: AgentUiJsonValue };

export interface AgentUiNode {
  component: string;
  id?: string;
  slot?: string;
  props?: Record<string, AgentUiJsonValue>;
  children?: Array<AgentUiNode | string>;
  actions?: Record<string, string>;
}

export interface AgentUiDocument {
  version: '1';
  root: AgentUiNode;
}

export interface AgentUiPropertyContract {
  name: string;
  attribute: string | null;
  type: string;
}

export interface AgentUiEventContract {
  name: string;
  type: string;
}

export interface AgentUiComponentContract {
  tagName: string;
  properties: readonly AgentUiPropertyContract[];
  events: readonly AgentUiEventContract[];
}

export interface AgentUiPolicy {
  maxDepth?: number;
  maxNodes?: number;
  allowedComponents?: readonly string[];
  allowedUrlProtocols?: readonly string[];
}

export interface AgentUiValidationIssue {
  path: string;
  code:
    | 'invalid-document'
    | 'invalid-node'
    | 'unknown-component'
    | 'unknown-property'
    | 'unknown-event'
    | 'invalid-action'
    | 'unsafe-url'
    | 'limit-exceeded';
  message: string;
}

export type AgentUiValidationResult =
  | { ok: true; document: AgentUiDocument; nodeCount: number }
  | { ok: false; issues: AgentUiValidationIssue[] };

export interface AgentUiAction {
  actionId: string;
  componentId?: string;
  component: string;
  eventName: string;
  detail: unknown;
}

export interface AgentUiRenderOptions extends AgentUiPolicy {
  onAction?: (action: AgentUiAction) => void;
}

export interface AgentUiRenderResult {
  element: HTMLElement;
  nodeCount: number;
  dispose(): void;
}

export class AgentUiValidationError extends Error {
  constructor(readonly issues: AgentUiValidationIssue[]) {
    super(issues.map((issue) => `${issue.path}: ${issue.message}`).join('\n'));
    this.name = 'AgentUiValidationError';
  }
}
