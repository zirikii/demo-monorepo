/** @vitest-environment node */
import { beforeEach, describe, expect, it, vi } from "vitest";

const readJson = vi.fn();
const writeJson = vi.fn();

vi.mock("@/lib/data/json-store", () => ({
  readJson: (...args: unknown[]) => readJson(...args),
  writeJson: (...args: unknown[]) => writeJson(...args),
}));

describe("/api/top-up", () => {
  beforeEach(() => {
    readJson.mockReset();
    writeJson.mockReset();
  });

  it("GET returns the recharge history", async () => {
    readJson.mockResolvedValue([{ id: "tu-1", amount: 30 }]);
    const { GET } = await import("@/app/api/top-up/route");
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toHaveLength(1);
  });

  it("POST appends a recharge entry", async () => {
    readJson.mockResolvedValue([]);
    writeJson.mockResolvedValue(undefined);

    const { POST } = await import("@/app/api/top-up/route");
    const res = await POST(
      new Request("http://localhost/api/top-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 40, method: "Visa", note: "test" }),
      }),
    );

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.amount).toBe(40);
    expect(writeJson).toHaveBeenCalled();
  });

  it("POST rejects invalid payloads", async () => {
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
