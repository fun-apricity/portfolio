import { motion } from "framer-motion";
import { HiSun, HiMoon } from "react-icons/hi";

/**
 * ThemeToggle — Animated sun/moon toggle button.
 * Expects theme and toggleTheme props from parent.
 */
const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle"
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <motion.div
        key={theme}
        initial={{ y: -10, opacity: 0, rotate: -90 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 10, opacity: 0, rotate: 90 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <HiSun className="text-lg" />
        ) : (
          <HiMoon className="text-lg" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
