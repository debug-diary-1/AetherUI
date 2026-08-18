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

describe('@aetherui/agent', () => {
  it('validates a document against the generated component interface', () => {
    expect(validateAgentUi(buttonDocument)).to.deep.equal({
      ok: true,
      document: buttonDocument,
      nodeCount: 1,
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

  it('validates before replacing existing content', () => {
    const container = document.createElement('div');
    container.textContent = 'preserve me';

    expect(() =>
      renderAgentUi(container, { version: '1', root: { component: 'script' } }),
    ).to.throw(AgentUiValidationError);
    expect(container.textContent).to.equal('preserve me');
  });
});
