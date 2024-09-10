import Link from "next/link";
import GenerationMenu from "./GenerationMenu";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function NavigationBar() {
  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-20 drop-shadow">
        {/* Start Section */}
        <div className="navbar-start">
          <Link
            href="/pokemon/1"
            className="btn btn-ghost text-xl"
            aria-label="Link to the homepage"
          >
            PokédexNavi<span className="text-xs mt-1">v0.1.0</span>
          </Link>
        </div>

        {/* Center Section */}
        <div className="navbar-center"></div>

        {/* End Section */}
        <div className="navbar-end ">
          <SearchBar />
          <ThemeToggle />
          <GenerationMenu />
        </div>
      </div>
    </>
  );
}
