import { describe, expect, it } from "vitest";
import { filterProducts, products, productsByVertical } from "@/data/products";
import { verticals } from "@/data/categories";

describe("product catalogue", () => {
  it("has more than 20 products across six verticals", () => {
    expect(products.length).toBeGreaterThan(20);
    expect(verticals).toHaveLength(6);
  });

  it("assigns every product to a known vertical", () => {
    const ids = new Set(verticals.map((v) => v.id));
    for (const product of products) {
      expect(ids.has(product.vertical)).toBe(true);
    }
  });

  it("filters by vertical", () => {
    const transport = productsByVertical("transport");
    expect(transport.length).toBeGreaterThan(0);
    expect(transport.every((p) => p.vertical === "transport")).toBe(true);
  });

  it("filters by text query across name and description", () => {
    expect(filterProducts("gopay", "all").map((p) => p.name)).toContain("GoPay");
    expect(filterProducts("wallet", "all").map((p) => p.name)).toContain("GoPay");
  });

  it("combines query and vertical filters", () => {
    const result = filterProducts("go", "food");
    expect(result.every((p) => p.vertical === "food")).toBe(true);
  });

  it("returns nothing for an unmatched query", () => {
    expect(filterProducts("zzznotathing", "all")).toHaveLength(0);
  });
});
