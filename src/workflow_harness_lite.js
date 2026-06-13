import { exec as execCallback } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execCallback);

export async function runTask(task, options = {}) {
  const command = String(task?.command || "").trim();
  const cwd = task?.cwd;
  const timeout = Number.isFinite(options.timeoutMs) ? options.timeoutMs : 15000;

  if (!command) {
    return {
      name: task?.name || "unnamed",
      status: "skip",
      code: 0,
      durationMs: 0,
      stdout: "",
      stderr: "empty command",
    };
  }

  const start = Date.now();
  try {
    const result = await exec(command, {
      cwd: cwd || process.cwd(),
      timeout,
      shell: true,
      maxBuffer: 1024 * 1024,
      windowsHide: true,
    });

    return {
      name: task.name || "unnamed",
      status: "pass",
      code: 0,
      durationMs: Date.now() - start,
      stdout: (result.stdout || "").trim(),
      stderr: (result.stderr || "").trim(),
    };
  } catch (error) {
    return {
      name: task.name || "unnamed",
      status: "fail",
      code: error.code || 1,
      durationMs: Date.now() - start,
      stdout: (error.stdout || "").trim(),
      stderr: (error.stderr || "").trim() || String(error.message),
    };
  }
}

export async function runTasks(tasks, options = {}) {
  if (options.parallel) {
    return Promise.all(tasks.map((task) => runTask(task, options)));
  }

  const results = [];
  for (const task of tasks) {
    results.push(await runTask(task, options));
  }
  return results;
}

export async function runWorkflow(config, options = {}) {
  const tasks = Array.isArray(config?.tasks) ? config.tasks : [];
  const started = Date.now();
  const taskResults = await runTasks(tasks, options);
  const passed = taskResults.filter((entry) => entry.status === "pass").length;
  const failed = taskResults.filter((entry) => entry.status === "fail").length;

  return {
    name: config?.name || "workflow",
    status: failed === 0 ? "pass" : "fail",
    generated: new Date().toISOString(),
    durationMs: Date.now() - started,
    total: taskResults.length,
    passed,
    failed,
    skipped: taskResults.filter((entry) => entry.status === "skip").length,
    tasks: taskResults,
  };
}
