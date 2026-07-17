import { test, expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { beat, installCursor, pointAndClick, safe, scrollAndPause } from "./helpers";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe("nine.com.au walkthrough", () => {
  test("homepage → sport → entertainment → login", async ({ page }) => {
    await installCursor(page);
    await page.goto("/");
    await expect(page.getByRole("banner").getByLabel(/nine\.com\.au home/i)).toBeVisible();
    await beat(page, 900);
    await scrollAndPause(page, 600, 800);
    await scrollAndPause(page, 700, 800);

    await safe("open sport", async () => {
      await pointAndClick(page, page.getByRole("navigation", { name: /Primary/i }).getByRole("link", { name: /^Sport$/i }));
      await expect(page.getByRole("heading", { level: 1, name: /Sport/i })).toBeVisible();
      await expect(page.getByText(/NaN hours ago/i)).toHaveCount(0);
      await expect(page.getByText(/\b\d+[mhd] ago\b/i).first()).toBeVisible();
      await beat(page, 1200);
      await scrollAndPause(page, 500, 700);
    });

    await safe("entertainment", async () => {
      await pointAndClick(
        page,
        page.getByRole("navigation", { name: /Primary/i }).getByRole("link", { name: /^Entertainment$/i }),
      );
      await expect(page.getByRole("heading", { level: 1, name: /Entertainment/i })).toBeVisible();
      await beat(page, 800);
    });

    await safe("login", async () => {
      await pointAndClick(page, page.getByRole("link", { name: /Sign in/i }).first());
      await expect(page.getByRole("heading", { level: 1, name: /Sign in/i })).toBeVisible();
      await beat(page, 1000);
    });

    // Keep a copy path hint for CI artifact collectors
    void path.join(__dirname, "../shots");
  });
});
