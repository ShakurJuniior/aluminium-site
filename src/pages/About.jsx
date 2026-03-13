import { Users, Target, Award, Truck, Factory, CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import {Link} from 'react-router-dom';
const About = () => {
  const stats = [
    { value: "25+", label: "Years Excellence" },
    { value: "500+", label: "Projects Completed" },
    { value: "50+", label: "Global Partners" },
    { value: "100%", label: "Recyclable Materials" },
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Engineering",
      desc: "Micron‑level accuracy in every extrusion.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assured",
      desc: "CAC Certified.",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Reliable Delivery",
      desc: "On‑time, worldwide.",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Sustainable Future",
      desc: "100% recyclable aluminium.",
    },
  ];

  const team = [
    { name: "Kelechi Nwokejiezi(Dr Agnes Nwanma)", role: "Chief Executive Officer", image: "/Ceo.png" },
    { name: "Nnachi Chukwuemeka Augustine", role: "Production Manager", image: "/prod.png" },
    { name: "Akudo Chinyere", role: "Accountant", image: "/acount.png" },
  ];

  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="max-w-3xl">
            <span
              data-aos="fade-down"
              className="inline-block text-xs font-heading font-semibold tracking-widest uppercase text-blue-600 border border-blue-200 rounded-full px-4 py-1.5 bg-blue-50/80 backdrop-blur-sm shadow-sm mb-6"
            >
              About Agnes Aluminium
            </span>
            <h1
              data-aos="fade-up"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-800 leading-tight"
            >
              Crafting the future <br className="hidden sm:block" />with precision aluminium.
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-sans text-lg text-gray-600 mt-6 max-w-2xl"
            >
              From our base in Aba, Nigeria, we serve the world with high‑quality extruded aluminium profiles tailored to industrial and architectural needs.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white/50 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 50}
                className="text-center"
              >
                <div className="font-heading text-2xl md:text-4xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="font-sans text-xs md:text-sm text-gray-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 font-sans text-gray-600">
                <p>
                  Founded in November 2022, Agnes Aluminium began as a small fabrication shop in Aba, Abia State. Today, we are a trusted name in aluminium extrusion, supplying industries from construction to renewable energy.
                </p>
                <p>
                  Our commitment to quality, innovation, and sustainability has driven our growth. We combine local expertise with global standards, delivering profiles that architects and engineers rely on.
                </p>
                <p>
                  We are proud to be 100% Nigerian‑owned and to contribute to the country's industrial development.
                </p>
              </div>
            </div>
            <div data-aos="fade-left" className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <img
                  src="/about/image.png"
                  alt="Aluminium factory"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 hidden md:block">
                <Factory className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2
              data-aos="fade-up"
              className="font-heading text-3xl md:text-4xl font-semibold text-gray-800 mb-4"
            >
              Our Mission & Values
            </h2>
            <p data-aos="fade-up" data-aos-delay="50" className="font-sans text-gray-600">
              We exist to provide precision aluminium solutions that empower industries and respect the planet.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="text-blue-500 mb-4 group-hover:text-blue-600 transition-colors">
                  {value.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-gray-600">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h2
            data-aos="fade-up"
            className="font-heading text-3xl md:text-4xl font-semibold text-gray-800 mb-4 text-center"
          >
            Meet the Leaders
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="50"
            className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12 md:mb-16"
          >
            Experienced professionals driving innovation and quality.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="group bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users size={32} className="text-blue-500" />
                  )}
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="font-sans text-sm text-blue-600 mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <span className="inline-block text-xs font-heading font-semibold tracking-widest uppercase text-blue-600 border border-blue-200 rounded-full px-4 py-1.5 bg-blue-50/80 backdrop-blur-sm shadow-sm mb-4">
                Our Locations
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                Visit Our Facilities in Aba
              </h2>
              <div className="space-y-4 font-sans text-gray-600">
                <p>
                  We are proudly based in the industrial heart of Abia State, serving clients locally and globally.
                </p>
                {/* Main Branch */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-700">Main Branch:</span>
                    <span className="block break-words">Km 7 Aba-Enugu Express Road, Osisioma, Aba, Abia State, Nigeria</span>
                  </div>
                </div>
                {/* Second Branch */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-700">Second Branch:</span>
                    <span className="block break-words">
                      Km 20 Aba/PH Expressway, Iriegbe Akashi bus stop, Obiakpor LGA, beside Earthwall filling station
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>08136807728 (Call)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <a href="mailto:projects@agnesaluminium.com" className="hover:text-blue-600 transition-colors">
                    info@agnesaluminium.com.ng
                  </a>
                </div>
              </div>
            </div>
            <div data-aos="fade-left" className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-64 md:h-80 lg:h-96">
              <iframe
                title="Agnes Aluminium Main Location"
                src="https://www.google.com/maps?q=Km+7+Aba-Enugu+Express+Road+Osisioma+Aba+Abia+Nigeria&output=embed"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-200 to-gray-100 border-t border-gray-300">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            data-aos="fade-up"
            className="font-heading text-3xl md:text-4xl font-semibold text-gray-800 mb-4"
          >
            Ready to start your next project?
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="50"
            className="font-sans text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Contact our technical team for a consultation or request a quote.
          </p>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to ="/contact"
              className="px-8 py-4 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-200/50"
            >
              Get a Quote
            </Link>
            <a
              href="https://wa.me/2348167195073"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-sm font-semibold border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;