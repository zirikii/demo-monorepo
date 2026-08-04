import { describe, expect, it } from "vitest";
import { matchesQuery, searchDocs, type SearchDoc } from "@/lib/search";
import { searchIndex } from "@/data/searchIndex";
import { branchLocations } from "@/data/branches";
import { faqs } from "@/data/faqs";

const docs: SearchDoc[] = [
  {
    title: "NetBank Saver",
    description: "An online savings account with an introductory rate.",
    to: "/banking/savings-accounts#netbank-saver",
    category: "Savings accounts",
    keywords: ["interest"],
  },
  {
    title: "Home loan repayments calculator",
    description: "Work out your repayments and total interest on a home loan.",
    to: "/home-loans/calculator",
    category: "Tools",
  },
];

describe("searchDocs", () => {
  it("returns nothing for an empty query", () => {
    expect(searchDocs(docs, "   ")).toEqual([]);
  });

  it("ranks a title match above a description-only match", () => {
    const results = searchDocs(docs, "netbank");
    expect(results[0]?.title).toBe("NetBank Saver");
  });

  it("matches on description text", () => {
    const results = searchDocs(docs, "repayments");
    expect(results.map((doc) => doc.title)).toContain("Home loan repayments calculator");
  });

  it("returns nothing when no document matches", () => {
    expect(searchDocs(docs, "cryptocurrency")).toEqual([]);
  });

  it("finds real products in the site index", () => {
    expect(searchDocs(searchIndex, "smart access").length).toBeGreaterThan(0);
    expect(searchDocs(searchIndex, "yello")[0]?.category).toBeDefined();
  });
});

describe("matchesQuery", () => {
  it("matches when every term appears somewhere in the haystack", () => {
    expect(matchesQuery(["Parramatta", "NSW", "2150"], "parramatta 2150")).toBe(true);
  });

  it("fails when one term is missing", () => {
    expect(matchesQuery(["Parramatta", "NSW", "2150"], "parramatta 3000")).toBe(false);
  });

  it("treats an empty query as a match", () => {
    expect(matchesQuery(["anything"], "")).toBe(true);
  });
});

describe("data-driven filtering", () => {
  it("filters branches by postcode", () => {
    const results = branchLocations.filter((location) =>
      matchesQuery([location.name, location.suburb, location.postcode], "2150"),
    );
    expect(results).toHaveLength(1);
    expect(results[0]?.suburb).toBe("Parramatta");
  });

  it("filters branches by state and kind together", () => {
    const results = branchLocations.filter(
      (location) => location.state === "VIC" && location.kind === "ATM",
    );
    expect(results.every((location) => location.kind === "ATM")).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it("filters FAQs by category", () => {
    const security = faqs.filter((faq) => faq.category === "Security");
    expect(security.length).toBeGreaterThan(2);
    expect(security.every((faq) => faq.category === "Security")).toBe(true);
  });

  it("finds an FAQ by a phrase in its answer", () => {
    const results = faqs.filter((faq) => matchesQuery([faq.question, faq.answer], "biller code"));
    expect(results.map((faq) => faq.id)).toContain("bpay");
  });
});
