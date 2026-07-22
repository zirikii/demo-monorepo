import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FleetTable, statusTone } from "@/components/fleet/fleet-table";
import type { FleetDevice } from "@/lib/types";
const devices: FleetDevice[] = [
  {
    id: "mob-001",
    user: "Mia Wong",
    serviceNumber: "0400 111 222",
    device: "iPhone 15 Pro",
    plan: "Optus Business Plus 120GB",
    costCentre: "Retail Ops",
    usageGb: 88,
    includedGb: 120,
    monthlyCost: 89,
    status: "Active",
    roaming: true,
    location: "Sydney",
  },
];
describe("FleetTable", () => {
  it("renders rows, roaming badges, and actions", () => {
    render(<FleetTable devices={devices} />);
    expect(screen.getByText("Mia Wong")).toBeInTheDocument();
    expect(screen.getByText("Roaming")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Suspend" })).toBeEnabled();
  });
  it("maps statuses to badge tones", () => {
    expect(statusTone("Active")).toBe("success");
    expect(statusTone("Pending")).toBe("warning");
    expect(statusTone("Suspended")).toBe("neutral");
  });
});
