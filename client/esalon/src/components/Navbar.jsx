import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") document.documentElement.classList.add("dark");

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "underline font-bold" : "hover:underline";

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "bg-blue-600 shadow-lg" : "bg-blue-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-white">
        <Link to="/" className="text-lg font-bold">
          E-Salon
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {isAuthenticated ? (
            <>
              <span>Hi, {user?.name}</span>

              <NavLink to="/appointments" className={navLinkClass}>
                My Appointments
              </NavLink>

              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>

              {user?.role === "admin" && (
                <NavLink to="/admin" className={navLinkClass}>
                  Admin
                </NavLink>
              )}

              <button
                onClick={() =>
                  confirm("Are you sure you want to log out?") && logout()
                }
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Logout
              </button>

              <button
                onClick={toggleDarkMode}
                className="px-2 py-1 text-xs rounded bg-white text-blue-600 hover:bg-gray-200"
              >
                {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </>
          ) : (
            <>
              <NavLink to="/auth/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/auth/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
