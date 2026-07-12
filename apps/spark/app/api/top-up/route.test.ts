/** @vitest-environment node */
import { beforeEach, describe, expect, it, vi } from "vitest";

const readJson = vi.fn();
const writeJson = vi.fn();

vi.mock("@/lib/data/json-store", () => ({
  readJson: (...args: unknown[]) => readJson(...args),
  writeJson: (...args: unknown[]) => writeJson(...args),
}));

describe("POST /api/top-up", () => {
  beforeEach(() => {
    readJson.mockReset();
    writeJson.mockReset();
  });

  it("appends a top-up entry", async () => {
    readJson.mockResolvedValue([]);
    writeJson.mockResolvedValue(undefined);

    const { POST } = await import("@/app/api/top-up/route");
    const res = await POST(
      new Request("http://localhost/api/top-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 20, method: "Visa", note: "test" }),
      }),
    );

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.amount).toBe(20);
    expect(writeJson).toHaveBeenCalled();
  });

  it("rejects invalid payloads", async () => {
    const { POST } = await import("@/app/api/top-up/route");
    const res = await POST(
      new Request("http://localhost/api/top-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: -1 }),
      }),
    );
    expect(res.status).toBe(400);
  });
});
