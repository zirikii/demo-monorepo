#!/usr/bin/env node
/**
 * Isolated Chromium proof helper for verify-jsm.
 *
 *   VERIFY_JSM_URL=http://localhost:53183 node .cursor/skills/verify-jsm/scripts/drive.mjs
 */

import { createRequire } from "node:module";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(skillRoot, "../../..");
const origin = (process.env.VERIFY_JSM_URL || "http://localhost:5183").replace(/\/$/, "");
const runId = process.env.VERIFY_JSM_RUN_ID || new Date().toISOString().replace(/[:.]/g, "-");
const artifactsDir =
  process.env.VERIFY_JSM_ARTIFACTS || join(skillRoot, "artifacts", runId);

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

const userDataDir = await mkdtemp(join(tmpdir(), "verify-jsm-"));
const context = await chromium.launchPersistentContext(userDataDir, {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] ?? (await context.newPage());

try {
  await page.goto(`${origin}/login?portal=jsm`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("atlassian-demo-requests"));
  await page.getByRole("heading", { name: "Log in to Jira Service Management" }).waitFor();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("heading", { name: "Queues" }).waitFor();
  await page.screenshot({ path: join(artifactsDir, "login-queues.png"), fullPage: true });
  for (const key of ["ITSM-14", "ITSM-22", "ITSM-31", "ITSM-08"]) {
    await page.getByRole("link", { name: new RegExp(key) }).waitFor();
  }
  await page.getByRole("tab", { name: "Incident" }).click();
  await page.getByRole("link", { name: /ITSM-14/ }).waitFor();
  await page.getByRole("link", { name: /ITSM-08/ }).waitFor();
  if (await page.getByRole("link", { name: /ITSM-22/ }).count()) {
    throw new Error("Incident queue should hide service requests such as ITSM-22");
  }
  await page.getByRole("tab", { name: "All" }).click();
  await page.screenshot({ path: join(artifactsDir, "queues.png"), fullPage: true });
  await page.getByRole("link", { name: /ITSM-14/ }).click();
  await page.getByRole("heading", { name: "VPN down for Harbour Digital office" }).waitFor();
  await page.getByLabel("Status").selectOption("Resolved");
  await page.screenshot({ path: join(artifactsDir, "request-resolved.png"), fullPage: true });
  const afterAction = await page.evaluate(() => {
    const requests = JSON.parse(localStorage.getItem("atlassian-demo-requests") || "[]");
    return requests.find((request) => request.key === "ITSM-14") ?? null;
  });
  if (afterAction?.status !== "Resolved") {
    throw new Error(`expected ITSM-14 Resolved, got ${JSON.stringify(afterAction)}`);
  }
  await page.reload({ waitUntil: "networkidle" });
  await page.getByLabel("Status").waitFor();
  const afterReload = await page.evaluate(() => {
    const requests = JSON.parse(localStorage.getItem("atlassian-demo-requests") || "[]");
    return requests.find((request) => request.key === "ITSM-14") ?? null;
  });
  if (afterReload?.status !== "Resolved") {
    throw new Error("ITSM-14 did not stay Resolved after reload");
  }

  const storage = await page.evaluate(() => ({
    requests: localStorage.getItem("atlassian-demo-requests"),
    title: document.title,
  }));

  await writeFile(
    join(artifactsDir, "session.json"),
    `${JSON.stringify({ origin, url: page.url(), ...storage, afterReload }, null, 2)}\n`,
  );
  await writeFile(
    join(artifactsDir, "PROOF.md"),
    [
      `# verify-jsm proof — ${runId}`,
      "",
      `- Origin: ${origin}`,
      `- Landed: ${page.url()}`,
      `- Title: ${storage.title}`,
      `- Features: login → queues (Incident filter) → resolve ITSM-14 + reload`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
