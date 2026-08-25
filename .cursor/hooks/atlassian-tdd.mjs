import crypto from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const MATCHER = /^(?:implementer|test-writer)$/;

export function parseHookInput(raw) {
  let input = {};
  try {
    input = JSON.parse(raw || "{}");
  } catch {
    input = {};
  }
  const files = Array.isArray(input.modified_files) ? input.modified_files.map(String) : [];
  return {
    type: String(input.subagent_type || ""),
    status: String(input.status || ""),
    loopCount: input.loop_count ?? null,
    payloadFiles: files,
    hookEventName: String(input.hook_event_name || ""),
  };
}

export function invocationTrigger(hookEventName) {
  return hookEventName ? "hook" : "parent";
}

export function kind(file) {
  const name = String(file).replace(/\\/g, "/");
  if (/\.(test|spec)\.[jt]sx?$/.test(name) || /\/src\/test\//.test(name)) return "test";
  if (/(^|\/)(vite|vitest)\.config\./.test(name)) return "harness";
  if (/(^|\/)apps\/atlassian\/package\.json$/.test(name)) return "harness";
  return "prod";
}

export function uniqueFiles(files) {
  const seen = new Set();
  const out = [];
  for (const file of files) {
    const name = String(file).replace(/\\/g, "/");
    if (!name || seen.has(name)) continue;
    seen.add(name);
    out.push(name);
  }
  return out;
}

export function snapshotPath(root) {
  return path.join(root, ".cursor/hooks/last-run-snapshot.json");
}

function hashFile(root, file) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return null;
  return crypto.createHash("sha256").update(fs.readFileSync(abs)).digest("hex");
}

export function writeSnapshot(root, { type, files, stamp }) {
  const unique = uniqueFiles(files);
  const hashes = {};
  for (const file of unique) {
    const digest = hashFile(root, file);
    if (digest) hashes[file] = digest;
  }
  const record = { stamp, type: String(type || ""), files: unique, hashes };
  fs.mkdirSync(path.join(root, ".cursor/hooks"), { recursive: true });
  fs.writeFileSync(snapshotPath(root), JSON.stringify(record, null, 2) + "\n");
  return record;
}

