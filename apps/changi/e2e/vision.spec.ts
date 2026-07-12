import { test, expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shots = path.resolve(__dirname, "../shots");

test.describe("vision walkthrough", () => {
  test("home, flights, dine, login screenshots", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Continue/i }).click().catch(() => undefined);
    await expect(page.getByAltText(/Changi Airport Singapore/i)).toBeVisible();
    await expect(page.getByText("I AM")).toBeVisible();
    await page.screenshot({ path: path.join(shots, "01-home.png"), fullPage: true });

    await page.goto("/fly/flights");
    await expect(page.getByRole("heading", { name: /Flight Information/i })).toBeVisible();
    await page.screenshot({ path: path.join(shots, "02-flights.png"), fullPage: true });

    await page.goto("/dine-and-shop");
    await expect(page.getByRole("heading", { name: /Dine & Shop/i })).toBeVisible();
    await page.screenshot({ path: path.join(shots, "03-dine-shop.png"), fullPage: true });

    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /Sign in to Changi Account/i })).toBeVisible();
    await page.screenshot({ path: path.join(shots, "04-login.png"), fullPage: true });
  });
});
