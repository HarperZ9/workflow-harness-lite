# Workflow Harness Lite

> Lightweight local workflow runner with parallel task execution.

[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![node](https://img.shields.io/badge/node-18%2B-green.svg)
![version](https://img.shields.io/badge/version-0.1.0-informational.svg)
[![CI](https://github.com/HarperZ9/workflow-harness-lite/actions/workflows/ci.yml/badge.svg)](https://github.com/HarperZ9/workflow-harness-lite/actions/workflows/ci.yml)
![deps: none](https://img.shields.io/badge/deps-none-success.svg)
[![part of: AI-accountability toolkit](https://img.shields.io/badge/part_of-AI--accountability_toolkit-7a5cff.svg)](https://harperz9.github.io)

It accepts a JSON config with named command tasks, runs independent entries in
parallel by default, and returns a compact pass/fail report for local automation
or release checks.

Built with agentic assistance and manually reviewed for safety.

## Install

```bash
npm install
npm test
node bin/workflow-harness-lite.js --help
```

## Usage

```bash
echo '{ "name": "local-checks", "tasks": [{"name":"ping","command":"node -e \"console.log(\\"ping\\")\""}] }' > workflow.json
node bin/workflow-harness-lite.js --config workflow.json
```

## Report

- JSON report includes status, duration, redacted stdout/stderr previews, and
  command outcomes.
- Output previews are capped; use `--output-limit` to tune the character limit.
- Exit code is non-zero when any task fails.

---
**Zain Dana Harper** — small tools with explicit edges.
[Portfolio](https://harperz9.github.io) · [HarperZ9](https://github.com/HarperZ9)
<sub>Built with Claude Code; reviewed, tested, and owned by me.</sub>
