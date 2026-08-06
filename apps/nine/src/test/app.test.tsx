import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

describe("app routes", () => {
  it("renders homepage with Nine branding and lead story", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(screen.getAllByLabelText(/nine\.com\.au home/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("navigation", { name: /Primary/i })).toBeInTheDocument();
    expect(screen.getByText(/Get the newsletter/i)).toBeInTheDocument();
  });

  it("Sport page shows newest stories first with valid timestamps", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-16T03:00:00.000Z"));
    window.history.pushState({}, "", "/sport");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: /Sport/i })).toBeInTheDocument();
    expect(screen.getByTestId("sport-sort-latest")).toBeInTheDocument();
    expect(screen.queryByText(/NaN hours ago/i)).not.toBeInTheDocument();
    expect(screen.getByText("3h ago")).toBeInTheDocument();
    const storyGrid = screen.getByTestId("sport-story-grid");
    expect(within(storyGrid).getAllByRole("heading", { level: 3 })[0]?.textContent).toContain(
      "State of Origin III",
    );
  });

  it("can open login", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);
    await user.click(screen.getByRole("link", { name: /Sign in/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /Sign in/i })).toBeInTheDocument();
  });
});
