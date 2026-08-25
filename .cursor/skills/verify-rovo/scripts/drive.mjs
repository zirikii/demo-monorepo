#!/usr/bin/env node
/**
 * Isolated Chromium proof helper for verify-rovo.
 *
 *   VERIFY_ROVO_URL=http://localhost:53183 node .cursor/skills/verify-rovo/scripts/drive.mjs
 */

import { createRequire } from "node:module";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(skillRoot, "../../..");
const origin = (process.env.VERIFY_ROVO_URL || "http://localhost:5183").replace(/\/$/, "");
const runId = process.env.VERIFY_ROVO_RUN_ID || new Date().toISOString().replace(/[:.]/g, "-");
const artifactsDir =
  process.env.VERIFY_ROVO_ARTIFACTS || join(skillRoot, "artifacts", runId);

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

const userDataDir = await mkdtemp(join(tmpdir(), "verify-rovo-"));
const context = await chromium.launchPersistentContext(userDataDir, {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] ?? (await context.newPage());

try {
  await page.goto(`${origin}/login?portal=rovo`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("atlassian-demo-agents"));
  await page.getByRole("heading", { name: "Log in to Rovo" }).waitFor();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("heading", { name: "Rovo Studio" }).waitFor();
  if (!new URL(page.url()).pathname.endsWith("/rovo")) {
    throw new Error(`expected /rovo, got ${page.url()}`);
  }
  await page.getByText("Login banner renders twice on Safari 18").waitFor();
  await page.getByLabel("Search the graph").fill("Safari");
  await page.getByText("Safari banner repro").waitFor();
  await page.getByText("Login banner renders twice on Safari 18").waitFor();
  await page.getByText("Fix Safari banner casing (PORTAL-161)").waitFor();
  if (await page.getByText("VPN down for Harbour Digital office").count()) {
    throw new Error("Safari filter should hide the VPN request hit");
  }
  await page.getByLabel("Ask Rovo").fill("what's blocked?");
  await page.getByRole("button", { name: "Ask" }).click();
  await page.getByText(/Highest risk is PORTAL-161/).waitFor();
  await page.getByRole("switch", { name: "Onboarding writer" }).click();
  const afterToggle = await page.evaluate(() => {
    const agents = JSON.parse(localStorage.getItem("atlassian-demo-agents") || "[]");
    return agents.find((agent) => agent.id === "onboarding-writer") ?? null;
  });
  if (afterToggle?.enabled !== true) {
    throw new Error(`expected Onboarding writer enabled, got ${JSON.stringify(afterToggle)}`);
  }
  await page.screenshot({ path: join(artifactsDir, "studio.png"), fullPage: true });
  await page.reload({ waitUntil: "networkidle" });
  const writer = page.getByRole("switch", { name: "Onboarding writer" });
  if ((await writer.getAttribute("aria-checked")) !== "true") {
    throw new Error("Onboarding writer did not stay enabled after reload");
  }

  const storage = await page.evaluate(() => ({
    agents: localStorage.getItem("atlassian-demo-agents"),
    title: document.title,
  }));

  await writeFile(
    join(artifactsDir, "session.json"),
    `${JSON.stringify({ origin, url: page.url(), ...storage }, null, 2)}\n`,
  );
  await writeFile(
    join(artifactsDir, "PROOF.md"),
    [
      `# verify-rovo proof — ${runId}`,
      "",
      `- Origin: ${origin}`,
      `- Landed: ${page.url()}`,
      `- Title: ${storage.title}`,
      `- Features: login → Safari graph search → blocked chat → enable Onboarding writer + reload`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
