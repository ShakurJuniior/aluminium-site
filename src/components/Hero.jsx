const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          
          {/* Metallic badge */}
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-600 border border-gray-300 rounded-full px-4 py-1.5 bg-white/50 backdrop-blur-sm shadow-sm">
            Innovation in Metal
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900">
            Precision Aluminium <br className="hidden lg:block" />
            Solutions for Modern Architecture
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            We design and manufacture high-quality aluminium systems 
            built for durability, performance, and refined aesthetics.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            
            {/* Primary button – metallic filled */}
            <button className="px-8 py-4 text-sm font-semibold bg-gray-800 text-white rounded-xl hover:bg-gray-900 hover:shadow-inner transition-all duration-300 border border-transparent hover:border-gray-700">
              Explore Solutions
            </button>

            {/* Secondary button – outlined with metallic hover */}
            <button className="px-8 py-4 text-sm font-semibold border border-gray-600 text-gray-800 rounded-xl hover:bg-gray-700 hover:text-white hover:shadow-inner transition-all duration-300">
              View Catalog
            </button>

          </div>
        </div>

        {/* Right Image – with metallic frame */}
        <div className="flex-1 w-full">
          <div className="relative overflow-hidden rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-gray-100 to-gray-200 p-1">
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwTBRVB1k-HTUmf_8Z43YMuCszzLtcoXW18f0_8YF1Rq5yfuYg0ZZjnaEQu-dHXYYdAt8vinXOirxTVVZFDQTIzjqmfa8kYe50v9uiSID8iiLFvToPuOcrRPeSGtKm7oe76drObaWzB4R8SUGQoghK8qF0JRR0zi3KYzubSbHxVR2ZxFUCRzdXgEYvuDfTxFFKeho3G8catAt2Z5TrIHijJpB86_6-id8UsJatJdyvKlENl05zZ8J7xrnDGmwDJPRan0r8hIogY40"
                alt="Modern Aluminium Building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;