#!/usr/bin/env node
/*
 * Offline sandbox simulator.
 * Runs the workflow's Code nodes from workflow.json in plain Node.js on the
 * embedded mock fixture, with ZERO network calls (HTTP nodes never run).
 *
 *   node scripts/simulate-sandbox-run.js            # print the audit record
 *   node scripts/simulate-sandbox-run.js --plan     # print the full engine output
 *   node scripts/simulate-sandbox-run.js --slack    # print the Slack Block Kit payload
 *   RADAR_REFERENCE_DATE=2026-12-16 node scripts/simulate-sandbox-run.js
 *
 * Rule env vars are honored; SANDBOX_MODE is always forced to true.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const wf = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'workflow.json'), 'utf8'));
const byName = Object.fromEntries(wf.nodes.map((n) => [n.name, n]));
const outputs = {};
const env = { ...process.env, SANDBOX_MODE: 'true' };
delete env.HUBSPOT_ACCESS_TOKEN;

function run(name, inputItems) {
  const node = byName[name];
  if (!node || node.type !== 'n8n-nodes-base.code') throw new Error(`Not a code node: ${name}`);
  const $input = { first: () => inputItems[0], all: () => inputItems };
  const $ = (ref) => ({
    isExecuted: Boolean(outputs[ref]),
    first: () => { if (!outputs[ref]) throw new Error(`Node "${ref}" has not run`); return outputs[ref][0]; },
    all: () => outputs[ref] || [],
  });
  const result = new Function('$env', '$input', '$', node.parameters.jsCode)(env, $input, $);
  outputs[name] = result;
  return result;
}

let items = run('Config & Safety Gate', [{ json: {} }]);
if (!items[0].json.gate.sandboxMode) throw new Error('Simulator only runs the sandbox path.');
items = run('Load Mock Fixture', items);
items = run('Renewal Radar & Provisioning Engine', items);
if (items[0].json.liveWriteAllowed) throw new Error('Safety violation: live writes allowed in sandbox.');
items = run('Dry-Run HubSpot Preview', items);
items = run('Build RevOps Alerts', items);
const audit = run('Execution Summary & Audit', items);

if (process.argv.includes('--slack')) console.log(JSON.stringify(outputs['Build RevOps Alerts'][0].json.alerts.slackPayload, null, 2));
else if (process.argv.includes('--plan')) console.log(JSON.stringify(outputs['Renewal Radar & Provisioning Engine'][0].json, null, 2));
else console.log(JSON.stringify(audit[0].json, null, 2));
