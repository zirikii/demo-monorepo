import { test, expect } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shots = path.resolve(__dirname, "../shots");
const artifacts = "/opt/cursor/artifacts/screenshots";

function ensureDirs() {
  fs.mkdirSync(shots, { recursive: true });
  fs.mkdirSync(artifacts, { recursive: true });
}

async function shot(page: import("@playwright/test").Page, name: string) {
  ensureDirs();
  const file = `${name}.png`;
  await page.screenshot({ path: path.join(shots, file), fullPage: true });
  await page.screenshot({ path: path.join(artifacts, `nine-${file}`), fullPage: true });
}

test.describe("vision screenshots", () => {
  test("capture key pages", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel(/nine\.com\.au home/i)).toBeVisible();
    await shot(page, "01-home");

    await page.goto("/news");
    await expect(page.getByRole("heading", { level: 1, name: /News/i })).toBeVisible();
    await shot(page, "02-news");

    await page.goto("/sport");
    await expect(page.getByRole("heading", { level: 1, name: /Sport/i })).toBeVisible();
    await expect(page.getByText(/NaN hours ago/i).first()).toBeVisible();
    await shot(page, "03-sport-bug");

    await page.goto("/entertainment");
    await expect(page.getByRole("heading", { level: 1, name: /Entertainment/i })).toBeVisible();
    await shot(page, "04-entertainment");

    await page.goto("/login");
    await expect(page.getByRole("heading", { level: 1, name: /Sign in/i })).toBeVisible();
    await shot(page, "05-login");

    await page.goto("/tv");
    await expect(page.getByRole("heading", { level: 1, name: /TV/i })).toBeVisible();
    await shot(page, "06-tv");
  });
});
