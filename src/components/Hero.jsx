const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          
          {/* Badge – fades down */}
          <span 
            data-aos="fade-down"
            className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600/80 border border-blue-200/50 rounded-full px-4 py-1.5 bg-white/60 backdrop-blur-sm shadow-sm"
          >
            Innovation in Metal
          </span>

          {/* Heading – fades up */}
          <h1 
            data-aos="fade-up"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-gray-800"
          >
            Precision Aluminium <br className="hidden lg:block" />
            Solutions for Modern Architecture
          </h1>

          {/* Body text – fades up with slight delay */}
          <p 
            data-aos="fade-up" 
            data-aos-delay="100"
            className="font-sans text-lg text-gray-500 max-w-xl"
          >
            We design and manufacture high-quality aluminium systems 
            built for durability, performance, and refined aesthetics.
          </p>

          {/* Buttons – fade up with more delay */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="200"
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            
            {/* Primary – soft blue */}
            <button className="px-8 py-4 text-sm font-semibold bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-200/50">
              Explore Solutions
            </button>

            {/* Secondary – light outline */}
            <button className="px-8 py-4 text-sm font-semibold border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300">
              View Catalog
            </button>

          </div>
        </div>

        {/* Right Image – fades in from left */}
        <div 
          data-aos="fade-left" 
          data-aos-delay="300"
          className="flex-1 w-full"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/30 p-1 shadow-md hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm">
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