"use client";

import CloseIcon from "@mui/icons-material/Close";
import SegmentIcon from "@mui/icons-material/Segment";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  toRomanNumeral,
  validateGeneration,
} from "../pokemon/[generation]/lib/utils";

export default function GenerationMenu() {
  // Track the state of the active generation
  const pathname = usePathname();
  const [activeGeneration, setActiveGeneration] = useState(1);

  useEffect(() => {
    const pathSegments = pathname.split("/");
    setActiveGeneration(validateGeneration(pathSegments[2]));
  }, [pathname]);

  // Track the state of the dropdown and its toggle button
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Handle the event that closes the dropdown and changes
  // the icon when clicking outside of the dropdown element
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div
        className="dropdown pl-4"
        aria-label="Dropdown for the generation menu"
        ref={dropdownRef}
      >
        {/* Toggle Button */}
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle opacity-100"
          onClick={handleToggle}
        >
          <label className="swap swap-rotate">
            <input
              name="generation-menu"
              type="checkbox"
              checked={isDropdownOpen}
              onChange={handleToggle}
            />
            <SegmentIcon className="swap-off" />
            <CloseIcon className="swap-on" />
          </label>
        </div>

        {/* Render Dropdown Menu */}
        {isDropdownOpen && (
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content bg-base-100
                rounded-box z-30 mt-3 w-40 p-2 right-0 shadow`}
          >
            {Array.from({ length: 9 }, (_, index) => (
              <li key={index}>
                <Link
                  href={`/pokemon/${index + 1}`}
                  className={`text-sm lg:text-base ${
                    activeGeneration == index + 1 ? "active" : ""
                  }`}
                  aria-label={`Link to the generation ${index + 1} list`}
                >
                  Generation {toRomanNumeral(index + 1)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
