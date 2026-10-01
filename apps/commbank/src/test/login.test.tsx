import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { logOnOptions } from "@/data/nav";
import { AuthProvider } from "@/hooks/useAuth";
import { LoginPage } from "@/pages/Login";

function renderLogin(search = "") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[`/login${search}`]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/netbank" element={<p>NetBank dashboard</p>} />
          <Route path="/custom-home" element={<p>Custom redirect</p>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("LoginPage", () => {
  it("renders NetBank when no service query is present", () => {
    renderLogin();
    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
    expect(screen.getByText("Everyday personal banking")).toBeInTheDocument();
  });

  it.each([
    ["commbiz", "CommBiz", "Business banking"],
    ["commsec", "CommSec", "Investing and share trading"],
  ] as const)("renders %s from the service query", (service, name, tagline) => {
    renderLogin(`?service=${service}`);
    const heading = screen.getByRole("heading", { name: `Log on to ${name}` });
    expect(heading).toBeInTheDocument();
    expect(heading.parentElement?.parentElement).toHaveTextContent(tagline);
  });

  it("keeps the header Log on menu in sync with serviceConfig", () => {
    for (const option of logOnOptions) {
      const url = new URL(option.to, "https://commbank.demo");
      expect(url.pathname).toBe("/login");
      const { unmount } = renderLogin(url.search);
      expect(
        screen.getByRole("heading", { name: `Log on to ${option.label}` }),
      ).toBeInTheDocument();
      unmount();
    }
  });

  it("falls back to NetBank for unknown, empty, and inherited keys", () => {
    for (const search of ["?service=bogus", "?service=", "?service=toString"]) {
      const { unmount } = renderLogin(search);
      expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
      unmount();
    }
  });

  it("submits to the redirect query or NetBank", async () => {
    const user = userEvent.setup();
    renderLogin("?redirect=/custom-home");
    await user.click(within(screen.getByRole("main")).getByRole("button", { name: "Log on" }));
    expect(screen.getByText("Custom redirect")).toBeInTheDocument();
  });
});
