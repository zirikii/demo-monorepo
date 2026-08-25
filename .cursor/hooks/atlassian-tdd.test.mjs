import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import {
  collectFiles,
  decide,
  failNamesTests,
  filesChangedSinceSnapshot,
  hookResponse,
  kind,
  main,
  parseHookInput,
  writeSnapshot,
} from "./atlassian-tdd.mjs";

function tmpRoot(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

describe("parseHookInput", () => {
  it("reads the Cursor snake_case payload", () => {
    const parsed = parseHookInput(
      JSON.stringify({
        subagent_type: "test-writer",
        status: "completed",
        loop_count: 0,
        modified_files: ["apps/atlassian/src/test/data.test.ts"],
      }),
    );
    assert.equal(parsed.type, "test-writer");
    assert.equal(parsed.status, "completed");
    assert.equal(parsed.hookEventName, "");
    assert.deepEqual(parsed.payloadFiles, ["apps/atlassian/src/test/data.test.ts"]);
  });

  it("treats missing modified_files as empty", () => {
    const parsed = parseHookInput(
      JSON.stringify({ subagent_type: "test-writer", status: "completed" }),
    );
    assert.deepEqual(parsed.payloadFiles, []);
  });

  it("treats a missing hook_event_name as a parent pipe", () => {
    const parsed = parseHookInput(JSON.stringify({ subagent_type: "test-writer", status: "completed" }));
    assert.equal(parsed.hookEventName, "");
  });
});

describe("kind", () => {
  it("classifies atlassian tests, harness, and prod", () => {
    assert.equal(kind("apps/atlassian/src/test/jira.test.tsx"), "test");
    assert.equal(kind("apps/atlassian/src/foo.spec.ts"), "test");
    assert.equal(kind("apps/atlassian/vitest.config.ts"), "harness");
    assert.equal(kind("apps/atlassian/package.json"), "harness");
    assert.equal(kind("apps/atlassian/src/App.tsx"), "prod");
  });
});

describe("snapshot vs leftover writer test", () => {
  it("does not blame the implementer for an unchanged writer test", () => {
    const root = tmpRoot("atlassian-snap-");
    const testFile = "apps/atlassian/src/test/loyalty.test.ts";
    const prodFile = "apps/atlassian/src/lib/loyalty.ts";
    fs.mkdirSync(path.join(root, "apps/atlassian/src/test"), { recursive: true });
    fs.mkdirSync(path.join(root, "apps/atlassian/src/lib"), { recursive: true });
    fs.writeFileSync(path.join(root, testFile), "expect(true).toBe(false);\n");
    fs.writeFileSync(path.join(root, prodFile), "export const x = 1;\n");

    const snapshot = writeSnapshot(root, {
      type: "implementer",
      files: [testFile],
      stamp: "2026-08-24T21:41:00Z",
    });
    fs.writeFileSync(path.join(root, prodFile), "export const x = 2;\n");

    const changed = filesChangedSinceSnapshot(root, [testFile, prodFile], snapshot);
    assert.deepEqual(changed, [prodFile]);

    const collected = collectFiles({
      payloadFiles: [],
      gitFiles: [testFile, prodFile],
      snapshot,
      root,
      type: "implementer",
    });
    assert.equal(collected.filesSource, "snapshot-diff");
    assert.deepEqual(collected.files, [prodFile]);

    const decision = decide({
      type: "implementer",
      files: collected.files,
      suiteStatus: 0,
      excerpt: "Tests  62 passed (62)",
    });
    assert.equal(decision.reason, "implementer_green");
    assert.equal(decision.parentNext, "final_reply");
  });

  it("filters a leftover test even when the payload lists it", () => {
    const root = tmpRoot("atlassian-snap-");
    const testFile = "apps/atlassian/src/test/loyalty.test.ts";
    const prodFile = "apps/atlassian/src/lib/loyalty.ts";
    fs.mkdirSync(path.join(root, "apps/atlassian/src/test"), { recursive: true });
    fs.mkdirSync(path.join(root, "apps/atlassian/src/lib"), { recursive: true });
    fs.writeFileSync(path.join(root, testFile), "red\n");
    fs.writeFileSync(path.join(root, prodFile), "old\n");
    const snapshot = writeSnapshot(root, {
      type: "implementer",
      files: [testFile],
      stamp: "2026-08-24T21:41:00Z",
    });
    fs.writeFileSync(path.join(root, prodFile), "new\n");
    const collected = collectFiles({
      payloadFiles: [testFile, prodFile],
      gitFiles: [testFile, prodFile],
      snapshot,
      root,
      type: "implementer",
    });
    assert.deepEqual(collected.files, [prodFile]);
  });

  it("still flags the implementer if they edit the leftover test", () => {
    const root = tmpRoot("atlassian-snap-");
    const testFile = "apps/atlassian/src/test/loyalty.test.ts";
    fs.mkdirSync(path.join(root, "apps/atlassian/src/test"), { recursive: true });
    fs.writeFileSync(path.join(root, testFile), "expect(true).toBe(false);\n");
    const snapshot = writeSnapshot(root, {
      type: "implementer",
      files: [testFile],
      stamp: "2026-08-24T21:41:00Z",
    });
    fs.writeFileSync(path.join(root, testFile), "expect(true).toBe(true);\n");
    const collected = collectFiles({
      payloadFiles: [],
      gitFiles: [testFile],
      snapshot,
      root,
      type: "implementer",
    });
    const decision = decide({
      type: "implementer",
      files: collected.files,
      suiteStatus: 0,
      excerpt: "Tests  62 passed (62)",
    });
    assert.equal(decision.reason, "implementer_changed_tests");
  });

  it("does not hide a writer test that was already in the start snapshot", () => {
    const root = tmpRoot("atlassian-snap-");
    const testFile = "apps/atlassian/src/test/format.test.ts";
    fs.mkdirSync(path.join(root, "apps/atlassian/src/test"), { recursive: true });
    fs.writeFileSync(path.join(root, testFile), "expect(slugify(\"x\")).toBe(\"y\");\n");
    const snapshot = writeSnapshot(root, {
      type: "test-writer",
      files: [testFile],
      stamp: "2026-08-24T22:04:00Z",
    });
    const collected = collectFiles({
      payloadFiles: [],
      gitFiles: [testFile],
      snapshot,
      root,
      type: "test-writer",
    });
    assert.equal(collected.filesSource, "writer-diff");
    assert.deepEqual(collected.files, [testFile]);
    assert.equal(
      decide({
        type: "test-writer",
        files: collected.files,
        suiteStatus: 1,
        excerpt: " FAIL  src/test/format.test.ts > slugify",
      }).reason,
      "writer_red",
    );
  });

  it("does not blame the writer for leftover production that did not change", () => {
    const root = tmpRoot("atlassian-snap-");
    const testFile = "apps/atlassian/src/test/format.test.ts";
    const prodFile = "apps/atlassian/src/lib/format.ts";
    fs.mkdirSync(path.join(root, "apps/atlassian/src/test"), { recursive: true });
    fs.mkdirSync(path.join(root, "apps/atlassian/src/lib"), { recursive: true });
    fs.writeFileSync(path.join(root, prodFile), "export const leftover = true;\n");
    const snapshot = writeSnapshot(root, {
      type: "test-writer",
      files: [prodFile],
      stamp: "2026-08-25T02:50:00Z",
    });
    fs.writeFileSync(path.join(root, testFile), "expect(readingTime(\"\")).toBe(\"0 min read\");\n");
    const collected = collectFiles({
      payloadFiles: [],
      gitFiles: [testFile, prodFile],
      snapshot,
      root,
      type: "test-writer",
    });
    assert.equal(collected.filesSource, "writer-diff");
    assert.deepEqual(collected.files, [testFile]);
    assert.equal(
      decide({
        type: "test-writer",
        files: collected.files,
        suiteStatus: 1,
        excerpt: " FAIL  src/test/format.test.ts > readingTime",
      }).reason,
      "writer_red",
    );
  });
});

describe("collectFiles without a snapshot", () => {
  it("uses git when the payload list is empty", () => {
    const collected = collectFiles({
      payloadFiles: [],
      gitFiles: ["apps/atlassian/src/test/new.test.ts"],
    });
    assert.equal(collected.filesSource, "git");
    assert.deepEqual(collected.files, ["apps/atlassian/src/test/new.test.ts"]);
  });

  it("merges payload and git candidates", () => {
    const collected = collectFiles({
      payloadFiles: ["apps/atlassian/src/App.tsx"],
      gitFiles: ["apps/atlassian/src/test/new.test.ts", "apps/atlassian/src/App.tsx"],
    });
    assert.deepEqual(collected.files, [
      "apps/atlassian/src/App.tsx",
      "apps/atlassian/src/test/new.test.ts",
    ]);
  });

  it("reports empty when both sources are empty", () => {
    const collected = collectFiles({ payloadFiles: [], gitFiles: [] });
    assert.equal(collected.filesSource, "empty");
    assert.deepEqual(collected.files, []);
  });
});

describe("decide: empty payload is the Cursor client case", () => {
  const testFile = "apps/atlassian/src/test/loyalty.test.ts";
  const failExcerpt = [
    " FAIL  src/test/loyalty.test.ts > loyalty config casing",
    "AssertionError: expected 'Loyalty' to be 'loyalty'",
    "Test Files  1 failed (1)",
  ].join("\n");

  it("does not treat an empty payload as 'writer changed no test' when git has the test", () => {
    const collected = collectFiles({ payloadFiles: [], gitFiles: [testFile] });
    const decision = decide({
      type: "test-writer",
      files: collected.files,
      suiteStatus: 1,
      excerpt: failExcerpt,
    });
    assert.equal(decision.reason, "writer_red");
    assert.equal(decision.parentNext, "spawn_implementer");
    assert.match(decision.parentInstruction, /Spawn implementer/);
    assert.match(decision.subagentFollowup, /failed as intended/);
  });

  it("still flags a writer that changed no test in git either", () => {
    const decision = decide({
      type: "test-writer",
      files: [],
      suiteStatus: 1,
      excerpt: failExcerpt,
    });
    assert.equal(decision.reason, "writer_wrong_files");
    assert.equal(decision.parentNext, "spawn_writer");
  });

  it("flags an implementer who changed a test when only git sees it", () => {
    const decision = decide({
      type: "implementer",
      files: [testFile],
      suiteStatus: 0,
      excerpt: "Tests  61 passed (61)",
    });
    assert.equal(decision.reason, "implementer_changed_tests");
    assert.equal(decision.parentNext, "spawn_implementer");
    assert.match(decision.subagentFollowup, /Revert the test/);
  });

  it("treats implementer + prod git file + green suite as done", () => {
    const decision = decide({
      type: "implementer",
      files: ["apps/atlassian/src/lib/loyalty.ts"],
      suiteStatus: 0,
      excerpt: "Tests  61 passed (61)",
    });
    assert.equal(decision.reason, "implementer_green");
    assert.equal(decision.parentNext, "final_reply");
  });
});

describe("decide: remaining routes", () => {
  it("sends the writer back when the suite stayed green", () => {
    const decision = decide({
      type: "test-writer",
      files: ["apps/atlassian/src/test/loyalty.test.ts"],
      suiteStatus: 0,
      excerpt: "Tests  61 passed (61)",
    });
    assert.equal(decision.reason, "writer_not_red");
    assert.equal(decision.parentNext, "spawn_writer");
  });

  it("sends the writer back when a different file failed", () => {
    const decision = decide({
      type: "test-writer",
      files: ["apps/atlassian/src/test/loyalty.test.ts"],
      suiteStatus: 1,
      excerpt: " FAIL  src/test/data.test.ts > existing case",
    });
    assert.equal(decision.reason, "writer_other_failure");
    assert.equal(decision.parentNext, "spawn_writer");
  });

  it("sends the writer back when they touched production", () => {
    const decision = decide({
      type: "test-writer",
      files: ["apps/atlassian/src/lib/loyalty.ts", "apps/atlassian/src/test/loyalty.test.ts"],
      suiteStatus: 1,
      excerpt: " FAIL  src/test/loyalty.test.ts",
    });
    assert.equal(decision.reason, "writer_wrong_files");
  });

  it("sends the implementer back when the suite is still red", () => {
    const decision = decide({
      type: "implementer",
      files: ["apps/atlassian/src/lib/loyalty.ts"],
      suiteStatus: 1,
      excerpt: " FAIL  src/test/loyalty.test.ts",
    });
    assert.equal(decision.reason, "implementer_red");
    assert.equal(decision.parentNext, "spawn_implementer");
  });
});

describe("failNamesTests", () => {
  it("matches a vitest FAIL line by basename", () => {
    assert.equal(
      failNamesTests(" FAIL  src/test/loyalty.test.ts > case", [
        "apps/atlassian/src/test/loyalty.test.ts",
      ]),
      true,
    );
  });
});

describe("hookResponse", () => {
  it("addresses followup_message to the subagent, not the parent", () => {
    const decision = decide({
      type: "test-writer",
      files: ["apps/atlassian/src/test/loyalty.test.ts"],
      suiteStatus: 1,
      excerpt: " FAIL  src/test/loyalty.test.ts",
    });
    const body = hookResponse({
      decision,
      cmd: "apps/atlassian/node_modules/.bin/vitest run",
      excerpt: " FAIL  src/test/loyalty.test.ts",
    });
    assert.match(body.followup_message, /failed as intended/);
    assert.doesNotMatch(body.followup_message, /Spawn implementer/);
  });
});

describe("main", () => {
  it("no-ops for subagent types outside the TDD pair", () => {
    const root = tmpRoot("atlassian-main-");
    const out = main("stop", JSON.stringify({ subagent_type: "bugbot", status: "completed" }), {
      root,
      suite: () => {
        throw new Error("suite must not run");
      },
    });
    assert.equal(out, null);
    assert.equal(fs.existsSync(path.join(root, ".cursor/hooks/last-run.md")), false);
  });

  it("routes writer_red from git files when modified_files is empty", () => {
    const root = tmpRoot("atlassian-main-");
    const testFile = "apps/atlassian/src/test/loyalty.test.ts";
    fs.mkdirSync(path.join(root, "apps/atlassian/src/test"), { recursive: true });
    fs.writeFileSync(path.join(root, testFile), "expect(true).toBe(false);\n");
    // The tmp root becomes a real repo so dirtyAtlassianFiles sees the untracked test.
    initGitRepo(root);

    const out = main(
      "stop",
      JSON.stringify({
        hook_event_name: "subagentStop",
        subagent_type: "test-writer",
        status: "completed",
        loop_count: 0,
        modified_files: [],
      }),
      {
        root,
        stamp: "2026-08-24T21:40:00Z",
        suite: () => ({
          cmd: "apps/atlassian/node_modules/.bin/vitest run",
          status: 1,
          log: " FAIL  src/test/loyalty.test.ts > casing\nTest Files  1 failed (1)\n",
        }),
      },
    );

    assert.equal(out.record.filesSource, "git");
    assert.equal(out.record.reason, "writer_red");
    assert.equal(out.record.parentNext, "spawn_implementer");
    assert.equal(out.record.trigger, "hook");
    assert.equal(out.record.hookEventName, "subagentStop");
    assert.match(
      fs.readFileSync(path.join(root, ".cursor/hooks/last-run.md"), "utf8"),
      /trigger: hook/,
    );
  });

  it("still routes writer_red when start ran after the test already existed", () => {
    const root = tmpRoot("atlassian-main-");
    const testFile = "apps/atlassian/src/test/format.test.ts";
    fs.mkdirSync(path.join(root, "apps/atlassian/src/test"), { recursive: true });
    fs.writeFileSync(path.join(root, testFile), "expect(true).toBe(false);\n");
    initGitRepo(root);
    main("start", JSON.stringify({ subagent_type: "test-writer" }), { root });
    const out = main(
      "stop",
      JSON.stringify({
        hook_event_name: "subagentStop",
        subagent_type: "test-writer",
        status: "completed",
        modified_files: [],
      }),
      {
        root,
        stamp: "2026-08-24T22:05:00Z",
        suite: () => ({
          cmd: "apps/atlassian/node_modules/.bin/vitest run",
          status: 1,
          log: " FAIL  src/test/format.test.ts > slugify\n",
        }),
      },
    );
    assert.equal(out.record.reason, "writer_red");
    assert.equal(out.record.filesSource, "writer-diff");
    assert.deepEqual(out.record.files, [testFile]);
    const lastMd = fs.readFileSync(path.join(root, ".cursor/hooks/last-run.md"), "utf8");
    assert.match(lastMd, /parent_next: spawn_implementer/);
    assert.match(lastMd, /files_source: writer-diff/);
    assert.match(out.response.followup_message, /failed as intended/);
  });

  it("start then stop: leftover writer test does not block implementer green", () => {
    const root = tmpRoot("atlassian-main-");
    const testFile = "apps/atlassian/src/test/loyalty.test.ts";
    const prodFile = "apps/atlassian/src/lib/loyalty.ts";
    fs.mkdirSync(path.join(root, "apps/atlassian/src/test"), { recursive: true });
    fs.mkdirSync(path.join(root, "apps/atlassian/src/lib"), { recursive: true });
    fs.writeFileSync(path.join(root, testFile), "red\n");
    fs.writeFileSync(path.join(root, prodFile), "old\n");
    initGitRepo(root);

    main("start", JSON.stringify({ subagent_type: "implementer" }), {
      root,
      stamp: "2026-08-24T21:41:00Z",
    });
    fs.writeFileSync(path.join(root, prodFile), "new\n");

    const out = main(
      "stop",
      JSON.stringify({ subagent_type: "implementer", status: "completed", loop_count: 0 }),
      {
        root,
        stamp: "2026-08-24T21:42:00Z",
        suite: () => ({
          cmd: "apps/atlassian/node_modules/.bin/vitest run",
          status: 0,
          log: " Test Files  7 passed (7)\n      Tests  62 passed (62)\n",
        }),
      },
    );

    assert.equal(out.record.filesSource, "snapshot-diff");
    assert.deepEqual(out.record.files, [prodFile]);
    assert.equal(out.record.reason, "implementer_green");
    assert.equal(out.record.parentNext, "final_reply");
    assert.equal(out.record.trigger, "parent");
    const lastMd = fs.readFileSync(path.join(root, ".cursor/hooks/last-run.md"), "utf8");
    assert.match(lastMd, /parent_next: final_reply/);
    assert.match(lastMd, /trigger: parent/);
    assert.match(lastMd, /hook_event_name: <none>/);
    assert.match(lastMd, /Quote \.cursor\/hooks\/last-run\.md/);
  });

  it("start then stop: leftover production does not make the writer wrong_files", () => {
    const root = tmpRoot("atlassian-main-");
    const testFile = "apps/atlassian/src/test/format.test.ts";
    const prodFile = "apps/atlassian/src/lib/format.ts";
    fs.mkdirSync(path.join(root, "apps/atlassian/src/test"), { recursive: true });
    fs.mkdirSync(path.join(root, "apps/atlassian/src/lib"), { recursive: true });
    fs.writeFileSync(path.join(root, prodFile), "export const leftover = true;\n");
    initGitRepo(root);

    main("start", JSON.stringify({ hook_event_name: "subagentStart", subagent_type: "test-writer" }), {
      root,
      stamp: "2026-08-25T02:50:00Z",
    });
    fs.writeFileSync(path.join(root, testFile), "expect(true).toBe(false);\n");

    const out = main(
      "stop",
      JSON.stringify({
        hook_event_name: "subagentStop",
        subagent_type: "test-writer",
        status: "completed",
        modified_files: [],
      }),
      {
        root,
        stamp: "2026-08-25T02:51:00Z",
        suite: () => ({
          cmd: "apps/atlassian/node_modules/.bin/vitest run",
          status: 1,
          log: " FAIL  src/test/format.test.ts > readingTime\n",
        }),
      },
    );

    assert.equal(out.record.filesSource, "writer-diff");
    assert.deepEqual(out.record.files, [testFile]);
    assert.equal(out.record.reason, "writer_red");
    assert.equal(out.record.trigger, "hook");
    assert.equal(out.record.hookEventName, "subagentStop");
  });

  it("start writes a snapshot and returns permission allow", () => {
    const root = tmpRoot("atlassian-start-");
    initGitRepo(root);
    const out = main("start", JSON.stringify({ subagent_type: "test-writer" }), { root });
    assert.equal(out.response.permission, "allow");
    assert.equal(fs.existsSync(path.join(root, ".cursor/hooks/last-run-snapshot.json")), true);
  });

  it("skips the suite when status is not completed", () => {
    const root = tmpRoot("atlassian-main-");
    const out = main(
      "stop",
      JSON.stringify({ subagent_type: "test-writer", status: "aborted" }),
      {
        root,
        suite: () => {
          throw new Error("suite must not run");
        },
      },
    );
    assert.equal(out.record.reason, "not_completed");
    assert.equal(out.record.parentNext, "skip");
    assert.match(
      fs.readFileSync(path.join(root, ".cursor/hooks/last-run.md"), "utf8"),
      /reason: not_completed/,
    );
  });
});

function initGitRepo(root) {
  const env = { ...process.env, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_SYSTEM: "/dev/null" };
  execFileSync("git", ["init", "-q"], { cwd: root, env });
}
