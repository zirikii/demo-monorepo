import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { GET, POST } from "@/app/api/fleet/route";
import type { FleetDevice } from "@/lib/types";
const seed: FleetDevice[] = [
  {
    id: "mob-001",
    user: "Mia Wong",
    serviceNumber: "0400 111 222",
    device: "iPhone 15 Pro",
    plan: "Optus Business Plus 120GB",
    costCentre: "Retail Ops",
    usageGb: 88,
    includedGb: 120,
    monthlyCost: 89,
    status: "Active",
    roaming: false,
    location: "Sydney",
  },
];
let previousDataDir: string | undefined;
beforeEach(async () => {
  previousDataDir = process.env.OPTUS_DATA_DIR;
  const dir = await mkdtemp(path.join(tmpdir(), "optus-data-"));
  process.env.OPTUS_DATA_DIR = dir;
  await writeFile(path.join(dir, "fleet.json"), JSON.stringify(seed, null, 2), "utf8");
});
afterEach(() => {
  if (previousDataDir) process.env.OPTUS_DATA_DIR = previousDataDir;
  else delete process.env.OPTUS_DATA_DIR;
});
describe("fleet API route", () => {
  it("returns fleet rows", async () => {
    const response = await GET();
    await expect(response.json()).resolves.toHaveLength(1);
  });
  it("updates a fleet service status", async () => {
    const response = await POST(
      new Request("http://localhost/api/fleet", {
        method: "POST",
        body: JSON.stringify({ id: "mob-001", status: "Suspended" }),
      }),
    );
    expect(response.status).toBe(200);
    const file = await readFile(path.join(process.env.OPTUS_DATA_DIR ?? "", "fleet.json"), "utf8");
    expect(JSON.parse(file)[0].status).toBe("Suspended");
  });
});
