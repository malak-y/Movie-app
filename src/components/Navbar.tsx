import { useState } from "react";
import {
  FaFilm,
  FaRegBookmark,
  FaBars,
  FaTimes,
  FaHome,
  FaStar,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSettings } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useAppSettings();

  const isActive = (path: string) => location.pathname === path;
  const navBg = theme === "dark" ? "bg-gradient-to-r from-[#2a1415] to-[#3a1e1f]" : "bg-white";
  const navText = theme === "dark" ? "text-white" : "text-black";
  const menuBg = theme === "dark" ? "bg-[#2a1415]" : "bg-gray-100";
  const menuHover = theme === "dark" ? "hover:bg-[#3a1e1f]" : "hover:bg-gray-200";
  const borderColor = theme === "dark" ? "border-[#4a2a2b]" : "border-gray-300";
  const buttonBg = theme === "dark" ? "bg-[#3a1e1f]" : "bg-gray-200";
  const buttonHover = theme === "dark" ? "hover:bg-[#4a2a2b]" : "hover:bg-gray-300";
  const buttonText = theme === "dark" ? "text-gray-300" : "text-black";

  return (
    <nav className={`${navBg} ${navText} px-6 py-4 flex items-center justify-between border-b ${borderColor} shadow-xl relative transition-colors duration-300`}>

      <div className="flex items-center space-x-4">
        <button
          className={`md:hidden ${navText} text-xl p-2 rounded-lg ${buttonHover} transition-colors`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
              <FaFilm className="text-white text-lg" />
            </div>
            <div className="absolute -inset-1 bg-red-400 rounded-xl opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-xl font-bold bg-clip-text text-transparent transition-colors duration-300 ${theme === "dark" ? "bg-white" : "bg-black"
                }`}
            >
              CineScape
            </span>

            <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Premium Cinema
            </span>
          </div>
        </Link>
      </div>
      <div
        className={`flex-col md:flex md:flex-row md:space-x-8 absolute md:static left-0 right-0 top-full w-full md:w-auto transition-all duration-300 z-50 ${isOpen ? "flex" : "hidden"
          } md:items-center ${menuBg} border-t md:border-t-0 ${borderColor}`}
      >
        <Link
          to="/"
          className={`px-6 py-4 md:py-2 md:px-3 flex items-center space-x-2 transition-all duration-300 group ${isActive("/")
            ? "text-red-400 bg-gradient-to-r from-red-900/20 to-transparent border-r-2 border-red-400"
            : `${buttonText} ${menuHover}`
            }`}
          onClick={() => setIsOpen(false)}
        >
          <FaHome
            className={`transition-transform duration-300 ${isActive("/") ? "scale-110" : "group-hover:scale-110"
              }`}
          />
          <span className="font-medium">Home</span>
          {isActive("/") && (
            <div className="w-1 h-1 bg-red-400 rounded-full ml-2"></div>
          )}
        </Link>

        <Link
          to="/movies"
          className={`px-6 py-4 md:py-2 md:px-3 flex items-center space-x-2 transition-all duration-300 group ${isActive("/movies")
            ? "text-red-400 bg-gradient-to-r from-red-900/20 to-transparent border-r-2 border-red-400"
            : `${buttonText} ${menuHover}`
            }`}
          onClick={() => setIsOpen(false)}
        >
          <FaStar
            className={`transition-transform duration-300 ${isActive("/movies") ? "scale-110" : "group-hover:scale-110"
              }`}
          />
          <span className="font-medium">Movies</span>
          {isActive("/movies") && (
            <div className="w-1 h-1 bg-red-400 rounded-full ml-2"></div>
          )}
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className={`relative group flex items-center space-x-2 ${buttonBg} ${buttonHover} px-4 py-2 rounded-xl transition-all duration-300 border ${borderColor} hover:border-red-500/30`}
          onClick={() => {
            navigate("/favorites");
            setIsOpen(false);
          }}
          title="My Favorites"
        >
          <FaRegBookmark className="text-red-400 group-hover:text-red-300 transition-colors" />
          <span className={`text-sm font-medium ${buttonText} hidden md:block`}>Favorites</span>
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative inline-flex items-center justify-between w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
          title="Toggle Light/Dark Mode"
        >
          <span
            className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0"
              }`}
          />
          <Sun className="absolute left-1.5 w-4 h-4 text-yellow-500" />
          <Moon className="absolute right-1.5 w-4 h-4 text-blue-400" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
