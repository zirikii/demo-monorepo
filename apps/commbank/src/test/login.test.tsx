import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { LoginPage } from "@/pages/Login";

function renderLogin(route: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <LoginPage />
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("LoginPage", () => {
  it("renders NetBank for the default log-on page", () => {
    renderLogin("/login");

    expect(
      screen.getByRole("heading", { level: 1, name: "Log on to NetBank" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Everyday personal banking")).toBeInTheDocument();
  });

  it("renders the selected log-on service from lowercase query values", () => {
    renderLogin("/login?service=commbiz");

    expect(
      screen.getByRole("heading", { level: 1, name: "Log on to CommBiz" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Business banking")).toBeInTheDocument();
  });

  it("falls back to NetBank for unknown log-on services", () => {
    renderLogin("/login?service=unknown");

    expect(
      screen.getByRole("heading", { level: 1, name: "Log on to NetBank" }),
    ).toBeInTheDocument();
  });
});
