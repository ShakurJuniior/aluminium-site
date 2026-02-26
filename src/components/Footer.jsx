import { Factory, FileText, Shield, Users } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 border-t border-gray-300 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 text-gray-800 mb-6">
              <Factory size={32} className="text-gray-600" />
              <h2 className="text-xl font-semibold tracking-tight">Agnes Aluminium Company</h2>
            </div>
            <p className="max-w-sm mb-6 leading-relaxed text-gray-600">
              Delivering high-precision aluminum extrusions and custom profiles for industrial and construction projects worldwide.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Construction & Real Estate</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Solar & Renewable Energy</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Aerospace Engineering</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Automotive Manufacturing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">CAD Drawings Library</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Material Safety Sheets</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Compliance Certifications</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Industrial Whitepapers</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">About Our Facilities</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Leadership Team</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Sustainability Goals</a></li>
              <li><a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Contact Global Sales</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Info */}
        <div className="mt-16 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Agnes Aluminium Company. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-gray-900 transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-gray-900 transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-gray-900 transition-colors" href="#">ISO 9001 Certified</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;