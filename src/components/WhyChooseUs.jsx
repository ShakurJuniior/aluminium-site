const WhyChooseUs = () => {
  const features = [
    {
      title: "Architectural Precision",
      description: "Engineered to micron-level accuracy.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Sustainability",
      description: "100% recyclable aluminum systems.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "Custom Fabrication",
      description: "Tailored solutions for modern builds.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    },
    {
      title: "Rapid Delivery",
      description: "Fast turnaround for major projects.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50/50 to-gray-100/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Optional section heading if needed */}
        {/* <h2 className="text-3xl font-semibold text-gray-800 mb-10">Why Choose Us</h2> */}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl border border-gray-300 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden p-6"
            >
              {/* Metallic shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Icon */}
              <div className="text-gray-700 mb-4 group-hover:text-gray-900 transition-colors">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2 relative inline-block">
                {feature.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-400 group-hover:w-full transition-all duration-300"></span>
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;