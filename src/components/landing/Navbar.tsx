import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 md:py-6">
      <div className="container-wide flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity duration-300"
          aria-label="StayB Home"
        >
          <Logo className="h-7 md:h-8 w-auto" />
        </Link>
        <Link
          to="/photos"
          className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-500"
        >
          Photos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
