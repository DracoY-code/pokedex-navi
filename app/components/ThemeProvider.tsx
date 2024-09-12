"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeContextType } from "../lib/interfaces";

// Create the context to track the current theme
export const ThemeContext = createContext<ThemeContextType>({});

// Function to use this context to update the theme
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Get the current theme and track the theme changes
  const [theme, setTheme] = useState<string>("light");

  // Handle the theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const preferredTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme
      ? savedTheme
      : preferredTheme
      ? "dark"
      : "light";

    // Set the initial theme
    setTheme(initialTheme);

    // Function to change the theme
    const handleThemeChange = () => {
      const newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    };

    // Listen for theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleThemeChange);

    // Cleanup listener on unmount
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleThemeChange);
    };
  }, []);

  // Handle the theme on changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handler to change the theme
  const changeTheme = (nextTheme?: string) => {
    setTheme(nextTheme ?? "light");
    localStorage.setItem("theme", nextTheme ?? "light");
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}
