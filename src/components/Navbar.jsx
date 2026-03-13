  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { Menu, X } from "lucide-react";

  const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
      <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-gray-900 to-gray-800 border-b border-gray-700 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-5 flex items-center justify-between">
          
          {/* Logo – removed negative margin */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo/nav.png" 
              alt="logo" 
              className="h-8 md:h-10 w-auto " 
            />
            <span className="font-heading text-xl font-semibold tracking-tight text-white">
              Agnes Aluminium
            </span>
          </Link>

          {/* Desktop Nav (unchanged) */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-300">
            <Link to="/" className="font-sans hover:text-blue-400 transition-colors duration-200">
              Home
            </Link>
            <Link to="/products" className="font-sans hover:text-blue-400 transition-colors duration-200">
              Products
            </Link>
            <Link to="/services" className="font-sans hover:text-blue-400 transition-colors duration-200">
              Services
            </Link>
            <Link to="/about" className="font-sans hover:text-blue-400 transition-colors duration-200">
              About
            </Link>
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Link to
            ="/contact"
              className="font-sans px-6 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-blue-500/20"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu (unchanged) */}
        <div
          className={`
            absolute left-0 right-0 top-full md:hidden overflow-hidden transition-all duration-700 ease-in-out
            ${open ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
            bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700 shadow-xl
          `}
        >
          <div className="px-6 py-6 space-y-6 text-gray-200 font-medium">
            <Link to="/" onClick={() => setOpen(false)} className="font-sans block hover:text-blue-400">
              Home
            </Link>
            <Link to="/products" onClick={() => setOpen(false)} className="font-sans block hover:text-blue-400">
              Products
            </Link>
            <Link to="/services" onClick={() => setOpen(false)} className="font-sans block hover:text-blue-400">
              Services
            </Link>
            <Link to="/about" onClick={() => setOpen(false)} className="font-sans block hover:text-blue-400">
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="font-sans block text-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-md"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </header>
    );
  };

  export default Navbar;