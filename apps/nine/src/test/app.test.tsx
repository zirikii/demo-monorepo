import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import { getByPillar } from "@/data/articles";
import { formatRelativeTime } from "@/lib/format";

describe("app routes", () => {
  it("renders homepage with Nine branding and lead story", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(screen.getAllByLabelText(/nine\.com\.au home/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("navigation", { name: /Primary/i })).toBeInTheDocument();
    expect(screen.getByText(/Get the newsletter/i)).toBeInTheDocument();
  });

  it("Sport page shows Latest chip and valid relative timestamps", async () => {
    window.history.pushState({}, "", "/sport");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: /Sport/i })).toBeInTheDocument();
    expect(screen.getByTestId("sport-sort-latest")).toBeInTheDocument();
    expect(screen.queryByText(/NaN hours ago/i)).not.toBeInTheDocument();

    const sport = getByPillar("sport");
    const grid = await screen.findByTestId("sport-story-grid");
    const cards = within(grid).getAllByRole("article");
    expect(cards.length).toBe(sport.length);
    const firstArticle = sport[0];
    const firstCard = cards[0];
    expect(firstArticle).toBeDefined();
    expect(firstCard).toBeDefined();
    if (!firstArticle || !firstCard) {
      throw new Error("expected at least one sport article");
    }
    expect(within(firstCard).getByText(firstArticle.title)).toBeInTheDocument();
    expect(within(firstCard).getByText(formatRelativeTime(firstArticle.publishedAt))).toBeInTheDocument();
  });

  it("can open login", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);
    await user.click(screen.getByRole("link", { name: /Sign in/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /Sign in/i })).toBeInTheDocument();
  });
});
