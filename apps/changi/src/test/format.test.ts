import { describe, expect, it } from "vitest";
import { formatTime, listToProse, pluralize, slugify } from "@/lib/format";

describe("formatTime", () => {
  it("formats morning times with am", () => {
    expect(formatTime("07:05")).toBe("7:05 am");
  });

  it("formats afternoon times with pm", () => {
    expect(formatTime("14:30")).toBe("2:30 pm");
  });

  it("handles midnight and noon", () => {
    expect(formatTime("00:00")).toBe("12:00 am");
    expect(formatTime("12:00")).toBe("12:00 pm");
  });

  it("returns the input unchanged when malformed", () => {
    expect(formatTime("not-a-time")).toBe("not-a-time");
  });
});

describe("listToProse", () => {
  it("joins with commas and an ampersand", () => {
    expect(listToProse(["T1", "T2", "T3"])).toBe("T1, T2 & T3");
  });
  it("returns a single item as-is", () => {
    expect(listToProse(["T1"])).toBe("T1");
  });
  it("returns empty string for no items", () => {
    expect(listToProse([])).toBe("");
  });
});

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Jewel Rain Vortex")).toBe("jewel-rain-vortex");
  });
  it("strips apostrophes and punctuation", () => {
    expect(slugify("Charles & Keith")).toBe("charles-keith");
  });
});

describe("pluralize", () => {
  it("uses singular for one", () => {
    expect(pluralize(1, "outlet")).toBe("1 outlet");
  });
  it("uses plural for many", () => {
    expect(pluralize(3, "outlet")).toBe("3 outlets");
  });
});
