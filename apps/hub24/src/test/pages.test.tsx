import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import HomePage from "@/pages/Home";
import FeaturesBenefitsPage from "@/pages/FeaturesBenefits";
import InsightsPage from "@/pages/Insights";
import ProductDetailPage from "@/pages/ProductDetail";
import ProductDocumentsPage from "@/pages/ProductDocuments";
import NotFoundPage from "@/pages/NotFound";

function renderAt(ui: ReactElement, path: string, route = path) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={route} element={ui} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("home page", () => {
  it("leads with the HUB24 positioning line", () => {
    renderAt(<HomePage />, "/");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Empowering better financial futures together/i,
      }),
    ).toBeInTheDocument();
  });

  it("offers the three audience entry points", () => {
    renderAt(<HomePage />, "/");
    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("link", { name: /Advisers, private wealth and licensees/i }),
    ).toHaveAttribute("href", "/solutions/advisers");
    expect(main.getByRole("link", { name: /Investment managers/i })).toHaveAttribute(
      "href",
      "/solutions/investment-managers",
    );
    expect(main.getByRole("link", { name: /Advised clients/i })).toHaveAttribute(
      "href",
      "/solutions/advised-clients",
    );
  });

  it("carries the unofficial demo disclaimer", () => {
    renderAt(<HomePage />, "/");
    expect(screen.getAllByText(/unofficial demonstration build/i).length).toBeGreaterThan(0);
  });
});

describe("features and benefits page", () => {
  it("lists ten productivity features and the menu comparison", () => {
    renderAt(<FeaturesBenefitsPage />, "/features-benefits");
    expect(
      screen.getByRole("heading", { name: /10 ways to drive productivity/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Three menus, one account/i })).toBeInTheDocument();
  });
});

describe("product detail page", () => {
  it("renders the product matched by the route parameter", () => {
    renderAt(<ProductDetailPage />, "/product/managed-portfolios", "/product/:slug");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Managed portfolio technology, six years running/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/beneficial ownership/i).length).toBeGreaterThan(0);
  });
});

describe("insights page", () => {
  it("filters articles by category", async () => {
    const user = userEvent.setup();
    renderAt(<InsightsPage />, "/insights");

    expect(
      screen.getByRole("heading", { name: /Advice productivity research/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Media release" }));

    expect(
      screen.queryByRole("heading", { name: /Advice productivity research/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /record \$22.1 billion net inflows/i }),
    ).toBeInTheDocument();
  });
});

describe("product documents page", () => {
  it("narrows the library as you search", async () => {
    const user = userEvent.setup();
    renderAt(<ProductDocumentsPage />, "/product-documents");

    const table = screen.getByRole("table", { name: /HUB24 product documents/i });
    expect(
      within(table).getByText("HUB24 Invest Product Disclosure Statement"),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search"), "rollover");

    expect(within(table).getByText("Rollover request form")).toBeInTheDocument();
    expect(
      within(table).queryByText("HUB24 Invest Product Disclosure Statement"),
    ).not.toBeInTheDocument();
  });
});

describe("not found page", () => {
  it("offers a way back", () => {
    renderAt(<NotFoundPage />, "/nope", "*");
    expect(
      screen.getByRole("heading", { level: 1, name: /couldn’t find that page/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});
