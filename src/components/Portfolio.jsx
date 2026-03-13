import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Portfolio = () => {
  const portfolioItems = [
    {
      title: "LongSpan Tiles",
      image: "/longspan.jpg", // Ensure file exists in public folder
      description:
        "Heavy‑gauge aluminium roofing sheets designed for industrial and commercial durability. Available in custom lengths up to 12m.",
    },
    {
      title: "Step Tiles",
      image: "/steptiles.jpg",
      description:
        "Classic step‑shaped roofing tiles that combine timeless appeal with modern weather resistance. Perfect for residential and commercial projects.",
    },
    {
      title: "Stone Tiles",
      image: "/stonetiles.jpeg",
      description:
        "Natural stone‑look aluminium tiles offering the elegance of stone with the lightweight strength of metal. Ideal for facades and feature walls.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className="text-center md:text-left mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-gray-800 mb-4">
            Our Product Portfolio
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mx-auto md:mx-0"></div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Learn more <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View All Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;