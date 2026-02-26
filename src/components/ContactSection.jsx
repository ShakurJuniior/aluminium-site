import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Text Info */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-600 border border-gray-300 rounded-full px-4 py-1.5 bg-white/50 backdrop-blur-sm shadow-sm">
                Collaborate
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-800 mt-6">
                Let's build the future together.
              </h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Our technical team is ready to assist with your specifications, CAD drawings, and custom project requirements.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-gray-700">
                <Mail size={20} className="text-gray-500" />
                <span>projects@agnesaluminium.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Phone size={20} className="text-gray-500" />
                <span>+1 (555) 012-3456</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <MapPin size={20} className="text-gray-500" />
                <span>Design District, New York, NY</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-b from-gray-200 to-gray-600 p-8 rounded-2xl border border-gray-300 shadow-md">
            <form action="#" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input 
                    className="peer w-full border border-gray-400 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-800 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-400 outline-none transition" 
                    id="name" 
                    placeholder="Full Name" 
                    type="text"
                  />
                  {/* Label removed - placeholder is enough, but if you want floating label we can keep it. Simpler to use placeholder. */}
                </div>

                <div className="relative">
                  <input 
                    className="peer w-full border border-gray-400 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-800 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-400 outline-none transition" 
                    id="email" 
                    placeholder="Email Address" 
                    type="email"
                  />
                </div>
              </div>

              <div className="relative">
                <input 
                  className="peer w-full border border-gray-400 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-800 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-400 outline-none transition" 
                  id="subject" 
                  placeholder="Project Type" 
                  type="text"
                />
              </div>

              <div className="relative">
                <textarea 
                  className="peer w-full border border-gray-400 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-800 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-400 outline-none transition" 
                  id="message" 
                  placeholder="Tell us about your project" 
                  rows="4"
                ></textarea>
              </div>

              <button 
                className="w-full px-6 py-4 text-sm font-semibold border border-gray-900 text-gray-100 rounded-xl hover:bg-gray-700 hover:text-white hover:shadow-inner transition-all duration-300 flex items-center justify-center gap-2"
                type="submit"
              >
                SEND INQUIRY
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;