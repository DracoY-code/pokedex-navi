"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  // Get the current theme context
  const { theme, changeTheme } = useTheme();

  // Handler to change the theme with the toggle
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    changeTheme?.(newTheme);
  };

  return (
    <>
      <div className="flex justify-center text-center pl-5">
        <label className="btn btn-circle btn-ghost swap swap-rotate">
          <input
            name="theme-toggle"
            type="checkbox"
            checked={theme === "dark"}
            onChange={handleThemeToggle}
          />
          <LightModeIcon className="swap-off" />
          <DarkModeIcon className="swap-on" />
        </label>
      </div>
    </>
  );
}
