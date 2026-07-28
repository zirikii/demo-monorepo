import { describe, expect, it } from "vitest";
import { filterKeywordSuggestions } from "../suggest";

const LIST = [
  "Registered Nurse",
  "Enrolled Nurse",
  "Software Engineer",
  "Senior Software Engineer",
  "Nurse Unit Manager",
];

describe("filterKeywordSuggestions", () => {
  it("returns nothing for an empty or whitespace query", () => {
    expect(filterKeywordSuggestions("", LIST)).toEqual([]);
    expect(filterKeywordSuggestions("   ", LIST)).toEqual([]);
  });

  it("matches case-insensitively on substrings", () => {
    const result = filterKeywordSuggestions("nurse", LIST);
    expect(result).toContain("Registered Nurse");
    expect(result).toContain("Enrolled Nurse");
    expect(result).toContain("Nurse Unit Manager");
    expect(result).not.toContain("Software Engineer");
  });

  it("ranks prefix matches before mid-string matches", () => {
    const result = filterKeywordSuggestions("nurse", LIST);
    // "Nurse Unit Manager" starts with the query, so it should come first.
    expect(result[0]).toBe("Nurse Unit Manager");
  });

  it("excludes an exact match (already typed in full)", () => {
    const result = filterKeywordSuggestions("Registered Nurse", LIST);
    expect(result).not.toContain("Registered Nurse");
  });

  it("respects the limit", () => {
    const result = filterKeywordSuggestions("e", LIST, 2);
    expect(result).toHaveLength(2);
  });
});
