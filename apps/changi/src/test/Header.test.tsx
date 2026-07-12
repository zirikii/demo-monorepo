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
  it("renders the Changi logo lockup", () => {
    renderHeader();
    expect(screen.getByLabelText("Changi Airport home")).toBeInTheDocument();
  });

  it("renders the primary nav menus", () => {
    renderHeader();
    for (const label of ["Fly", "At Changi", "Dine & Shop", "Experience", "Changi Rewards"]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
  });

  it("opens and closes the Fly mega menu", async () => {
    const user = userEvent.setup();
    renderHeader();
    const trigger = screen.getByRole("button", { name: "Fly" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Flight Information/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
