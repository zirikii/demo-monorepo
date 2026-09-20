import { describe, expect, it } from "vitest";
import {
  formatCompact,
  formatDate,
  formatDateLong,
  formatJakartaTime,
  formatNumber,
  formatReadingTime,
  initials,
  pluralise,
  slugify,
} from "@/lib/format";

describe("formatDate", () => {
  it("formats an ISO date in the demo's regional style", () => {
    expect(formatDate("2026-03-12")).toBe("12 Mar 2026");
  });

  it("echoes invalid input rather than rendering 'Invalid Date'", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });
});

describe("formatDateLong", () => {
  it("spells the month out", () => {
    expect(formatDateLong("2026-08-18")).toBe("18 August 2026");
  });
});

describe("formatJakartaTime", () => {
  it("renders interview slots in Jakarta time with the WIB suffix", () => {
    expect(formatJakartaTime("2026-09-24T10:00:00+07:00")).toBe("24 Sept 2026, 10:00 am WIB");
  });

  it("converts a UTC instant into Jakarta time", () => {
    expect(formatJakartaTime("2026-09-24T03:00:00Z")).toBe("24 Sept 2026, 10:00 am WIB");
  });
});

describe("number formatters", () => {
  it("compacts large values", () => {
    expect(formatCompact(4820)).toBe("4.8K");
  });

  it("groups plain numbers", () => {
    expect(formatNumber(2100)).toBe("2,100");
  });

  it("labels reading time", () => {
    expect(formatReadingTime(11)).toBe("11 min read");
  });
});

describe("pluralise", () => {
  it("keeps the singular for one", () => {
    expect(pluralise(1, "role")).toBe("1 role");
  });

  it("uses the default plural", () => {
    expect(pluralise(4, "role")).toBe("4 roles");
  });

  it("accepts an irregular plural", () => {
    expect(pluralise(3, "story", "stories")).toBe("3 stories");
  });
});

describe("slugify", () => {
  it("normalises a title into a url-safe slug", () => {
    expect(slugify("Allocating two million riders!")).toBe("allocating-two-million-riders");
  });
});

describe("initials", () => {
  it("takes at most two initials", () => {
    expect(initials("Sasha Widjaja Putri")).toBe("SW");
  });
});
