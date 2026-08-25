#!/usr/bin/env node
/**
 * Isolated Chromium: login → board → create → issue detail → status move → Rovo page.
 * Board drag is intentionally not driven (`move-drag` blocked).
 *
 *   VERIFY_JIRA_URL=http://localhost:53183 node .cursor/skills/verify-jira/scripts/drive.mjs
 */
import { createRequire } from "node:module";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(skillRoot, "../../..");
const origin = (process.env.VERIFY_JIRA_URL || "http://localhost:5183").replace(/\/$/, "");
const runId = process.env.VERIFY_JIRA_RUN_ID || new Date().toISOString().replace(/[:.]/g, "-");
const artifactsDir =
  process.env.VERIFY_JIRA_ARTIFACTS || join(skillRoot, "artifacts", runId);

function loadChromium() {
  const candidates = [
    join(repoRoot, "apps/nab/package.json"),
    join(repoRoot, "apps/changi/package.json"),
    join(repoRoot, "apps/seek/package.json"),
  ];
  for (const pkg of candidates) {
    try {
      const require = createRequire(pkg);
      const playwright = require("playwright");
      if (playwright?.chromium) return playwright.chromium;
    } catch {
      /* try the next workspace app that ships Playwright */
    }
    try {
      const require = createRequire(pkg);
      const playwright = require("@playwright/test");
      if (playwright?.chromium) return playwright.chromium;
    } catch {
      /* continue */
    }
  }
  throw new Error(
    "Playwright not found. Install it in apps/nab or apps/changi, or drive with computer-use instead.",
  );
}

const chromium = loadChromium();

await mkdir(artifactsDir, { recursive: true });

