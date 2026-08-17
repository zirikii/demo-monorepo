import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import type { ReactElement } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { DonutChart } from "@/components/ui/DonutChart";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tabs } from "@/components/ui/Tabs";
import { MenuComparison } from "@/components/marketing/MenuComparison";
import { InsightCard } from "@/components/marketing/InsightCard";
import { INSIGHTS } from "@/data/insights";

function renderWithRouter(ui: ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("BrandLogo", () => {
  it("renders the HUB24 wordmark with an optional descriptor", () => {
    render(<BrandLogo descriptor="AdviserHUB" />);
    expect(screen.getByText("HUB")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("AdviserHUB")).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge tone="positive">Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});

describe("Accordion", () => {
  it("opens the first item and toggles on click", async () => {
    const user = userEvent.setup();
    render(
      <Accordion
        items={[
          { question: "How do I open an account?", answer: "Through a financial adviser." },
          { question: "Which menu should I use?", answer: "Discover, Core or Choice." },
        ]}
      />,
    );

    const first = screen.getByRole("button", { name: "How do I open an account?" });
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Through a financial adviser.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Which menu should I use?" }));
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Discover, Core or Choice.")).toBeInTheDocument();
  });
});

describe("Tabs", () => {
  it("marks the active tab and reports selection", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Tabs
        label="Menus"
        tabs={["Discover", "Core", "Choice"]}
        active="Core"
        onChange={onChange}
      />,
    );

    expect(screen.getByRole("tab", { name: "Core" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Choice" })).toHaveAttribute("aria-selected", "false");

    await user.click(screen.getByRole("tab", { name: "Choice" }));
    expect(onChange).toHaveBeenCalledWith("Choice");
  });
});

describe("DataTable", () => {
  const columns = [{ key: "name", header: "Name", render: (row: { name: string }) => row.name }];

  it("renders rows", () => {
    render(
      <DataTable
        caption="People"
        columns={columns}
        rows={[{ name: "Alicia Nguyen" }]}
        rowKey={(row) => row.name}
      />,
    );
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByText("Alicia Nguyen")).toBeInTheDocument();
  });

  it("shows the empty message when there are no rows", () => {
    render(
      <DataTable
        caption="People"
        columns={columns}
        rows={[]}
        rowKey={(row) => row.name}
        emptyMessage="No clients match those filters."
      />,
    );
    expect(screen.getByText("No clients match those filters.")).toBeInTheDocument();
  });
});

describe("charts", () => {
  it("labels the donut chart and its slices", () => {
    render(
      <DonutChart
        title="Asset allocation"
        slices={[
          { label: "Australian equities", value: 60 },
          { label: "Cash", value: 40 },
        ]}
      />,
    );
    expect(screen.getByRole("img", { name: "Asset allocation" })).toBeInTheDocument();
    expect(screen.getByText("60%")).toBeInTheDocument();
  });

  it("exposes progress state to assistive technology", () => {
    render(<ProgressBar value={60} label="Application progress" />);
    const bar = screen.getByRole("progressbar", { name: "Application progress" });
    expect(bar).toHaveAttribute("aria-valuenow", "60");
  });
});

describe("MenuComparison", () => {
  it("renders each investment menu column", () => {
    render(<MenuComparison />);
    expect(screen.getByRole("columnheader", { name: /Discover/ })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Core/ })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Choice/ })).toBeInTheDocument();
    expect(screen.getAllByText("Not available").length).toBeGreaterThan(0);
  });
});

describe("InsightCard", () => {
  it("links to the article and shows its category", () => {
    const insight = INSIGHTS[0]!;
    renderWithRouter(<InsightCard insight={insight} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", `/insights/${insight.slug}`);
    expect(screen.getByText(insight.category)).toBeInTheDocument();
  });
});
