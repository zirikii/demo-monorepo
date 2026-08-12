import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LoginPage } from "@/pages/Login";
import { loginOptions } from "@/data/nav";
import { AuthProvider } from "@/hooks/useAuth";

/**
 * These tests DOCUMENT an intentional defect rather than guarding against one. `/login`
 * is deliberately broken so the repo has a realistic bug to demonstrate a fixing workflow,
 * tracked in Jira as DR-20. If you are here because you fixed it, invert the expectations:
 * every case below should render the form instead of throwing.
 */
function renderLogin(route: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <LoginPage />
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("intentional /login rendering crash (Jira DR-20)", () => {
  beforeEach(() => {
    // React logs the caught render error; the throw itself is the assertion.
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws a TypeError when the page is opened with no portal query", () => {
    expect(() => renderLogin("/login")).toThrow(TypeError);
  });

  it.each(loginOptions.map((option) => option.to))("throws for the header link %s", (to) => {
    expect(() => renderLogin(to)).toThrow(/Cannot read properties of undefined \(reading 'name'\)/);
  });

  it("renders correctly when the query happens to match the display-cased config key", () => {
    renderLogin("/login?portal=Employer");

    expect(screen.getByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    expect(screen.getByText("Employer log in")).toBeInTheDocument();
    expect(screen.getByText("HR and people management")).toBeInTheDocument();
  });
});
