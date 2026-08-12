import type { ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JobCard } from "@/components/marketing/JobCard";
import { PlatformTabs } from "@/components/marketing/PlatformTabs";
import { Accordion } from "@/components/ui/Accordion";
import { PricingPage } from "@/pages/Pricing";
import { AuthProvider } from "@/hooks/useAuth";
import { getJob } from "@/data/jobs";
import { homeFaqs } from "@/data/site";

function renderWithRouter(ui: ReactNode, route = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>,
  );
}

describe("SiteHeader", () => {
  it("renders the brand mark and the audience navigation", () => {
    renderWithRouter(<SiteHeader />);

    expect(screen.getByAltText("Employment Hero")).toHaveAttribute("src", "/brand/symbol.svg");
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const label of ["Businesses", "Partners", "Employees", "Job seekers"]) {
      expect(within(nav).getByRole("button", { name: new RegExp(label) })).toBeInTheDocument();
    }
  });

  it("opens a mega menu and reports its expanded state", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    const trigger = within(nav).getByRole("button", { name: /Businesses/ });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /HeroForce/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Hiring & Employment/ })).toBeInTheDocument();
  });

  it("shows employer, employee and payroll under the log in menu", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /Log in/ }));

    expect(screen.getByRole("link", { name: /Employer/ })).toHaveAttribute(
      "href",
      "/login?portal=employer",
    );
    expect(screen.getByRole("link", { name: /Payroll/ })).toHaveAttribute(
      "href",
      "/login?portal=payroll",
    );
  });

  it("navigates to the search results page on submit", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: "Open search" }));
    await user.type(screen.getByLabelText("Search the site"), "payroll");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.queryByLabelText("Search the site")).toBeNull();
  });
});

describe("JobCard", () => {
  it("shows the salary and links to the job detail page", () => {
    const job = getJob("payroll-officer-brightpath-sydney");
    if (!job) throw new Error("expected the Payroll Officer fixture to exist");

    renderWithRouter(<JobCard job={job} />);

    expect(screen.getByRole("heading", { name: "Payroll Officer" })).toBeInTheDocument();
    expect(screen.getByText("$85,000 – $95,000 + super")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/jobs/payroll-officer-brightpath-sydney",
    );
  });
});

describe("PlatformTabs", () => {
  it("swaps the tile set when a different audience is selected", async () => {
    const user = userEvent.setup();
    renderWithRouter(<PlatformTabs />);

    expect(screen.getByRole("heading", { name: "Powerful HR software" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Employment Hero Work" })).toBeNull();

    await user.click(screen.getByRole("tab", { name: "Employees" }));

    expect(screen.getByRole("heading", { name: "Employment Hero Work" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Powerful HR software" })).toBeNull();
  });
});

describe("Accordion", () => {
  it("opens the first item and toggles the rest", async () => {
    const user = userEvent.setup();
    const [first, second] = homeFaqs;
    if (!first || !second) throw new Error("expected at least two FAQ fixtures");

    renderWithRouter(<Accordion items={homeFaqs} />);

    expect(screen.getByText(first.answer)).toBeInTheDocument();
    expect(screen.queryByText(second.answer)).toBeNull();

    await user.click(screen.getByRole("button", { name: second.question }));

    expect(screen.getByText(second.answer)).toBeInTheDocument();
    expect(screen.queryByText(first.answer)).toBeNull();
  });
});

describe("PricingPage", () => {
  it("shows the HR ladder by default", () => {
    renderWithRouter(<PricingPage />, "/pricing");

    const essentials = screen.getByRole("heading", { name: "HR Essentials" }).parentElement;
    if (!essentials) throw new Error("expected an HR Essentials plan card");

    expect(screen.getByRole("heading", { name: "Employment Unlimited" })).toBeInTheDocument();
    expect(within(essentials).getByText("$10")).toBeInTheDocument();
    expect(within(essentials).getByText("per employee / month")).toBeInTheDocument();
  });

  it("switches to the HeroForce plans when that tab is chosen", async () => {
    const user = userEvent.setup();
    renderWithRouter(<PricingPage />, "/pricing");

    await user.click(screen.getByRole("tab", { name: "HeroForce" }));

    expect(screen.getByRole("heading", { name: "Employ globally" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "HR Essentials" })).toBeNull();
  });
});
