import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AuthProvider } from "@/hooks/useAuth";

function renderWithRouter(ui: React.ReactNode, route = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>,
  );
}

describe("BrandLogo", () => {
  it("renders the self-hosted mark and the wordmark", () => {
    render(<BrandLogo />);
    expect(screen.getByAltText("Employment Hero")).toHaveAttribute("src", "/brand/mark.svg");
    expect(screen.getByText("employment hero")).toBeInTheDocument();
  });

  it("swaps to the reversed mark on dark surfaces", () => {
    render(<BrandLogo tone="light" />);
    expect(screen.getByAltText("Employment Hero")).toHaveAttribute("src", "/brand/mark-white.svg");
  });
});

describe("SiteHeader", () => {
  it("renders the primary navigation and the demo CTA", () => {
    renderWithRouter(<SiteHeader />);
    expect(screen.getByRole("link", { name: /^products$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /request a demo/i })).toBeInTheDocument();
  });

  it("opens the products mega-menu on hover", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);

    expect(screen.queryByRole("link", { name: /payroll software/i })).not.toBeInTheDocument();
    await user.hover(screen.getByRole("link", { name: /^products$/i }));
    expect(screen.getByRole("link", { name: /payroll software/i })).toBeInTheDocument();
  });

  it("lists the three login portals", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /^log in$/i }));
    expect(screen.getByRole("link", { name: /employer login/i })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("link", { name: /employee login/i })).toHaveAttribute(
      "href",
      "/login?portal=employee",
    );
  });
});

describe("SiteFooter", () => {
  it("carries the unofficial demo disclaimer and the acknowledgement of country", () => {
    renderWithRouter(<SiteFooter />);
    expect(screen.getByText(/not affiliated with/i)).toBeInTheDocument();
    expect(screen.getByText(/traditional custodians/i)).toBeInTheDocument();
  });
});

describe("Accordion", () => {
  it("opens the first item and toggles between panels", async () => {
    const user = userEvent.setup();
    render(
      <Accordion
        items={[
          { question: "First question", answer: "First answer" },
          { question: "Second question", answer: "Second answer" },
        ]}
      />,
    );

    expect(screen.getByText("First answer")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Second question" }));
    expect(screen.getByText("Second answer")).toBeInTheDocument();
    expect(screen.queryByText("First answer")).not.toBeInTheDocument();
  });
});

describe("DataTable", () => {
  it("renders a row per record", () => {
    render(
      <DataTable
        caption="People"
        columns={[
          { key: "name", header: "Name", render: (row: { name: string }) => row.name },
        ]}
        rows={[{ name: "Sam Okafor" }, { name: "Amelia Sørensen" }]}
        rowKey={(row) => row.name}
      />,
    );

    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByText("Amelia Sørensen")).toBeInTheDocument();
  });
});

describe("small primitives", () => {
  it("clamps the progress bar to a valid range", () => {
    render(<ProgressBar value={140} label="Complete" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });

  it("renders badges and empty states", () => {
    render(
      <>
        <Badge tone="critical">Mandatory</Badge>
        <EmptyState title="Nothing here" body="Try another filter." />
      </>,
    );
    expect(screen.getByText("Mandatory")).toBeInTheDocument();
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});
