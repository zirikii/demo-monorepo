import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { logOnOptions } from "@/data/nav";
import { LoginPage } from "@/pages/Login";

/** Scoped to `main` so the site header and footer chrome cannot satisfy the queries. */
function renderLoginPage(entry: string) {
  const result = render(
    <AuthProvider>
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/netbank" element={<p>NetBank overview</p>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );

  return { ...result, page: within(screen.getByRole("main")) };
}

describe("log on page", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the personal banking service when no service is given", () => {
    const { page } = renderLoginPage("/login");

    expect(page.getByRole("heading", { level: 1, name: "Log on to NetBank" })).toBeInTheDocument();
    expect(page.getByText("Everyday personal banking")).toBeInTheDocument();
  });

  it.each([
    ["netbank", "NetBank", "Everyday personal banking"],
    ["commbiz", "CommBiz", "Business banking"],
    ["commsec", "CommSec", "Investing and share trading"],
  ])("renders the %s service from the query param", (service, name, tagline) => {
    const { page } = renderLoginPage(`/login?service=${service}`);

    expect(page.getByRole("heading", { level: 1, name: `Log on to ${name}` })).toBeInTheDocument();
    expect(page.getByText(tagline)).toBeInTheDocument();
  });

  it("renders every service linked from the header log on menu", () => {
    for (const option of logOnOptions) {
      const { page, unmount } = renderLoginPage(option.to);

      expect(
        page.getByRole("heading", { level: 1, name: `Log on to ${option.label}` }),
      ).toBeInTheDocument();

      unmount();
    }
  });

  it.each(["unknown", "toString", ""])(
    "falls back to NetBank for the unrecognised service %p",
    (service) => {
      const { page } = renderLoginPage(`/login?service=${service}`);

      expect(
        page.getByRole("heading", { level: 1, name: "Log on to NetBank" }),
      ).toBeInTheDocument();
    },
  );

  it("logs on and follows the redirect parameter", async () => {
    const user = userEvent.setup();
    const { page } = renderLoginPage("/login?redirect=/netbank");

    await user.click(page.getByRole("button", { name: "Log on" }));

    expect(screen.getByText("NetBank overview")).toBeInTheDocument();
  });
});
