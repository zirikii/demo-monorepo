import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HappeningsSection } from "@/components/marketing/HappeningsSection";
import { happenings } from "@/data/happenings";

describe("HappeningsSection", () => {
  it("renders all happening cards with full-bleed image layout", () => {
    render(
      <MemoryRouter>
        <HappeningsSection />
      </MemoryRouter>,
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(happenings.length);

    images.forEach((img, index) => {
      const item = happenings[index];
      expect(img).toHaveAttribute("alt", item.title);
      expect(img).toHaveAttribute("src", item.image);
      expect(img).toHaveClass("block", "h-full", "w-full", "object-cover");

      const mediaWrapper = img.parentElement;
      expect(mediaWrapper).not.toBeNull();
      expect(mediaWrapper!.className).toMatch(/aspect-\[16\/9\]/);
      expect(mediaWrapper!.className).toMatch(/overflow-hidden/);

      const card = mediaWrapper!.parentElement;
      expect(card?.tagName).toBe("A");
      expect(card!.className).toMatch(/overflow-hidden/);
    });
  });
});
