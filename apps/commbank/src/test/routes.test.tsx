import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "@/pages/Home";
import { AuthProvider } from "@/hooks/useAuth";

describe("HomePage", () => {
  it("shows brand-forward CommBank hero", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthProvider>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "CommBank" })).toBeInTheDocument();
    expect(screen.getByText(/bank accounts, credit cards, home loans/i)).toBeInTheDocument();
  });
});
