import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { PortfolioProvider } from "@/hooks/usePortfolio";
import HomePage from "@/pages/Home";
import { AudiencePage } from "@/pages/AudiencePage";
import FeaturesBenefitsPage from "@/pages/FeaturesBenefits";
import ProductsPage from "@/pages/Products";
import ProductDetailPage from "@/pages/ProductDetail";
import InsightsPage from "@/pages/Insights";
import ProductDocumentsPage from "@/pages/ProductDocuments";
import ShareholderOverviewPage from "@/pages/shareholder/Overview";
import SearchResultsPage from "@/pages/SearchResults";
import NotFoundPage from "@/pages/NotFound";
import { PRODUCT_DOCUMENTS } from "@/data/documents";

function renderPage(ui: ReactNode, route = "/") {
  return render(
    <AuthProvider>
      <PortfolioProvider>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </PortfolioProvider>
    </AuthProvider>,
  );
}

describe("Home", () => {
  it("leads with the HUB24 purpose statement", () => {
    renderPage(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /empowering better financial futures/i }),
    ).toBeInTheDocument();
  });

  it("shows the headline funds under administration figure", () => {
    renderPage(<HomePage />);
    expect(screen.getAllByText("$164.3b").length).toBeGreaterThan(0);
  });

  it("offers an entry point for each primary audience", () => {
    renderPage(<HomePage />);
    const nav = screen.getAllByRole("link", { name: /advisers/i });
    expect(nav.length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /investment managers/i }).length).toBeGreaterThan(0);
  });

  it("sets the document title", () => {
    renderPage(<HomePage />);
    expect(document.title).toContain("HUB24 (Demo)");
  });
});

describe("Audience pages", () => {
  it("renders the advisers page with its proof points and FAQs", () => {
    renderPage(<AudiencePage slug="advisers" />, "/hub24-for-advisers/");
    expect(
      screen.getByRole("heading", { level: 1, name: /do business your way/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("5,649")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /how does platform pricing work/i })).toBeInTheDocument();
  });

  it("renders the investors page", () => {
    renderPage(<AudiencePage slug="advised-clients" />, "/hub24-for-advised-clients/");
    expect(screen.getByRole("heading", { level: 1, name: "Welcome to HUB24" })).toBeInTheDocument();
  });
});

describe("Features & benefits", () => {
  it("renders every platform capability area", () => {
    renderPage(<FeaturesBenefitsPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Features & benefits" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /innovative managed portfolio functionality/i }),
    ).toBeInTheDocument();
  });

  it("switches between the investment menus", async () => {
    const user = userEvent.setup();
    renderPage(<FeaturesBenefitsPage />);

    expect(screen.getByRole("tab", { name: "Discover menu" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.click(screen.getByRole("tab", { name: "Choice menu" }));
    expect(screen.getByRole("tab", { name: "Choice menu" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/full suite of investment options/i)).toBeInTheDocument();
  });
});

describe("Products", () => {
  it("filters the catalogue by category", async () => {
    const user = userEvent.setup();
    renderPage(<ProductsPage />, "/products-solutions/");

    expect(screen.getByRole("link", { name: /HUB24 Invest/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ManagerHUB/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Portals" }));

    expect(screen.getByRole("link", { name: /ManagerHUB/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^Investor directed portfolio service/ })).toBeNull();
  });

  it("renders a product detail page from the route parameter", () => {
    renderPage(
      <Routes>
        <Route path="/product/:slug/" element={<ProductDetailPage />} />
      </Routes>,
      "/product/managed-portfolios/",
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Managed Portfolios" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/rebalance once, apply everywhere/i)).toBeInTheDocument();
  });

  it("redirects an unknown product slug back to the catalogue", () => {
    renderPage(
      <Routes>
        <Route path="/product/:slug/" element={<ProductDetailPage />} />
        <Route path="/products-solutions/" element={<ProductsPage />} />
      </Routes>,
      "/product/not-a-product/",
    );
    expect(
      screen.getByRole("heading", { level: 1, name: /everything hub24 offers/i }),
    ).toBeInTheDocument();
  });
});

describe("Insights", () => {
  it("filters by topic", async () => {
    const user = userEvent.setup();
    renderPage(<InsightsPage />, "/insights/");

    expect(screen.getByRole("link", { name: /managed portfolios are past the tipping point/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Regulation" }));

    expect(
      screen.queryByRole("link", { name: /managed portfolios are past the tipping point/i }),
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: /retirement income covenant/i }),
    ).toBeInTheDocument();
  });
});

describe("Product documents", () => {
  it("narrows the library as filters are applied", async () => {
    const user = userEvent.setup();
    renderPage(<ProductDocumentsPage />, "/product-documents/");

    expect(screen.getByText(`Showing ${PRODUCT_DOCUMENTS.length} of ${PRODUCT_DOCUMENTS.length} documents`)).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Document type"), "TMD");

    const shown = PRODUCT_DOCUMENTS.filter((document) => document.type === "TMD").length;
    expect(
      screen.getByText(`Showing ${shown} of ${PRODUCT_DOCUMENTS.length} documents`),
    ).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    renderPage(<ProductDocumentsPage />, "/product-documents/");

    await user.type(screen.getByLabelText("Search"), "zzzz");
    expect(screen.getByText("No documents match your filters")).toBeInTheDocument();
  });
});

describe("Shareholder Centre", () => {
  it("shows the share snapshot and the latest announcement", () => {
    renderPage(<ShareholderOverviewPage />, "/shareholder-centre/overview/");
    expect(
      screen.getByRole("heading", { level: 1, name: /hub24 limited shareholder centre/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("ASX:HUB").length).toBeGreaterThan(0);
    expect(screen.getByText("FY26 Results Announcement")).toBeInTheDocument();
  });
});

describe("Search", () => {
  it("finds a product by keyword", () => {
    renderPage(<SearchResultsPage />, "/search?q=managed%20portfolios");
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("managed portfolios");
    expect(screen.getAllByText("Product").length).toBeGreaterThan(0);
  });

  it("reports when nothing matches", () => {
    renderPage(<SearchResultsPage />, "/search?q=zzzzqqq");
    expect(screen.getByText("No results")).toBeInTheDocument();
  });
});

describe("Not found", () => {
  it("offers a route back into the site", () => {
    renderPage(<NotFoundPage />, "/nope");
    const main = screen.getByRole("main");
    expect(within(main).getByRole("heading", { level: 1 })).toHaveTextContent(
      /couldn't find that page/i,
    );
    expect(within(main).getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});
