import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "@/components/layout/Header";

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("renders all four top-level nav menus", () => {
    renderHeader();
    for (const label of ["Products", "Solutions", "Insights", "Company & Contact"]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
  });

  it("opens and closes the Products mega menu", async () => {
    const user = userEvent.setup();
    renderHeader();
    const trigger = screen.getByRole("button", { name: "Products" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Squiz Funnelback Search/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("shows the Book a call CTA", () => {
    renderHeader();
    expect(screen.getAllByRole("link", { name: "Book a call" }).length).toBeGreaterThanOrEqual(1);
  });
});
