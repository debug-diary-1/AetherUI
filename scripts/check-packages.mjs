#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageDirectories = ['core', 'tokens', 'accordion', 'datatable', 'agent', 'mcp'];
const failures = [];

function collectTargets(value, targets = []) {
  if (typeof value === 'string' && value.startsWith('./')) targets.push(value);
  if (value && typeof value === 'object') {
    Object.values(value).forEach((entry) => collectTargets(entry, targets));
  }
  return targets;
}

for (const directory of packageDirectories) {
  const packageRoot = resolve(root, 'packages', directory);
  const manifestPath = resolve(packageRoot, 'package.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const label = manifest.name ?? directory;

  if (manifest.private) failures.push(`${label}: publishable package is private`);
  if (manifest.license !== 'MIT') failures.push(`${label}: expected MIT license metadata`);
  if (!/^\d+\.\d+\.\d+/.test(manifest.version ?? '')) failures.push(`${label}: invalid version`);
  if (!Array.isArray(manifest.files) || !manifest.files.includes('dist')) {
    failures.push(`${label}: files must include dist`);
  }
  for (const requiredFile of ['LICENSE', 'README.md']) {
    if (!existsSync(resolve(packageRoot, requiredFile))) {
      failures.push(`${label}: missing ${requiredFile}`);
    }
  }
  if (!String(manifest.repository?.url ?? '').includes('debug-diary-1/AetherUI')) {
    failures.push(`${label}: repository metadata points at the wrong source`);
  }

  const targets = new Set([
    manifest.main,
    manifest.module,
    manifest.types,
    ...collectTargets(manifest.exports),
  ]);
  for (const target of targets) {
    if (!target || target === './package.json' || target.includes('*')) continue;
    if (!existsSync(resolve(packageRoot, target)))
      failures.push(`${label}: missing package target ${target}`);
  }
}

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL ${failure}`));
  process.exit(1);
}

console.log(`Package checks passed: ${packageDirectories.length}/${packageDirectories.length}`);
