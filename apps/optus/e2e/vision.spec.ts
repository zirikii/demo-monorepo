import { test, expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const shotsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "shots");

test.describe("Optus NOC vision shots", () => {
  test("home console", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByAltText("Optus")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /Network event → SNMP → filter → RabbitMQ → remediation/i,
      }),
    ).toBeVisible();
    await page.screenshot({ path: path.join(shotsDir, "01-console.png"), fullPage: true });
  });

  test("agentic pipeline handoff", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Run selected scenario/i }).click();
    await expect(page.getByText(/Deterministic automation limit reached/i)).toBeVisible({
      timeout: 8_000,
    });
    await page.screenshot({ path: path.join(shotsDir, "02-agent-handoff.png"), fullPage: true });

    await page.getByRole("button", { name: /Simulate local agent reasoning/i }).click();
    await expect(page.getByText(/Local simulation/i)).toBeVisible();
    await page.screenshot({ path: path.join(shotsDir, "03-agent-stream.png"), fullPage: true });
  });
});
