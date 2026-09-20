import { beforeEach, describe, expect, it } from "vitest";
import { SEEDED_APPLICATIONS, SEEDED_SAVED_ROLES } from "@/data/hub";
import {
  hasApplied,
  isRoleSaved,
  readApplications,
  readSavedRoles,
  stageProgress,
  submitApplication,
  toggleSavedRole,
  withdrawApplication,
} from "@/lib/applications";

beforeEach(() => {
  window.localStorage.clear();
});

describe("readApplications", () => {
  it("falls back to the seeded pipeline before anything is stored", () => {
    expect(readApplications()).toEqual(SEEDED_APPLICATIONS);
  });
});

describe("submitApplication", () => {
  it("prepends a new application with a fresh id", () => {
    const created = submitApplication("site-reliability-engineer", "I like pagers, apparently.");
    expect(created.stage).toBe("Applied");
    expect(created.id).not.toBe(SEEDED_APPLICATIONS[0]?.id);

    const stored = readApplications();
    expect(stored[0]?.jobSlug).toBe("site-reliability-engineer");
    expect(stored).toHaveLength(SEEDED_APPLICATIONS.length + 1);
  });

  it("is idempotent for a role already applied to", () => {
    const first = submitApplication("site-reliability-engineer", "First note");
    const second = submitApplication("site-reliability-engineer", "Second note");
    expect(second.id).toBe(first.id);
    expect(readApplications()).toHaveLength(SEEDED_APPLICATIONS.length + 1);
  });

  it("reports an existing application through hasApplied", () => {
    expect(hasApplied("site-reliability-engineer")).toBe(false);
    submitApplication("site-reliability-engineer", "A cover note long enough to pass.");
    expect(hasApplied("site-reliability-engineer")).toBe(true);
  });
});

describe("withdrawApplication", () => {
  it("removes only the requested application", () => {
    const target = SEEDED_APPLICATIONS[0];
    expect(target).toBeDefined();
    const remaining = withdrawApplication(target!.id);
    expect(remaining).toHaveLength(SEEDED_APPLICATIONS.length - 1);
    expect(remaining.some((entry) => entry.id === target!.id)).toBe(false);
  });
});

describe("stageProgress", () => {
  it("scales from the first stage to a complete offer", () => {
    expect(stageProgress("Applied")).toBe(20);
    expect(stageProgress("Technical interview")).toBe(60);
    expect(stageProgress("Offer")).toBe(100);
  });
});

describe("saved roles", () => {
  it("starts from the seeded bookmarks", () => {
    expect(readSavedRoles()).toEqual(SEEDED_SAVED_ROLES);
  });

  it("toggles a role on and back off", () => {
    expect(isRoleSaved("site-reliability-engineer")).toBe(false);

    const added = toggleSavedRole("site-reliability-engineer");
    expect(added).toContain("site-reliability-engineer");
    expect(isRoleSaved("site-reliability-engineer")).toBe(true);

    const removed = toggleSavedRole("site-reliability-engineer");
    expect(removed).not.toContain("site-reliability-engineer");
  });
});
