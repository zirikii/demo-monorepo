import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/layout/SiteHeader";

function renderHeader() {
  return render(
    <MemoryRouter>
      <SiteHeader />
    </MemoryRouter>,
  );
}

describe("SiteHeader", () => {
  it("uses the mark only, vertically aligned with primary nav", () => {
    renderHeader();

    const home = screen.getByRole("link", { name: "Atlassian home" });
    expect(home).not.toHaveTextContent(/atlassian/i);
    expect(home.querySelector("img")).toHaveAttribute("alt", "Atlassian");
    expect(home.className).toMatch(/items-center/);
    expect(home.className).toMatch(/h-full/);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav.className).toMatch(/items-center/);
    expect(screen.getByRole("link", { name: /Products/ })).toBeInTheDocument();
  });
});
