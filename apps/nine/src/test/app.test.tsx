import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
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

  it("Sport page shows Latest chip, newest-first order, and valid timestamps", () => {
    window.history.pushState({}, "", "/sport");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: /Sport/i })).toBeInTheDocument();
    expect(screen.getByTestId("sport-sort-latest")).toBeInTheDocument();
    expect(screen.queryByText(/NaN hours ago/i)).not.toBeInTheDocument();

    const sport = getByPillar("sport");
    expect(sport.length).toBeGreaterThan(1);
    const titles = screen.getAllByRole("heading", { level: 3 });
    expect(titles[0]).toHaveTextContent(sport[0].title);

    for (const article of sport) {
      const label = formatRelativeTime(article.publishedAt);
      expect(label).not.toMatch(/NaN/i);
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("can open login", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);
    await user.click(screen.getByRole("link", { name: /Sign in/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /Sign in/i })).toBeInTheDocument();
  });
});
