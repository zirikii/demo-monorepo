#!/usr/bin/env node
/**
 * Isolated Chromium proof helper for verify-loom.
 *
 *   VERIFY_LOOM_URL=http://localhost:53183 node .cursor/skills/verify-loom/scripts/drive.mjs
 */

import { createRequire } from "node:module";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(skillRoot, "../../..");
const origin = (process.env.VERIFY_LOOM_URL || "http://localhost:5183").replace(/\/$/, "");
const runId = process.env.VERIFY_LOOM_RUN_ID || new Date().toISOString().replace(/[:.]/g, "-");
const artifactsDir =
  process.env.VERIFY_LOOM_ARTIFACTS || join(skillRoot, "artifacts", runId);

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
      /* try next */
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

const userDataDir = await mkdtemp(join(tmpdir(), "verify-loom-"));
const context = await chromium.launchPersistentContext(userDataDir, {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] ?? (await context.newPage());

try {
  await page.goto(`${origin}/login?portal=loom`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("atlassian-demo-looms"));
  await page.getByRole("heading", { name: "Log in to Loom" }).waitFor();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("heading", { name: "Library" }).waitFor();
  for (const title of [
    "Sprint 24 demo walkthrough",
    "Safari banner repro",
    "Partner onboarding tour",
  ]) {
    await page.getByRole("link", { name: new RegExp(title) }).waitFor();
  }
  await page.getByRole("link", { name: /Sprint 24 demo walkthrough/ }).click();
  await page.getByRole("heading", { name: "Sprint 24 demo walkthrough" }).waitFor();
  await page.getByLabel("Video player").waitFor();
  await page.getByRole("button", { name: "Mark as watched" }).click();
  await page.getByRole("button", { name: "Watched" }).waitFor();
  await page.screenshot({ path: join(artifactsDir, "watched.png"), fullPage: true });
  const afterMark = await page.evaluate(() => {
    const looms = JSON.parse(localStorage.getItem("atlassian-demo-looms") || "[]");
    return looms.find((item) => item.id === "sprint-24-demo") ?? null;
  });
  if (afterMark?.watched !== true) {
    throw new Error(`expected sprint-24-demo watched, got ${JSON.stringify(afterMark)}`);
  }
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Watched" }).waitFor();
  const afterReload = await page.evaluate(() => {
    const looms = JSON.parse(localStorage.getItem("atlassian-demo-looms") || "[]");
    return looms.find((item) => item.id === "sprint-24-demo") ?? null;
  });
  if (afterReload?.watched !== true) {
    throw new Error("sprint-24-demo did not stay watched after reload");
  }

  const storage = await page.evaluate(() => ({
    looms: localStorage.getItem("atlassian-demo-looms"),
    title: document.title,
  }));

  await writeFile(
    join(artifactsDir, "session.json"),
    `${JSON.stringify({ origin, url: page.url(), ...storage, afterReload }, null, 2)}\n`,
  );
  await writeFile(
    join(artifactsDir, "PROOF.md"),
    [
      `# verify-loom proof — ${runId}`,
      "",
      `- Origin: ${origin}`,
      `- Landed: ${page.url()}`,
      `- Title: ${storage.title}`,
      `- Features: login → library → mark sprint-24-demo watched + reload`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
