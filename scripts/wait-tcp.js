#!/usr/bin/env node

const net = require('node:net');

const [hostArg, portArg] = (process.argv[2] || '').split(':');
const host = portArg ? hostArg : '127.0.0.1';
const port = Number(portArg ?? hostArg);
const timeoutMs = Number(process.env.WAIT_TIMEOUT_MS ?? 120_000);
const intervalMs = 500;

if (!Number.isInteger(port) || port <= 0) {
  console.error('Usage: wait-tcp.js [host:]port');
  process.exit(2);
}

const tryConnect = () =>
  new Promise((resolve) => {
    const sock = net.connect({ host, port });
    sock.once('connect', () => { sock.destroy(); resolve(true); });
    sock.once('error', () => { sock.destroy(); resolve(false); });
  });

(async () => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await tryConnect()) process.exit(0);
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  console.error(`wait-tcp: timed out waiting for ${host}:${port} after ${timeoutMs}ms`);
  process.exit(1);
})();
