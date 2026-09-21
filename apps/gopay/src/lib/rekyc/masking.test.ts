import { describe, expect, it } from "vitest";
import { ON_FILE_KTP } from "@/data/account";
import { maskKtpData, maskMiddle, maskName, maskNik, maskWordAt } from "@/lib/rekyc/masking";

describe("maskMiddle", () => {
  it("keeps the requested head and tail", () => {
    expect(maskMiddle("Private Employee", 10, 2)).toBe("Private Em***ee");
  });

  it("leaves values shorter than the kept range alone", () => {
    expect(maskMiddle("Islam", 10, 2)).toBe("Islam");
  });
});

describe("maskNik", () => {
  it("masks every digit between the first and last four", () => {
    expect(maskNik("3276010101930002")).toBe("3276********0002");
  });
});

describe("maskName", () => {
  it("keeps only each word's initial", () => {
    expect(maskName("Budi Prasetyo")).toBe("B*** P***");
  });

  it("returns an empty string unchanged", () => {
    expect(maskName("")).toBe("");
  });
});

describe("maskWordAt", () => {
  it("masks one word and leaves its neighbours intact", () => {
    expect(maskWordAt("29 Juni 1993", 1, 2)).toBe("29 Ju*** 1993");
  });

  it("is a no-op when the index is out of range", () => {
    expect(maskWordAt("29 Juni 1993", 9, 2)).toBe("29 Juni 1993");
  });
});

describe("maskKtpData", () => {
  it("masks every field the e-KTP review screen renders", () => {
    const masked = maskKtpData(ON_FILE_KTP);

    expect(masked).toEqual({
      nik: "3276********0002",
      fullName: "B*** P***",
      dateOfBirth: "29 Ju*** 1993",
      address: "Jl. Margasatawa *** No. 41",
      rtRw: "007/***",
      kelurahan: "Jat***dang",
      kecamatan: "Pasar ***gu",
      occupation: "Private Em***ee",
      maritalStatus: "Not m***ed",
      religion: "Isl***",
      gender: "Lak***-laki",
    });
  });

  it("never leaks a raw value into the masked record", () => {
    const masked = maskKtpData(ON_FILE_KTP);
    expect(masked.nik).not.toBe(ON_FILE_KTP.nik);
    expect(masked.fullName).not.toBe(ON_FILE_KTP.fullName);
    expect(Object.values(masked).every((value) => value.includes("*"))).toBe(true);
  });
});
