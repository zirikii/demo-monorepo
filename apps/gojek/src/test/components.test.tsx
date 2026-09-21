import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProductCard } from "@/components/marketing/ProductCard";
import type { Product } from "@/data/products";

const sampleProduct: Product = {
  name: "GoRide",
  vertical: "transport",
  icon: "bike",
  tagline: "Your two-wheeler taxi, the indigenous Ojek.",
  description: "Beat the traffic with a motorbike ride.",
  countries: ["Indonesia"],
};

function renderHeader(initialPath = "/products") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <SiteHeader />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("SiteHeader", () => {
  it("renders the primary navigation", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Careers" })).toBeInTheDocument();
  });

  it("marks the active route with aria-current", () => {
    renderHeader("/careers");
    const active = screen.getByRole("link", { name: "Careers" });
    expect(active).toHaveAttribute("aria-current", "page");
  });

  it("shows a sign-in link when logged out", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
  });
});

describe("ProductCard", () => {
  it("renders the product name, tagline and countries", () => {
    render(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "GoRide" })).toBeInTheDocument();
    expect(
      screen.getByText("Your two-wheeler taxi, the indigenous Ojek."),
    ).toBeInTheDocument();
    expect(screen.getByText("Indonesia")).toBeInTheDocument();
  });
});
