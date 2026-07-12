import { mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

test("visual walkthrough of Changi homepage and key routes", async ({ browser }) => {
  const artifactDir = "/opt/cursor/artifacts";
  mkdirSync(artifactDir, { recursive: true });
  const context = await browser.newContext({ recordVideo: { dir: artifactDir, size: { width: 1280, height: 720 } } });
  const page = await context.newPage();

  await page.goto("/");
  await expect(page.getByRole("img", { name: /changi airport singapore/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /useful information for arriving passengers/i })).toBeVisible();
  await page.screenshot({ path: join(artifactDir, "changi-home.png"), fullPage: true });

  await page.getByRole("button", { name: /departing/i }).click();
  await expect(page.getByRole("heading", { name: /useful information for departing passengers/i })).toBeVisible();
  await page.getByRole("link", { name: /^fly$/i }).click();
  await expect(page.getByRole("heading", { name: /fly with changi airport/i })).toBeVisible();
  await page.screenshot({ path: join(artifactDir, "changi-fly.png"), fullPage: true });

  await page.getByRole("link", { name: /changi rewards/i }).click();
  await expect(page.getByRole("heading", { name: /changi rewards/i })).toBeVisible();
  await page.screenshot({ path: join(artifactDir, "changi-rewards.png"), fullPage: true });

  const video = page.video();
  await context.close();
  if (video) {
    copyFileSync(await video.path(), join(artifactDir, "changi-walkthrough.webm"));
  }
});
