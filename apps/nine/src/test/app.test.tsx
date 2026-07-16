import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
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

  it("Sport page shows Latest chip and NaN timestamps (demo bug)", async () => {
    window.history.pushState({}, "", "/sport");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: /Sport/i })).toBeInTheDocument();
    expect(screen.getByTestId("sport-sort-latest")).toBeInTheDocument();
    const nanLabels = await screen.findAllByText(/NaN hours ago/i);
    expect(nanLabels.length).toBeGreaterThan(0);
  });

  it("can open login", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");
    render(<App />);
    await user.click(screen.getByRole("link", { name: /Sign in/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /Sign in/i })).toBeInTheDocument();
  });
});
