import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/10 backdrop-blur-xl supports-[backdrop-filter]:bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Leaf className="w-8 h-8 text-primary transition-transform group-hover:rotate-12" />
            <span className="text-xl font-semibold text-foreground drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
              M3 Design
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get Quote
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground rounded-lg bg-white/20 border border-white/25 hover:bg-white/30 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-up rounded-2xl border border-white/20 bg-white/15 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 px-3 text-sm font-medium transition-colors rounded-md hover:text-primary hover:bg-white/25 ${
                  isActive(link.path) ? "text-primary" : "text-foreground/80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* <Button size="sm" className="w-full mt-4 bg-primary hover:bg-primary/90">
              Get Quote
            </Button> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
