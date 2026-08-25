#!/usr/bin/env node
/**
 * Isolated Chromium proof helper for verify-trello.
 *
 *   VERIFY_TRELLO_URL=http://localhost:53183 node .cursor/skills/verify-trello/scripts/drive.mjs
 */

import { createRequire } from "node:module";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(skillRoot, "../../..");
const origin = (process.env.VERIFY_TRELLO_URL || "http://localhost:5183").replace(/\/$/, "");
const runId = process.env.VERIFY_TRELLO_RUN_ID || new Date().toISOString().replace(/[:.]/g, "-");
const artifactsDir =
  process.env.VERIFY_TRELLO_ARTIFACTS || join(skillRoot, "artifacts", runId);

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

const userDataDir = await mkdtemp(join(tmpdir(), "verify-trello-"));
const context = await chromium.launchPersistentContext(userDataDir, {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] ?? (await context.newPage());

try {
  await page.goto(`${origin}/login?portal=trello`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("atlassian-demo-trello"));
  await page.getByRole("heading", { name: "Log in to Trello" }).waitFor();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("heading", { name: "Northline launch" }).waitFor();
  for (const list of ["Inbox", "Doing", "Review", "Done"]) {
    await page.getByRole("heading", { name: list }).waitFor();
  }
  await page.getByRole("article", { name: "Draft press kit" }).waitFor();
  await page.getByLabel("Move Draft press kit").selectOption("Doing");
  const afterMove = await page.evaluate(() => {
    const cards = JSON.parse(localStorage.getItem("atlassian-demo-trello") || "[]");
    return cards.find((card) => card.id === "press-kit") ?? null;
  });
  if (afterMove?.list !== "Doing") {
    throw new Error(`expected press-kit in Doing, got ${JSON.stringify(afterMove)}`);
  }
  await page.screenshot({ path: join(artifactsDir, "card-moved.png"), fullPage: true });
  await page.reload({ waitUntil: "networkidle" });
  const afterReload = await page.evaluate(() => {
    const cards = JSON.parse(localStorage.getItem("atlassian-demo-trello") || "[]");
    return cards.find((card) => card.id === "press-kit") ?? null;
  });
  if (afterReload?.list !== "Doing") {
    throw new Error("press-kit did not stay in Doing after reload");
  }

  const storage = await page.evaluate(() => ({
    cards: localStorage.getItem("atlassian-demo-trello"),
    title: document.title,
  }));

  await writeFile(
    join(artifactsDir, "session.json"),
    `${JSON.stringify({ origin, url: page.url(), ...storage, afterReload }, null, 2)}\n`,
  );
  await writeFile(
    join(artifactsDir, "PROOF.md"),
    [
      `# verify-trello proof — ${runId}`,
      "",
      `- Origin: ${origin}`,
      `- Landed: ${page.url()}`,
      `- Title: ${storage.title}`,
      `- Features: login → board lists → move Draft press kit to Doing + reload`,
      "",
    ].join("\n"),
  );

  console.log(`drive: ok — artifacts in ${artifactsDir}`);
} finally {
  await context.close();
}
