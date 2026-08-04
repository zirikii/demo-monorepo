import { test, expect } from "@playwright/test";

/**
 * End-to-end happy path: browse the marketing site, run the repayment calculator, log on to the
 * mock NetBank, and confirm a transfer actually changes both balances.
 */
test("marketing browse through to a NetBank transfer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: /Earn up to 300,000 Qantas Points/i }),
  ).toBeVisible();

  const primaryNav = page.getByRole("navigation", { name: "Primary" });
  await primaryNav.getByRole("button", { name: "Home loans" }).click();
  await page.getByRole("link", { name: "Repayments calculator" }).first().click();
  await expect(page).toHaveURL(/\/home-loans\/calculator/);

  await expect(page.getByText("$3,851.23")).toBeVisible();
  await page.getByLabel("Loan amount").fill("450000");
  await expect(page.getByText("$2,666.24")).toBeVisible();

  await page.goto("/logon");
  await page.locator("form").getByRole("button", { name: "Log on" }).click();
  await expect(page).toHaveURL(/\/netbank$/);

  const smartAccessTile = page.getByRole("link", { name: /Everyday Account Smart Access/ });
  await expect(smartAccessTile.getByText("$4,218.63").first()).toBeVisible();

  await page.getByRole("link", { name: "Transfers & BPAY" }).click();
  await page.getByLabel("Amount").fill("500");
  await page.getByLabel("Description (optional)").fill("Savings top-up");
  await page.getByRole("button", { name: "Transfer money" }).click();

  await expect(page.getByText("$500.00 transferred")).toBeVisible();

  // The "Your balances" panel reflects both sides of the transfer immediately.
  const balances = page.getByRole("list").filter({ hasText: "Everyday Account Smart Access" });
  await expect(balances.getByText("$3,718.63")).toBeVisible();
  await expect(balances.getByText("$18,950.20")).toBeVisible();
});
