import test from "node:test";
import assert from "node:assert/strict";
import { runWorkflow } from "../src/workflow_harness_lite.js";


test("runWorkflow marks pass", async () => {
  const report = await runWorkflow(
    {
      name: "smoke",
      tasks: [
        { name: "ok", command: "node -e \"console.log('ok')\"" },
      ],
    },
    { parallel: true, timeoutMs: 10000 },
  );
  assert.equal(report.status, "pass");
  assert.equal(report.total, 1);
});

test("runWorkflow marks fail", async () => {
  const report = await runWorkflow(
    {
      name: "failing",
      tasks: [
        { name: "bad", command: "node -e \"process.exit(1)\"" },
      ],
    },
    { parallel: true, timeoutMs: 10000 },
  );
  assert.equal(report.status, "fail");
  assert.equal(report.failed, 1);
});

test("runWorkflow redacts secret-shaped stdout", async () => {
  const synthetic = "ghp_" + "A".repeat(36);
  const report = await runWorkflow(
    {
      name: "redaction",
      tasks: [
        { name: "token", command: `node -e "console.log('token=${synthetic}')"` },
      ],
    },
    { parallel: true, timeoutMs: 10000 },
  );

  assert.equal(report.status, "pass");
  assert.match(report.tasks[0].stdout, /<redacted-secret>/);
  assert.doesNotMatch(report.tasks[0].stdout, /ghp_/);
});

test("runWorkflow caps stdout previews", async () => {
  const report = await runWorkflow(
    {
      name: "preview",
      tasks: [
        { name: "long", command: "node -e \"console.log('x'.repeat(200))\"" },
      ],
    },
    { parallel: true, timeoutMs: 10000, outputLimit: 40 },
  );

  assert.equal(report.status, "pass");
  assert.match(report.tasks[0].stdout, /\[truncated\]$/);
  assert.ok(report.tasks[0].stdout.length <= 40);
});
