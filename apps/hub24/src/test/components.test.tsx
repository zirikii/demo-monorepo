import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tabs } from "@/components/ui/Tabs";
import { Toggle } from "@/components/ui/Toggle";
import { AllocationChart } from "@/components/portal/AllocationChart";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieBanner } from "@/components/layout/CookieBanner";

function renderWithRouter(ui: ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("BrandLogo", () => {
  it("uses the dark lockup by default and the reversed lockup on dark surfaces", () => {
    const { rerender } = render(<BrandLogo />);
    expect(screen.getByAltText("HUB24")).toHaveAttribute("src", "/brand/logo-dark.svg");

    rerender(<BrandLogo tone="light" />);
    expect(screen.getByAltText("HUB24")).toHaveAttribute("src", "/brand/logo-light.svg");
  });
});

describe("Button", () => {
  it("renders a button and a router link with the same shape", () => {
    renderWithRouter(
      <>
        <Button>Place order</Button>
        <ButtonLink to="/contact-us/">Contact us</ButtonLink>
      </>,
    );
    expect(screen.getByRole("button", { name: "Place order" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact us" })).toHaveAttribute("href", "/contact-us/");
  });

  it("disables when asked", () => {
    render(<Button disabled>Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });
});

describe("Tabs", () => {
  it("shows the first panel and switches on click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs
        ariaLabel="Investment menus"
        items={[
          { id: "discover", label: "Discover", content: <p>Discover content</p> },
          { id: "choice", label: "Choice", content: <p>Choice content</p> },
        ]}
      />,
    );

    expect(screen.getByText("Discover content")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Discover" })).toHaveAttribute("aria-selected", "true");

    await user.click(screen.getByRole("tab", { name: "Choice" }));

    expect(screen.getByText("Choice content")).toBeInTheDocument();
    expect(screen.queryByText("Discover content")).not.toBeInTheDocument();
  });
});

describe("Accordion", () => {
  it("opens the first item and collapses it when clicked again", async () => {
    const user = userEvent.setup();
    render(
      <Accordion
        items={[
          { id: "fees", question: "How does pricing work?", answer: "Pricing follows the menu." },
          { id: "support", question: "What support is there?", answer: "A national BDM team." },
        ]}
      />,
    );

    expect(screen.getByText("Pricing follows the menu.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /how does pricing work/i }));
    expect(screen.queryByText("Pricing follows the menu.")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /what support is there/i }));
    expect(screen.getByText("A national BDM team.")).toBeInTheDocument();
  });
});

describe("Toggle", () => {
  it("exposes switch semantics and reports changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} label="Transaction alerts" />);

    const toggle = screen.getByRole("switch", { name: "Transaction alerts" });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await user.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("ProgressBar", () => {
  it("clamps values into the 0–100 range", () => {
    const { rerender } = render(<ProgressBar value={140} label="Concessional cap" />);
    expect(screen.getByRole("progressbar", { name: "Concessional cap" })).toHaveAttribute(
      "aria-valuenow",
      "100",
    );

    rerender(<ProgressBar value={-20} label="Concessional cap" />);
    expect(screen.getByRole("progressbar", { name: "Concessional cap" })).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  });
});

describe("DataTable", () => {
  const columns = [
    { key: "name", header: "Client", render: (row: { name: string }) => row.name },
  ];

  it("renders a header and a row per record", () => {
    render(
      <DataTable
        caption="Clients"
        columns={columns}
        rows={[{ name: "Margaret Whitlam" }, { name: "Hollis Family Trust" }]}
        rowKey={(row) => row.name}
      />,
    );

    const table = screen.getByRole("table", { name: "Clients" });
    expect(within(table).getByRole("columnheader", { name: "Client" })).toBeInTheDocument();
    expect(within(table).getAllByRole("row")).toHaveLength(3);
  });

  it("renders the empty slot instead of a table when there are no rows", () => {
    render(
      <DataTable
        caption="Clients"
        columns={columns}
        rows={[]}
        rowKey={(row) => row.name}
        empty={<EmptyState title="No clients" />}
      />,
    );

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText("No clients")).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it("renders its label", () => {
    render(<Badge tone="caution">Review due</Badge>);
    expect(screen.getByText("Review due")).toBeInTheDocument();
  });
});

describe("AllocationChart", () => {
  it("describes the allocation for assistive technology", () => {
    render(
      <AllocationChart
        slices={[
          { assetClass: "Australian equities", value: 100, weight: 60 },
          { assetClass: "Cash", value: 66.7, weight: 40 },
        ]}
      />,
    );

    expect(
      screen.getByRole("img", { name: "Australian equities 60.0%, Cash 40.0%" }),
    ).toBeInTheDocument();
  });
});

describe("SiteFooter", () => {
  it("carries the unofficial-demo disclaimer and legal links", () => {
    renderWithRouter(<SiteFooter />);
    expect(screen.getByText(/unofficial demonstration build/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy policy" })).toHaveAttribute(
      "href",
      "/legal/privacy-policy",
    );
  });
});

describe("CookieBanner", () => {
  it("dismisses and stays dismissed for the browser", async () => {
    const user = userEvent.setup();
    renderWithRouter(<CookieBanner />);

    expect(screen.getByRole("region", { name: "Cookie notice" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Got it" }));

    expect(screen.queryByRole("region", { name: "Cookie notice" })).not.toBeInTheDocument();
    expect(window.localStorage.getItem("hub24-demo-cookie-consent")).toBe("acknowledged");
  });
});
