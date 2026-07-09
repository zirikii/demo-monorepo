import { describe, expect, it } from "vitest";
import {
  isValidMobile,
  isValidAmount,
  isValidConsumerNumber,
  isValidVehicleNumber,
  isValidPnr,
  isValidEmail,
} from "../lib/validators";

describe("isValidMobile", () => {
  it("accepts 10 digits starting 6-9", () => {
    expect(isValidMobile("9876543210")).toBe(true);
    expect(isValidMobile("6000000000")).toBe(true);
  });

  it("rejects short numbers and bad prefixes", () => {
    expect(isValidMobile("1234567890")).toBe(false);
    expect(isValidMobile("98765")).toBe(false);
    expect(isValidMobile("")).toBe(false);
  });
});

describe("isValidAmount", () => {
  it("accepts whole rupees within 10..10000", () => {
    expect(isValidAmount("10")).toBe(true);
    expect(isValidAmount("239")).toBe(true);
    expect(isValidAmount("10000")).toBe(true);
  });

  it("rejects out-of-range and non-numeric values", () => {
    expect(isValidAmount("9")).toBe(false);
    expect(isValidAmount("10001")).toBe(false);
    expect(isValidAmount("12.5")).toBe(false);
    expect(isValidAmount("abc")).toBe(false);
  });
});

describe("isValidConsumerNumber", () => {
  it("accepts 6-16 alphanumerics", () => {
    expect(isValidConsumerNumber("ABC123")).toBe(true);
    expect(isValidConsumerNumber("1234567890123456")).toBe(true);
  });

  it("rejects too short/long or symbols", () => {
    expect(isValidConsumerNumber("12345")).toBe(false);
    expect(isValidConsumerNumber("12345678901234567")).toBe(false);
    expect(isValidConsumerNumber("ABC 123")).toBe(false);
  });
});

describe("isValidVehicleNumber", () => {
  it("accepts standard Indian registrations, case-insensitive with separators", () => {
    expect(isValidVehicleNumber("DL01AB1234")).toBe(true);
    expect(isValidVehicleNumber("ka05mn0007")).toBe(true);
    expect(isValidVehicleNumber("DL-01-AB-1234")).toBe(true);
  });

  it("rejects malformed registrations", () => {
    expect(isValidVehicleNumber("DL1AB1234")).toBe(false);
    expect(isValidVehicleNumber("12ABCD3456")).toBe(false);
  });
});

describe("isValidPnr", () => {
  it("accepts exactly 10 digits", () => {
    expect(isValidPnr("1234567890")).toBe(true);
    expect(isValidPnr("123456789")).toBe(false);
    expect(isValidPnr("12345678901")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("accepts simple addresses and rejects junk", () => {
    expect(isValidEmail("priya@example.com")).toBe(true);
    expect(isValidEmail("nope@x")).toBe(false);
  });
});
