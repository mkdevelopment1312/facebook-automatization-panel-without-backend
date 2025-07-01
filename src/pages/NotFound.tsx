import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.info(
      "404 Info: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Oops! Page not found</p>
        <p className="text-lg mb-8 opacity-90">Facebook Lead Hunter - Professional Automation Panel</p>
        <Link 
          to="/" 
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
        >
          ← Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
