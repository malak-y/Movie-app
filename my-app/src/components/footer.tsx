import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useAppSettings } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useAppSettings();

  const bg = theme === "dark" ? "bg-[#2a1415]" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-black";
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const iconHover = theme === "dark" ? "hover:text-red-600" : "hover:text-red-600";

  return (
    <footer className={`${bg} ${textPrimary} py-10 mt-16 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-red-600 mb-2">CineScape</h2>
          <p className={`${textSecondary} max-w-xs`}>
            Dive into a world of movies and TV shows. Enjoy your favorite content anytime, anywhere.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 mb-6 md:mb-0 text-center">
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className={`${textSecondary} space-y-1`}>
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className={`${textSecondary} space-y-1`}>
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className={`flex gap-4 text-xl`}>
          <FaFacebookF className={`${iconHover} transition-colors cursor-pointer`} />
          <FaTwitter className={`${iconHover} transition-colors cursor-pointer`} />
          <FaInstagram className={`${iconHover} transition-colors cursor-pointer`} />
          <FaYoutube className={`${iconHover} transition-colors cursor-pointer`} />
        </div>
      </div>

      <div className={`mt-8 border-t ${borderColor} pt-6 text-center ${textSecondary} text-sm`}>
        &copy; {new Date().getFullYear()} CineScape. All rights reserved.
      </div>
    </footer>
  );
}
