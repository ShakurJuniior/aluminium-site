import { 
  Building2, 
  Maximize2, 
  Wind, 
  Shield, 
  Sun, 
  Cog, 
  ArrowRight,
  CheckCircle2 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Building2 className="w-10 h-10" strokeWidth={1.5} />,
      title: "Curtain Wall Systems",
      description: "Structural glazing and unitised systems for high‑rise buildings, offering thermal efficiency and sleek aesthetics.",
      features: ["Thermal break technology", "Custom designs", "Weather resistant"]
    },
    {
      icon: <Maximize2 className="w-10 h-10" strokeWidth={1.5} />,
      title: "Sliding & Folding Doors",
      description: "Minimal‑profile sliding and folding doors that create seamless indoor‑outdoor transitions.",
      features: ["Slim sightlines", "Heavy‑duty rollers", "Multi‑point locking"]
    },
    {
      icon: <Wind className="w-10 h-10" strokeWidth={1.5} />,
      title: "Windows & Ventilation",
      description: "Tilt‑and‑turn, casement, and sliding windows with excellent insulation and security.",
      features: ["Multi‑chamber profiles", "Acoustic glazing", "Concealed hinges"]
    },
    {
      icon: <Shield className="w-10 h-10" strokeWidth={1.5} />,
      title: "Balcony Railings",
      description: "Glass and aluminum railing systems for modern balconies, combining safety with unobstructed views.",
      features: ["Tempered glass", "Stainless steel fixings", "Custom heights"]
    },
    {
      icon: <Sun className="w-10 h-10" strokeWidth={1.5} />,
      title: "Solar Panel Framing",
      description: "Lightweight, corrosion‑resistant frames for photovoltaic panels, designed for easy installation.",
      features: ["Pre‑drilled holes", "UV‑stable coating", "Custom lengths"]
    },
    {
      icon: <Cog className="w-10 h-10" strokeWidth={1.5} />,
      title: "Industrial Profiles",
      description: "Custom aluminium extrusions for machinery, conveyors, and industrial applications.",
      features: ["Complex cross‑sections", "High‑strength alloys", "Precision cutting"]
    }
  ];

  const process = [
    { step: "Consultation", desc: "We discuss your project requirements and technical specs." },
    { step: "Design", desc: "Our engineers create CAD drawings and profile designs." },
    { step: "Fabrication", desc: "Precision extrusion and finishing in our Aba facility." },
    { step: "Delivery", desc: "Timely delivery to your site anywhere in Nigeria." },
  ];

  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="max-w-3xl">
            <span
              data-aos="fade-down"
              className="inline-block text-xs font-heading font-semibold tracking-widest uppercase text-blue-600 border border-blue-200 rounded-full px-4 py-1.5 bg-blue-50/80 backdrop-blur-sm shadow-sm mb-6"
            >
              Our Services
            </span>
            <h1
              data-aos="fade-up"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-800 leading-tight"
            >
              Comprehensive aluminium <br />solutions for every industry.
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-sans text-lg text-gray-600 mt-6 max-w-2xl"
            >
              From architectural glazing to industrial profiles, we deliver precision‑engineered aluminium systems backed by decades of expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white/50 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              data-aos="fade-up"
              className="font-heading text-3xl md:text-4xl font-semibold text-gray-800 mb-4"
            >
              What We Offer
            </h2>
            <p data-aos="fade-up" data-aos-delay="50" className="font-sans text-gray-600">
              Tailored solutions that combine performance, durability, and design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="text-blue-500 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="font-sans text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                      <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="font-sans">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1 text-sm font-sans font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Inquire <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              data-aos="fade-up"
              className="font-heading text-3xl md:text-4xl font-semibold text-gray-800 mb-4"
            >
              How We Work
            </h2>
            <p data-aos="fade-up" data-aos-delay="50" className="font-sans text-gray-600">
              From concept to completion – a seamless process tailored to your project.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="relative text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-heading font-bold">
                  {index + 1}
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-800 mb-2">
                  {step.step}
                </h3>
                <p className="font-sans text-sm text-gray-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-200 to-gray-100 border-t border-gray-300">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            data-aos="fade-up"
            className="font-heading text-3xl md:text-4xl font-semibold text-gray-800 mb-4"
          >
            Ready to discuss your project?
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="50"
            className="font-sans text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Our technical team is here to help – from custom designs to large‑scale fabrication.
          </p>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/contact"
              className="px-8 py-4 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Get a Quote
            </a>
            <a
              href="/products"
              className="px-8 py-4 text-sm font-semibold border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
            >
              View Products
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;