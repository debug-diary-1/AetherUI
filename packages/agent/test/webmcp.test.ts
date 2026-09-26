import { expect } from '@open-wc/testing';
import { registerAgentUiTools } from '../src/webmcp';
import type { AgentUiAction } from '../src/index';

interface FakeTool {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: Record<string, boolean>;
  execute(input: unknown, options: { signal: AbortSignal }): unknown;
}

/** Mirrors the WebMCP registration contract: unique names, AbortSignal unregistration. */
class FakeModelContext extends EventTarget {
  readonly tools = new Map<string, FakeTool>();
  failOn?: string;

  async registerTool(tool: FakeTool, options: { signal?: AbortSignal } = {}): Promise<void> {
    if (tool.name === this.failOn || this.tools.has(tool.name)) {
      throw new DOMException(`Duplicate tool name "${tool.name}"`, 'InvalidStateError');
    }
    if (options.signal?.aborted) return;
    this.tools.set(tool.name, tool);
    options.signal?.addEventListener('abort', () => this.tools.delete(tool.name), { once: true });
  }

  async call(
    name: string,
    input: unknown,
    signal = new AbortController().signal,
  ): Promise<unknown> {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(`No tool named ${name}`);
    return JSON.parse(String(await tool.execute(input, { signal })));
  }
}

const saveDocument = {
  version: '1',
  root: {
    component: 'ae-button',
    id: 'save',
    children: ['Save'],
    actions: { 'ae-button-click': 'save-profile' },
  },
};

