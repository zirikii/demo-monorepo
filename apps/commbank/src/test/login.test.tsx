import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { logOnOptions } from "@/data/nav";
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

describe("LoginPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.title = "";
  });

  it("renders NetBank when the service query is missing", () => {
    renderLogin("/login");

    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
    expect(screen.getByText("Everyday personal banking")).toBeInTheDocument();
    expect(document.title).toBe("Log on to NetBank - CommBank (Demo)");
  });

  it.each(logOnOptions)("renders the log on menu target for $label", (option) => {
    renderLogin(option.to);

    expect(screen.getByRole("heading", { name: `Log on to ${option.label}` })).toBeInTheDocument();
  });

  it.each(["bogus", "", "toString", "NetBank", "COMMBIZ"])(
    "resolves service %j without crashing",
    (service) => {
      renderLogin(`/login?service=${encodeURIComponent(service)}`);

      const expected =
        service.trim().toLowerCase() === "commbiz" ? "Log on to CommBiz" : "Log on to NetBank";
      expect(screen.getByRole("heading", { name: expected })).toBeInTheDocument();
    },
  );

  it("follows the redirect query after log on", async () => {
    const user = userEvent.setup();
    renderLogin("/login?redirect=/netbank/accounts");

    await user.click(within(screen.getByRole("main")).getByRole("button", { name: "Log on" }));

    expect(screen.getByText("Accounts")).toBeInTheDocument();
  });
});
