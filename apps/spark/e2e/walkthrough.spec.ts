import { expect, test } from "@playwright/test";
import { installCursor, pointAndClick, scrollAndPause } from "./helpers";

test("Spark NZ travel page visual walkthrough", async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  await installCursor(page);

  await page.goto("/online/shop/promotions/travel-and-move");
  await expect(
    page.getByRole("heading", { name: /experience new zealand on a local mobile network/i }),
  ).toBeVisible();
  await page.waitForTimeout(1200);

  await scrollAndPause(page, 650, 1000);
  await expect(page.getByText("Endless data")).toBeVisible();
  await pointAndClick(page, page.getByRole("button", { name: /click & collect/i }).last(), 1100);
  await expect(page.getByRole("status")).toContainText("Demo only: Endless selected.");

  await scrollAndPause(page, 850, 900);
  await scrollAndPause(page, 850, 900);
  await pointAndClick(page, page.getByRole("button", { name: /questions about endless data/i }), 900);
  await expect(page.getByText(/100GB of full-speed Endless Travel Pack data/i)).toBeVisible();

  await page.screenshot({
    path: testInfo.outputPath("spark-travel-page-full.png"),
    fullPage: true,
  });

  await page.setViewportSize({ width: 420, height: 820 });
  await page.goto("/online/shop/promotions/travel-and-move");
  await pointAndClick(page, page.getByRole("button", { name: "Open menu" }), 900);
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.waitForTimeout(1000);
});
