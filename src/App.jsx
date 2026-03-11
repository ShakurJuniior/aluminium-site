import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Layout from "./components/Layout";
import AuthProvider from './contexts/AuthProvider';
import ProtectedRoute from "./components/ProtectedRoutes";
import NotFound from "./pages/NotFound";

// Lazy load all pages – they will be fetched only when needed
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Services = lazy(() => import("./pages/Services"));
const Login = lazy(() => import("./pages/Login"));
const Quotes = lazy(() => import("./pages/Quotes"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const AdminDashboard = lazy(() => import("./pages/Admin")); // adjust path if needed


// Simple spinner component
const Spinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: false, easing: "ease-in-out" });
  }, []);

  return (
    <AuthProvider>
      <Router>
        {/* Suspense shows a spinner while any lazy page is loading */}
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Quotes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;