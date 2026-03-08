import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";


import "aos/dist/aos.css";
import Layout from "./components/Layout";

// Web Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import AdminDashboard from "./pages/Admin"; 
import Services from "./pages/Services";
import Login from "./pages/Login";
import ProductDetails from './pages/ProductDetails';
import Quotes from "./pages/Quotes";

import  AuthProvider  from './contexts/AuthProvider';
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: false, easing: "ease-in-out",  });
  }, []);

  return (
    <AuthProvider>
    <Router>
      <Routes>
        Layout wraps all pages
        <Route element={<Layout />}>
          
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Products Page */}
          <Route path="/products" element={<Products />} />

          {/* About Page */}
          <Route path="/about" element={<About />} />

          {/* Quotes Page  */}

          <Route path="/contact" element={<Quotes />} />

          {/* Login Page */}

          <Route path="/login" element={<Login />} />

          {/* Admin Page */}
          <Route path="/admin" element={
            <ProtectedRoute>
            <AdminDashboard />
           </ProtectedRoute>
            }
          />

          {/* Product Details Page */}
          <Route path="/products/:id" element={<ProductDetails />} />

          
          {/* Services Page */}
          <Route path="/services" element={<Services />} />

        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;