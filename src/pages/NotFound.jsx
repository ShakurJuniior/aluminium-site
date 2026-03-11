import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex p-4 bg-blue-50 rounded-full mb-6">
          <AlertTriangle size={48} className="text-blue-600" />
        </div>

        {/* Heading */}
        <h1 className="font-heading text-6xl md:text-7xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="font-sans text-gray-600 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Home button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;