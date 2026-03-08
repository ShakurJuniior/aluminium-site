import { useState, useEffect } from "react";
import { Link } from "react-router-dom";                // ← add this
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import supabase from "../utils/supabase";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (products.length > 0) {
      console.log('First product image URL:', products[0].image);
    }
  }, [products]);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          specs,
          image_url,
          category:category_id ( name )
        `)
        .order('name');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        const transformed = data.map(item => ({
          ...item,
          category: item.category.name,
          image: item.image_url
        }));
        setProducts(transformed);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Filter products by category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const categories = ["All", "tiles", "aluminium"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-blue-600 text-xl font-mono animate-pulse">Loading products...</div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section (unchanged) */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="max-w-3xl">
            <span
              data-aos="fade-down"
              className="inline-block text-xs font-heading font-semibold tracking-widest uppercase text-blue-600 border border-blue-200 rounded-full px-4 py-1.5 bg-blue-50/80 backdrop-blur-sm shadow-sm mb-6"
            >
              Our Products
            </span>
            <h1
              data-aos="fade-up"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-800 leading-tight"
            >
              Quality aluminium & <br />tile solutions for every project.
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-sans text-lg text-gray-600 mt-6 max-w-2xl"
            >
              From roofing and cladding to industrial profiles, discover our range of durable, precision‑engineered products.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar (unchanged) */}
      <section className="sticky top-20 z-40 py-6 bg-white/70 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-sans font-medium rounded-full transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat === "tiles" ? "Tiles" : cat === "aluminium" ? "Aluminium" : "All"}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-sans text-gray-500">No products found.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-sans font-medium px-3 py-1 rounded-full text-blue-600 border border-blue-200">
                        {product.category === "tiles" ? "Tiles" : "Aluminium"}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="font-sans text-gray-600 text-sm mb-3">
                        {product.description}
                      </p>
                      <p className="font-sans text-xs text-gray-400 mb-4">
                        {product.specs}
                      </p>
                      {/* Replaced button with Link */}
                      <Link
                        to={`/products/${product.id}`}
                        className="w-full px-4 py-2 text-sm font-sans font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-center block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="font-sans text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section (unchanged) */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-200 border-t border-gray-300">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-semibold text-gray-800 mb-4">
            Need a custom solution?
          </h2>
          <p className="font-sans text-gray-600 mb-8">
            Our team can fabricate profiles to your exact specifications. Contact us for a consultation.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Request a Quote
          </a>
        </div>
      </section>
    </main>
  );
};

export default Products;