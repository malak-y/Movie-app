import { FaFilm, FaMobileAlt, FaListUl, FaDownload, FaStar } from "react-icons/fa";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "../assets/bg.png";
import { Link } from "react-router-dom";
const API_KEY = "3ce38d06cc5f12f46490e99d7965b977";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week`,
          { params: { api_key: API_KEY } }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-[#2a1415] text-white min-h-screen">
      <section
        className="relative bg-cover bg-center h-[80vh] rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Dive into a World of Cinematic Wonders
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Explore a vast library of movies and TV shows, tailored just for you.
            Experience the magic of storytelling with CineScape.
          </p>
          <Link
  to="/movies"
  className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg text-lg transition-colors"
>
  Start Watching
</Link>
        </div>
      </section>

      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
          Enhance Your Viewing Experience
        </h3>
        <p className="text-gray-300 mb-12 max-w-2xl">
          CineScape offers a range of features designed to make your movie-watching experience seamless and enjoyable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#3a1e1f] p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <FaFilm className="text-red-500 text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Extensive Library</h4>
            <p className="text-gray-300 text-sm">
              Access thousands of movies and TV shows across various genres.
            </p>
          </div>

          <div className="bg-[#3a1e1f] p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <FaMobileAlt className="text-red-500 text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Multi-Device Access</h4>
            <p className="text-gray-300 text-sm">
              Watch on your smartphone, tablet, or smart TV.
            </p>
          </div>

          <div className="bg-[#3a1e1f] p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <FaListUl className="text-red-500 text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Personalized Watchlists</h4>
            <p className="text-gray-300 text-sm">
              Create and manage your personal watchlist for easy access.
            </p>
          </div>

          <div className="bg-[#3a1e1f] p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <FaDownload className="text-red-500 text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Offline Viewing</h4>
            <p className="text-gray-300 text-sm">
              Download your favorite content to watch offline, anytime, anywhere.
            </p>
          </div>
        </div>
      </section>
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Trending Now</h2>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
          Movies Everyone is Talking About
        </h3>

        {movies.length > 0 ? (
          <Slider {...settings}>
            {movies.map((movie) => (
              <div key={movie.id} className="p-2">
                <div className="bg-[#3a1e1f] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{movie.title}</h4>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <FaStar className="text-yellow-400" /> {movie.vote_average}/10
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-gray-400">Loading trending movies...</p>
        )}
      </section>
    </div>
  );
}
