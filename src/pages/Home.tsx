import { FaFilm, FaMobileAlt, FaListUl, FaDownload, FaUsers, FaHeart, FaAward } from "react-icons/fa";
import bgImage from "../assets/bg.png";
import { Link } from "react-router-dom";
import { useAppSettings } from "../context/ThemeContext";


export default function Home() {
  const { theme } = useAppSettings();
  

  const bg = theme === "dark" ? "bg-[#2a1415] text-white" : "bg-white text-gray-900";
  const cardBg = theme === "dark" ? "bg-[#3a1e1f]" : "bg-gray-100";
  const hoverBg = theme === "dark" ? "hover:shadow-lg" : "hover:shadow-md";
  const textGray = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const smallTextGray = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`${bg} min-h-screen transition-colors duration-300`}>
      <section
        className="relative bg-cover bg-center h-[80vh] rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className={`text-4xl md:text-6xl font-extrabold mb-4 transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-white"}`}>
  Dive into a World of Cinematic Wonders
</h1>

          <p className={`text-lg md:text-xl mb-6 max-w-2xl ${theme === "dark" ? "text-white" : "text-white"}`}>
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
        <p className={`${textGray} mb-12 max-w-2xl`}>
          CineScape offers a range of features designed to make your movie-watching experience seamless and enjoyable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`${cardBg} p-6 rounded-xl shadow-md transition ${hoverBg}`}>
            <FaFilm className="text-red-500 text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Extensive Library</h4>
            <p className={`${smallTextGray} text-sm`}>
              Access thousands of movies and TV shows across various genres.
              
            </p>
          </div>

          <div className={`${cardBg} p-6 rounded-xl shadow-md transition ${hoverBg}`}>
            <FaMobileAlt className="text-red-500 text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Multi-Device Access</h4>
            <p className={`${smallTextGray} text-sm`}>
              Watch on your smartphone, tablet, or smart TV.
            </p>
          </div>

          <div className={`${cardBg} p-6 rounded-xl shadow-md transition ${hoverBg}`}>
            <FaListUl className="text-red-500 text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Personalized Watchlists</h4>
            <p className={`${smallTextGray} text-sm`}>
              Create and manage your personal watchlist for easy access.
            </p>
          </div>

          <div className={`${cardBg} p-6 rounded-xl shadow-md transition ${hoverBg}`}>
            <FaDownload className="text-red-500 text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Offline Viewing</h4>
            <p className={`${smallTextGray} text-sm`}>
              Download your favorite content to watch offline, anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Why Choose CineScape</h2>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
          The Ultimate Streaming Experience
        </h3>
        <p className={`${textGray} mb-12 max-w-2xl`}>
          Discover why millions of users trust CineScape for their entertainment needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`${cardBg} p-8 rounded-xl shadow-md transition ${hoverBg} flex flex-col items-center text-center`}>
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <FaUsers className="text-red-600 text-2xl" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Community Driven</h4>
            <p className={`${smallTextGray} text-sm`}>
              Join a vibrant community of movie enthusiasts who share reviews, recommendations, and curated lists.
            </p>
          </div>

          <div className={`${cardBg} p-8 rounded-xl shadow-md transition ${hoverBg} flex flex-col items-center text-center`}>
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <FaHeart className="text-red-600 text-2xl" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Personalized For You</h4>
            <p className={`${smallTextGray} text-sm`}>
              Our advanced algorithm learns your preferences to suggest content you'll truly love.
            </p>
          </div>

          <div className={`${cardBg} p-8 rounded-xl shadow-md transition ${hoverBg} flex flex-col items-center text-center`}>
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <FaAward className="text-red-600 text-2xl" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Award-Winning Content</h4>
            <p className={`${smallTextGray} text-sm`}>
              Access critically acclaimed films and exclusive originals that have earned industry recognition.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}