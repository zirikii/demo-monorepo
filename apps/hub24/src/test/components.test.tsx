import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AuthProvider } from "@/hooks/useAuth";
import { loginWithCredentials } from "@/lib/auth";
import { PortalLayout } from "@/components/portal/PortalLayout";

describe("site header", () => {
  it("exposes primary navigation", () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>,
    );
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "HUB24 home" })).toHaveAttribute("href", "/");
  });
});

describe("portal nav", () => {
  it("marks the dashboard as the current page", () => {
    loginWithCredentials("adviser@hub24.demo", "demo");
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/adviserhub"]}>
          <PortalLayout title="Practice overview">
            <p>Book</p>
          </PortalLayout>
        </MemoryRouter>
      </AuthProvider>,
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("aria-current", "page");
  });
});
