import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";// Becouse i use Link in Navbar useNavigate, useLocation
import { AppSettingsProvider } from "../context/ThemeContext"; 

describe("Navbar Component", () => {
  function setup() {
    return render(
      <AppSettingsProvider>
        <MemoryRouter > 
          <Navbar />
        </MemoryRouter>
      </AppSettingsProvider>
    );
  }

  test("renders brand name and subtitle", () => {
    setup();
    expect(screen.getByText("CineScape")).toBeInTheDocument();
    expect(screen.getByText("Premium Cinema")).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    setup();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getAllByText("Favorites").length).toBeGreaterThan(0);
  });

  test("toggles mobile menu when hamburger icon is clicked", () => {
    setup();
    const menuButton = screen.getAllByRole("button")[0];
    fireEvent.click(menuButton);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("renders and toggles light/dark mode", () => {
    setup();
    const toggle = screen.getByTitle("Toggle Light/Dark Mode");
    expect(toggle).toBeInTheDocument();

    fireEvent.click(toggle);
    fireEvent.click(toggle); 
  });
});
