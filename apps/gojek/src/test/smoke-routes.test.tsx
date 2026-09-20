import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import HomePage from "@/pages/Home";
import CareersPage from "@/pages/Careers";
import LoginPage from "@/pages/Login";

describe("marketing routes", () => {
  it("renders the gojek.io hero headline", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthProvider>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("3 Countries.");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("on-demand platform.");
  });

  it("lists open jobs on Join us", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <CareersPage />
        </MemoryRouter>
      </AuthProvider>,
    );
    expect(screen.getByText(/open jobs found/)).toBeInTheDocument();
    expect(screen.getByText(/Lead Data Scientist - Search/)).toBeInTheDocument();
  });

  it("prefills demo credentials on login", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );
    expect(screen.getByLabelText("Email")).toHaveValue("demo@gojek.io");
  });
});
