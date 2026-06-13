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
