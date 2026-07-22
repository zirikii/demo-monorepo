import { afterEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "./route";

const cases = [
  {
    id: "case-1",
    subject: "Test",
    service: "Mobile",
    status: "Open",
    priority: "Medium",
    updatedAt: "2026-07-22",
  },
];
const writeJson = vi.fn();

vi.mock("@/lib/data/json-store", () => ({
  readJson: vi.fn(async () => cases),
  writeJson: (...args: unknown[]) => writeJson(...args),
}));

afterEach(() => {
  writeJson.mockClear();
  vi.useRealTimers();
});

describe("support-cases route", () => {
  it("returns support cases", async () => {
    const response = await GET();
    await expect(response.json()).resolves.toEqual({ cases });
  });

  it("creates a support case", async () => {
    vi.setSystemTime(new Date("2026-07-22T10:00:00Z"));
    const request = new Request("http://localhost/api/support-cases", {
      method: "POST",
      body: JSON.stringify({ subject: "Outage update", service: "nbn", priority: "High" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.case).toMatchObject({
      subject: "Outage update",
      service: "nbn",
      priority: "High",
      status: "Open",
    });
    expect(writeJson).toHaveBeenCalledWith(
      "support-cases.json",
      expect.arrayContaining([expect.objectContaining({ subject: "Outage update" })]),
    );
  });
});
