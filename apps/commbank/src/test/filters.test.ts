import { describe, expect, it } from "vitest";
import { branches, filterBranches } from "@/data/branches";
import { faqs, filterFaqs } from "@/data/faqs";
import { getProduct, getProductsByCategory, products } from "@/data/products";
import { searchSite } from "@/lib/search";

describe("filterBranches", () => {
  it("returns every location with no filters applied", () => {
    expect(filterBranches(branches, { query: "", state: "all", type: "all" })).toHaveLength(
      branches.length,
    );
  });

  it("filters by state", () => {
    const results = filterBranches(branches, { query: "", state: "VIC", type: "all" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((branch) => branch.state === "VIC")).toBe(true);
  });

  it("filters by location type", () => {
    const results = filterBranches(branches, { query: "", state: "all", type: "ATM" });
    expect(results.every((branch) => branch.type === "ATM")).toBe(true);
  });

  it("matches on suburb and postcode", () => {
    expect(
      filterBranches(branches, { query: "parramatta", state: "all", type: "all" }),
    ).toHaveLength(1);
    expect(filterBranches(branches, { query: "2150", state: "all", type: "all" })).toHaveLength(1);
  });

  it("combines a query with a state filter", () => {
    expect(
      filterBranches(branches, { query: "parramatta", state: "VIC", type: "all" }),
    ).toHaveLength(0);
  });
});

describe("filterFaqs", () => {
  it("filters by category", () => {
    const results = filterFaqs(faqs, "", "Security");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((faq) => faq.category === "Security")).toBe(true);
  });

  it("searches both questions and answers", () => {
    expect(filterFaqs(faqs, "CallerCheck", "all").length).toBeGreaterThan(0);
    expect(filterFaqs(faqs, "offset", "all").length).toBeGreaterThan(0);
  });

  it("returns nothing for an unmatched term", () => {
    expect(filterFaqs(faqs, "zzzzzz", "all")).toHaveLength(0);
  });
});

describe("product catalogue", () => {
  it("looks products up by slug", () => {
    expect(getProduct("digi-home-loan")?.name).toBe("Digi Home Loan");
    expect(getProduct("missing-product")).toBeUndefined();
  });

  it("groups products by category", () => {
    const homeLoans = getProductsByCategory("Home loans");
    expect(homeLoans.length).toBeGreaterThanOrEqual(5);
    expect(homeLoans.every((product) => product.category === "Home loans")).toBe(true);
  });

  it("gives every product a unique slug", () => {
    const slugs = products.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("searchSite", () => {
  it("returns nothing for an empty query", () => {
    expect(searchSite("   ")).toHaveLength(0);
  });

  it("finds products, FAQs and branches", () => {
    expect(searchSite("NetBank Saver").some((result) => result.kind === "Product")).toBe(true);
    expect(searchSite("scam").some((result) => result.kind === "Support")).toBe(true);
    expect(searchSite("Parramatta").some((result) => result.kind === "Locate us")).toBe(true);
  });
});
