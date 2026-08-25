#!/usr/bin/env node
/**
 * Isolated Chromium proof helper for verify-admin.
 *
 *   VERIFY_ADMIN_URL=http://localhost:53183 node .cursor/skills/verify-admin/scripts/drive.mjs
 */

import { createRequire } from "node:module";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(skillRoot, "../../..");
const origin = (process.env.VERIFY_ADMIN_URL || "http://localhost:5183").replace(/\/$/, "");
const runId = process.env.VERIFY_ADMIN_RUN_ID || new Date().toISOString().replace(/[:.]/g, "-");
const artifactsDir =
  process.env.VERIFY_ADMIN_ARTIFACTS || join(skillRoot, "artifacts", runId);

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

const userDataDir = await mkdtemp(join(tmpdir(), "verify-admin-"));
const context = await chromium.launchPersistentContext(userDataDir, {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] ?? (await context.newPage());

try {
  await page.goto(`${origin}/login?portal=admin`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("atlassian-demo-admin"));
  await page.getByRole("heading", { name: "Log in to Admin" }).waitFor();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("heading", { name: "Admin", exact: true }).waitFor();
  for (const name of ["Maya Chen", "Jordan Hale", "Priya Raman", "Sam Okonkwo", "Nadia Fischer"]) {
    await page.getByText(name).waitFor();
  }
  await page.getByText("demo@atlassian.com").waitFor();
  await page.getByRole("switch", { name: "Two-step verification" }).click();
  await page.getByRole("switch", { name: "Public signup" }).click();
  const afterToggle = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("atlassian-demo-admin") || "null"),
  );
  if (afterToggle?.twoStepLogin !== false || afterToggle?.publicSignup !== true) {
    throw new Error(`unexpected admin settings ${JSON.stringify(afterToggle)}`);
  }
  await page.screenshot({ path: join(artifactsDir, "admin.png"), fullPage: true });
  await page.reload({ waitUntil: "networkidle" });
  if (
    (await page.getByRole("switch", { name: "Two-step verification" }).getAttribute("aria-checked")) !==
    "false"
  ) {
    throw new Error("Two-step verification did not stay off after reload");
  }
  if ((await page.getByRole("switch", { name: "Public signup" }).getAttribute("aria-checked")) !== "true") {
    throw new Error("Public signup did not stay on after reload");
  }

  const storage = await page.evaluate(() => ({
    admin: localStorage.getItem("atlassian-demo-admin"),
    title: document.title,
  }));

  await writeFile(
    join(artifactsDir, "session.json"),
    `${JSON.stringify({ origin, url: page.url(), ...storage }, null, 2)}\n`,
  );
  await writeFile(
    join(artifactsDir, "PROOF.md"),
    [
      `# verify-admin proof — ${runId}`,
      "",
      `- Origin: ${origin}`,
      `- Landed: ${page.url()}`,
      `- Title: ${storage.title}`,
      `- Features: login → directory → two-step off + public signup on + reload`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
