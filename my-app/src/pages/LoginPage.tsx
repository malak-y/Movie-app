import { useAuth0 } from "@auth0/auth0-react";
import { FaFilm, FaStar, FaHeart, FaTicketAlt, FaPlayCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAppSettings } from "../context/ThemeContext"; // <-- import context

export default function LoginPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
const { theme } = useAppSettings(); // get current theme from context

  const textColor = theme === "dark" ? "text-white" : "text-black";
  const secondaryText = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const cardBg = theme === "dark" ? "bg-[#3a1e1f]" : "bg-gray-200";
  const cardBorder = theme === "dark" ? "border-[#4a2a2b]" : "border-gray-300";

  if (isAuthenticated) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${theme === "dark" ? "bg-gradient-to-br from-[#1a0c0d] via-[#2a1415] to-[#3a1e1f]" : "bg-white"}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className={`text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent`}>
            Welcome Back! 🎬
          </h1>
          <p className={`${secondaryText} text-lg mb-8`}>
            You're already enjoying the CineScape experience
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.location.href = '/movies'}
          >
            Continue to Movies
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const handleGoogleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
      },
    });
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === "dark" ? "bg-gradient-to-br from-[#1a0c0d] via-[#2a1415] to-[#3a1e1f]" : "bg-white"}`}>
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-8 bg-black/20"></div>
        <div className="absolute right-0 top-0 h-full w-8 bg-black/20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mx-auto shadow-2xl mb-4 ${theme === "dark" ? "bg-gradient-to-r from-red-600 to-red-800" : "bg-red-200"}`}>
              <FaFilm className={`text-4xl ${theme === "dark" ? "text-white" : "text-red-600"}`} />
            </div>
            <h1 className={`text-5xl font-bold mb-2 ${textColor}`}>
              CineScape
            </h1>
            <p className={`${secondaryText} text-sm`}>Your cinematic journey begins here</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className={`text-3xl font-semibold mb-4 ${textColor}`}>
              Welcome to the Ultimate Movie Experience 🎥
            </h2>
            <p className={`${secondaryText} leading-relaxed`}>
              Join our community of film enthusiasts. Save your favorites, get personalized recommendations, 
              and never miss a masterpiece.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { icon: <FaHeart className={`text-red-400 text-xl mx-auto mb-2`} />, text: "Save Favorites" },
              { icon: <FaStar className={`text-yellow-400 text-xl mx-auto mb-2`} />, text: "Rate Movies" },
              { icon: <FaTicketAlt className={`text-green-400 text-xl mx-auto mb-2`} />, text: "Watchlist" },
              { icon: <FaPlayCircle className={`text-blue-400 text-xl mx-auto mb-2`} />, text: "Trailers" },
            ].map((item, idx) => (
              <div key={idx} className={`${cardBg} p-4 rounded-xl border ${cardBorder}`}>
                {item.icon}
                <p className={`text-sm ${secondaryText}`}>{item.text}</p>
              </div>
            ))}
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-800 px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-lg">Sign in with Google</span>
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`${secondaryText} text-sm mt-6`}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </motion.p>
        </motion.div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-32 ${theme === "dark" ? "bg-gradient-to-t from-[#1a0c0d] to-transparent" : "bg-gradient-to-t from-white to-transparent"}`}></div>
    </div>
  );
}
