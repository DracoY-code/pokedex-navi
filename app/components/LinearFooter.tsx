import GitHubIcon from "@mui/icons-material/GitHub";

export default function LinearFooter() {
  return (
    <>
      <footer className="footer footer-center bg-base-100 text-base-content p-4">
        <aside className="grid-flow-col items-center pb-4">
          <a
            href="https://github.com/DracoY-code/pokedex-navi"
            target="_blank"
            rel="author"
            aria-label="Link to the GitHub repository"
            className="flex items-center space-x-2"
          >
            <GitHubIcon />
            <span className="text-xs">DracoY-code/pokedex-navi</span>
          </a>
        </aside>
      </footer>
    </>
  );
}
