import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop"; // fixed typo (was SrollToTop)
import WhatsAppButton from './WhatsAppButton';

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 transition-colors duration-300 font-display">
      
      {/* ScrollToTop always runs */}
      <ScrollToTop />

      {/* Navbar – hidden on admin routes */}
      {!isAdminRoute && <Navbar />}

      {/* Main page content */}
      <main className="flex-1">
        <Outlet />
      </main>


      <WhatsAppButton/>
      {/* Footer – hidden on admin routes */}
      {!isAdminRoute && <Footer />}

    </div>
  );
};

export default Layout;