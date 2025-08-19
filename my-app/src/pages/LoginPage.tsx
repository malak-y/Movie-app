import { useAuth0 } from "@auth0/auth0-react";
import { FaFilm, FaStar, FaHeart, FaTicketAlt, FaPlayCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0c0d] via-[#2a1415] to-[#3a1e1f] flex flex-col items-center justify-center text-white p-6">
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Welcome Back! 🎬
          </h1>
          <p className="text-gray-300 text-lg mb-8">
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a0c0d] via-[#2a1415] to-[#3a1e1f] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-8 bg-black/20"></div>
        <div className="absolute right-0 top-0 h-full w-8 bg-black/20"></div>
  
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/5 text-red-500/20 text-6xl"
        >
          <FaFilm />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute top-2/3 right-1/4 text-red-500/20 text-5xl"
        >
          <FaStar />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          className="absolute top-1/3 right-1/5 text-red-500/20 text-4xl"
        >
          <FaHeart />
        </motion.div>
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
            <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto shadow-2xl mb-4">
              <FaFilm className="text-4xl text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
              CineScape
            </h1>
            <p className="text-gray-400 text-sm">Your cinematic journey begins here</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-semibold text-white mb-4">
              Welcome to the Ultimate Movie Experience 🎥
            </h2>
            <p className="text-gray-300 leading-relaxed">
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
            <div className="bg-[#3a1e1f] p-4 rounded-xl border border-[#4a2a2b]">
              <FaHeart className="text-red-400 text-xl mx-auto mb-2" />
              <p className="text-sm text-gray-300">Save Favorites</p>
            </div>
            <div className="bg-[#3a1e1f] p-4 rounded-xl border border-[#4a2a2b]">
              <FaStar className="text-yellow-400 text-xl mx-auto mb-2" />
              <p className="text-sm text-gray-300">Rate Movies</p>
            </div>
            <div className="bg-[#3a1e1f] p-4 rounded-xl border border-[#4a2a2b]">
              <FaTicketAlt className="text-green-400 text-xl mx-auto mb-2" />
              <p className="text-sm text-gray-300">Watchlist</p>
            </div>
            <div className="bg-[#3a1e1f] p-4 rounded-xl border border-[#4a2a2b]">
              <FaPlayCircle className="text-blue-400 text-xl mx-auto mb-2" />
              <p className="text-sm text-gray-300">Trailers</p>
            </div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-800 px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 group-hover:from-gray-100 group-hover:to-white transition-all duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-6 h-6"
              />
              <span className="text-lg">Sign in with Google</span>
            </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-gray-500 text-sm mt-6"
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </motion.p>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a0c0d] to-transparent"></div>
    </div>
  );
}