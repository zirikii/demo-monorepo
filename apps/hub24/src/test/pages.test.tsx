import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";

function renderHome() {
  return render(
    <AuthProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("home page", () => {
  it("renders the brand logo and hero headline", () => {
    renderHome();
    expect(screen.getAllByAltText("HUB24").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: /empowering better financial futures, together/i }),
    ).toBeInTheDocument();
  });

  it("switches audience copy from the picker", async () => {
    const user = userEvent.setup();
    renderHome();
    await user.click(screen.getByRole("tab", { name: "Shareholder" }));
    expect(screen.getAllByText(/HUB24 Limited Shareholder Centre/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /open shareholder centre/i }).length).toBeGreaterThan(0);
  });
});

describe("login", () => {
  it("prefills demo credentials", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>,
    );
    expect(screen.getByLabelText("Email")).toHaveValue("adviser@hub24.demo");
    expect(screen.getByLabelText("Password")).toHaveValue("demo");
  });
});
