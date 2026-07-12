import { test, expect } from "@playwright/test";
import { beat, dismissOverlays, goTo, installCursor, pointAndClick, safe, typeInto } from "./helpers";

/**
 * "Computer-vision" walkthrough: drives the real running Spark demo through the
 * shop → Travel & Move hub → sign-in → My Spark journey while Playwright records
 * the screen to video (see playwright.config.ts -> use.video) and captures
 * screenshots into e2e/shots/. A visible cursor + click ripples make the
 * recording read like a guided product demo.
 *
 * Run against a running server:
 *   PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test walkthrough.spec.ts
 */
test("Spark NZ demo — shop, travel & move, and My Spark walkthrough", async ({ page }) => {
  test.setTimeout(220_000);
  await installCursor(page);
  const shot = (name: string) => page.screenshot({ path: `e2e/shots/${name}.png`, fullPage: true });

  // 1) Marketing home ----------------------------------------------------------
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Mobile, broadband & travel/i })).toBeVisible();
  await beat(page, 1000);
  await shot("01-home");

  await page.mouse.wheel(0, 900);
  await beat(page, 800);
  await shot("02-home-plans");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await beat(page, 600);

  // 2) Travel & Move promotions hub (the hero page) ----------------------------
  await safe("open travel & move", async () => {
    await pointAndClick(
      page,
      page.getByRole("link", { name: /Travelling or moving\?/i }).first(),
      1200,
    );
  });
  await expect(page).toHaveURL(/travel-and-move/);
  await expect(page.getByRole("heading", { name: /keep you connected/i })).toBeVisible();
  await beat(page, 1000);
  await shot("03-travel-and-move");
  await page.mouse.wheel(0, 1100);
  await beat(page, 900);
  await shot("04-roaming-zones");
  await page.mouse.wheel(0, 1100);
  await beat(page, 900);
  await shot("05-moving-home");
  await page.evaluate(() => window.scrollTo({ top: 0 }));

  // 3) Sign in -----------------------------------------------------------------
  await safe("go to login", async () => {
    await pointAndClick(page, page.getByRole("link", { name: "Sign in" }).first(), 900);
  });
  await expect(page.getByRole("heading", { name: /Sign in to My Spark/i })).toBeVisible();
  await beat(page, 900);
  await shot("06-login");
  await pointAndClick(page, page.getByRole("button", { name: "Sign in" }), 1800);

  // 4) My Spark dashboard ------------------------------------------------------
  await expect(page.getByRole("heading", { name: /Kia ora/i })).toBeVisible();
  await beat(page, 1200);
  await shot("07-dashboard");

  // 5) Usage -------------------------------------------------------------------
  await goTo(page, "Usage", 1300);
  await safe("view usage", async () => {
    await expect(page.getByRole("heading", { name: "Usage" })).toBeVisible();
    await beat(page, 1000);
    await shot("08-usage");
  });

  // 6) Bills -------------------------------------------------------------------
  await goTo(page, "Bills", 1300);
  await safe("view bills", async () => {
    await expect(page.getByRole("heading", { name: "Bills" })).toBeVisible();
    await beat(page, 1000);
    await shot("09-bills");
  });

  // 7) Add-ons — connect a roaming add-on --------------------------------------
  await goTo(page, "Add-ons", 1300);
  await safe("connect an add-on", async () => {
    await expect(page.getByRole("heading", { name: "Add-ons" })).toBeVisible();
    await beat(page, 800);
    await pointAndClick(page, page.getByRole("button", { name: /Connect/i }).first(), 1400);
    await shot("10-addons");
  });

  // 8) My plan — switch plan ---------------------------------------------------
  await goTo(page, "My plan", 1300);
  await safe("switch plan", async () => {
    await expect(page.getByRole("heading", { name: "My plan" })).toBeVisible();
    await beat(page, 800);
    await pointAndClick(
      page,
      page.getByRole("button", { name: /Switch to this plan/i }).first(),
      1500,
    );
    await shot("11-plan");
  });

  // 9) Settings toggle ---------------------------------------------------------
  await goTo(page, "Settings", 1300);
  await safe("toggle a setting", async () => {
    await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
    await beat(page, 700);
    await pointAndClick(page, page.getByRole("switch").first(), 1200);
    await shot("12-settings");
  });

  await dismissOverlays(page);
  await beat(page, 1500);
});
