import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AuthProvider } from "@/hooks/useAuth";

describe("SiteHeader", () => {
  it("renders CommBank logo and Log on", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <SiteHeader />
        </MemoryRouter>
      </AuthProvider>,
    );
    expect(screen.getByTestId("brand-logo")).toHaveAttribute("alt", "CommBank");
    expect(screen.getByRole("link", { name: /log on/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  });
});