export function readSnapshot(root) {
  const file = snapshotPath(root);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

export function filesChangedSinceSnapshot(root, files, snapshot) {
  const current = uniqueFiles(files);
  if (!snapshot || !snapshot.hashes) return current;
  const changed = [];
  for (const file of current) {
    const digest = hashFile(root, file);
    const before = snapshot.hashes[file];
    if (!before || !digest || before !== digest) changed.push(file);
  }
  return changed;
}

// Writer: files that changed after start, plus any dirty test. Leftover
// production that did not change is ignored. Dirty tests stay visible even
// when start ran after the test already existed.
// Implementer: snapshot-diff so a leftover writer test is not blamed on them.
export function collectFiles({
  payloadFiles = [],
  gitFiles = [],
  snapshot = null,
  root = "",
  type = "",
} = {}) {
  const candidates = uniqueFiles([...payloadFiles, ...gitFiles]);
  if (type === "implementer" && snapshot && root) {
    return {
      files: filesChangedSinceSnapshot(root, candidates, snapshot),
      filesSource: "snapshot-diff",
    };
  }
  if (type === "test-writer" && snapshot && root) {
    const changed = filesChangedSinceSnapshot(root, candidates, snapshot);
    const dirtyTests = candidates.filter((file) => kind(file) === "test");
    return {
      files: uniqueFiles([...changed, ...dirtyTests]),
      filesSource: "writer-diff",
    };
  }
  return { files: candidates, filesSource: candidates.length ? "git" : "empty" };
}

export function failNamesTests(excerpt, tests) {
  const text = String(excerpt || "");
  return tests.some((file) => {
    const base = path.posix.basename(file.replace(/\\/g, "/"));
    return text.includes(file) || text.includes(base);
  });
}

export function excerptFromLog(raw) {
  const lines = String(raw || "").trimEnd().split(/\n/);
  const hits = lines.filter((line) =>
    /FAIL |✕|×|AssertionError|Expected|Received|Test Files|Tests /.test(line),
  );
  return (hits.length ? hits : lines.slice(-20)).join("\n");
}

export function decide({ type, files = [], suiteStatus = 0, excerpt = "" } = {}) {
  const tests = files.filter((file) => kind(file) === "test");
  const harness = files.filter((file) => kind(file) === "harness");
  const prod = files.filter((file) => kind(file) === "prod");
  const suiteLine =
    suiteStatus === 0
      ? "The suite passed (exit 0)."
      : "The suite failed (exit " + suiteStatus + ").";

  if (type === "test-writer") {
    if (prod.length || harness.length || !tests.length) {
      return {
        parentNext: "spawn_writer",
        reason: "writer_wrong_files",
        suiteLine,
        subagentFollowup:
          "You must change a test file only. Changed: " +
          (files.length ? files.join(", ") : "<none>") +
          ". Do not change production or harness files.",
        parentInstruction:
          "This stop is test-writer. The writer must change a test file only. Changed: " +
          (files.length ? files.join(", ") : "<none>") +
          ". Spawn test-writer again. Do not spawn implementer.",
      };
    }
    if (suiteStatus === 0) {
      return {
        parentNext: "spawn_writer",
        reason: "writer_not_red",
        suiteLine,
        subagentFollowup:
          "The new test did not fail. Change the test so it fails for the intended behavior. Do not edit production code.",
        parentInstruction:
          "This stop is test-writer. The new test did not fail. Spawn test-writer again. Do not spawn implementer.",
      };
    }
    const named = failNamesTests(excerpt, tests);
    return {
      parentNext: named ? "spawn_implementer" : "spawn_writer",
      reason: named ? "writer_red" : "writer_other_failure",
      suiteLine,
      subagentFollowup: named
        ? "The new test failed as intended. Stop. Do not edit more files."
        : "The FAIL line does not name the new test file. Change the test so the intended case is red.",
      parentInstruction: named
        ? "This stop is test-writer. The FAIL line names the new test. Spawn implementer."
        : "This stop is test-writer. A different file failed. Spawn test-writer again.",
    };
  }

  if (tests.length || harness.length) {
    const bad = [...tests, ...harness];
    return {
      parentNext: "spawn_implementer",
      reason: "implementer_changed_tests",
      suiteLine,
      subagentFollowup:
        "Revert the test or harness change (" + bad.join(", ") + "). Change production code only.",
      parentInstruction:
        "The implementer changed a test or harness file (" +
        bad.join(", ") +
        "). Revert that change. Do not treat this run as green.",
    };
  }
  if (suiteStatus === 0) {
    return {
      parentNext: "final_reply",
      reason: "implementer_green",
      suiteLine,
      subagentFollowup: "The suite passed. Stop. Do not change more files.",
      parentInstruction:
        "This stop is implementer. The suite passed. Write the final reply. Quote .cursor/hooks/last-run.md.",
    };
  }
  return {
    parentNext: "spawn_implementer",
    reason: "implementer_red",
    suiteLine,
    subagentFollowup:
      "The suite still failed. Fix production code. Do not edit tests. If the failure is a test syntax or import error, stop.",
    parentInstruction:
      "This stop is implementer. If the failure is inside the test file, spawn test-writer with the error. If the failure is in production code, spawn implementer again.",
  };
}

export function renderLastRun({
  stamp,
  type,
  status,
  loopCount,
  trigger = "parent",
  hookEventName = "",
  files,
  filesSource,
  cmd,
  suiteStatus,
  excerpt,
  decision,
}) {
  return [
    "# Atlassian unit-test hook",
    "",
    "- generated: " + stamp,
    "- subagent_type: " + (type || "<empty>"),
    "- status: " + (status || "<empty>"),
    "- trigger: " + trigger,
    "- hook_event_name: " + (hookEventName || "<none>"),
    "- loop_count: " + String(loopCount),
    "- files_source: " + filesSource,
    "- files: " + (files.length ? files.join(", ") : "<none>"),
    "- suite_exit: " + String(suiteStatus),
    "- reason: " + decision.reason,
    "- parent_next: " + decision.parentNext,
    "- command: " + cmd,
    "",
    "## Suite",
    decision.suiteLine,
    "",
    excerpt || "<no excerpt>",
    "",
    "## Parent",
    decision.parentInstruction,
    "",
    "## Subagent",
    decision.subagentFollowup,
    "",
  ].join("\n");
}

function stopBody({ decision, cmd, excerpt }) {
  return [
    decision.suiteLine,
    "Command: " + cmd,
    "",
    excerpt,
    "",
    decision.subagentFollowup,
  ].join("\n");
}

export function hookResponse({ decision, cmd, excerpt }) {
  return { followup_message: stopBody({ decision, cmd, excerpt }) };
}

export function dirtyAtlassianFiles(root) {
  const run = (args) => {
    try {
      return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    } catch {
      return "";
    }
  };
  return uniqueFiles([
    ...run(["diff", "--name-only", "HEAD", "--", "apps/atlassian"]).split("\n"),
    ...run(["diff", "--cached", "--name-only", "--", "apps/atlassian"]).split("\n"),
    ...run(["ls-files", "--others", "--exclude-standard", "--", "apps/atlassian"]).split("\n"),
  ]);
}

export function runSuite(root) {
  const pnpm = path.join(root, "node_modules/.bin/pnpm");
  const vitest = path.join(root, "apps/atlassian/node_modules/.bin/vitest");
  let cmd;
  let result;
  if (fs.existsSync(pnpm)) {
    cmd = "node_modules/.bin/pnpm --filter atlassian test";
    result = spawnSync(pnpm, ["--filter", "atlassian", "test"], { cwd: root, encoding: "utf8" });
  } else if (fs.existsSync(vitest)) {
    cmd = "apps/atlassian/node_modules/.bin/vitest run";
    result = spawnSync(vitest, ["run"], { cwd: path.join(root, "apps/atlassian"), encoding: "utf8" });
  } else {
    return {
      cmd: "missing",
      status: 127,
      log: "Neither node_modules/.bin/pnpm nor apps/atlassian/node_modules/.bin/vitest exists.",
    };
  }
  return { cmd, status: result.status ?? 1, log: (result.stdout || "") + (result.stderr || "") };
}

function writeLastRun(root, markdown) {
  const dir = path.join(root, ".cursor/hooks");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "last-run.md"), markdown);
}

