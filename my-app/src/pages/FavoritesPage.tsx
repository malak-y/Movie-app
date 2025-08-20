import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaSadTear, FaPlay, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAppSettings } from "../context/ThemeContext"; // import context

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.favorites.movies);
  const { theme } = useAppSettings(); // get current theme

  const textColor = theme === "dark" ? "text-white" : "text-black";
  const secondaryText = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const cardBg = theme === "dark" ? "bg-[#3a1e1f]" : "bg-gray-200";
  const cardBorder = theme === "dark" ? "border-[#4a2a2b]" : "border-gray-300";

  if (favorites.length === 0)
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${theme === "dark" ? "bg-[#2a1415] text-white" : "bg-white text-black"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-red-900 rounded-full mx-auto flex items-center justify-center">
              <FaSadTear className="text-4xl text-red-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <FaHeart className="text-lg" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            My Favorites
          </h1>
          <p className={`${secondaryText} text-lg mb-8`}>
            Your personal collection is waiting to be filled with cinematic treasures.
          </p>
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            <FaPlus className="text-sm" />
            Explore Movies
          </Link>
        </motion.div>
      </div>
    );

  return (
    <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-gradient-to-b from-[#1a0c0d] to-[#2a1415] text-white" : "bg-white text-black"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              My Favorites
            </h1>
            <p className={secondaryText}>
              {favorites.length} {favorites.length === 1 ? "treasured movie" : "cinematic treasures"}
            </p>
          </div>
          <div className={`hidden md:flex items-center gap-2 ${cardBg} px-4 py-2 rounded-full border ${cardBorder}`}>
            <FaHeart className="text-red-400" />
            <span className="font-semibold">{favorites.length}</span>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative"
            >
              <Link
                to={`/movies/${movie.id}`}
                className="block transform hover:scale-105 transition-transform duration-300"
              >
                <div className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${cardBg}`}>
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : `https://via.placeholder.com/500x750/${theme === "dark" ? "3a1e1f/ffffff" : "e0e0e0/000000"}?text=No+Image`
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-red-600 hover:bg-red-700 p-4 rounded-full transform hover:scale-110 transition-transform duration-200">
                        <FaPlay className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className={`font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-300 transition-colors ${textColor}`}>
                      {movie.title}
                    </h3>
                    <div className={`flex items-center justify-between text-sm ${secondaryText}`}>
                      <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                <FaHeart className="text-xs" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
