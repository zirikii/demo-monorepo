#!/usr/bin/env node
/**
 * Isolated Chromium: Jira login → board. Proof helper for verify-jira.
 * Does not attach to an existing Chrome profile.
 *
 *   VERIFY_JIRA_URL=http://localhost:53183 node .cursor/skills/verify-jira/scripts/drive-login-board.mjs
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
  await page.screenshot({ path: join(artifactsDir, "login.png"), fullPage: true });

  await page.getByLabel("Email").fill("demo@atlassian.com");
  await page.getByLabel("Password").fill("teamwork2026");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByRole("heading", { name: "PORTAL Sprint 24" }).waitFor();
  const pathName = new URL(page.url()).pathname;
  if (!pathName.endsWith("/jira") && pathName !== "/jira") {
    throw new Error(`expected to land on /jira, got ${page.url()}`);
  }

  for (const column of ["To do", "In progress", "In review", "Done"]) {
    await page.getByRole("heading", { name: column }).waitFor();
  }
  await page.getByText("PORTAL-142").waitFor();
  await page.getByText("PORTAL-170").waitFor();
  await page.getByText("PORTAL-161").waitFor();

  await page.screenshot({ path: join(artifactsDir, "board-columns.png"), fullPage: true });

  const storage = await page.evaluate(() => {
    const session = localStorage.getItem("atlassian-demo-session");
    let email = null;
    try {
      email = session ? JSON.parse(decodeURIComponent(escape(atob(session)))).email : null;
    } catch {
      email = null;
    }
    return {
      email,
      issues: localStorage.getItem("atlassian-demo-issues"),
      title: document.title,
    };
  });

  if (storage.email !== "demo@atlassian.com") {
    throw new Error(`expected demo session, got ${storage.email}`);
  }
  if (!String(storage.title).includes("PORTAL Sprint 24")) {
    throw new Error(`unexpected document title: ${storage.title}`);
  }

  await writeFile(
    join(artifactsDir, "session.json"),
    `${JSON.stringify({ origin, url: page.url(), ...storage }, null, 2)}\n`,
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
      `- Feature: login → board (move-drag blocked on purpose)`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
