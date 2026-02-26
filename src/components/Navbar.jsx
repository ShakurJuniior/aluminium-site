import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
// import logo from "../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-5 flex items-center justify-between">
        
        {/* Logo with left shift */}
        <Link to="/" className="flex items-center gap-3 -ml-1.5">
          <img
            // src={logo}
            alt="Agnes Aluminium Logo"
            className="h-8 md:h-10 w-auto object-contain"
          />
          <span className="text-xl font-semibold tracking-tight text-gray-800">
            Agnes Aluminium
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-gray-900 transition-colors duration-200">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-900 transition-colors duration-200">
            Products
          </Link>
          <Link to="/services" className="hover:text-gray-900 transition-colors duration-200">
            Services
          </Link>
          <Link to="/about" className="hover:text-gray-900 transition-colors duration-200">
            About
          </Link>
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="px-6 py-2.5 text-sm font-semibold border border-gray-600 text-gray-800 rounded-xl hover:bg-gray-700 hover:text-white hover:shadow-inner transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-800"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu with slide-down animation */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${open ? 'max-h-96 opacity-100 translate-y-0 visible' : 'max-h-0 opacity-0 -translate-y-2 invisible'}
        `}
      >
        <div className="border-t border-gray-300 bg-gradient-to-b from-gray-100 to-gray-200 px-6 py-6 space-y-6 text-gray-700 font-medium shadow-inner">
          <Link to="/" onClick={() => setOpen(false)} className="block hover:text-gray-900">
            Home
          </Link>
          <Link to="/products" onClick={() => setOpen(false)} className="block hover:text-gray-900">
            Products
          </Link>
          <Link to="/services" onClick={() => setOpen(false)} className="block hover:text-gray-900">
            Services
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block hover:text-gray-900">
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block text-center px-6 py-3 border border-gray-600 rounded-xl hover:bg-gray-700 hover:text-white hover:shadow-inner transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;