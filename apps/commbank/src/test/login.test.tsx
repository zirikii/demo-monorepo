import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { LoginPage } from "@/pages/Login";

function renderLogin(route: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/netbank" element={<p>NetBank home</p>} />
          <Route path="/netbank/accounts" element={<p>Accounts</p>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

function logOnSubmit() {
  const submit = screen
    .getAllByRole("button", { name: "Log on" })
    .find((button) => button.getAttribute("type") === "submit");
  if (!submit) throw new Error("expected a log on submit button");
  return submit;
}

describe("LoginPage", () => {
  it("renders the NetBank log on form when no service is selected", () => {
    renderLogin("/login");

    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
    expect(screen.getByText("Everyday personal banking")).toBeInTheDocument();
    expect(screen.getByLabelText("Client number")).toHaveValue("12345678");
    expect(screen.getByLabelText("Password")).toHaveValue("demo1234");
  });

  it.each([
    ["/login?service=commbiz", "CommBiz", "Business banking"],
    ["/login?service=commsec", "CommSec", "Investing and share trading"],
    ["/login?service=CommBiz", "CommBiz", "Business banking"],
  ])("renders %s", (route, name, tagline) => {
    renderLogin(route);

    const main = screen.getByRole("main");
    expect(within(main).getByRole("heading", { name: `Log on to ${name}` })).toBeInTheDocument();
    expect(within(main).getByText(tagline)).toBeInTheDocument();
  });

  it("falls back to NetBank for an unknown service", () => {
    renderLogin("/login?service=not-a-service");

    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
  });

  it("logs on and follows the redirect", async () => {
    const user = userEvent.setup();
    renderLogin("/login?redirect=/netbank/accounts");

    await user.click(logOnSubmit());

    expect(screen.getByText("Accounts")).toBeInTheDocument();
  });
});
