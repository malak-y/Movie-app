import { render, screen } from "@testing-library/react";
import Footer from "../components/footer";
import { AppSettingsProvider } from "../context/ThemeContext";

describe("Footer Component", () => {
  test("renders brand name", () => {
    render(
      <AppSettingsProvider>
        <Footer />
      </AppSettingsProvider>
    );

    expect(screen.getByText("CineScape")).toBeInTheDocument();
  });
});
