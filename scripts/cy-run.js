#!/usr/bin/env node

/* eslint-disable no-console */

const { spawnSync } = require('child_process');

const CYPRESS_IMAGE = 'plasmadockerhub/cypress:15.9.0-webkit';
const browser = process.env.BROWSER || 'chromium';
const supportedBrowsers = new Set(['chromium', 'webkit']);

if (!supportedBrowsers.has(browser)) {
    console.error(`Unsupported browser: ${browser}. Use chromium or webkit.`);
    process.exit(1);
}

const envVars = {
    NODE_OPTIONS: '--max-old-space-size=16384',
    CYPRESS_CONFIG_FILE: 'cypress.config.ts',
    PACKAGE_NAME: process.env.PACKAGE_NAME,
    COMPONENTS: process.env.COMPONENTS,
    RETRIES: process.env.RETRIES,
    CYPRESS_updateSnapshots: process.env.CYPRESS_updateSnapshots,
    WEBPACK_CACHE_ENABLED: process.env.WEBPACK_CACHE_ENABLED,
    BROWSER: browser,
};

const envArgs = Object.entries(envVars).flatMap(([key, value]) => [
    '-e',
    value !== undefined ? `${key}=${value}` : key,
]);

const args = [
    'run',
    '--rm',
    '-v',
    `${process.cwd()}:/e2e`,
    '-w',
    '/e2e',
    '--entrypoint',
    '/bin/bash',
    ...envArgs,
    CYPRESS_IMAGE,
    '-c',
    `cypress run --component --browser ${browser}`,
];

console.log(`docker ${args.join(' ')}`);

const result = spawnSync('docker', args, { stdio: 'inherit' });

if (result.error) {
    console.error(`Failed to start Docker: ${result.error.message}`);
}

process.exit(result.status ?? 1);
