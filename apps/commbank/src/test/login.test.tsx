import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LoginPage } from "@/pages/Login";
import { AuthProvider } from "@/hooks/useAuth";

function renderLogin(route = "/login") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("LoginPage", () => {
  function loginCard(name: string) {
    const heading = screen.getByRole("heading", { name: `Log on to ${name}` });
    const card = heading.closest("div.rounded-cba-lg") as HTMLElement;
    expect(card).not.toBeNull();
    return within(card);
  }

  it("renders the NetBank heading by default without a service param", () => {
    renderLogin("/login");

    expect(loginCard("NetBank").getByText("Everyday personal banking")).toBeInTheDocument();
  });

  it.each([
    ["commbiz", "CommBiz", "Business banking"],
    ["commsec", "CommSec", "Investing and share trading"],
  ])("renders the %s service heading and tagline", (param, name, tagline) => {
    renderLogin(`/login?service=${param}`);

    expect(loginCard(name).getByText(tagline)).toBeInTheDocument();
  });

  it("falls back to NetBank for an unknown service param instead of crashing", () => {
    renderLogin("/login?service=unknown");

    expect(screen.getByRole("heading", { name: "Log on to NetBank" })).toBeInTheDocument();
  });
});
