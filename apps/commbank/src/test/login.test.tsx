import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { LoginPage } from "@/pages/Login";

function renderLogin(route = "/login") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/netbank" element={<p>NetBank dashboard</p>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("LoginPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the default NetBank log-on page", () => {
    renderLogin();

    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
    expect(screen.getByText("Everyday personal banking")).toBeInTheDocument();
  });

  it("renders lowercase service query options from the log-on menu", () => {
    renderLogin("/login?service=commbiz");

    expect(screen.getByRole("heading", { name: "Log on to CommBiz" })).toBeInTheDocument();
    expect(screen.getByText("Business banking", { selector: "p" })).toBeInTheDocument();
  });

  it("falls back to NetBank for unknown service query values", () => {
    renderLogin("/login?service=unexpected");

    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
  });

  it("logs in and follows the redirect target", async () => {
    const user = userEvent.setup();
    renderLogin("/login?redirect=/netbank");

    const password = screen.getByLabelText("Password");
    const form = password.closest("form");
    if (!form) throw new Error("expected password field to be inside the login form");

    await user.click(within(form).getByRole("button", { name: "Log on" }));

    expect(screen.getByText("NetBank dashboard")).toBeInTheDocument();
    expect(window.localStorage.getItem("commbank-demo-session")).not.toBeNull();
  });
});
