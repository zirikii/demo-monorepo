import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmployerCarousel } from "../EmployerCarousel";
import type { Employer } from "@/lib/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// next/image renders a plain <img> in jsdom via the mock below.
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  },
}));

function makeEmployers(n: number): Employer[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `emp_${i}`,
    slug: `employer-${i}`,
    name: `Employer ${i}`,
    logo: "/employers/test.svg",
    industry: "Information & Communication Technology",
    tagline: `Tagline for employer ${i}.`,
    about: "About.",
    location: "Sydney NSW",
    size: "1,000+ employees",
    rating: 4.5,
    reviewCount: 1234,
  }));
}

describe("EmployerCarousel", () => {
  it("renders the first page with rating and review counts", () => {
    render(<EmployerCarousel employers={makeEmployers(8)} />);

    expect(screen.getByText("1 of 2")).toBeInTheDocument();
    // PAGE_SIZE is 6, so the first page shows 6 employer cards.
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
    expect(screen.getAllByText("4.5").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\(1,234 reviews\)/).length).toBeGreaterThan(0);
  });

  it("pages forward and backward with the controls", async () => {
    const user = userEvent.setup();
    render(<EmployerCarousel employers={makeEmployers(8)} />);

    const prev = screen.getByRole("button", { name: /previous employers/i });
    const next = screen.getByRole("button", { name: /next employers/i });
    expect(prev).toBeDisabled();

    await user.click(next);
    expect(screen.getByText("2 of 2")).toBeInTheDocument();
    // Remaining 2 employers on the last page.
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(next).toBeDisabled();
    expect(prev).toBeEnabled();

    await user.click(prev);
    expect(screen.getByText("1 of 2")).toBeInTheDocument();
  });
});
