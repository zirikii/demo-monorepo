import { test, expect } from "@playwright/test";
import { beat, goTo, installCursor, pointAndClick, safe, typeInto } from "./helpers";

/**
 * "Computer-vision" walkthrough: drives the real running Optus demo through the
 * full customer journey while Playwright records the screen to video (see
 * playwright.config.ts -> use.video). A visible cursor + click ripples make the
 * recording read like a guided product demo.
 *
 * Run against a running server:
 *   PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test
 */
test("Optus demo — full customer walkthrough", async ({ page }) => {
  test.setTimeout(240_000);
  await installCursor(page);

  // 1) Marketing landing --------------------------------------------------------
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Big things happen when you say Yes/i })).toBeVisible();
  await beat(page, 1200);
  await page.mouse.wheel(0, 700);
  await beat(page, 900);
  await page.mouse.wheel(0, 900);
  await beat(page, 900);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await beat(page, 800);

  // 2) Mobile plans -------------------------------------------------------------
  await safe("go to mobile", () => goTo(page, "Mobile", 1400));
  await expect(page).toHaveURL(/mobile-plans/);
  await beat(page, 1000);
  await page.mouse.wheel(0, 500);
  await beat(page, 900);
  await safe("open a FAQ", async () => {
    await pointAndClick(page, page.getByRole("button", { name: /Do I need a contract/i }), 1200);
  });
  await page.evaluate(() => window.scrollTo({ top: 0 }));

  // 3) Home internet ------------------------------------------------------------
  await safe("go to internet", () => goTo(page, "Internet", 1400));
  await expect(page).toHaveURL(/broadband/);
  await beat(page, 900);
  await safe("check coverage", async () => {
    await typeInto(page, page.getByPlaceholder(/Market St|address/i).first(), "100 Market St, Sydney NSW");
    await pointAndClick(page, page.getByRole("button", { name: /check coverage/i }), 1600);
  });

  // 4) Optus Sport --------------------------------------------------------------
  await safe("go to sport", () => goTo(page, "Optus Sport", 1400));
  await expect(page.getByRole("heading", { name: /Live football/i })).toBeVisible();
  await beat(page, 1200);

  // 5) Sign in ------------------------------------------------------------------
  await safe("go to sign in", () => goTo(page, "Sign in", 1400));
  await expect(page.getByRole("heading", { name: /Sign in to My Optus/i })).toBeVisible();
  await beat(page, 900);
  await pointAndClick(page, page.getByRole("button", { name: /Sign in to My Optus/i }), 1800);

  // 6) My Optus overview --------------------------------------------------------
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  await beat(page, 1400);

  // 7) Usage --------------------------------------------------------------------
  await safe("open usage", () => goTo(page, "Usage", 1300));
  await expect(page.getByRole("heading", { name: "Usage" })).toBeVisible();
  await beat(page, 1300);

  // 8) Recharge -----------------------------------------------------------------
  await safe("open recharge", () => goTo(page, "Recharge", 1300));
  await safe("recharge $40", async () => {
    await pointAndClick(page, page.getByRole("button", { name: "$40" }), 800);
    await pointAndClick(page, page.getByRole("button", { name: /Recharge \$40/i }), 1800);
  });

  // 9) Billing ------------------------------------------------------------------
  await safe("open billing", () => goTo(page, "Billing", 1300));
  await expect(page.getByRole("heading", { name: "Billing" })).toBeVisible();
  await beat(page, 1200);

  // 10) Settings → add-ons toggle ----------------------------------------------
  await safe("open settings", () => goTo(page, "Settings", 1300));
  await safe("open add-ons", () => goTo(page, "Add-ons", 1100));
  await safe("toggle an add-on", async () => {
    await pointAndClick(page, page.getByRole("switch").nth(1), 1400);
  });

  await beat(page, 1800);
});
