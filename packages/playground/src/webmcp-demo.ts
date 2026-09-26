import '@aetherui-kit/tokens/dark.css';
import './styles/global.css';
import './styles/webmcp-demo.css';
import { defineAll } from '@aetherui-kit/core';
import { registerAgentUiTools } from '@aetherui-kit/agent/webmcp';

defineAll();

interface RegisteredTool {
  name: string;
}
interface ModelContext {
  getTools(): Promise<RegisteredTool[]>;
  executeTool(tool: RegisteredTool, input: string): Promise<string>;
}

interface WaitOutcome {
  ok: boolean;
  reason?: string;
  action?: { actionId: string };
  state?: { components?: Record<string, { state: { value?: unknown } }> };
}

const TOOL_PREFIX = 'playground';
const surface = document.querySelector<HTMLElement>('#surface')!;
const status = document.querySelector<HTMLElement>('#status')!;
const log = document.querySelector<HTMLOListElement>('#log')!;
const runButton = document.querySelector<HTMLElement & { disabled: boolean }>('#run')!;

function record(source: 'agent' | 'page', message: string, data?: unknown): void {
  const entry = document.createElement('li');
  entry.dataset.source = source;
  const label = document.createElement('span');
  label.className = 'demo-log-source';
  label.textContent = source === 'agent' ? 'Agent' : 'Page';
  const text = document.createElement('span');
  text.textContent = message;
  entry.append(label, text);
  if (data !== undefined) {
    const json = document.createElement('pre');
    json.textContent = JSON.stringify(data, null, 2);
    entry.append(json);
  }
  log.append(entry);
  entry.scrollIntoView({ block: 'nearest' });
}

const refundDocument = {
  version: '1',
  root: {
    component: 'ae-alert',
    id: 'refund',
    props: { variant: 'warning' },
    children: [
      'Refund $40.00 for order #1042?',
      {
        component: 'ae-input',
        id: 'reason',
        props: { label: 'Reason (optional)', placeholder: 'Item arrived damaged' },
      },
      {
        component: 'ae-button',
        id: 'confirm',
        props: { variant: 'primary' },
        children: ['Refund'],
        actions: { 'ae-button-click': 'confirm-refund' },
      },
      {
        component: 'ae-button',
        id: 'cancel',
        props: { variant: 'ghost' },
        children: ['Cancel'],
        actions: { 'ae-button-click': 'cancel-refund' },
      },
    ],
  },
};

/** A scripted agent that drives the page through the browser's WebMCP interface. */
async function runSampleAgent(modelContext: ModelContext): Promise<void> {
  const tools = new Map(
    (await modelContext.getTools()).map((tool) => [tool.name.replace(`${TOOL_PREFIX}_`, ''), tool]),
  );
  // Chrome 149–154 takes tool input as JSON text.
  const call = async <T>(name: string, input: unknown = {}): Promise<T> =>
    JSON.parse(await modelContext.executeTool(tools.get(name)!, JSON.stringify(input))) as T;

  const components = await call<Array<{ tagName: string }>>('list_components');
  record(
    'agent',
    `Listed ${components.length} allowed components.`,
    components.map((component) => component.tagName),
  );

  record('agent', 'Rendered a refund confirmation.', refundDocument);
  await call('render_ui', refundDocument);

  record('agent', 'Waiting for your choice (up to 2 minutes).');
  const outcome = await call<WaitOutcome>('wait_for_action', { timeoutSeconds: 120 });
  if (!outcome.ok || !outcome.action) {
    record('agent', `Stopped waiting: ${outcome.reason}.`, outcome);
    return;
  }
  record('agent', `Received ${outcome.action.actionId}.`, outcome);

  const reason = String(outcome.state?.components?.reason?.state?.value ?? '').trim();
  const confirmed = outcome.action.actionId === 'confirm-refund';
  const summary = {
    version: '1',
    root: {
      component: 'ae-alert',
      props: { variant: confirmed ? 'success' : 'info' },
      children: [
        confirmed
          ? `Refunded $40.00 for order #1042. Reason: ${reason || 'none given'}.`
          : 'Refund cancelled. Nothing was charged back.',
      ],
    },
  };
  await call('render_ui', summary);
  record('agent', 'Rendered the result.', summary);
}

async function start(): Promise<void> {
  const registered = await registerAgentUiTools(surface, {
    allowedComponents: [
      'ae-alert',
      'ae-badge',
      'ae-button',
      'ae-checkbox',
      'ae-input',
      'ae-progress',
      'ae-radio',
      'ae-radio-group',
      'ae-select',
      'ae-spinner',
      'ae-switch',
      'ae-textarea',
    ],
    toolPrefix: TOOL_PREFIX,
    surfaceDescription: 'A demo panel in the AetherUI playground.',
    shareState: true,
    shareActions: true,
    maxNodes: 60,
    onAction(action) {
      record('page', `Handled action ${action.actionId} from ${action.component}.`);
    },
  });

  if (!registered) {
    status.dataset.state = 'unavailable';
    status.textContent =
      'This browser does not expose WebMCP. Use Chrome 149 or later, enable chrome://flags/#enable-webmcp-testing, and reload.';
    return;
  }

  const modelContext = (document as unknown as { modelContext: ModelContext }).modelContext;
  const names = (await modelContext.getTools())
    .map((tool) => tool.name)
    .filter((name) => name.startsWith(`${TOOL_PREFIX}_`));
  status.dataset.state = 'available';
  status.textContent = `WebMCP is available. This page registered ${names.length} tools: ${names.join(', ')}.`;
  runButton.disabled = false;
  runButton.addEventListener('ae-button-click', async () => {
    runButton.disabled = true;
    try {
      await runSampleAgent(modelContext);
    } catch (error) {
      record('agent', `Stopped: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      runButton.disabled = false;
    }
  });
}

document.querySelector('#clear')!.addEventListener('ae-button-click', () => log.replaceChildren());
void start();
