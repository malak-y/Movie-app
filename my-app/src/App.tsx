import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import PreferencesPage from "./pages/Preferencespage";
import Footer from "./components/footer";
import { useAppSettings } from "./context/ThemeContext";

function App() {
  const { theme } = useAppSettings();

  const appBg = theme === "dark" ? "bg-[#2a1415] text-white" : "bg-white text-gray-900";
  return (
    <div className={`min-h-screen transition-colors duration-300 ${appBg}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<FavoritesPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
