import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import Portfolio from "../components/Portfolio";
import ContactSection from "../components/ContactSection";

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative">
        <Hero />
        {/* Subtle metallic divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
      </section>

      {/* Why Choose Us Section with top padding to separate */}
      <section className="relative pt-16 md:pt-20">
        <WhyChooseUs />
        {/* Divider after section (optional) */}
        <div className="mt-16 md:mt-20 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
      </section>

      {/* Portfolio Section */}
      <section className="relative pt-16 md:pt-20">
        <Portfolio />
        <div className="mt-16 md:mt-20 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
      </section>

      {/* Contact Section – no trailing divider */}
      <section className="relative pt-16 md:pt-20 pb-20">
        <ContactSection />
      </section>
    </main>
  );
};

export default Home;