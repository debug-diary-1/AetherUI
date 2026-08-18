#!/usr/bin/env node

import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { createAetherUiMcpServer } from './server.js';

void serveStdio(createAetherUiMcpServer);
