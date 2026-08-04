import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CardsPage } from "@/pages/netbank/CardsPage";

describe("card controls", () => {
  it("persists a card lock in localStorage", async () => {
    const user = userEvent.setup();
    render(<CardsPage />);
    const lock = screen.getByRole("button", { name: "Lock card: off" });

    await user.click(lock);

    expect(screen.getByRole("button", { name: "Lock card: on" })).toHaveAttribute("aria-pressed", "true");
    expect(window.localStorage.getItem("commbank-demo-card-controls")).toContain('"locked":true');
  });
});
