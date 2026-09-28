import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "@/App";
import { AssistantProvider } from "@/features/assistant/AssistantProvider";
import { AuthProvider } from "@/hooks/useAuth";

function renderApp(route = "/") {
  return render(
    <AuthProvider>
      <AssistantProvider>
        <MemoryRouter initialEntries={[route]}>
          <AppRoutes />
        </MemoryRouter>
      </AssistantProvider>
    </AuthProvider>,
  );
}

describe("site header", () => {
  it("shows the AGL logo, main nav and log in", () => {
    renderApp();
    expect(screen.getAllByAltText("AGL")[0]).toHaveAttribute("src", "/brand/logo.png");
    const nav = screen.getByRole("navigation", { name: "Main" });
    for (const label of ["Energy", "Internet", "Mobile", "Solar & batteries", "Help & Support"]) {
      expect(within(nav).getByRole("button", { name: new RegExp(label) })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Log in" })).toHaveAttribute("href", "/login");
  });

  it("opens a mega menu and highlights the active section", async () => {
    const user = userEvent.setup();
    renderApp("/internet");
    const trigger = within(screen.getByRole("navigation", { name: "Main" })).getByRole("button", { name: /Internet/ });
    expect(trigger.className).toContain("bg-agl-sky");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Compare nbn® plans/ })).toHaveAttribute("href", "/internet");
  });
});

describe("home page", () => {
  it("renders the hero offer and plan finder", async () => {
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByRole("heading", { level: 1, name: /Get up to \$300 in bill credits/ })).toBeInTheDocument();
    const form = screen.getByRole("form", { name: "Find a plan" });
    await user.type(within(form).getByPlaceholderText("Start typing your address"), "12 Banksia St");
    await user.click(within(form).getByRole("button", { name: "See plans and prices" }));
    expect(await screen.findByRole("heading", { level: 1, name: "Compare our energy plans" })).toBeInTheDocument();
    expect(screen.getByText("12 Banksia St")).toBeInTheDocument();
  });
});

describe("My Account", () => {
  it("redirects to log in, then lands on the overview", async () => {
    const user = userEvent.setup();
    renderApp("/account/bills");
    expect(screen.getByRole("heading", { name: "Log in to My Account" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveValue("alex.nguyen@example.com");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.findByRole("heading", { level: 1, name: "Bills & payments" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "My Account" })).toHaveAttribute("href", "/account");
  });

  it("filters bills by service", async () => {
    const user = userEvent.setup();
    renderApp("/login");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    await user.click(await screen.findByRole("link", { name: "Bills & payments" }));
    const table = screen.getByRole("table");
    const allRows = within(table).getAllByRole("row").length;
    await user.click(screen.getByRole("button", { name: "Gas" }));
    const gasRows = within(table).getAllByRole("row");
    expect(gasRows.length).toBeLessThan(allRows);
    expect(gasRows.slice(1).every((r) => within(r).queryByText("gas"))).toBe(true);
  });
});
