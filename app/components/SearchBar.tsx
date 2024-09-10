"use client";

import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

export default function SearchBar() {
  // Track the current OS (if it is macOS or not)
  const [isMacOS, setIsMacOS] = useState<boolean>(true);

  // Track the focus state of the search bar
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Determine the current OS for the keyboard shortcuts
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      setIsMacOS(true);
    } else {
      setIsMacOS(false);
    }
  }, []);

  // Handle the keyboard press to detect the keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        (isMacOS && event.metaKey && event.key === "k") ||
        (!isMacOS && event.ctrlKey && event.key === "k")
      ) {
        event.preventDefault();

        // TODO: Add the search logic
        const searchInput = document.querySelector(
          "input[name='search']"
        ) as HTMLInputElement;

        // Focus on the search input form
        if (searchInput) {
          searchInput.focus();
          setIsFocused(true);
        }
      } else if (event.key === "Escape") {
        const searchInput = document.querySelector(
          'input[name="search"]'
        ) as HTMLInputElement;

        // Unfocus from the search input form
        if (searchInput && isFocused) {
          searchInput.blur();
          setIsFocused(false);
        }
      }
    };

    // Add the event listener to the window
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isMacOS, isFocused]);

  return (
    <>
      <div className="flex items-center gap-2 relative">
        {/* Search Icon */}
        <span className="absolute left-2 opacity-100">
          <SearchIcon />
        </span>

        {/* Search Input */}
        <div className="form-control items-center flex-grow">
          <input
            name="search"
            type="search"
            autoComplete="off"
            spellCheck="true"
            placeholder="Search..."
            aria-label="Search bar here"
            className={`input input-md input-bordered text-sm pl-10 w-42 h-10
              md:w-[18rem] placeholder:opacity-100`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        {/* Keyboard Shortcuts */}
        <span
          className={`absolute right-2 opacity-60 ${isFocused ? "hidden" : ""}`}
        >
          {isMacOS ? (
            <>
              <kbd className="kbd text-sm">&#8984;</kbd>
            </>
          ) : (
            <>
              <kbd className="kbd text-sm">Ctrl</kbd>
            </>
          )}
          <kbd className="kbd text-sm">K</kbd>
        </span>
      </div>
    </>
  );
}