const userDataDir = await mkdtemp(join(tmpdir(), "verify-jira-"));
const context = await chromium.launchPersistentContext(userDataDir, {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] ?? (await context.newPage());

try {
  await page.goto(`${origin}/login`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Log in to Jira" }).waitFor();
  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("alert").filter({ hasText: /We couldn't verify those details/ }).waitFor();
  if (!new URL(page.url()).pathname.endsWith("/login")) {
    throw new Error(`login-reject should stay on login, got ${page.url()}`);
  }

  await page.screenshot({ path: join(artifactsDir, "login.png"), fullPage: true });
  await page.getByLabel("Email").fill("demo@atlassian.com");
  await page.getByLabel("Password").fill("teamwork2026");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByRole("heading", { name: "PORTAL Sprint 24" }).waitFor();
  const pathName = new URL(page.url()).pathname;
  if (!pathName.endsWith("/jira") && pathName !== "/jira") {
    throw new Error(`expected to land on /jira, got ${page.url()}`);
  }

  await page.evaluate(() => localStorage.removeItem("atlassian-demo-issues"));
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "PORTAL Sprint 24" }).waitFor();

  for (const column of ["To do", "In progress", "In review", "Done"]) {
    await page.getByRole("heading", { name: column }).waitFor();
  }
  for (const key of ["PORTAL-170", "PORTAL-142", "PORTAL-161", "PORTAL-098"]) {
    await page.getByRole("link", { name: new RegExp(key) }).waitFor();
  }

  const card = page.getByRole("link", { name: /PORTAL-142/ });
  const draggable = await card.getAttribute("draggable");
  if (draggable !== "false") {
    throw new Error(`Jira cards must stay non-draggable; got draggable=${draggable}`);
  }
  if (await page.getByLabel("Ask Rovo").count()) {
    throw new Error("board must not mount a compact Ask Rovo panel");
  }
  await page.screenshot({ path: join(artifactsDir, "move-drag-blocked.png"), fullPage: true });
  await page.screenshot({ path: join(artifactsDir, "board-columns.png"), fullPage: true });

  await page.getByLabel("Search work items").fill("zzzz");
  await page.getByText("No work items match that search.").waitFor();
  await page.getByLabel("Search work items").fill("");
  await page.getByRole("link", { name: /PORTAL-142/ }).waitFor();

  await page.getByRole("button", { name: "Create in To do" }).click();
  await page.getByRole("heading", { name: "Create work item" }).waitFor();
  await page.getByLabel("Summary").fill("Write launch FAQ");
  await page.getByRole("button", { name: "Create work item" }).click();
  await page.getByText("Write launch FAQ").waitFor();
  await page.screenshot({ path: join(artifactsDir, "create-todo.png"), fullPage: true });

  const afterCreate = await page.evaluate(() => {
    const issues = JSON.parse(localStorage.getItem("atlassian-demo-issues") || "[]");
    return issues.find((issue) => issue.summary === "Write launch FAQ") ?? null;
  });
  if (!afterCreate || afterCreate.status !== "To do") {
    throw new Error(`expected created To do issue, got ${JSON.stringify(afterCreate)}`);
  }
  await writeFile(
    join(artifactsDir, "issues-after-create.json"),
    `${JSON.stringify(afterCreate, null, 2)}\n`,
  );
  await page.reload({ waitUntil: "networkidle" });
  await page.getByText("Write launch FAQ").waitFor();

  await page.getByRole("link", { name: /PORTAL-170/ }).click();
  await page.getByRole("heading", { name: "Campaign ad refresh landing page" }).waitFor();
  await page.screenshot({ path: join(artifactsDir, "move-before-detail.png"), fullPage: true });
  await page.getByLabel("Status").selectOption("In progress");
  const afterMove = await page.evaluate(() => {
    const issues = JSON.parse(localStorage.getItem("atlassian-demo-issues") || "[]");
    return issues.find((issue) => issue.key === "PORTAL-170") ?? null;
  });
  if (afterMove?.status !== "In progress") {
    throw new Error(`expected PORTAL-170 In progress, got ${JSON.stringify(afterMove)}`);
  }
  await writeFile(
    join(artifactsDir, "issues-after-move.json"),
    `${JSON.stringify(afterMove, null, 2)}\n`,
  );
  await page.goto(`${origin}/jira`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: /PORTAL-170/ }).waitFor();
  await page.screenshot({ path: join(artifactsDir, "move-after-board.png"), fullPage: true });
  await page.reload({ waitUntil: "networkidle" });
  const afterReload = await page.evaluate(() => {
    const issues = JSON.parse(localStorage.getItem("atlassian-demo-issues") || "[]");
    return issues.find((issue) => issue.key === "PORTAL-170") ?? null;
  });
  if (afterReload?.status !== "In progress") {
    throw new Error(`PORTAL-170 did not persist In progress after reload`);
  }
  await writeFile(
    join(artifactsDir, "issues-after-reload.json"),
    `${JSON.stringify(afterReload, null, 2)}\n`,
  );

  await page.goto(`${origin}/jira/issues/PORTAL-142`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Add 300k-account onboarding path" }).waitFor();
  await page.screenshot({ path: join(artifactsDir, "issue-PORTAL-142.png"), fullPage: true });
  await page.getByLabel("Add a comment").fill("Ready for launch review.");
  await page.getByRole("button", { name: "Comment", exact: true }).click();
  await page.getByText("Ready for launch review.").waitFor();
  await page.reload({ waitUntil: "networkidle" });
  await page.getByText("Ready for launch review.").waitFor();

  await page.goto(`${origin}/jira/backlog`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "PORTAL-161", exact: true }).click();
  await page.getByRole("heading", { name: "Login banner renders twice on Safari 18" }).waitFor();

  await page.goto(`${origin}/jira/issues/PORTAL-999`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Work item not found" }).waitFor();
  await page.getByRole("link", { name: "Back to board" }).click();
  await page.getByRole("heading", { name: "PORTAL Sprint 24" }).waitFor();

  await page.getByRole("link", { name: "Ask Rovo" }).click();
  if (!new URL(page.url()).pathname.endsWith("/jira/rovo")) {
    throw new Error(`Ask Rovo should land on /jira/rovo, got ${page.url()}`);
  }
  await page.getByLabel("Ask Rovo").fill("what's blocked?");
  await page.getByRole("button", { name: "Ask" }).click();
  await page.getByText(/PORTAL-161/).waitFor();
  await page.screenshot({ path: join(artifactsDir, "rovo-blocked.png"), fullPage: true });

  const storage = await page.evaluate(() => {
    const session = localStorage.getItem("atlassian-demo-session");
    let email = null;
    try {
      email = session ? JSON.parse(decodeURIComponent(escape(atob(session)))).email : null;
    } catch {
      email = null;
    }
    return { email, title: document.title };
  });
  if (storage.email !== "demo@atlassian.com") {
    throw new Error(`expected demo session, got ${storage.email}`);
  }

  await writeFile(
    join(artifactsDir, "session.json"),
    `${JSON.stringify({ origin, url: page.url(), email: storage.email, title: storage.title }, null, 2)}\n`,
  );
  await writeFile(
    join(artifactsDir, "PROOF.md"),
    [
      `# verify-jira proof — ${runId}`,
      "",
      `- Origin: ${origin}`,
      `- Landed: ${page.url()}`,
      `- Session email: ${storage.email}`,
      `- Title: ${storage.title}`,
      `- Created: ${afterCreate.key} (${afterCreate.status})`,
      `- Moved: PORTAL-170 → ${afterReload.status}`,
      `- Features: login, board, create-issue, move-status-select, issue-detail, rovo-page`,
      `- move-drag: blocked on purpose (cards draggable=false)`,
      `- rovo-board-aside: product gap (no compact board panel)`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
