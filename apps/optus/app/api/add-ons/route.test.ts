import { beforeEach, describe, expect, it, vi } from "vitest";

const readJson = vi.fn();
const writeJson = vi.fn();

vi.mock("@/lib/data/json-store", () => ({
  readJson: (...args: unknown[]) => readJson(...args),
  writeJson: (...args: unknown[]) => writeJson(...args),
}));

describe("POST /api/add-ons", () => {
  beforeEach(() => {
    readJson.mockReset();
    writeJson.mockReset();
  });

  it("records a purchase", async () => {
    readJson
      .mockResolvedValueOnce([
        {
          id: "boost-1gb",
          name: "Data Boost 1GB",
          description: "Extra GB",
          price: 10,
          enabled: false,
        },
      ])
      .mockResolvedValueOnce([]);
    writeJson.mockResolvedValue(undefined);

    const { POST } = await import("@/app/api/add-ons/route");
    const res = await POST(
      new Request("http://localhost/api/add-ons", {
        method: "POST",
        body: JSON.stringify({ id: "boost-1gb" }),
      }),
    );
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.name).toBe("Data Boost 1GB");
    expect(writeJson).toHaveBeenCalled();
  });
});
