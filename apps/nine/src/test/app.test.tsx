import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { BUG_TICKET_KEY } from "../App";

describe("Nine demo app", () => {
  it("renders the homepage with core Nine sections", () => {
    render(<App />);
    const mainNav = within(screen.getByRole("navigation", { name: "Main navigation" }));

    expect(screen.getByRole("heading", { name: /news, sport, entertainment/i })).toBeInTheDocument();
    expect(mainNav.getByRole("link", { name: "News" })).toBeInTheDocument();
    expect(mainNav.getByRole("link", { name: "Sport" })).toBeInTheDocument();
    expect(mainNav.getByRole("link", { name: "TV Guide" })).toBeInTheDocument();
  });

  it("navigates to the TV guide page", async () => {
    const user = userEvent.setup();
    render(<App />);
    const mainNav = within(screen.getByRole("navigation", { name: "Main navigation" }));

    await user.click(mainNav.getByRole("link", { name: "TV Guide" }));

    expect(screen.getByRole("heading", { name: "TV Guide" })).toBeInTheDocument();
    expect(screen.getByText("A Current Affair")).toBeInTheDocument();
  });

  it("keeps the intentionally buggy weather page marked for the Jira demo", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("link", { name: "Weather" }));

    expect(screen.getByRole("heading", { name: "Weather" })).toBeInTheDocument();
    expect(screen.getByLabelText("Capital city weather")).toHaveClass("buggy-weather-grid");
    expect(screen.getByText(new RegExp(BUG_TICKET_KEY))).toBeInTheDocument();
  });
});
