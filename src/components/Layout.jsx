import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900  transition-colors duration-300 font-display">
      
      {/* Navbar stays on top of all pages */}
      <Navbar />

      {/* Main page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <Footer />

    </div>
  );
};

export default Layout;