import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CapabilityDetailPage } from "@/pages/CapabilityDetail";
import { getCapability } from "@/data/capabilities";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/products/capabilities/:slug" element={<CapabilityDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("CapabilityDetailPage", () => {
  it("renders the capability resolved from the route param", () => {
    const capability = getCapability("conversational-search")!;
    renderAt("/products/capabilities/conversational-search");

    expect(screen.getByRole("heading", { level: 1, name: capability.heroTitle })).toBeInTheDocument();
    for (const feature of capability.features) {
      expect(screen.getByRole("heading", { name: feature.title })).toBeInTheDocument();
    }
  });

  it("falls back to the 404 page for unknown slugs", () => {
    renderAt("/products/capabilities/not-a-capability");
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
