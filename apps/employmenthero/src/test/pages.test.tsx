import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { RequireAuth } from "@/components/platform/RequireAuth";
import { PRICING_PLANS } from "@/data/pricing";
import { AuthProvider } from "@/hooks/useAuth";
import { writeSession, type DemoUser } from "@/lib/auth";
import JobsPage from "@/pages/Jobs";
import PricingPage from "@/pages/Pricing";

const USER: DemoUser = {
  email: "demo@employmenthero.com",
  name: "Priya Raman",
  jobTitle: "People & Culture Lead",
  company: "Harbourline Hospitality Group",
  portal: "employer",
  plan: "Employment Unlimited",
  landing: "/platform",
};

function renderAt(ui: React.ReactNode, route = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>,
  );
}

describe("Pricing page", () => {
  it("renders all four plans with their headline prices", () => {
    renderAt(<PricingPage />, "/pricing");

    for (const plan of PRICING_PLANS) {
      const heading = screen.getByRole("heading", { level: 2, name: plan.name });
      const card = heading.closest("div.rounded-eh-lg");
      expect(card).not.toBeNull();
      expect(within(card!).getByText(plan.price)).toBeInTheDocument();
      expect(within(card!).getByText(plan.priceNote)).toBeInTheDocument();
    }
  });

  it("marks a single plan as most popular", () => {
    renderAt(<PricingPage />, "/pricing");
    expect(screen.getAllByText("Most popular")).toHaveLength(1);
  });

  it("lists add-ons with their monthly minimums", () => {
    renderAt(<PricingPage />, "/pricing");
    expect(screen.getByText("Managed Payroll")).toBeInTheDocument();
    expect(screen.getByText("$400 / month minimum")).toBeInTheDocument();
  });
});

describe("Jobs page", () => {
  it("filters the board by keyword", async () => {
    const user = userEvent.setup();
    renderAt(<JobsPage />, "/jobs");

    expect(screen.getByRole("heading", { level: 2, name: "Venue Supervisor" })).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search jobs"), "payroll");

    expect(screen.getByRole("heading", { level: 2, name: "Payroll Officer" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "Venue Supervisor" })).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    renderAt(<JobsPage />, "/jobs");

    await user.type(screen.getByLabelText("Search jobs"), "astrophysicist");
    expect(screen.getByText("No roles match that search")).toBeInTheDocument();
  });

  it("filters by category", async () => {
    const user = userEvent.setup();
    renderAt(<JobsPage />, "/jobs");

    await user.selectOptions(screen.getByLabelText("Filter by category"), "Healthcare");
    const listings = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("/jobs/"));
    expect(listings).toHaveLength(2);
    expect(screen.getByRole("heading", { level: 2, name: /registered nurse/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Dental Assistant" })).toBeInTheDocument();
  });
});

describe("RequireAuth", () => {
  function renderGuard(route: string) {
    return render(
      <AuthProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route
              path="/platform/payroll"
              element={
                <RequireAuth>
                  <p>Payroll dashboard</p>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<p>Log in page</p>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );
  }

  it("redirects an anonymous visitor to the log in page", () => {
    renderGuard("/platform/payroll");
    expect(screen.getByText("Log in page")).toBeInTheDocument();
    expect(screen.queryByText("Payroll dashboard")).not.toBeInTheDocument();
  });

  it("lets a signed-in user through", () => {
    writeSession(USER);
    renderGuard("/platform/payroll");
    expect(screen.getByText("Payroll dashboard")).toBeInTheDocument();
  });
});

describe("page composition", () => {
  it("renders a footer on every marketing page", () => {
    const { container } = renderAt(<PricingPage />, "/pricing");
    const footer = container.querySelector("footer");
    expect(footer).not.toBeNull();
    expect(within(footer!).getByText(/pick your region/i)).toBeInTheDocument();
  });
});
