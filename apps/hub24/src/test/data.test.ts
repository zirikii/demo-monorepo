import { describe, expect, it } from "vitest";
import { CLIENTS, filterClients } from "@/data/clients";
import { productBySlug } from "@/data/products";
import { newsBySlug } from "@/data/news";

describe("client book", () => {
  it("seeds at least 25 accounts", () => {
    expect(CLIENTS.length).toBeGreaterThanOrEqual(25);
  });

  it("filters by product and query", () => {
    const superOnly = filterClients(CLIENTS, "", "Super");
    expect(superOnly.every((client) => client.product === "Super")).toBe(true);

    const named = filterClients(CLIENTS, "HUB-010420", "all");
    expect(named).toHaveLength(1);
    expect(named[0]?.name).toBe("Amelia Nguyen");
  });
});

describe("catalog lookups", () => {
  it("finds HUB24 Super", () => {
    expect(productBySlug("hub24-super")?.name).toBe("HUB24 Super");
  });

  it("finds a news post", () => {
    expect(newsBySlug("andrew-formica-ned")?.category).toBe("ASX");
  });
});
