import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
// import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wraps all pages */}
        <Route element={<Layout />}>
          
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Products Page */}
          {/* <Route path="/products" element={<Products />} /> */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;