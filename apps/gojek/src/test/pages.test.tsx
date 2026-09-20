import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AboutUsPage from "@/pages/AboutUs";
import BlogPage from "@/pages/Blog";
import BlogPostPage from "@/pages/BlogPost";
import HomePage from "@/pages/Home";
import JobDetailPage from "@/pages/JobDetail";
import JoinUsPage from "@/pages/JoinUs";
import LifeAtGojekPage from "@/pages/LifeAtGojek";
import NotFoundPage from "@/pages/NotFound";
import OpenSourcePage from "@/pages/OpenSource";
import ProductsPage from "@/pages/Products";
import { JOBS_PER_PAGE } from "@/lib/jobs";

function renderPage(ui: ReactElement, route = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>,
  );
}

describe("HomePage", () => {
  it("renders the hero, the product families, and the open-source band", () => {
    renderPage(<HomePage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("3 countries.");
    expect(screen.getByRole("heading", { name: "Transport & Logistics" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Payments" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /GoFood/ }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Browse the repositories" })).toHaveAttribute(
      "href",
      "/open-source",
    );
  });

  it("marks the active primary nav item", () => {
    renderPage(<HomePage />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Products" })).not.toHaveAttribute("aria-current");
  });
});

describe("ProductsPage", () => {
  it("filters the portfolio down to one family", async () => {
    const user = userEvent.setup();
    renderPage(<ProductsPage />);

    expect(screen.getByText("Showing 23 products")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: /Payments/ }));
    expect(screen.getByText("Showing 4 products")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GoPay" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "GoFood" })).not.toBeInTheDocument();
  });
});

describe("JoinUsPage", () => {
  it("paginates the role list", () => {
    renderPage(<JoinUsPage />);
    expect(screen.getByRole("status")).toHaveTextContent("25 roles open");
    expect(screen.getAllByRole("link", { name: /^View / })).toHaveLength(JOBS_PER_PAGE);
  });

  it("narrows roles by search term", async () => {
    const user = userEvent.setup();
    renderPage(<JoinUsPage />);

    await user.type(screen.getByLabelText("Search roles"), "ledger");
    expect(screen.getByRole("status")).toHaveTextContent("1 role open");
    expect(
      screen.getByRole("heading", { name: "Staff Engineer, Payments Ledger" }),
    ).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    renderPage(<JoinUsPage />);

    await user.type(screen.getByLabelText("Search roles"), "underwater basket weaving");
    expect(screen.getByText("No roles match those filters")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByRole("status")).toHaveTextContent("25 roles open");
  });
});

describe("JobDetailPage", () => {
  it("accepts an application and confirms it", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/join-us/site-reliability-engineer"]}>
          <Routes>
            <Route path="/join-us/:slug" element={<JobDetailPage />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    await user.type(screen.getByLabelText("Full name"), "Sasha Widjaja");
    await user.type(screen.getByLabelText("Email"), "sasha@example.com");
    await user.type(
      screen.getByLabelText("Why this team?"),
      "I have run production Kubernetes through several peaks and enjoy game days.",
    );
    await user.click(screen.getByRole("button", { name: "Submit application" }));

    expect(await screen.findByText("Application received")).toBeInTheDocument();
  });

  it("toggles the saved state of a role", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/join-us/site-reliability-engineer"]}>
          <Routes>
            <Route path="/join-us/:slug" element={<JobDetailPage />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    const save = screen.getByRole("button", { name: "Save role" });
    expect(save).toHaveAttribute("aria-pressed", "false");

    await user.click(save);
    expect(screen.getByRole("button", { name: "Saved" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("BlogPage", () => {
  it("filters stories by search term and clears back", async () => {
    const user = userEvent.setup();
    renderPage(<BlogPage />);

    expect(screen.getByText("12 stories found")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search stories"), "ledger");
    expect(screen.getByText("1 story found")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("Search stories"));
    expect(screen.getByText("12 stories found")).toBeInTheDocument();
  });

  it("honours a category tab", async () => {
    const user = userEvent.setup();
    renderPage(<BlogPage />);

    await user.click(screen.getByRole("tab", { name: /Design/ }));
    expect(screen.getByText("2 stories found")).toBeInTheDocument();
  });
});

describe("BlogPostPage", () => {
  it("renders the article body and its tags", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/blog/allocating-two-million-riders"]}>
          <Routes>
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Allocating two million riders",
    );
    expect(screen.getAllByText("Ratna Dewi").length).toBeGreaterThan(0);
    expect(screen.getByText("#allocation")).toBeInTheDocument();
  });
});

describe("static marketing pages", () => {
  it("renders the about page timeline", () => {
    renderPage(<AboutUsPage />);
    expect(
      screen.getByRole("heading", { name: /call centre with twenty riders/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How we got here" })).toBeInTheDocument();
  });

  it("renders the culture page", () => {
    renderPage(<LifeAtGojekPage />);
    expect(
      screen.getByRole("heading", { name: /failing is learning/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("renders the open source repositories", () => {
    renderPage(<OpenSourcePage />);
    expect(screen.getByRole("heading", { name: "optimus" })).toBeInTheDocument();
  });

  it("renders the 404 page", () => {
    renderPage(<NotFoundPage />);
    expect(screen.getByRole("heading", { name: /different route/i })).toBeInTheDocument();
  });
});
