import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Leaf } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8" />
              <span className="text-xl font-semibold">M3 Designs </span>
            </Link>
            <p className="text-primary-foreground/80 text-sm">
              Premium eco-friendly packaging solutions for a sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products/bagasse" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Bagasse
                </Link>
              </li>
              <li>
                <Link to="/products/wooden" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Wooden
                </Link>
              </li>
              <li>
                <Link to="/products/paper" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Paper
                </Link>
              </li>
              <li>
                <Link to="/products/plastic" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Plastic
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <span>info@m3designs.com</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                <span>+1 343-989-7877</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                <span>
                  1209 Carfa Crescent
                  <br />
                  Kingston ON K7P 0N2, Canada
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {year} M3 Designs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
