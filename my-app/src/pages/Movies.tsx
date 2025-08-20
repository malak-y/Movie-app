import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaChevronLeft, FaChevronRight, FaFire, FaHeart, FaTrophy, FaCalendar, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSettings } from "../context/ThemeContext"; 

const API_KEY = "3ce38d06cc5f12f46490e99d7965b977";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
};

export default function Movies() {
  const { theme } = useAppSettings(); 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("trending");
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const urlMap: Record<string, string> = {
          trending: `https://api.themoviedb.org/3/trending/movie/week`,
          popular: `https://api.themoviedb.org/3/movie/popular`,
          top_rated: `https://api.themoviedb.org/3/movie/top_rated`,
          upcoming: `https://api.themoviedb.org/3/movie/upcoming`,
        };

        const res = await axios.get(urlMap[filter], {
          params: { api_key: API_KEY, page },
        });

        setMovies(res.data.results);
        setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, filter]);

  if (loading) {
    return (
      <div className={`${theme === "dark" ? "bg-[#2a1415]" : "bg-white"} min-h-screen flex items-center justify-center`}>
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-red-600 mb-4"></div>
          <div className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-xl`}>
            Loading movies...
          </div>
        </div>
      </div>
    );
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bg = theme === "dark" ? "bg-[#2a1415] text-white" : "bg-white text-gray-900";
  const cardBg = theme === "dark" ? "bg-[#3a1e1f]" : "bg-gray-100";
  const hoverBg = theme === "dark" ? "hover:bg-[#4a2a2b]" : "hover:bg-gray-200";
  const inputBg = theme === "dark" ? "bg-[#3a1e1f] text-white placeholder-gray-500" : "bg-gray-100 text-gray-900 placeholder-gray-500";

  return (
    <div className={`${bg} min-h-screen px-4 py-8 md:px-8 md:py-12 transition-colors duration-300`}>
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
          Movies
        </h1>
        <div className="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mt-3 max-w-2xl mx-auto text-sm md:text-base`}>
          Discover the finest collection of films
        </p>

        <div className="mt-6 relative w-full md:w-96 mx-auto">
          <span className="absolute inset-y-0 left-4 flex items-center text-red-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 pl-12 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:shadow-lg transition-all duration-300 transform hover:scale-105 ${inputBg}`}
          />
        </div>
      </header>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[
          { key: "trending", label: "Trending", icon: <FaFire className="mr-2" /> },
          { key: "popular", label: "Popular", icon: <FaHeart className="mr-2" /> },
          { key: "top_rated", label: "Top Rated", icon: <FaTrophy className="mr-2" /> },
          { key: "upcoming", label: "Upcoming", icon: <FaCalendar className="mr-2" /> }
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            className={`px-5 py-3 rounded-full font-medium transition-all duration-300 flex items-center ${filter === key
              ? "bg-red-600 shadow-lg shadow-red-900/30 transform -translate-y-1"
              : `${cardBg} ${hoverBg}`
            }`}
            onClick={() => {
              setFilter(key);
              setPage(1);
            }}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
        {filteredMovies.length === 0 ? (
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-700"} col-span-full text-center mt-10`}>
            No movies found
          </p>
        ) : (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className={`${cardBg} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative`}
            >
              <div className="h-80 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder-movie.jpg"
                  }
                  alt={movie.title}
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-movie.jpg";
                  }}
                />
              </div>

              <div className="absolute top-4 right-4 bg-red-700 text-white text-xs font-bold py-1 px-2 rounded-full flex items-center">
                <FaStar className="mr-1 text-yellow-300" />
                {movie.vote_average.toFixed(1)}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold mb-3 line-clamp-2 h-14">{movie.title}</h3>

                <div className="flex justify-between items-center pt-3 border-t border-[#4a2a2b]">
                  <p className="text-gray-400 text-sm flex items-center">
                    <FaCalendar className="mr-1.5" />
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                  </p>

                  <Link
                    to={`/movies/${movie.id}`}
                    className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          className={`${cardBg} flex items-center gap-2 px-5 py-2.5 rounded-full hover:${hoverBg} disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-[#4a2a2b]`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <FaChevronLeft className="text-sm" /> Previous
        </button>

        <div className="flex items-center gap-2">
          {page > 2 && <span className="px-2 text-gray-400">...</span>}
          {page > 1 && (
            <button
              className={`${cardBg} w-10 h-10 rounded-full hover:${hoverBg} transition-colors`}
              onClick={() => setPage(page - 1)}
            >
              {page - 1}
            </button>
          )}
          <button className={`${cardBg} w-10 h-10 rounded-full bg-red-600 shadow-md`}>
            {page}
          </button>
          {page < totalPages && (
            <button
              className={`${cardBg} w-10 h-10 rounded-full hover:${hoverBg} transition-colors`}
              onClick={() => setPage(page + 1)}
            >
              {page + 1}
            </button>
          )}
          {page < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
        </div>

        <button
          className={`${cardBg} flex items-center gap-2 px-5 py-2.5 rounded-full hover:${hoverBg} disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-[#4a2a2b]`}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
}
