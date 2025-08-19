import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2a1415] text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-red-600 mb-2">CineScape</h2>
          <p className="text-gray-300 max-w-xs">
            Dive into a world of movies and TV shows. Enjoy your favorite content anytime, anywhere.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 mb-6 md:mb-0 text-center">
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="text-gray-300 space-y-1">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="text-gray-300 space-y-1">
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="flex gap-4 text-white text-xl">
          <FaFacebookF className="hover:text-red-600 transition-colors cursor-pointer" />
          <FaTwitter className="hover:text-red-600 transition-colors cursor-pointer" />
          <FaInstagram className="hover:text-red-600 transition-colors cursor-pointer" />
          <FaYoutube className="hover:text-red-600 transition-colors cursor-pointer" />
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} CineScape. All rights reserved.
      </div>
    </footer>
  );
}
