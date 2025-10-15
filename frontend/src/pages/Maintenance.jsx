import React from "react";
import { FaTools } from "react-icons/fa";

const Maintenance = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-900 text-white">
      <FaTools className="text-8xl text-yellow-500 mb-8 animate-bounce" />
      <h1 className="text-5xl font-bold mb-4">Under Maintenance</h1>
      <p className="text-xl text-gray-300 max-w-2xl px-4">
        We're currently performing scheduled maintenance to improve our service.
        We apologize for any inconvenience.
      </p>
      <p className="mt-4 text-lg text-gray-400">
        We'll be back online shortly! Thank you for your patience.
      </p>
    </div>
  );
};

export default Maintenance;
