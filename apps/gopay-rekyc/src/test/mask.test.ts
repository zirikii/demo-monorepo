import { DEMO_IDENTITY, UPDATED_IDENTITY } from "../domain/seed";
import { maskIdentity } from "../lib/mask";

describe("maskIdentity", () => {
  it("matches the Figma review-screen strings", () => {
    expect(maskIdentity(DEMO_IDENTITY)).toEqual({
      fullName: "B*** P***",
      nik: "3276********0002",
      dateOfBirth: "29 Ju*** 1993",
      occupation: "Private Em***ee",
      address: "Jl. Margasatawa *** No. 41",
      maritalStatus: "Not m***ed",
      rtRw: "007/***",
      kelurahan: "Jat***dang",
      kecamatan: "Pasar ***gu",
      religion: "Isl***",
      gender: "Lak***-laki",
    });
  });

  it("masks an updated address and marital status with the same rules", () => {
    const masked = maskIdentity(UPDATED_IDENTITY);
    expect(masked.address).toBe("Jl. Margasatawa *** No. 88");
    expect(masked.maritalStatus).toBe("M***ed");
    expect(masked.nik).toBe("3276********0002");
  });
});
