#!/usr/bin/env node
/**
 * Isolated Chromium: login → board → drag PORTAL-170 to In progress → reload → create →
 * issue detail → status move → Rovo page.
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

  if (await page.getByLabel("Ask Rovo").count()) {
    throw new Error("board must not mount a compact Ask Rovo panel");
  }
  await page.screenshot({ path: join(artifactsDir, "board-columns.png"), fullPage: true });

  const column = (name) => page.getByRole("region", { name, exact: true });
  const readStatus = (key) =>
    page.evaluate((issueKey) => {
      const issues = JSON.parse(localStorage.getItem("atlassian-demo-issues") || "[]");
      return issues.find((issue) => issue.key === issueKey) ?? null;
    }, key);

  const dragCard = column("To do").getByRole("link", { name: /PORTAL-170/ });
  if ((await dragCard.getAttribute("draggable")) !== "true") {
    throw new Error("PORTAL-170 card must be draggable");
  }
  await page.screenshot({ path: join(artifactsDir, "move-drag-before.png"), fullPage: true });
  const from = await dragCard.boundingBox();
  const to = await column("In progress").boundingBox();
  await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x + to.width / 2, to.y + 40, { steps: 12 });
  await page.waitForSelector('section[data-drop-target="true"]');
  await page.waitForTimeout(400);
  const hoverState = await page.evaluate(() => {
    const target = document.querySelector('section[data-drop-target="true"]');
    const dragging = document.querySelector('a[data-dragging="true"]');
    return {
      target: target?.querySelector("h3")?.textContent ?? null,
      targetClass: target?.className ?? "",
      targetBackground: target ? getComputedStyle(target).backgroundColor : null,
      draggingKey: dragging?.getAttribute("href") ?? null,
    };
  });
  if (hoverState.target !== "In progress" || !hoverState.targetClass.includes("atl-blue")) {
    throw new Error(`expected blue In progress drop target, got ${JSON.stringify(hoverState)}`);
  }
  if (!hoverState.draggingKey?.endsWith("/PORTAL-170")) {
    throw new Error(`expected PORTAL-170 to be marked dragging, got ${hoverState.draggingKey}`);
  }
  await page.screenshot({ path: join(artifactsDir, "move-drag-hover.png"), fullPage: true });
  await page.mouse.up();

  await column("In progress").getByRole("link", { name: /PORTAL-170/ }).waitFor();
  if (await column("To do").getByRole("link", { name: /PORTAL-170/ }).count()) {
    throw new Error("PORTAL-170 is still in To do after the drop");
  }
  if (await page.locator('section[data-drop-target="true"]').count()) {
    throw new Error("drop target highlight did not clear after the drop");
  }
  const afterDrag = await readStatus("PORTAL-170");
  if (afterDrag?.status !== "In progress") {
    throw new Error(`expected PORTAL-170 In progress after drag, got ${JSON.stringify(afterDrag)}`);
  }
  await writeFile(
    join(artifactsDir, "issues-after-drag.json"),
    `${JSON.stringify({ ...afterDrag, hoverState }, null, 2)}\n`,
  );
  await page.screenshot({ path: join(artifactsDir, "move-drag-after.png"), fullPage: true });

  await page.reload({ waitUntil: "networkidle" });
  await column("In progress").getByRole("link", { name: /PORTAL-170/ }).waitFor();
  const afterDragReload = await readStatus("PORTAL-170");
  if (afterDragReload?.status !== "In progress") {
    throw new Error("PORTAL-170 did not stay In progress after reload");
  }
  await writeFile(
    join(artifactsDir, "issues-after-drag-reload.json"),
    `${JSON.stringify(afterDragReload, null, 2)}\n`,
  );
  await page.screenshot({ path: join(artifactsDir, "move-drag-reload.png"), fullPage: true });

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
  await page.getByLabel("Status").selectOption("In review");
  const afterMove = await readStatus("PORTAL-170");
  if (afterMove?.status !== "In review") {
    throw new Error(`expected PORTAL-170 In review, got ${JSON.stringify(afterMove)}`);
  }
  await writeFile(
    join(artifactsDir, "issues-after-move.json"),
    `${JSON.stringify(afterMove, null, 2)}\n`,
  );
  await page.goto(`${origin}/jira`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: /PORTAL-170/ }).waitFor();
  await page.screenshot({ path: join(artifactsDir, "move-after-board.png"), fullPage: true });
  await page.reload({ waitUntil: "networkidle" });
  await column("In review").getByRole("link", { name: /PORTAL-170/ }).waitFor();
  const afterReload = await readStatus("PORTAL-170");
  if (afterReload?.status !== "In review") {
    throw new Error(`PORTAL-170 did not persist In review after reload`);
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
      `- Dragged: PORTAL-170 To do → ${afterDragReload.status} (drop target ${hoverState.target}, background ${hoverState.targetBackground}), kept after reload`,
      `- Status select: PORTAL-170 → ${afterReload.status}, kept after reload`,
      `- Features: login, board, move-drag, move-persist, move-reload, create-issue, move-status-select, issue-detail, rovo-page`,
      `- rovo-board-aside: product gap (no compact board panel)`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
