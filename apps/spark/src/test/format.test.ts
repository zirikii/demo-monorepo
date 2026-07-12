import { describe, expect, it } from "vitest";
import { formatAllowance, formatPrice } from "@/lib/format";

describe("format helpers", () => {
  it("formats prices like Spark plan cards", () => {
    expect(formatPrice(129)).toBe("$129");
  });

  it("joins primary and secondary allowances", () => {
    expect(formatAllowance("Unlimited NZ only", "300 International*")).toBe(
      "Unlimited NZ only | 300 International*",
    );
    expect(formatAllowance("2GB")).toBe("2GB");
  });
});