describe('@aetherui-kit/agent/webmcp', () => {
  let modelContext: FakeModelContext;
  let surface: HTMLElement;

  beforeEach(() => {
    modelContext = new FakeModelContext();
    Object.defineProperty(document, 'modelContext', { configurable: true, value: modelContext });
    surface = document.createElement('section');
    surface.textContent = 'existing content';
  });

  afterEach(() => {
    delete (document as { modelContext?: unknown }).modelContext;
  });

  it('reports no support and registers nothing when the browser lacks WebMCP', async () => {
    Object.defineProperty(document, 'modelContext', { configurable: true, value: undefined });

    expect(await registerAgentUiTools(surface, { allowedComponents: ['ae-button'] })).to.equal(
      false,
    );
    expect(modelContext.tools.size).to.equal(0);
  });

  it('registers a read-only discovery tool and a render tool limited to allowed components', async () => {
    expect(
      await registerAgentUiTools(surface, { allowedComponents: ['ae-button', 'ae-alert'] }),
    ).to.equal(true);

    expect([...modelContext.tools.keys()]).to.have.members([
      'aetherui_list_components',
      'aetherui_render_ui',
    ]);
    const list = modelContext.tools.get('aetherui_list_components')!;
    const render = modelContext.tools.get('aetherui_render_ui')!;
    expect(list.annotations).to.deep.equal({ readOnlyHint: true });
    expect(render.annotations).to.deep.equal({ readOnlyHint: false });

    const schema = render.inputSchema as {
      required: string[];
      $defs: { node: { properties: { component: { enum: string[] } } } };
    };
    expect(schema.required).to.deep.equal(['version', 'root']);
    expect(schema.$defs.node.properties.component.enum).to.deep.equal(['ae-alert', 'ae-button']);
  });

  it('describes only the allowed components, including their slots and events', async () => {
    await registerAgentUiTools(surface, { allowedComponents: ['ae-button'] });

    const components = (await modelContext.call('aetherui_list_components', {})) as Array<{
      tagName: string;
      description: string;
      properties: Array<{ name: string; type: string }>;
      events: string[];
      slots: Array<{ name: string }>;
    }>;

    expect(components.map((component) => component.tagName)).to.deep.equal(['ae-button']);
    const [button] = components;
    expect(button.description).to.be.a('string').and.not.equal('');
    expect(button.properties.map((property) => property.name)).to.include('variant');
    expect(button.events).to.include('ae-button-click');
    expect(button.slots.map((slot) => slot.name)).to.include('');
  });

  it('renders a valid document and delivers user actions to the host, not the agent', async () => {
    const actions: AgentUiAction[] = [];
    await registerAgentUiTools(surface, {
      allowedComponents: ['ae-button'],
      onAction: (action) => actions.push(action),
    });

    expect(await modelContext.call('aetherui_render_ui', saveDocument)).to.deep.equal({
      ok: true,
      nodeCount: 2,
    });
    const button = surface.querySelector('ae-button')!;
    expect(button.textContent).to.equal('Save');

    button.dispatchEvent(new CustomEvent('ae-button-click'));
    expect(actions.map((action) => action.actionId)).to.deep.equal(['save-profile']);
  });

  it('returns validation issues and leaves the surface untouched', async () => {
    await registerAgentUiTools(surface, { allowedComponents: ['ae-button'] });

    const result = (await modelContext.call('aetherui_render_ui', {
      version: '1',
      root: { component: 'ae-alert', children: ['Not allowed'] },
    })) as { ok: boolean; issues: Array<{ path: string; code: string }> };

    expect(result.ok).to.equal(false);
    expect(result.issues).to.deep.include({
      path: '$.root.component',
      code: 'unknown-component',
      message: 'Component "ae-alert" is not allowed.',
    });
    expect(surface.textContent).to.equal('existing content');
  });

  it('applies the host policy limits to agent documents', async () => {
    await registerAgentUiTools(surface, { allowedComponents: ['ae-button'], maxNodes: 1 });

    const result = (await modelContext.call('aetherui_render_ui', saveDocument)) as {
      ok: boolean;
      issues: Array<{ code: string }>;
    };
    expect(result.ok).to.equal(false);
    expect(result.issues.map((issue) => issue.code)).to.deep.equal(['limit-exceeded']);
  });

  it('replaces the previous render and releases its action listeners', async () => {
    const actions: AgentUiAction[] = [];
    await registerAgentUiTools(surface, {
      allowedComponents: ['ae-button'],
      onAction: (action) => actions.push(action),
    });
    await modelContext.call('aetherui_render_ui', saveDocument);
    const first = surface.querySelector('ae-button')!;

    await modelContext.call('aetherui_render_ui', {
      version: '1',
      root: { component: 'ae-button', children: ['Cancel'] },
    });
    first.dispatchEvent(new CustomEvent('ae-button-click'));

    expect(surface.querySelector('ae-button')!.textContent).to.equal('Cancel');
    expect(actions).to.deep.equal([]);
  });

  it('does not render once the agent cancels the call', async () => {
    await registerAgentUiTools(surface, { allowedComponents: ['ae-button'] });
    const controller = new AbortController();
    controller.abort();

    let error: unknown;
    try {
      await modelContext.call('aetherui_render_ui', saveDocument, controller.signal);
    } catch (caught) {
      error = caught;
    }
    expect((error as DOMException)?.name).to.equal('AbortError');
    expect(surface.textContent).to.equal('existing content');
  });

  it('unregisters its tools when the host aborts the signal', async () => {
    const controller = new AbortController();
    await registerAgentUiTools(surface, {
      allowedComponents: ['ae-button'],
      signal: controller.signal,
    });

    controller.abort();
    expect(modelContext.tools.size).to.equal(0);
  });

  it('uses a tool prefix and surface description so several surfaces can coexist', async () => {
    await registerAgentUiTools(surface, {
      allowedComponents: ['ae-button'],
      toolPrefix: 'checkout',
      surfaceDescription: 'The order summary panel.',
    });

    expect([...modelContext.tools.keys()]).to.have.members([
      'checkout_list_components',
      'checkout_render_ui',
    ]);
    expect(modelContext.tools.get('checkout_render_ui')!.description).to.contain(
      'The order summary panel.',
    );
  });

  it('rejects invalid tool prefixes before registering anything', async () => {
    let error: unknown;
    try {
      await registerAgentUiTools(surface, { allowedComponents: ['ae-button'], toolPrefix: 'a b' });
    } catch (caught) {
      error = caught;
    }
    expect(error).to.be.instanceOf(TypeError);
    expect(modelContext.tools.size).to.equal(0);
  });

  it('rolls back a partial registration when one tool name is taken', async () => {
    modelContext.failOn = 'aetherui_render_ui';

    let error: unknown;
    try {
      await registerAgentUiTools(surface, { allowedComponents: ['ae-button'] });
    } catch (caught) {
      error = caught;
    }
    expect((error as DOMException)?.name).to.equal('InvalidStateError');
    expect(modelContext.tools.size).to.equal(0);
  });
});

