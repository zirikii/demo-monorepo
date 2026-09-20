import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AuthProvider } from "@/hooks/useAuth";

function renderHeader(path = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[path]}>
        <SiteHeader />
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("SiteHeader", () => {
  it("renders the official wordmark and Join us CTA", () => {
    renderHeader();
    expect(screen.getByRole("img", { name: "Gojek" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Join us" })).toHaveAttribute("href", "/careers");
  });

  it("marks the current marketing link as active", () => {
    renderHeader("/about");
    const about = screen.getByRole("link", { name: "About us" });
    expect(about.className).toMatch(/text-white/);
  });
});
