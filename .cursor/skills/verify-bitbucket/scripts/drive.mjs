#!/usr/bin/env node
/**
 * Isolated Chromium proof helper for verify-bitbucket.
 *
 *   VERIFY_BITBUCKET_URL=http://localhost:53183 node .cursor/skills/verify-bitbucket/scripts/drive.mjs
 */

import { createRequire } from "node:module";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(skillRoot, "../../..");
const origin = (process.env.VERIFY_BITBUCKET_URL || "http://localhost:5183").replace(/\/$/, "");
const runId = process.env.VERIFY_BITBUCKET_RUN_ID || new Date().toISOString().replace(/[:.]/g, "-");
const artifactsDir =
  process.env.VERIFY_BITBUCKET_ARTIFACTS || join(skillRoot, "artifacts", runId);

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

const userDataDir = await mkdtemp(join(tmpdir(), "verify-bitbucket-"));
const context = await chromium.launchPersistentContext(userDataDir, {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] ?? (await context.newPage());

try {
  await page.goto(`${origin}/login?portal=bitbucket`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("atlassian-demo-prs"));
  await page.getByRole("heading", { name: "Log in to Bitbucket" }).waitFor();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("heading", { name: "Repositories" }).waitFor();
  await page.getByRole("link", { name: /portal-web/ }).waitFor();
  await page.getByRole("link", { name: /account-service/ }).waitFor();
  await page.getByRole("link", { name: /portal-web/ }).click();
  await page.getByRole("heading", { name: "portal-web" }).waitFor();
  await page.getByRole("link", { name: /#42/ }).click();
  await page.getByRole("heading", { name: /Fix Safari banner casing/ }).waitFor();
  await page.getByRole("button", { name: "Approve" }).click();
  await page.getByText(/Approved/).waitFor();
  await page.screenshot({ path: join(artifactsDir, "pr-approved.png"), fullPage: true });
  const afterApprove = await page.evaluate(() => {
    const prs = JSON.parse(localStorage.getItem("atlassian-demo-prs") || "[]");
    return prs.find((item) => item.id === 42) ?? null;
  });
  if (afterApprove?.status !== "Approved") {
    throw new Error(`expected PR 42 Approved, got ${JSON.stringify(afterApprove)}`);
  }
  await page.reload({ waitUntil: "networkidle" });
  const afterReload = await page.evaluate(() => {
    const prs = JSON.parse(localStorage.getItem("atlassian-demo-prs") || "[]");
    return prs.find((item) => item.id === 42) ?? null;
  });
  if (afterReload?.status !== "Approved") {
    throw new Error("PR 42 did not stay Approved after reload");
  }
  await page.getByRole("button", { name: "Merge" }).click();
  const afterMerge = await page.evaluate(() => {
    const prs = JSON.parse(localStorage.getItem("atlassian-demo-prs") || "[]");
    return prs.find((item) => item.id === 42) ?? null;
  });
  if (afterMerge?.status !== "Merged") {
    throw new Error(`expected PR 42 Merged, got ${JSON.stringify(afterMerge)}`);
  }

  const storage = await page.evaluate(() => ({
    prs: localStorage.getItem("atlassian-demo-prs"),
    title: document.title,
  }));

  await writeFile(
    join(artifactsDir, "session.json"),
    `${JSON.stringify({ origin, url: page.url(), ...storage, afterMerge }, null, 2)}\n`,
  );
  await writeFile(
    join(artifactsDir, "PROOF.md"),
    [
      `# verify-bitbucket proof — ${runId}`,
      "",
      `- Origin: ${origin}`,
      `- Landed: ${page.url()}`,
      `- Title: ${storage.title}`,
      `- Features: login → repos → approve PR #42 + reload → merge`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
