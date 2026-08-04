import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "@/App";
import { SESSION_KEY } from "@/lib/auth";

describe("NetBank authentication", () => {
  it("redirects a protected route and logs on with demo credentials", async () => {
    window.history.replaceState({}, "", "/netbank/cards");
    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
    expect(window.location.search).toContain("redirect=");

    await user.click(screen.getByRole("button", { name: "Log on securely" }));

    expect(await screen.findByRole("heading", { name: "Cards" })).toBeInTheDocument();
    const token = window.localStorage.getItem(SESSION_KEY);
    expect(token).toBeTruthy();
    expect(token).not.toContain("demo");
  });

  it("shows active public navigation", async () => {
    window.history.replaceState({}, "", "/home-loans");
    render(<App />);
    await waitFor(() => expect(screen.getByRole("heading", { name: "Home loans for your next move" })).toBeInTheDocument());
    expect(screen.getByRole("link", { name: "Home loans", current: "page" })).toHaveClass("bg-cba-neutral");
  });
});
