import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Client, InMemoryTransport } from '@modelcontextprotocol/client';
import { createAetherUiMcpServer } from '../dist/server.js';

async function withClient(run) {
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const server = createAetherUiMcpServer();
  const client = new Client({ name: 'aetherui-test', version: '1.0.0' });
  await server.connect(serverTransport);
  await client.connect(clientTransport);
  try {
    await run(client);
  } finally {
    await client.close();
    await server.close();
  }
}

test('lists and reads canonical AetherUI resources', async () => {
  await withClient(async (client) => {
    const { resources } = await client.listResources();
    assert.deepEqual(resources.map((resource) => resource.uri).sort(), [
      'aetherui://agent-ui-schema',
      'aetherui://component-catalog',
    ]);

    const catalog = await client.readResource({ uri: 'aetherui://component-catalog' });
    const parsed = JSON.parse(catalog.contents[0].text);
    assert.ok(parsed.components.some((component) => component.tagName === 'ae-button'));
  });
});

test('looks up components and validates agent documents', async () => {
  await withClient(async (client) => {
    const component = await client.callTool({
      name: 'get_component',
      arguments: { tagName: 'ae-button' },
    });
    assert.equal(component.isError, undefined);
    assert.equal(component.structuredContent.component.tagName, 'ae-button');

    const validation = await client.callTool({
      name: 'validate_agent_ui',
      arguments: {
        document: {
          version: '1',
          root: { component: 'script', children: ['unsafe'] },
        },
      },
    });
    assert.equal(validation.isError, true);
    assert.equal(validation.structuredContent.ok, false);
  });
});

test('returns structured validation issues for deeply nested property values', async () => {
  let data = {};
  for (let index = 0; index < 100; index += 1) data = { child: data };

  await withClient(async (client) => {
    const validation = await client.callTool({
      name: 'validate_agent_ui',
      arguments: {
        document: {
          version: '1',
          root: { component: 'ae-treeview', props: { data } },
        },
      },
    });

    assert.equal(validation.isError, true);
    assert.equal(validation.structuredContent.ok, false);
    assert.equal(validation.structuredContent.issues[0].code, 'limit-exceeded');
  });
});

test('forwards allowed URL protocols to the runtime validator', async () => {
  await withClient(async (client) => {
    const validation = await client.callTool({
      name: 'validate_agent_ui',
      arguments: {
        document: {
          version: '1',
          root: { component: 'ae-breadcrumb-item', props: { href: 'ftp://example.com/file' } },
        },
        allowedUrlProtocols: ['ftp:'],
      },
    });

    assert.equal(validation.isError, undefined);
    assert.equal(validation.structuredContent.ok, true);
  });
});

test('normalizes URL protocol names without a trailing colon', async () => {
  await withClient(async (client) => {
    const validation = await client.callTool({
      name: 'validate_agent_ui',
      arguments: {
        document: {
          version: '1',
          root: { component: 'ae-breadcrumb-item', props: { href: 'https://example.com/' } },
        },
        allowedUrlProtocols: ['https'],
      },
    });

    assert.equal(validation.isError, undefined);
    assert.equal(validation.structuredContent.ok, true);
  });
});

test('counts text nodes and rejects unknown fields through MCP validation', async () => {
  await withClient(async (client) => {
    const document = { version: '1', root: { component: 'ae-alert', children: ['Saved'] } };
    const accepted = await client.callTool({
      name: 'validate_agent_ui',
      arguments: { document, maxNodes: 2 },
    });
    assert.deepEqual(accepted.structuredContent, { ok: true, nodeCount: 2 });
    for (const arguments_ of [
      { document, maxNodes: 1 },
      { document: { ...document, html: '<b>ignored</b>' } },
    ]) {
      const rejected = await client.callTool({ name: 'validate_agent_ui', arguments: arguments_ });
      assert.equal(rejected.isError, true);
      assert.equal(rejected.structuredContent.ok, false);
    }
  });
});
