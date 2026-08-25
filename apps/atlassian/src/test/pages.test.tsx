import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import HomePage from "@/pages/Home";
import PricingPage from "@/pages/Pricing";
import ProductsPage from "@/pages/Products";
import ResourcesPage from "@/pages/Resources";

function renderAt(ui: ReactNode, route = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>,
  );
}

describe("Pricing page", () => {
  it("renders all four plan names", () => {
    renderAt(<PricingPage />, "/software/jira/pricing");

    for (const name of ["Free", "Standard", "Premium", "Enterprise"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
  });

  it("marks a single plan as recommended", () => {
    renderAt(<PricingPage />, "/software/jira/pricing");
    expect(screen.getAllByText("Recommended")).toHaveLength(1);
  });
});

describe("Products page", () => {
  it("lists Jira and Confluence under the catalogue heading", () => {
    renderAt(<ProductsPage />, "/software");

    expect(screen.getByRole("heading", { name: "Explore Atlassian products" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Jira" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { name: "Confluence" }).length).toBeGreaterThan(0);
  });
});

describe("Home page", () => {
  it("leads with the Atlassian positioning line", () => {
    renderAt(<HomePage />, "/");

    expect(
      screen.getByRole("heading", { name: /Unleash your teams and their agents/ }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Get started with Jira" }).length).toBeGreaterThan(0);
  });
});

describe("Resources page", () => {
  it("includes the State of Teams report", () => {
    renderAt(<ResourcesPage />, "/resources");
    expect(screen.getByRole("heading", { name: /State of Teams/ })).toBeInTheDocument();
  });
});
