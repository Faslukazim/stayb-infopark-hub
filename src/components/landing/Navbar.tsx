import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 md:py-6">
      <div className="container-wide">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors duration-500"
        >
          <span className="text-lg md:text-xl font-medium tracking-tight">StayB</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
