import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArticleCard } from "@/components/article/ArticleCard";
import { MostPopular } from "@/components/sections/MostPopular";
import { AuthProvider } from "@/hooks/useAuth";
import { articles } from "@/data/articles";

function renderWithRouter(ui: React.ReactNode) {
  return render(
    <AuthProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthProvider>,
  );
}

describe("SiteHeader", () => {
  it("renders the official Nine wordmark and primary nav", () => {
    renderWithRouter(<SiteHeader />);
    const logo = screen.getByAltText(/nine\.com\.au/i);
    expect(logo).toHaveAttribute("src", "/brand/logo.svg");
    expect(screen.getByRole("navigation", { name: /Primary/i })).toBeInTheDocument();
  });

  it("opens a mega-menu when a pillar is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: /^News$/i }));
    expect(screen.getByRole("link", { name: /All News/i })).toBeInTheDocument();
  });
});

describe("ArticleCard", () => {
  it("links to the article detail route", () => {
    const article = articles[0];
    renderWithRouter(<ArticleCard article={article} />);
    const heading = screen.getByRole("heading", { name: article.title });
    const link = heading.querySelector("a");
    expect(link).toHaveAttribute("href", `/article/${article.slug}`);
  });
});

describe("MostPopular", () => {
  it("renders a ranked list of trending stories", () => {
    renderWithRouter(<MostPopular />);
    expect(screen.getByText(/Most read/i)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(5);
  });
});
