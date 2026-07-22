/** @vitest-environment node */
import { beforeEach, describe, expect, it, vi } from "vitest";

const readJson = vi.fn();
const writeJson = vi.fn();

vi.mock("@/lib/data/json-store", () => ({
  readJson: (...args: unknown[]) => readJson(...args),
  writeJson: (...args: unknown[]) => writeJson(...args),
}));

describe("POST /api/recharge", () => {
  beforeEach(() => {
    readJson.mockReset();
    writeJson.mockReset();
  });

  it("appends a recharge entry", async () => {
    readJson.mockResolvedValue([]);
    writeJson.mockResolvedValue(undefined);

    const { POST } = await import("@/app/api/recharge/route");
    const res = await POST(
      new Request("http://localhost/api/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 40, method: "Visa", service: "0412 908 771" }),
      }),
    );

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.amount).toBe(40);
    expect(writeJson).toHaveBeenCalled();
  });

  it("rejects invalid payloads", async () => {
    const { POST } = await import("@/app/api/recharge/route");
    const res = await POST(
      new Request("http://localhost/api/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: -1 }),
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns the recharge history on GET", async () => {
    readJson.mockResolvedValue([{ id: "rc-1", amount: 30 }]);
    const { GET } = await import("@/app/api/recharge/route");
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
  });
});
