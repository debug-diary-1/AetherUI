import { expect } from '@open-wc/testing';
import {
  AGENT_UI_ACTION_EVENT,
  AgentUiValidationError,
  renderAgentUi,
  validateAgentUi,
} from '../src/index';
import type { AgentUiAction, AgentUiDocument } from '../src/index';

const buttonDocument: AgentUiDocument = {
  version: '1',
  root: {
    component: 'ae-button',
    id: 'save',
    props: { variant: 'primary', disabled: false },
    children: ['Save'],
    actions: { 'ae-button-click': 'save-profile' },
  },
};

describe('@aetherui-kit/agent', () => {
  it('validates a document against the generated component interface', () => {
    expect(validateAgentUi(buttonDocument)).to.deep.equal({
      ok: true,
      document: buttonDocument,
      nodeCount: 2,
    });
  });

  it('rejects unknown components, properties, and events', () => {
    const result = validateAgentUi({
      version: '1',
      root: {
        component: 'ae-button',
        props: { onclick: 'runCode()' },
        actions: { click: 'unsafe-action' },
        children: [{ component: 'script' }],
      },
    });

    expect(result.ok).to.equal(false);
    if (result.ok) return;
    expect(result.issues.map((issue) => issue.code)).to.have.members([
      'unknown-property',
      'unknown-event',
      'unknown-component',
    ]);
  });

  it('rejects unsafe URL protocols', () => {
    const result = validateAgentUi({
      version: '1',
      root: {
        component: 'ae-breadcrumb-item',
        props: { href: 'javascript:alert(1)' },
      },
    });

    expect(result.ok).to.equal(false);
    if (!result.ok) expect(result.issues[0]?.code).to.equal('unsafe-url');
  });

  it('accepts relative URLs and rejects network-path references', () => {
    for (const href of ['', 'docs/intro', '?page=2', '#current', '/docs', '../docs']) {
      expect(
        validateAgentUi({
          version: '1',
          root: { component: 'ae-breadcrumb-item', props: { href } },
        }).ok,
        href,
      ).to.equal(true);
    }

    for (const href of ['//evil.example/x', '/\\evil.example/x']) {
      const result = validateAgentUi({
        version: '1',
        root: { component: 'ae-breadcrumb-item', props: { href } },
      });
      expect(result.ok, href).to.equal(false);
      if (!result.ok) expect(result.issues[0]?.code).to.equal('unsafe-url');
    }
  });

  it('enforces catalog property types', () => {
    const result = validateAgentUi({
      version: '1',
      root: { component: 'ae-accordion', props: { value: 'shipping' } },
    });

    expect(result.ok).to.equal(false);
    if (!result.ok) expect(result.issues[0]?.code).to.equal('invalid-property');
  });

  it('enforces resolved aliases and literal unions', () => {
    for (const [component, props] of [
      ['ae-tooltip', { placement: 5 }],
      ['ae-tooltip', { placement: 'sideways' }],
      ['ae-toast', { variant: 123 }],
      ['ae-toast', { variant: 'urgent' }],
      ['ae-textarea', { resize: true }],
      ['ae-button', { variant: 'not-a-variant' }],
    ] as const) {
      const result = validateAgentUi({ version: '1', root: { component, props } });
      expect(result.ok, component).to.equal(false);
      if (!result.ok) expect(result.issues[0]?.code).to.equal('invalid-property');
    }

    expect(
      validateAgentUi({
        version: '1',
        root: { component: 'ae-textarea', props: { resize: 'vertical' } },
      }).ok,
    ).to.equal(true);
  });

  it('accepts shared JSON subtrees while rejecting cycles and excessive property depth', () => {
    const shared = { id: 'shared' };
    expect(
      validateAgentUi({
        version: '1',
        root: {
          component: 'ae-treeview',
          props: { data: [shared, shared] },
        },
      }).ok,
    ).to.equal(true);

    const cycle: Record<string, unknown> = {};
    cycle.self = cycle;
    expect(
      validateAgentUi({ version: '1', root: { component: 'ae-treeview', props: { data: cycle } } })
        .ok,
    ).to.equal(false);

    let deeplyNested: Record<string, unknown> = {};
    for (let index = 0; index < 100; index += 1) deeplyNested = { child: deeplyNested };
    const result = validateAgentUi({
      version: '1',
      root: { component: 'ae-treeview', props: { data: deeplyNested } },
    });
    expect(result.ok).to.equal(false);
    if (!result.ok) expect(result.issues[0]?.code).to.equal('limit-exceeded');
  });

  it('validates deeply shared DAGs without revisiting every path', () => {
    let shared: Record<string, unknown> = {};
    for (let index = 0; index < 24; index += 1) shared = { left: shared, right: shared };

    const started = performance.now();
    const result = validateAgentUi({
      version: '1',
      root: { component: 'ae-treeview', props: { data: [shared] } },
    });

    expect(result.ok).to.equal(true);
    expect(performance.now() - started).to.be.lessThan(500);
  });

  it('enforces document size and depth limits', () => {
    const result = validateAgentUi(
      {
        version: '1',
        root: {
          component: 'ae-alert',
          children: [{ component: 'ae-button' }, { component: 'ae-button' }],
        },
      },
      { maxNodes: 2 },
    );

    expect(result.ok).to.equal(false);
    if (!result.ok)
      expect(result.issues.some((issue) => issue.code === 'limit-exceeded')).to.equal(true);
  });

  it('counts element and text nodes, including empty text, before rendering', () => {
    const input = {
      version: '1',
      root: {
        component: 'ae-alert',
        children: ['', { component: 'ae-button', children: ['Save'] }],
      },
    };
    const container = document.createElement('div');
    container.textContent = 'preserve me';
    expect(() => renderAgentUi(container, input, { maxNodes: 3 })).to.throw(AgentUiValidationError);
    expect(container.textContent).to.equal('preserve me');
    const rendered = renderAgentUi(container, input, { maxNodes: 4 });
    expect(rendered.nodeCount).to.equal(4);
    expect(rendered.element.childNodes).to.have.length(2);
    rendered.dispose();
  });

  it('stops visiting siblings after the node budget is exhausted', () => {
    const result = validateAgentUi(
      {
        version: '1',
        root: { component: 'ae-alert', children: Array(1000).fill('text') },
      },
      { maxNodes: 1 },
    );
    expect(result.ok).to.equal(false);
    if (!result.ok) {
      expect(result.issues).to.have.length(1);
      expect(result.issues[0].code).to.equal('limit-exceeded');
    }
  });

  it('rejects unknown document and node fields before rendering', () => {
    for (const input of [
      { version: '1', root: { component: 'ae-alert' }, html: '<b>ignored</b>' },
      { version: '1', root: { component: 'ae-alert', html: '<b>ignored</b>' } },
      {
        version: '1',
        root: { component: 'ae-alert', children: [{ component: 'ae-button', onClick: 'save()' }] },
      },
    ]) {
      const container = document.createElement('div');
      container.textContent = 'preserve me';
      expect(() => renderAgentUi(container, input)).to.throw(AgentUiValidationError);
      expect(container.textContent).to.equal('preserve me');
    }
  });

  it('renders validated elements and converts declared events to action data', () => {
    const container = document.createElement('div');
    const actions: AgentUiAction[] = [];
    const bubbledActions: AgentUiAction[] = [];
    container.addEventListener(AGENT_UI_ACTION_EVENT, (event) => {
      bubbledActions.push((event as CustomEvent<AgentUiAction>).detail);
    });

    const rendered = renderAgentUi(container, buttonDocument, {
      allowedComponents: ['ae-button'],
      onAction: (action) => actions.push(action),
    });

    expect(rendered.element.tagName).to.equal('AE-BUTTON');
    expect(rendered.element.id).to.equal('save');
    expect((rendered.element as HTMLElement & { variant: string }).variant).to.equal('primary');
    expect(rendered.element.textContent).to.equal('Save');

    rendered.element.dispatchEvent(
      new CustomEvent('ae-button-click', { detail: { source: 'keyboard' } }),
    );
    expect(actions[0]).to.deep.equal({
      actionId: 'save-profile',
      componentId: 'save',
      component: 'ae-button',
      eventName: 'ae-button-click',
      detail: { source: 'keyboard' },
    });
    expect(bubbledActions).to.deep.equal(actions);

    rendered.dispose();
    expect(container.children).to.have.length(0);
  });

  it('attributes bubbled actions only to the component that emitted them', () => {
    const container = document.createElement('div');
    const actions: AgentUiAction[] = [];
    const rendered = renderAgentUi(
      container,
      {
        version: '1',
        root: {
          component: 'ae-tree-item',
          id: 'parent',
          actions: { 'ae-tree-item-select': 'select-parent' },
          children: [
            {
              component: 'ae-tree-item',
              id: 'child',
              actions: { 'ae-tree-item-select': 'select-child' },
            },
          ],
        },
      },
      { onAction: (action) => actions.push(action) },
    );

    rendered.element
      .querySelector('#child')!
      .dispatchEvent(new CustomEvent('ae-tree-item-select', { bubbles: true, composed: true }));

    expect(actions.map((action) => action.actionId)).to.deep.equal(['select-child']);
  });

  it('validates before replacing existing content', () => {
    const container = document.createElement('div');
    container.textContent = 'preserve me';

    expect(() =>
      renderAgentUi(container, { version: '1', root: { component: 'script' } }),
    ).to.throw(AgentUiValidationError);
    expect(container.textContent).to.equal('preserve me');
  });
});
