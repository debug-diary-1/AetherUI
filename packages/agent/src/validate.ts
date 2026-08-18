import { componentCatalog } from './catalog.generated.js';
import type {
  AgentUiComponentContract,
  AgentUiDocument,
  AgentUiJsonValue,
  AgentUiPolicy,
  AgentUiValidationIssue,
  AgentUiValidationResult,
} from './types.js';

const DEFAULT_MAX_DEPTH = 12;
const DEFAULT_MAX_NODES = 100;
const DEFAULT_URL_PROTOCOLS = ['https:', 'http:', 'mailto:', 'tel:'];
const URL_PROPERTY = /^(?:href|src|action|formAction)$/i;

const catalogByTag = new Map<string, AgentUiComponentContract>(
  componentCatalog.map((component) => [component.tagName, component]),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isJsonValue(value: unknown, seen = new Set<object>()): value is AgentUiJsonValue {
  if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) return true;
  if (typeof value !== 'object') return false;
  if (seen.has(value)) return false;
  seen.add(value);
  if (Array.isArray(value)) return value.every((entry) => isJsonValue(entry, seen));
  return Object.values(value as Record<string, unknown>).every((entry) => isJsonValue(entry, seen));
}

function isSafeUrl(value: string, protocols: readonly string[]): boolean {
  if (
    value.startsWith('/') ||
    value.startsWith('./') ||
    value.startsWith('../') ||
    value.startsWith('#')
  ) {
    return true;
  }
  try {
    return protocols.includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export function validateAgentUi(
  input: unknown,
  policy: AgentUiPolicy = {},
): AgentUiValidationResult {
  const issues: AgentUiValidationIssue[] = [];
  const maxDepth = policy.maxDepth ?? DEFAULT_MAX_DEPTH;
  const maxNodes = policy.maxNodes ?? DEFAULT_MAX_NODES;
  const allowedComponents = policy.allowedComponents
    ? new Set(policy.allowedComponents)
    : undefined;
  const allowedUrlProtocols = policy.allowedUrlProtocols ?? DEFAULT_URL_PROTOCOLS;
  let nodeCount = 0;

  if (!isRecord(input) || input.version !== '1' || !isRecord(input.root)) {
    return {
      ok: false,
      issues: [
        {
          path: '$',
          code: 'invalid-document',
          message: 'Expected an object with version "1" and a root node.',
        },
      ],
    };
  }

  const visit = (candidate: unknown, path: string, depth: number): void => {
    if (!isRecord(candidate) || typeof candidate.component !== 'string') {
      issues.push({
        path,
        code: 'invalid-node',
        message: 'Expected a node with a component name.',
      });
      return;
    }

    nodeCount += 1;
    if (nodeCount > maxNodes) {
      issues.push({ path, code: 'limit-exceeded', message: `Document exceeds ${maxNodes} nodes.` });
      return;
    }
    if (depth > maxDepth) {
      issues.push({ path, code: 'limit-exceeded', message: `Document exceeds depth ${maxDepth}.` });
      return;
    }

    const contract = catalogByTag.get(candidate.component);
    if (!contract || (allowedComponents && !allowedComponents.has(candidate.component))) {
      issues.push({
        path: `${path}.component`,
        code: 'unknown-component',
        message: `Component "${candidate.component}" is not allowed.`,
      });
      return;
    }

    if (candidate.id !== undefined && typeof candidate.id !== 'string') {
      issues.push({ path: `${path}.id`, code: 'invalid-node', message: 'id must be a string.' });
    }
    if (candidate.slot !== undefined && typeof candidate.slot !== 'string') {
      issues.push({
        path: `${path}.slot`,
        code: 'invalid-node',
        message: 'slot must be a string.',
      });
    }

    if (candidate.props !== undefined) {
      if (!isRecord(candidate.props)) {
        issues.push({
          path: `${path}.props`,
          code: 'invalid-node',
          message: 'props must be an object.',
        });
      } else {
        const properties = new Set(contract.properties.map((property) => property.name));
        for (const [name, value] of Object.entries(candidate.props)) {
          const propertyPath = `${path}.props.${name}`;
          if (!properties.has(name)) {
            issues.push({
              path: propertyPath,
              code: 'unknown-property',
              message: `Property "${name}" is not exposed by ${contract.tagName}.`,
            });
          } else if (!isJsonValue(value)) {
            issues.push({
              path: propertyPath,
              code: 'invalid-node',
              message: 'Property value must be JSON.',
            });
          } else if (
            URL_PROPERTY.test(name) &&
            typeof value === 'string' &&
            !isSafeUrl(value, allowedUrlProtocols)
          ) {
            issues.push({
              path: propertyPath,
              code: 'unsafe-url',
              message: `URL protocol is not allowed.`,
            });
          }
        }
      }
    }

    if (candidate.actions !== undefined) {
      if (!isRecord(candidate.actions)) {
        issues.push({
          path: `${path}.actions`,
          code: 'invalid-action',
          message: 'actions must be an object.',
        });
      } else {
        const events = new Set(contract.events.map((event) => event.name));
        for (const [eventName, actionId] of Object.entries(candidate.actions)) {
          if (!events.has(eventName)) {
            issues.push({
              path: `${path}.actions.${eventName}`,
              code: 'unknown-event',
              message: `Event "${eventName}" is not exposed by ${contract.tagName}.`,
            });
          }
          if (typeof actionId !== 'string' || actionId.length === 0) {
            issues.push({
              path: `${path}.actions.${eventName}`,
              code: 'invalid-action',
              message: 'Action identifiers must be non-empty strings.',
            });
          }
        }
      }
    }

    if (candidate.children !== undefined) {
      if (!Array.isArray(candidate.children)) {
        issues.push({
          path: `${path}.children`,
          code: 'invalid-node',
          message: 'children must be an array.',
        });
      } else {
        candidate.children.forEach((child, index) => {
          if (typeof child !== 'string') visit(child, `${path}.children[${index}]`, depth + 1);
        });
      }
    }
  };

  visit(input.root, '$.root', 1);
  if (issues.length > 0) return { ok: false, issues };
  return { ok: true, document: input as unknown as AgentUiDocument, nodeCount };
}
