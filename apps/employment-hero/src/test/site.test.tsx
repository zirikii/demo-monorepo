import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductMockup } from "@/components/marketing/ProductMockup";
import { PricingPage } from "@/pages/Pricing";
import { ResourcesPage } from "@/pages/Resources";
import { portalConfig } from "@/pages/Login";
import { employees, products } from "@/data/site";

describe("Employment Hero demo data", () => {
  it("includes broad product coverage and realistic employee data", () => {
    expect(products).toHaveLength(9);
    expect(employees).toHaveLength(25);
    expect(new Set(employees.map((employee) => employee.id)).size).toBe(25);
  });

  it("documents the intentionally mismatched login destination keys", () => {
    expect(Object.keys(portalConfig)).toContain("EmploymentHero");
    expect("employmenthero" in portalConfig).toBe(false);
  });
});

describe("product surfaces", () => {
  it("renders the Employment OS mockup", () => {
    render(<ProductMockup />);
    expect(screen.getByText("Your team at a glance")).toBeInTheDocument();
    expect(screen.getByText("84")).toBeInTheDocument();
  });

  it("changes pricing values when billing cadence changes", () => {
    render(
      <MemoryRouter>
        <PricingPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("$10", { exact: false })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Monthly billing" }));
    expect(screen.getByText("$12", { exact: false })).toBeInTheDocument();
  });

  it("filters resources by type", () => {
    render(
      <MemoryRouter initialEntries={["/resources"]}>
        <ResourcesPage />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Template" }));
    expect(screen.getByText("2 resources")).toBeInTheDocument();
    expect(screen.getByText("Workforce planning template")).toBeInTheDocument();
    expect(screen.queryByText("The AI advantage: HR’s playbook for 2026")).not.toBeInTheDocument();
  });
});
