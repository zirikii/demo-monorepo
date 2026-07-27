import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { DestinationsSection } from "@/components/marketing/DestinationsSection";
import { destinations } from "@/data/destinations";

const scrollByMock = vi.mocked(Element.prototype.scrollBy);

describe("DestinationsSection", () => {
  it("renders all destination cards with full-bleed image layout", () => {
    render(
      <MemoryRouter>
        <DestinationsSection />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /Explore cities we are flying to today/i })).toBeInTheDocument();
    expect(screen.getByText("Travel inspiration from Now Boarding destinations.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View All" })).toHaveAttribute("href", "/happenings");

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(destinations.length);

    images.forEach((img, index) => {
      const city = destinations[index];
      expect(img).toHaveAttribute("alt", city.city);
      expect(img).toHaveAttribute("src", city.image);
      expect(img).toHaveClass("block", "h-full", "w-full", "object-cover");

      const mediaWrapper = img.parentElement;
      expect(mediaWrapper).not.toBeNull();
      expect(mediaWrapper!.className).toMatch(/aspect-square/);
      expect(mediaWrapper!.className).toMatch(/overflow-hidden/);

      const card = mediaWrapper!.parentElement;
      expect(card?.tagName).toBe("ARTICLE");
      expect(card!.className).toMatch(/overflow-hidden/);
    });
  });

  it("scrolls the carousel when navigation buttons are clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <DestinationsSection />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Next destinations" }));
    expect(scrollByMock).toHaveBeenCalledWith(
      expect.objectContaining({ left: expect.any(Number), behavior: "smooth" }),
    );

    await user.click(screen.getByRole("button", { name: "Previous destinations" }));
    expect(scrollByMock).toHaveBeenCalledWith(
      expect.objectContaining({ left: expect.any(Number), behavior: "smooth" }),
    );
  });
});
