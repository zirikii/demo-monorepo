import { useState } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { StageTracker } from "@/components/hub/StageTracker";
import { JobCard } from "@/components/marketing/JobCard";
import { PostCard } from "@/components/marketing/PostCard";
import { ProductCard } from "@/components/marketing/ProductCard";
import { StoryCard } from "@/components/marketing/StoryCard";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { Tabs } from "@/components/ui/Tabs";
import { EMPLOYEE_STORIES } from "@/data/culture";
import { findJob } from "@/data/jobs";
import { findPost } from "@/data/posts";
import { findProduct } from "@/data/products";

function renderWithRouter(ui: ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("BrandLogo", () => {
  it("exposes an accessible name for the lockup", () => {
    render(<BrandLogo />);
    expect(screen.getByRole("img", { name: "Gojek" })).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge tone="brand">Full-time</Badge>);
    expect(screen.getByText("Full-time")).toBeInTheDocument();
  });
});

describe("ProductCard", () => {
  it("links to the product detail page and shows its tagline", () => {
    const product = findProduct("gofood");
    expect(product).toBeDefined();
    renderWithRouter(<ProductCard product={product!} />);

    expect(screen.getByRole("heading", { name: "GoFood" })).toBeInTheDocument();
    expect(screen.getByText(product!.tagline)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/products/gofood");
  });
});

describe("JobCard", () => {
  it("shows the team, location, and type", () => {
    const job = findJob("senior-backend-engineer-allocation");
    expect(job).toBeDefined();
    renderWithRouter(<JobCard job={job!} />);

    expect(screen.getByRole("heading", { name: job!.title })).toBeInTheDocument();
    expect(screen.getByText("Marketplace")).toBeInTheDocument();
    expect(screen.getByText("Jakarta")).toBeInTheDocument();
    expect(screen.getByText("Full-time")).toBeInTheDocument();
  });
});

describe("PostCard", () => {
  it("shows the category, author, and published date", () => {
    const post = findPost("ledger-that-never-lies");
    expect(post).toBeDefined();
    renderWithRouter(<PostCard post={post!} />);

    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("Andre Lim")).toBeInTheDocument();
    expect(screen.getByText("24 Jun 2026")).toBeInTheDocument();
  });
});

describe("StoryCard", () => {
  it("renders the quote and attribution", () => {
    const story = EMPLOYEE_STORIES[0];
    expect(story).toBeDefined();
    render(<StoryCard story={story!} />);
    expect(screen.getByText(story!.quote)).toBeInTheDocument();
    expect(screen.getByText(story!.name)).toBeInTheDocument();
  });
});

describe("Tabs", () => {
  it("marks the selected tab and reports a change", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [value, setValue] = useState("all");
      return (
        <Tabs
          ariaLabel="Filter products by category"
          options={[
            { id: "all", label: "All", count: 23 },
            { id: "payments", label: "Payments", count: 4 },
          ]}
          value={value}
          onChange={setValue}
        />
      );
    }

    render(<Harness />);
    const all = screen.getByRole("tab", { name: /All/ });
    const payments = screen.getByRole("tab", { name: /Payments/ });

    expect(all).toHaveAttribute("aria-selected", "true");
    await user.click(payments);
    expect(payments).toHaveAttribute("aria-selected", "true");
    expect(all).toHaveAttribute("aria-selected", "false");
  });
});

describe("Pagination", () => {
  it("marks the current page and moves forward", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [page, setPage] = useState(1);
      return <Pagination page={page} pages={3} onChange={setPage} label="Roles pagination" />;
    }

    render(<Harness />);
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute("aria-current", "page");

    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
  });

  it("renders nothing for a single page", () => {
    const { container } = render(
      <Pagination page={1} pages={1} onChange={() => {}} label="Roles pagination" />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe("Accordion", () => {
  it("opens the first item and switches on click", async () => {
    const user = userEvent.setup();
    render(
      <Accordion
        items={[
          { question: "1. Application review", answer: "A recruiter reads every application." },
          { question: "2. Recruiter conversation", answer: "Thirty minutes on what you want." },
        ]}
      />,
    );

    const first = screen.getByRole("button", { name: "1. Application review" });
    expect(first).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: "2. Recruiter conversation" }));
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Thirty minutes on what you want.")).toBeInTheDocument();
  });
});

describe("StageTracker", () => {
  it("marks the current stage as the active step", () => {
    render(<StageTracker stage="Technical interview" />);
    expect(screen.getByText("Technical interview")).toHaveAttribute("aria-current", "step");
    expect(screen.getByText("Offer")).not.toHaveAttribute("aria-current");
  });
});
