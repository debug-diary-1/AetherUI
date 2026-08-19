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
const DEFAULT_MAX_PROPERTY_DEPTH = 32;
const DEFAULT_URL_PROTOCOLS = ['https:', 'http:', 'mailto:', 'tel:'];
const URL_PROPERTY = /^(?:href|src|action|formAction)$/i;

const catalogByTag = new Map<string, AgentUiComponentContract>(
  componentCatalog.map((component) => [component.tagName, component]),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

type JsonInspection = 'valid' | 'invalid' | 'too-deep';

function inspectJsonValue(
  value: unknown,
  maxDepth: number,
  depth = 0,
  ancestors = new Set<object>(),
): JsonInspection {
  if (depth > maxDepth) return 'too-deep';
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return 'valid';
  if (typeof value === 'number') return Number.isFinite(value) ? 'valid' : 'invalid';
  if (typeof value !== 'object' || ancestors.has(value)) return 'invalid';

  ancestors.add(value);
  const entries = Array.isArray(value) ? value : Object.values(value as Record<string, unknown>);
  for (const entry of entries) {
    const result = inspectJsonValue(entry, maxDepth, depth + 1, ancestors);
    if (result !== 'valid') {
      ancestors.delete(value);
      return result;
    }
  }
  ancestors.delete(value);
  return 'valid';
}

type JsonKind = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'null';

function jsonKind(value: AgentUiJsonValue): JsonKind {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value as Exclude<JsonKind, 'array' | 'null'>;
}

function expectedJsonKinds(contractType: string): Set<JsonKind> | undefined {
  if (/\b(?:any|unknown|AgentUiJsonValue)\b/.test(contractType)) return undefined;

  const kinds = new Set<JsonKind>();
  for (const rawPart of contractType.split('|')) {
    const part = rawPart.trim();
    if (/\[\]$|^(?:Readonly)?Array\s*</.test(part) || /^readonly\s+\[|^\[/.test(part)) {
      kinds.add('array');
    } else if (/^string$|^`|^['"]/.test(part)) {
      kinds.add('string');
    } else if (/^number$/.test(part)) {
      kinds.add('number');
    } else if (/^boolean$|^(?:true|false)$/.test(part)) {
      kinds.add('boolean');
    } else if (/^null$/.test(part)) {
      kinds.add('null');
    } else if (/^(?:object|Record\s*<|\{)/.test(part)) {
      kinds.add('object');
    }
  }
  return kinds.size > 0 ? kinds : undefined;
}

function matchesPropertyType(value: AgentUiJsonValue, contractType: string): boolean {
  const expectedKinds = expectedJsonKinds(contractType);
  return !expectedKinds || expectedKinds.has(jsonKind(value));
}

function isSafeUrl(value: string, protocols: readonly string[]): boolean {
  if (value.includes('\\') || /^[\\/]{2}/.test(value)) return false;
  const base = new URL('https://aetherui.invalid/');
  try {
    const parsed = new URL(value, base);
    const hasExplicitScheme = /^[a-z][a-z\d+.-]*:/i.test(value);
    return hasExplicitScheme ? protocols.includes(parsed.protocol) : parsed.origin === base.origin;
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
  const maxPropertyDepth = policy.maxPropertyDepth ?? DEFAULT_MAX_PROPERTY_DEPTH;
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
        const properties = new Map(
          contract.properties.map((property) => [property.name, property] as const),
        );
        for (const [name, value] of Object.entries(candidate.props)) {
          const propertyPath = `${path}.props.${name}`;
          const property = properties.get(name);
          if (!property) {
            issues.push({
              path: propertyPath,
              code: 'unknown-property',
              message: `Property "${name}" is not exposed by ${contract.tagName}.`,
            });
          } else {
            const jsonInspection = inspectJsonValue(value, maxPropertyDepth);
            if (jsonInspection !== 'valid') {
              issues.push({
                path: propertyPath,
                code: jsonInspection === 'too-deep' ? 'limit-exceeded' : 'invalid-node',
                message:
                  jsonInspection === 'too-deep'
                    ? `Property value exceeds depth ${maxPropertyDepth}.`
                    : 'Property value must be JSON.',
              });
              continue;
            }
            if (!matchesPropertyType(value as AgentUiJsonValue, property.type)) {
              issues.push({
                path: propertyPath,
                code: 'invalid-property',
                message: `Property "${name}" must match catalog type ${property.type}.`,
              });
              continue;
            }
          }
          if (
            property &&
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