/**
 * Runs against the browser's own WebMCP implementation (the test runner enables
 * Chromium's WebMCPTesting feature). Agents call executeTool with JSON-encoded input.
 */
describe('@aetherui-kit/agent/webmcp in Chromium', () => {
  interface RegisteredTool {
    name: string;
    annotations?: { readOnlyHint?: boolean };
  }
  interface NativeModelContext {
    getTools(): Promise<RegisteredTool[]>;
    executeTool(tool: RegisteredTool, input: string): Promise<string>;
  }
  const modelContext = (): NativeModelContext =>
    (document as unknown as { modelContext: NativeModelContext }).modelContext;
  const tool = async (name: string): Promise<RegisteredTool | undefined> =>
    (await modelContext().getTools()).find((candidate) => candidate.name === name);

  let registration: AbortController;
  beforeEach(() => {
    registration = new AbortController();
  });
  afterEach(() => registration.abort());

  it('exposes the tools to agents and renders their documents into the surface', async () => {
    const surface = document.createElement('section');
    const actions: string[] = [];
    expect(
      await registerAgentUiTools(surface, {
        allowedComponents: ['ae-button'],
        toolPrefix: 'native',
        signal: registration.signal,
        onAction: (action) => actions.push(action.actionId),
      }),
    ).to.equal(true);

    expect((await tool('native_list_components'))?.annotations?.readOnlyHint).to.equal(true);
    const render = (await tool('native_render_ui'))!;
    const rejected = JSON.parse(
      await modelContext().executeTool(
        render,
        JSON.stringify({ version: '1', root: { component: 'script' } }),
      ),
    );
    expect(rejected.ok).to.equal(false);

    const rendered = JSON.parse(
      await modelContext().executeTool(render, JSON.stringify(saveDocument)),
    );
    expect(rendered).to.deep.equal({ ok: true, nodeCount: 2 });
    surface.querySelector('ae-button')!.dispatchEvent(new CustomEvent('ae-button-click'));
    expect(actions).to.deep.equal(['save-profile']);
  });

  it('unregisters from the browser when the host aborts', async () => {
    await registerAgentUiTools(document.createElement('section'), {
      allowedComponents: ['ae-button'],
      toolPrefix: 'native_abort',
      signal: registration.signal,
    });
    expect(await tool('native_abort_render_ui')).to.exist;

    registration.abort();
    expect(await tool('native_abort_render_ui')).to.equal(undefined);
    expect(await tool('native_abort_list_components')).to.equal(undefined);
  });

  it('surfaces the browser rejection of a duplicate surface registration', async () => {
    const options = {
      allowedComponents: ['ae-button'],
      toolPrefix: 'native_duplicate',
      signal: registration.signal,
    };
    await registerAgentUiTools(document.createElement('section'), options);

    let error: unknown;
    try {
      await registerAgentUiTools(document.createElement('section'), options);
    } catch (caught) {
      error = caught;
    }
    expect((error as DOMException)?.name).to.equal('InvalidStateError');
    expect(await tool('native_duplicate_render_ui')).to.exist;
  });
});
