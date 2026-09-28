import { describe, expect, it } from "vitest";
import { validateForm } from "@/features/assistant/engine/forms";

describe("validateForm", () => {
  it("accepts a meter read and records it as a fact", () => {
    expect(validateForm("meter-read", { reading: " 08421 " })).toEqual({
      ok: true,
      facts: { meterRead: "08421" },
      summary: "My gas meter reads 08421",
    });
  });

  it("rejects malformed reads with a field error", () => {
    const result = validateForm("meter-read", { reading: "12ab" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.reading).toMatch(/3–6 digits/);
  });

  it("requires a known concession card type", () => {
    const bad = validateForm("concession", { cardType: "Library card", cardNumber: "123456789A" });
    expect(bad.ok).toBe(false);
    const good = validateForm("concession", { cardType: "Health Care Card", cardNumber: "123 456 789A" });
    expect(good).toMatchObject({ ok: true, facts: { concessionType: "Health Care Card" } });
  });

  it("validates the move request", () => {
    const result = validateForm("move-request", { newAddress: "8 Wattle Avenue, Marrickville NSW 2204", moveDate: "Friday 2 October" });
    expect(result).toMatchObject({ ok: true, summary: "I'm moving to 8 Wattle Avenue, Marrickville NSW 2204 on Friday 2 October" });
    expect(validateForm("move-request", { newAddress: "short", moveDate: "" }).ok).toBe(false);
  });
});
