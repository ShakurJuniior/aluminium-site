import { Factory, FileText, Shield, Users } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 border-t border-gray-300 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12 md:py-16">
        {/* Main grid: 1 column on mobile, 2 on tablet, 5 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">
          
          {/* Company Info - spans 2 columns on desktop */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-gray-800">
              <Factory size={32} className="text-gray-600" />
              <h2 className="text-xl font-semibold tracking-tight">Agnes Aluminium Company</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-gray-600 max-w-md">
              Delivering high-precision aluminum extrusions and custom profiles for industrial and construction projects worldwide.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-4">Solutions</h4>
            <ul className="space-y-3 text-sm">
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">Construction & Real Estate</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">Solar & Renewable Energy</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">Aerospace Engineering</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">Automotive Manufacturing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">CAD Drawings Library</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">Material Safety Sheets</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">Compliance Certifications</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">Industrial Whitepapers</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">About Our Facilities</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">Leadership Team</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">Sustainability Goals</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="#">Contact Global Sales</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 md:mt-16 pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Agnes Aluminium Company. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <span className="whitespace-nowrap">CAC Certified</span>
            <span className="whitespace-nowrap">Powered by Lithe Integrated Services Ltd</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;