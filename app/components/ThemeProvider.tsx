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

    // Set and apply the initial theme
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    // Function to change the theme
    const handleThemeChange = () => {
      const newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setTheme(newTheme);
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
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handler to change the theme
  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}
