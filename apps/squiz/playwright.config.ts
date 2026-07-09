import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for the recorded walkthrough video.
 * Video is recorded for every context at 1280x800.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 300_000,
  expect: { timeout: 6_000 },
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:5175",
    trace: "off",
    actionTimeout: 8_000,
    navigationTimeout: 15_000,
    video: {
      mode: "on",
      size: { width: 1280, height: 800 },
    },
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
  ],
});
