import { render, screen, within } from "@testing-library/react";
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

function main() {
  return within(screen.getByRole("main"));
}

describe("LoginPage", () => {
  it("renders the NetBank form when no service query is set", () => {
    renderLogin("/login");

    expect(main().getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
    expect(main().getByText("Everyday personal banking")).toBeInTheDocument();
    expect(main().getByRole("button", { name: "Log on" })).toBeInTheDocument();
  });

  it("renders CommBiz copy from the lowercase service query", () => {
    renderLogin("/login?service=commbiz");
    expect(main().getByRole("heading", { name: "Log on to CommBiz" })).toBeInTheDocument();
    expect(main().getByText("Business banking")).toBeInTheDocument();
  });

  it("renders CommSec copy from the lowercase service query", () => {
    renderLogin("/login?service=commsec");
    expect(main().getByRole("heading", { name: "Log on to CommSec" })).toBeInTheDocument();
    expect(main().getByText("Investing and share trading")).toBeInTheDocument();
  });

  it("falls back to NetBank for unknown or prototype-colliding service keys", () => {
    renderLogin("/login?service=toString");

    expect(main().getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
  });
});
