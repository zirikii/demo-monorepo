#!/usr/bin/env node
/**
 * Isolated Chromium proof helper for verify-jpd.
 *
 *   VERIFY_JPD_URL=http://localhost:53183 node .cursor/skills/verify-jpd/scripts/drive.mjs
 */

import { createRequire } from "node:module";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(skillRoot, "../../..");
const origin = (process.env.VERIFY_JPD_URL || "http://localhost:5183").replace(/\/$/, "");
const runId = process.env.VERIFY_JPD_RUN_ID || new Date().toISOString().replace(/[:.]/g, "-");
const artifactsDir =
  process.env.VERIFY_JPD_ARTIFACTS || join(skillRoot, "artifacts", runId);

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

const userDataDir = await mkdtemp(join(tmpdir(), "verify-jpd-"));
const context = await chromium.launchPersistentContext(userDataDir, {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] ?? (await context.newPage());

try {
  await page.goto(`${origin}/login?portal=jpd`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("atlassian-demo-ideas"));
  await page.getByRole("heading", { name: "Log in to Jira Product Discovery" }).waitFor();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("heading", { name: "Ideas" }).waitFor();
  await page.screenshot({ path: join(artifactsDir, "login-ideas.png"), fullPage: true });
  for (const key of ["DISC-4", "DISC-9", "DISC-15"]) {
    await page.getByRole("link", { name: key, exact: true }).waitFor();
  }
  await page.getByRole("button", { name: "Vote for DISC-9" }).click();
  await page.getByRole("button", { name: "Vote for DISC-9" }).getByText("8 votes").waitFor();
  await page.screenshot({ path: join(artifactsDir, "ideas-voted.png"), fullPage: true });
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Vote for DISC-9" }).getByText("8 votes").waitFor();

  await page.goto(`${origin}/jpd/ideas/DISC-15`, { waitUntil: "networkidle" });
  await page.getByLabel("Status").selectOption("Researching");
  const afterStatus = await page.evaluate(() => {
    const ideas = JSON.parse(localStorage.getItem("atlassian-demo-ideas") || "[]");
    return ideas.find((idea) => idea.key === "DISC-15") ?? null;
  });
  if (afterStatus?.status !== "Researching") {
    throw new Error(`expected DISC-15 Researching, got ${JSON.stringify(afterStatus)}`);
  }
  await page.reload({ waitUntil: "networkidle" });
  const afterReload = await page.evaluate(() => {
    const ideas = JSON.parse(localStorage.getItem("atlassian-demo-ideas") || "[]");
    return ideas.find((idea) => idea.key === "DISC-15") ?? null;
  });
  if (afterReload?.status !== "Researching") {
    throw new Error("DISC-15 did not stay Researching after reload");
  }

  const storage = await page.evaluate(() => ({
    ideas: localStorage.getItem("atlassian-demo-ideas"),
    title: document.title,
  }));

  await writeFile(
    join(artifactsDir, "session.json"),
    `${JSON.stringify({ origin, url: page.url(), ...storage, afterReload }, null, 2)}\n`,
  );
  await writeFile(
    join(artifactsDir, "PROOF.md"),
    [
      `# verify-jpd proof — ${runId}`,
      "",
      `- Origin: ${origin}`,
      `- Landed: ${page.url()}`,
      `- Title: ${storage.title}`,
      `- Features: login → vote DISC-9 + reload → DISC-15 Researching + reload`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
