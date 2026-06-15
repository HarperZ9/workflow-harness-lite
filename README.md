# workflow-harness-lite

`workflow-harness-lite` is a small Node CLI for running simple task workflows
with machine-readable outcomes.

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
