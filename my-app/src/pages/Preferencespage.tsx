import { useAppSettings } from "../context/ThemeContext"; // <-- import context
import { FaBell, FaMoon, FaSun, FaPalette } from "react-icons/fa";

export default function PreferencesPage() {
  const { theme, setTheme } = useAppSettings(); // only theme

  const bg = theme === "dark" ? "bg-[#2a1415] text-white" : "bg-white text-gray-900";
  const inputBg = theme === "dark" ? "bg-[#2a1415] border-[#3a1e1f] text-white" : "bg-white border-gray-300 text-gray-900";
  const hoverBg = theme === "dark" ? "hover:bg-[#3a1e1f]" : "hover:bg-gray-200";

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${bg}`}>
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Preferences & Settings</h1>
          <p className="text-gray-400">Customize your app experience to match your style.</p>
        </div>

        {/* Theme Switch */}
        <div className={`rounded-xl p-6 border ${inputBg} space-x-4`}>
          <button
            className={`px-4 py-2 rounded-full transition ${theme === "dark" ? "bg-red-600 text-white" : `${inputBg} ${hoverBg}`}`}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
          <button
            className={`px-4 py-2 rounded-full transition ${theme === "light" ? "bg-red-600 text-white" : `${inputBg} ${hoverBg}`}`}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={`p-6 rounded-xl border ${inputBg} flex flex-col items-center space-y-4`}>
            <FaPalette size={40} />
            <h2 className="text-xl font-semibold">Appearance</h2>
            <p className="text-center text-gray-400">Choose colors, themes, and fonts that suit you.</p>
          </div>

          <div className={`p-6 rounded-xl border ${inputBg} flex flex-col items-center space-y-4`}>
            <FaBell size={40} />
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-center text-gray-400">Manage notification settings and alerts.</p>
          </div>

          <div className={`p-6 rounded-xl border ${inputBg} flex flex-col items-center space-y-4`}>
            <FaSun size={40} />
            <h2 className="text-xl font-semibold">Display</h2>
            <p className="text-center text-gray-400">Adjust brightness, dark mode, and contrast.</p>
          </div>

          <div className={`p-6 rounded-xl border ${inputBg} flex flex-col items-center space-y-4`}>
            <FaMoon size={40} />
            <h2 className="text-xl font-semibold">Night Mode</h2>
            <p className="text-center text-gray-400">Enable night mode for better sleep at night.</p>
          </div>
        </div>

        {/* Tips Section */}
        <div className={`rounded-xl p-6 border ${inputBg}`}>
          <h2 className="text-2xl font-bold mb-4">Tips & Tricks</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Switch themes to reduce eye strain.</li>
            <li>Enable notifications to stay updated.</li>
            <li>Customize your layout to enhance productivity.</li>
            <li>Use night mode for comfortable reading at night.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
