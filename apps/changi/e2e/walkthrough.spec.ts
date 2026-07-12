import { test, expect } from "@playwright/test";
import { beat, installCursor, pointAndClick, safe, scrollAndPause, typeInto } from "./helpers";

/**
 * Guided walkthrough of the Changi Airport demo site, recorded to video (see
 * playwright.config.ts -> use.video). A visible cursor + click ripples make the
 * recording read like a product demo.
 *
 * Run against a running dev server:
 *   PLAYWRIGHT_BASE_URL=http://localhost:5176 pnpm video
 */
test("Changi demo — full site walkthrough", async ({ page }) => {
  test.setTimeout(260_000);
  await installCursor(page);

  // 1) Homepage hero + passenger-mode switch ----------------------------------
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /world.?s most awarded airport/i }),
  ).toBeVisible();
  await beat(page, 1500);

  await safe("passenger modes", async () => {
    await pointAndClick(page, page.getByRole("tab", { name: "Departing" }), 1200);
    await pointAndClick(page, page.getByRole("tab", { name: "Transiting" }), 1200);
    await pointAndClick(page, page.getByRole("tab", { name: "Visiting" }), 1200);
    await pointAndClick(page, page.getByRole("tab", { name: "Arriving" }), 1000);
  });

  // Scroll through the homepage sections.
  await scrollAndPause(page, 700, 1100); // what's happening
  await scrollAndPause(page, 800, 1100); // destination explorer
  await safe("destination carousel", async () => {
    await pointAndClick(page, page.getByRole("button", { name: "Scroll destinations right" }), 900);
    await pointAndClick(page, page.getByRole("button", { name: "Scroll destinations right" }), 900);
  });
  await scrollAndPause(page, 800, 1000); // section grid
  await scrollAndPause(page, 800, 1000); // rewards teaser
  await scrollAndPause(page, 800, 1000); // app promo

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await beat(page, 1200);

  // 2) Mega menu -> Flight information ----------------------------------------
  await safe("open Fly menu", async () => {
    await pointAndClick(page, page.getByRole("button", { name: "Fly" }), 900);
    await pointAndClick(
      page,
      page.getByRole("region", { name: "Fly menu" }).getByRole("link", { name: /Flight Information/i }),
      1400,
    );
  });
  await expect(page).toHaveURL(/\/fly\/flights/);
  await beat(page, 1000);

  // 3) Flight board search -----------------------------------------------------
  await safe("flight search", async () => {
    await pointAndClick(page, page.getByRole("tab", { name: "arrivals" }), 1000);
    await typeInto(page, page.getByLabel(/search flights/i), "Tokyo");
    await beat(page, 1400);
    await pointAndClick(page, page.getByRole("tab", { name: "departures" }), 1000);
  });

  // 4) At Changi -> Terminal detail -------------------------------------------
  await safe("terminal detail", async () => {
    await page.goto("/at-changi");
    await beat(page, 900);
    await scrollAndPause(page, 500, 900);
    await pointAndClick(page, page.getByRole("link", { name: /Discover T2/i }), 1400);
    await expect(page).toHaveURL(/\/at-changi\/t2/);
    await scrollAndPause(page, 500, 1000);
  });

  // 5) Dine & Shop directory filter -------------------------------------------
  await safe("dine and shop", async () => {
    await page.goto("/dine-and-shop");
    await beat(page, 1000);
    await pointAndClick(page, page.getByRole("tab", { name: "Shop" }), 1200);
    await scrollAndPause(page, 500, 900);
    await pointAndClick(page, page.getByRole("tab", { name: "Dine" }), 1200);
    await pointAndClick(page, page.getByRole("link", { name: /Shake Shack/i }).first(), 1400);
    await expect(page).toHaveURL(/\/dine-and-shop\//);
    await scrollAndPause(page, 400, 1000);
  });

  // 6) Experience detail -------------------------------------------------------
  await safe("experience", async () => {
    await page.goto("/experience");
    await beat(page, 900);
    await pointAndClick(page, page.getByRole("link", { name: /HSBC Rain Vortex/i }), 1400);
    await expect(page).toHaveURL(/\/experience\//);
    await scrollAndPause(page, 600, 1000);
  });

  // 7) Happenings tabs ---------------------------------------------------------
  await safe("happenings", async () => {
    await page.goto("/happenings");
    await beat(page, 900);
    await pointAndClick(page, page.getByRole("tab", { name: "Promotions" }), 1200);
    await pointAndClick(page, page.getByRole("tab", { name: "Events" }), 1000);
  });

  // 8) Changi Rewards join form -----------------------------------------------
  await safe("rewards", async () => {
    await page.goto("/rewards");
    await beat(page, 900);
    await typeInto(page, page.getByLabel("Email address"), "traveller@example.com");
    await pointAndClick(page, page.getByRole("button", { name: /join for free/i }).first(), 1500);
    await expect(page.getByRole("status")).toBeVisible();
    await scrollAndPause(page, 600, 1000);
  });

  // 9) Mobile responsiveness peek ---------------------------------------------
  await safe("mobile view", async () => {
    await page.setViewportSize({ width: 420, height: 800 });
    await page.goto("/");
    await beat(page, 1100);
    await pointAndClick(page, page.getByRole("button", { name: "Open menu" }), 1000);
    await beat(page, 1000);
    await pointAndClick(page, page.getByRole("button", { name: "Close menu" }), 600);
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  // 10) Finish on the homepage hero -------------------------------------------
  await page.goto("/");
  await beat(page, 1800);
});
