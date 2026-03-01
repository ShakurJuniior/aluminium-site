import { useState } from "react";
import { Search, Filter } from "lucide-react";

const Products = () => {
  // Placeholder product data – replace with API call later
  const products = [
    {
      id: 1,
      name: "Curtain Wall Systems",
      category: "Facade",
      description: "Structural glazing systems for modern high-rise buildings with thermal break technology.",
      specs: "Max span: 3m | Thermal performance: U-value 1.2 W/m²K",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6c4mOy_2rshUO9pqpOOw-_UZhJfLLUZVaVFWc0ohSg0_VoPgf646AH9WzvvdZ_zuvm6zBLU4o084g_pfAA6eeZcSvCsblWfEKrxdD7Kku5SgpjU9yyINspFT-K-AfXzeyiFUNR46fZUhhvx3sfjJR-bF5SNTD08CUpY8T_mLKOd7xNBRgo5CHAQdX9TNOHRu7zAFwMDdRuFekGhJf-ZnDuLkth4iPvWonLdgY9Rs-eTV7nOMH1x4JMSjRvpYHK8k_wwnltEhysZk"
    },
    {
      id: 2,
      name: "Minimal Sliding Doors",
      category: "Doors",
      description: "Ultra-slim profile sliding doors for seamless indoor-outdoor transitions.",
      specs: "Max width: 6m | Height up to 3m | Triple glazing option",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7Cm1pMc_55CGJu5ayOrPq0iTImpCk25xN0ZeiKTHzZ5kZjIoxrvN6CGH8VkU4tHu5wIhR8wYTOSh-jdbYS9o5VXfgTkTHpPVQ5Eg6clEgsh4PbKAreaMC8TaQRh_2_5eKlmJqgu4sa5Ca4eHjbvW2ITeA0RxxPBurjT5LUPHC_IRoO-lmHUja8C6OhMkVJ1ptGRcyChm8Ib12Meka9Cfp0Pc3HP2euDvVXUQN907eRVNYp4CMmlRp2L2KkXW79gGxmmseAl3swRA"
    },
    {
      id: 3,
      name: "Performance Louvres",
      category: "Ventilation",
      description: "Adjustable louvre systems for natural ventilation and solar shading.",
      specs: "Blade pitch: 0-90° | Weather-resistant finish",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlG3bMFVKZn2b_U4xZUONNw0-LT3Oxt0zLCb9bLfNw9DEthGsJn6aaCbmFf4DUkv4MHAZt5nzC1zwHlSZWrcoHEEdj8K9UwmINf4Lqdg5UKqi59dchNKQedhydNfRusbNrpBhO9om1lQPv1bL6leqzGSLB26cUxqCZKrEDHJswkGFirQrk24mKQ90tGd7BWRj3W-49lfa4FkmQx7gBywNRekjnHPWPnjldmHkyGOLiEz59pYt1hVaAS5euwIWTE3VfsFHMNGvmFZA"
    },
    {
      id: 4,
      name: "Window Systems",
      category: "Windows",
      description: "Tilt-and-turn, casement, and sliding windows with excellent insulation.",
      specs: "Profile depths: 70-85mm | Multi-chamber thermal break",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format"
    },
    {
      id: 5,
      name: "Balcony Railing",
      category: "Railings",
      description: "Glass and aluminum railing systems for modern balconies.",
      specs: "Tempered glass | Stainless steel fixings",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format"
    },
    {
      id: 6,
      name: "Solar Panel Frames",
      category: "Renewable",
      description: "Lightweight, corrosion-resistant frames for photovoltaic panels.",
      specs: "Custom lengths | Pre-drilled for quick assembly",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format"
    }
  ];

  const categories = ["All", "Facade", "Doors", "Windows", "Ventilation", "Railings", "Renewable"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
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
              Precision aluminium <br />systems for every project.
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-sans text-lg text-gray-600 mt-6 max-w-2xl"
            >
              Explore our range of high‑quality extruded profiles, designed for durability, performance, and architectural beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 py-6 bg-white/70 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-sans font-medium rounded-full transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
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
                      {product.category}
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
                    <button className="w-full px-4 py-2 text-sm font-sans font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section (optional) */}
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