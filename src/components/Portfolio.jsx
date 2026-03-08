const Portfolio = () => {
  const portfolioItems = [
    {
      title: "LongSpan tiles",
      image: "longspan.jpg"
    },
    {
      title: "Step tiles",
      image: "steptiles.jpg"
    },
    {
      title: "Stone tiles",
      image: "stonetiles.jpg"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-300 to-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section heading – Montserrat, dark gray */}
        <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-gray-800 mb-4">
          Our Product Portfolio
        </h2>
        {/* Blue accent line */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mb-12"></div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl border border-gray-300 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Blue-tinted shine overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Image container with light border */}
              <div className="relative m-1 rounded-xl overflow-hidden border border-gray-300 bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Title with animated blue underline on hover */}
              <div className="p-5">
                <h4 className="font-heading text-xl font-semibold text-gray-700 relative inline-block">
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;