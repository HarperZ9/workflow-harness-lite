# Workflow Harness Lite

> Lightweight local workflow runner with parallel task execution.

[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![node](https://img.shields.io/badge/node-18%2B-green.svg)
![version](https://img.shields.io/badge/version-0.2.0-informational.svg)
[![CI](https://github.com/HarperZ9/workflow-harness-lite/actions/workflows/ci.yml/badge.svg)](https://github.com/HarperZ9/workflow-harness-lite/actions/workflows/ci.yml)
![deps: none](https://img.shields.io/badge/deps-none-success.svg)
[![part of: AI-accountability toolkit](https://img.shields.io/badge/part_of-AI--accountability_toolkit-7a5cff.svg)](https://harperz9.github.io)

It accepts a JSON config with named command tasks, runs independent entries in
parallel by default, and returns a compact pass/fail report for local automation
or release checks.

It can also emit a Project Telos bounded-run receipt for unattended agent
workflows. The receipt records terminal status, task identities, command hashes,
output hashes, timeout bounds, and privacy gates without exposing raw commands
or raw stdout/stderr.

Built with agentic assistance and manually reviewed for safety.

## Install

No runtime dependencies. Use it from a clone:

```bash
npm test                 # optional: runs the bundled tests
node bin/workflow-harness-lite.js --help
```

## Usage

```bash
echo '{ "name": "local-checks", "tasks": [{"name":"ping","command":"node -e \"console.log(\\"ping\\")\""}] }' > workflow.json
node bin/workflow-harness-lite.js --config workflow.json --telos-receipt receipt.json
```

See [USAGE.md](USAGE.md) for the full flag reference, the importable API
(`runWorkflow`, `runTasks`, `runTask`, `sanitizeOutput`, `buildTelosReceipt`),
and worked examples with expected output. A runnable end-to-end demo lives in
[`examples/demo.mjs`](examples/demo.mjs):

```bash
node examples/demo.mjs
```

## Report

- JSON report includes status, duration, redacted stdout/stderr previews, and
  command outcomes.
- Telos receipt output uses `project-telos.bounded-run-receipt/v1`, maps
  workflow pass/fail to `ok`/`error`, and keeps raw commands/output out of the
  interop artifact.
- Output previews are capped; use `--output-limit` to tune the character limit.
- Exit code is non-zero when any task fails.

---
**Zain Dana Harper** — small tools with explicit edges.
[Portfolio](https://harperz9.github.io) · [HarperZ9](https://github.com/HarperZ9)
<sub>Built with Claude Code; reviewed, tested, and owned by me.</sub>
