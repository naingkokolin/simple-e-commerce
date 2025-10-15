// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
      <h1 className="text-9xl font-extrabold text-blue-600 tracking-wider animate-bounce">
        {/* Added animate-bounce here */}
        404
      </h1>
      <p className="mt-4 text-3xl font-semibold text-gray-800">
        Page Not Found
      </p>
      <p className="mt-2 text-gray-600">
        The page you're looking for doesn't exist!
      </p>
      <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to="/"
          className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 text-lg font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-300"
        >
          View Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
