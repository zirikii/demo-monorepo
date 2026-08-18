import { describe, expect, it } from "vitest";
import {
  billions,
  compactCurrency,
  currency,
  currencyCents,
  initials,
  longDate,
  number,
  percent,
  readingTime,
  shortDate,
  signedCurrency,
  signedPercent,
  slugify,
} from "@/lib/format";

describe("currency formatting", () => {
  it("formats whole dollars in AUD", () => {
    expect(currency(1284500)).toBe("$1,284,500");
  });

  it("formats cents for unit prices", () => {
    expect(currencyCents(128.4)).toBe("$128.40");
  });

  it("abbreviates billions for platform figures", () => {
    expect(billions(152_400_000_000)).toBe("$152.4b");
  });

  it("scales compact currency by magnitude", () => {
    expect(compactCurrency(8_024_000_000)).toBe("$8.0b");
    expect(compactCurrency(1_840_000)).toBe("$1.8m");
    expect(compactCurrency(64_200)).toBe("$64k");
    expect(compactCurrency(420)).toBe("$420");
  });

  it("signs currency movements", () => {
    expect(signedCurrency(25000)).toBe("+$25,000");
    expect(signedCurrency(-15000)).toBe("-$15,000");
    expect(signedCurrency(0)).toBe("$0");
  });
});

describe("number formatting", () => {
  it("groups thousands", () => {
    expect(number(4820)).toBe("4,820");
  });

  it("formats percentages to a fixed precision", () => {
    expect(percent(9.4157)).toBe("9.4%");
    expect(percent(0.42, 2)).toBe("0.42%");
  });

  it("signs performance percentages", () => {
    expect(signedPercent(11.24)).toBe("+11.24%");
    expect(signedPercent(-2.5)).toBe("-2.50%");
  });
});

describe("date formatting", () => {
  it("formats long dates in en-AU", () => {
    expect(longDate("2026-07-14")).toBe("14 July 2026");
  });

  // Node and browsers disagree on how en-AU abbreviates months, so assert the stable parts.
  it("formats short dates in en-AU", () => {
    expect(shortDate("2026-07-14")).toMatch(/^14 Jul\w* 2026$/);
  });
});

describe("text helpers", () => {
  it("derives initials from a name", () => {
    expect(initials("Alicia Nguyen")).toBe("AN");
    expect(initials("Hargreave Superannuation Fund")).toBe("HS");
  });

  it("slugifies titles", () => {
    expect(slugify("HUB24 Private Invest")).toBe("hub24-private-invest");
  });

  it("estimates reading time at 200 words per minute", () => {
    expect(readingTime(620)).toBe("3 min read");
    expect(readingTime(40)).toBe("1 min read");
  });
});
