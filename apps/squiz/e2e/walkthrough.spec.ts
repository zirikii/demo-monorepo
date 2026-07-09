import { test, expect } from "@playwright/test";
import { beat, installCursor, pointAndClick, safe, scrollAndPause, typeInto } from "./helpers";

/**
 * Guided walkthrough of the Squiz demo site, recorded to video (see
 * playwright.config.ts -> use.video). A visible cursor + click ripples make the
 * recording read like a product demo.
 *
 * Run against a running dev server:
 *   PLAYWRIGHT_BASE_URL=http://localhost:5175 pnpm video
 */
test("Squiz demo — full site walkthrough", async ({ page }) => {
  test.setTimeout(260_000);
  await installCursor(page);

  // 1) Homepage hero -----------------------------------------------------------
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /digital experiences that deliver/i }),
  ).toBeVisible();
  await beat(page, 1600);

  // Scroll through the homepage sections.
  await scrollAndPause(page, 700, 1100); // difference strip
  await scrollAndPause(page, 800, 1100); // DXP spotlight
  await scrollAndPause(page, 900, 1100); // search spotlight
  await scrollAndPause(page, 900, 1000); // content intelligence
  await scrollAndPause(page, 900, 1000); // testimonial + CTA band
  await scrollAndPause(page, 900, 1000); // industry marquee

  // Persona tabs interaction.
  await safe("persona tabs", async () => {
    await pointAndClick(page, page.getByRole("tab", { name: "Content Managers" }), 1200);
    await pointAndClick(page, page.getByRole("tab", { name: "IT Directors" }), 1200);
  });

  // Insights carousel arrows.
  await safe("insights carousel", async () => {
    await pointAndClick(page, page.getByRole("button", { name: "Scroll insights right" }), 900);
    await pointAndClick(page, page.getByRole("button", { name: "Scroll insights right" }), 900);
  });

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await beat(page, 1200);

  // 2) Mega menu → DXP product page ---------------------------------------------
  await safe("open products menu", async () => {
    await pointAndClick(page, page.getByRole("button", { name: "Products" }), 900);
    await pointAndClick(
      page,
      page.getByRole("link", { name: /Squiz DXP Build, manage and optimize/i }),
      1400,
    );
  });
  await expect(page).toHaveURL(/digital-experience-platform/);
  await beat(page, 1200);
  await scrollAndPause(page, 800, 1000);
  await scrollAndPause(page, 900, 1000);

  // 3) Capabilities catalog → Conversational Search ------------------------------
  await safe("capabilities", async () => {
    await pointAndClick(page, page.getByRole("link", { name: "View all capabilities" }), 1400);
    await expect(page).toHaveURL(/capabilities/);
    await scrollAndPause(page, 700, 1000);
    await pointAndClick(
      page,
      page.getByRole("link", { name: /Conversational Search/ }).first(),
      1400,
    );
    await expect(page).toHaveURL(/conversational-search/);
    await scrollAndPause(page, 700, 1000);
  });

  // 4) Solutions menu → Higher education industry --------------------------------
  await safe("industry page", async () => {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await beat(page, 700);
    await pointAndClick(page, page.getByRole("button", { name: "Solutions" }), 900);
    await pointAndClick(page, page.getByRole("link", { name: "Higher education" }), 1400);
    await expect(page).toHaveURL(/higher-education/);
    await scrollAndPause(page, 800, 1000);
    await scrollAndPause(page, 900, 1000);
  });

  // 5) Customer story -------------------------------------------------------------
  await safe("customer story", async () => {
    await pointAndClick(page, page.getByRole("link", { name: /Read the story/i }).first(), 1400);
    await expect(page).toHaveURL(/customer-stories\//);
    await scrollAndPause(page, 700, 1000);
    await scrollAndPause(page, 900, 1000);
  });

  // 6) Blog → article ---------------------------------------------------------------
  await safe("blog", async () => {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await beat(page, 700);
    await pointAndClick(page, page.getByRole("button", { name: "Insights" }), 900);
    await pointAndClick(
      page,
      page.getByRole("region", { name: "Insights menu" }).getByRole("link", { name: /^Blog/ }),
      1400,
    );
    await expect(page).toHaveURL(/\/blog$/);
    await pointAndClick(page, page.getByRole("button", { name: "AI & Search" }), 1100);
    await pointAndClick(
      page,
      page.getByRole("link", { name: /rise of AI search/i }).first(),
      1400,
    );
    await expect(page).toHaveURL(/\/blog\//);
    await scrollAndPause(page, 700, 1000);
    await scrollAndPause(page, 800, 1000);
  });

  // 7) Demo videos modal -------------------------------------------------------------
  await safe("demo videos", async () => {
    await page.goto("/demos");
    await beat(page, 1100);
    await pointAndClick(
      page,
      page.getByRole("button", { name: /Visual Page Builder in five minutes/i }),
      1200,
    );
    await expect(page.getByRole("dialog")).toBeVisible();
    await beat(page, 1400);
    await pointAndClick(page, page.getByRole("button", { name: "Close video" }), 800);
  });

  // 8) Book a call form ----------------------------------------------------------------
  await safe("book a call", async () => {
    await pointAndClick(page, page.getByRole("link", { name: "Book a call" }).first(), 1300);
    await expect(page).toHaveURL(/book-a-call/);
    const form = page.locator("main");
    await typeInto(page, form.getByLabel("Full name"), "Alex Taylor");
    await typeInto(page, form.getByLabel("Work email"), "alex.taylor@harbourcity.gov");
    await typeInto(page, form.getByLabel("Organization"), "Harbour City Council");
    await pointAndClick(page, page.getByRole("button", { name: /request a time/i }), 1500);
    await expect(page.getByRole("status")).toBeVisible();
    await beat(page, 1500);
  });

  // 9) Mobile responsiveness peek -------------------------------------------------------
  await safe("mobile view", async () => {
    await page.setViewportSize({ width: 420, height: 800 });
    await page.goto("/");
    await beat(page, 1100);
    await pointAndClick(page, page.getByRole("button", { name: "Open menu" }), 1000);
    await beat(page, 1000);
    await pointAndClick(page, page.getByRole("button", { name: "Close menu" }), 600);
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  // 10) Finish on the homepage hero ------------------------------------------------------
  await page.goto("/");
  await beat(page, 1800);
});
