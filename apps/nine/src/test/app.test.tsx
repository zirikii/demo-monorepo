import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import { getByPillar } from "@/data/articles";
import { formatRelativeTime } from "@/lib/format";

describe("app routes", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders homepage with Nine branding and lead story", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(screen.getAllByLabelText(/nine\.com\.au home/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("navigation", { name: /Primary/i })).toBeInTheDocument();
    expect(screen.getByText(/Get the newsletter/i)).toBeInTheDocument();
  });

  it("Sport page shows Latest chip and relative timestamps from ISO dates", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-16T03:00:00.000Z"));
    const demoNow = Date.parse("2026-07-16T03:00:00.000Z");

    window.history.pushState({}, "", "/sport");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: /Sport/i })).toBeInTheDocument();
    expect(screen.getByTestId("sport-sort-latest")).toBeInTheDocument();
    expect(screen.queryByText(/NaN hours ago/i)).not.toBeInTheDocument();

    const newest = getByPillar("sport")[0];
    expect(newest).toBeDefined();
    if (!newest) return;
    expect(screen.getByRole("heading", { name: newest.title })).toBeInTheDocument();
    const expectedTime = formatRelativeTime(newest.publishedAt, demoNow);
    expect(expectedTime).not.toMatch(/NaN/i);
    expect(screen.getAllByText(expectedTime).length).toBeGreaterThan(0);
  });

  it("can open login", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);
    await user.click(screen.getByRole("link", { name: /Sign in/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /Sign in/i })).toBeInTheDocument();
  });
});
