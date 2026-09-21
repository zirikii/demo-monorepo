import { describe, expect, it } from "vitest";
import { ON_FILE, UPDATED_KTP } from "@/data/identity";
import { maskName, maskNik, maskedIdentity } from "@/lib/mask";

describe("masking", () => {
  it("keeps the first and last four NIK digits", () => {
    expect(maskNik("3276012906930002")).toBe("3276********0002");
  });

  it("masks each name part", () => {
    expect(maskName("Budi Pratama")).toBe("B*** P***");
  });

  it("uses the Figma strings for the on-file e-KTP", () => {
    expect(maskedIdentity(ON_FILE).occupation).toBe("Private Em***ee");
    expect(maskedIdentity(ON_FILE).kelurahan).toBe("Jat***dang");
  });

  it("masks an updated address instead of reusing the old card", () => {
    expect(maskedIdentity(UPDATED_KTP).address).not.toBe(maskedIdentity(ON_FILE).address);
    expect(maskedIdentity(UPDATED_KTP).nik).toBe("3276********0002");
  });
});
