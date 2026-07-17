import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

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

  it("Sport page shows Latest chip and valid relative timestamps", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-16T03:00:00.000Z"));
    window.history.pushState({}, "", "/sport");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: /Sport/i })).toBeInTheDocument();
    expect(screen.getByTestId("sport-sort-latest")).toBeInTheDocument();
    expect(screen.queryByText(/NaN hours ago/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Invalid date/i)).not.toBeInTheDocument();
    expect(screen.getAllByText("1d ago").length).toBeGreaterThan(0);
    expect(screen.getByText("22h ago")).toBeInTheDocument();
  });

  it("can open login", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);
    await user.click(screen.getByRole("link", { name: /Sign in/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /Sign in/i })).toBeInTheDocument();
  });
});
