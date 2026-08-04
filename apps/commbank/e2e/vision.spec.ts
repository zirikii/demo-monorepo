import { test, expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const shots = path.resolve(dirname, "../shots");

async function dismissCookies(page: import("@playwright/test").Page) {
  const button = page.getByRole("button", { name: "Continue" });
  if (await button.isVisible().catch(() => false)) await button.click();
}

test.describe("vision walkthrough", () => {
  test("captures the key CommBank surfaces", async ({ page }) => {
    await page.goto("/");
    await dismissCookies(page);
    await expect(
      page.getByRole("heading", { level: 1, name: /Earn up to 300,000 Qantas Points/i }),
    ).toBeVisible();
    await page.screenshot({ path: path.join(shots, "01-home.png"), fullPage: true });

    await page.goto("/home-loans");
    await dismissCookies(page);
    await expect(
      page.getByRole("heading", { level: 2, name: /Why choose CommBank/i }),
    ).toBeVisible();
    await page.screenshot({ path: path.join(shots, "02-home-loans.png"), fullPage: true });

    await page.goto("/home-loans/calculator");
    await dismissCookies(page);
    await expect(page.getByText("Your estimated repayment")).toBeVisible();
    await page.screenshot({ path: path.join(shots, "03-calculator.png"), fullPage: true });

    await page.goto("/banking/credit-cards");
    await dismissCookies(page);
    await expect(page.getByRole("heading", { level: 1, name: /credit card/i })).toBeVisible();
    await page.screenshot({ path: path.join(shots, "04-credit-cards.png"), fullPage: true });

    await page.goto("/logon");
    await dismissCookies(page);
    await expect(page.getByRole("heading", { level: 1, name: "Log on" })).toBeVisible();
    await page.screenshot({ path: path.join(shots, "05-logon.png"), fullPage: true });

    await page.locator("form").getByRole("button", { name: "Log on" }).click();
    await expect(page).toHaveURL(/\/netbank$/);
    await expect(page.getByText("Net position")).toBeVisible();
    await page.screenshot({ path: path.join(shots, "06-netbank.png"), fullPage: true });

    await page.goto("/netbank/transfer");
    await expect(page.getByRole("heading", { level: 1, name: "Transfers & BPAY" })).toBeVisible();
    await page.screenshot({ path: path.join(shots, "07-transfer.png"), fullPage: true });
  });
});
