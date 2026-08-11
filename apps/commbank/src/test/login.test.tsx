import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { LoginPage } from "@/pages/Login";

function renderLogin(initialEntry: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("LoginPage service lookup", () => {
  it("defaults to NetBank when no service query is present", () => {
    renderLogin("/login");
    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
  });

  it("renders CommBiz when service=commbiz", () => {
    renderLogin("/login?service=commbiz");
    expect(screen.getByRole("heading", { name: "Log on to CommBiz" })).toBeInTheDocument();
  });

  it("normalizes mixed-case service query params", () => {
    renderLogin("/login?service=NetBank");
    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
  });

  it("falls back to NetBank for unknown service values", () => {
    renderLogin("/login?service=unknown");
    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
  });
});
