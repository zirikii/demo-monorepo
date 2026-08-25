#!/usr/bin/env node
/**
 * Isolated Chromium proof helper for verify-confluence.
 *
 *   VERIFY_CONFLUENCE_URL=http://localhost:53183 node .cursor/skills/verify-confluence/scripts/drive.mjs
 */

import { createRequire } from "node:module";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(skillRoot, "../../..");
const origin = (process.env.VERIFY_CONFLUENCE_URL || "http://localhost:5183").replace(/\/$/, "");
const runId = process.env.VERIFY_CONFLUENCE_RUN_ID || new Date().toISOString().replace(/[:.]/g, "-");
const artifactsDir =
  process.env.VERIFY_CONFLUENCE_ARTIFACTS || join(skillRoot, "artifacts", runId);

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

const userDataDir = await mkdtemp(join(tmpdir(), "verify-confluence-"));
const context = await chromium.launchPersistentContext(userDataDir, {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] ?? (await context.newPage());

try {
  await page.goto(`${origin}/login?portal=confluence`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("atlassian-demo-pages"));
  await page.getByRole("heading", { name: "Log in to Confluence" }).waitFor();
  await page.screenshot({ path: join(artifactsDir, "login-space.png"), fullPage: true });
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("heading", { name: "Northline" }).waitFor();
  for (const title of [
    "Portal 2.0 strategy brief",
    "Safari login banner notes",
    "Partner onboarding playbook",
    "Q3 campaign landing brief",
  ]) {
    await page.getByRole("link", { name: title }).waitFor();
  }
  await page.getByLabel("Search pages").fill("zzzz");
  await page.getByText("No pages match that search.").waitFor();
  await page.getByLabel("Search pages").fill("");
  await page.screenshot({ path: join(artifactsDir, "space.png"), fullPage: true });
  await page.getByRole("link", { name: /Portal 2.0 strategy brief/ }).click();
  await page.getByRole("heading", { name: "Portal 2.0 strategy brief" }).waitFor();
  await page.getByLabel("Add a comment").fill("Ready for the partner review.");
  await page.getByRole("button", { name: "Comment", exact: true }).click();
  await page.getByText("Ready for the partner review.").waitFor();
  await page.screenshot({ path: join(artifactsDir, "page-comment.png"), fullPage: true });
  await page.reload({ waitUntil: "networkidle" });
  await page.getByText("Ready for the partner review.").waitFor();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Title").fill("Portal 2.0 strategy brief (edited)");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("heading", { name: "Portal 2.0 strategy brief (edited)" }).waitFor();
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Portal 2.0 strategy brief (edited)" }).waitFor();
  const afterReload = await page.evaluate(() => {
    const pages = JSON.parse(localStorage.getItem("atlassian-demo-pages") || "[]");
    return pages.find((item) => item.id === "strategy-brief") ?? null;
  });
  if (!afterReload?.comments?.some((entry) => entry.body === "Ready for the partner review.")) {
    throw new Error("strategy-brief comment did not persist");
  }
  if (afterReload.title !== "Portal 2.0 strategy brief (edited)") {
    throw new Error(`expected edited title, got ${afterReload.title}`);
  }

  const storage = await page.evaluate(() => ({
    pages: localStorage.getItem("atlassian-demo-pages"),
    title: document.title,
  }));

  await writeFile(
    join(artifactsDir, "session.json"),
    `${JSON.stringify({ origin, url: page.url(), ...storage }, null, 2)}\n`,
  );
  await writeFile(
    join(artifactsDir, "PROOF.md"),
    [
      `# verify-confluence proof — ${runId}`,
      "",
      `- Origin: ${origin}`,
      `- Landed: ${page.url()}`,
      `- Title: ${storage.title}`,
      `- Features: login → space search → page comment + edit + reload`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