export function main(mode, raw, { root, stamp, suite = runSuite } = {}) {
  root = root || process.env.CURSOR_PROJECT_DIR || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  stamp = stamp || new Date().toISOString();
  const parsed = parseHookInput(raw);
  if (!MATCHER.test(parsed.type)) return null;

  const trigger = invocationTrigger(parsed.hookEventName);
  const gitFiles = dirtyAtlassianFiles(root);

  if (mode === "start") {
    writeSnapshot(root, { type: parsed.type, files: gitFiles, stamp });
    return { record: { type: parsed.type, trigger, hookEventName: parsed.hookEventName }, response: { permission: "allow" } };
  }

  if (parsed.status && parsed.status !== "completed") {
    const decision = {
      parentNext: "skip",
      reason: "not_completed",
      suiteLine: "The subagent did not complete. The hook did not run the suite.",
      subagentFollowup: "The subagent did not complete. Stop.",
      parentInstruction: "The subagent did not complete. The hook did not run the suite.",
    };
    const record = {
      stamp,
      type: parsed.type,
      status: parsed.status,
      loopCount: parsed.loopCount,
      trigger,
      hookEventName: parsed.hookEventName,
      files: [],
      filesSource: "empty",
      cmd: "skipped",
      suiteStatus: "-",
      excerpt: "",
      decision,
      parentNext: decision.parentNext,
      reason: decision.reason,
    };
    writeLastRun(root, renderLastRun(record));
    return { record, response: hookResponse({ decision, cmd: "skipped", excerpt: "" }) };
  }

  const run = suite(root);
  const excerpt = excerptFromLog(run.log);
  const collected = collectFiles({
    payloadFiles: parsed.payloadFiles,
    gitFiles,
    snapshot: readSnapshot(root),
    root,
    type: parsed.type,
  });
  const decision = decide({
    type: parsed.type,
    files: collected.files,
    suiteStatus: run.status,
    excerpt,
  });
  const record = {
    stamp,
    type: parsed.type,
    status: parsed.status,
    loopCount: parsed.loopCount,
    trigger,
    hookEventName: parsed.hookEventName,
    files: collected.files,
    filesSource: collected.filesSource,
    cmd: run.cmd,
    suiteStatus: run.status,
    excerpt,
    decision,
    parentNext: decision.parentNext,
    reason: decision.reason,
  };
  writeLastRun(root, renderLastRun(record));
  return { record, response: hookResponse({ decision, cmd: run.cmd, excerpt }) };
}

const invoked =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  const mode = process.argv[2];
  if (mode === "start" || mode === "stop") {
    const raw = fs.readFileSync(0, "utf8");
    const out = main(mode, raw);
    if (out) process.stdout.write(JSON.stringify(out.response) + "\n");
  }
}
