import React from "react";
import aboutImage from "../assets/about_us_image.jpg";
import logo from "../assets/logo.png";

const About = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Hero/Header Section */}
      <div className="text-center py-12 md:py-20 bg-gray-50 rounded-lg mb-8 md:mb-12">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Virtual-Zoana Logo"
            className="h-24 md:h-32 rounded-e-full"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Our Story
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We believe in bringing quality, style, and comfort to every customer.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
        {/* Image Section */}
        <div className="md:w-1/2 rounded-lg overflow-hidden shadow-lg">
          <img
            src={aboutImage}
            alt="Our Team"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            At <span className="text-blue-500 text-2xl">Virtual-Zoana</span>,
            our mission is to provide an effortless shopping experience with a
            focus on high-quality products and exceptional customer service. We
            are passionate about creating a collection that not only looks good
            but also makes you feel great. Every item is carefully selected to
            ensure it meets our standards of quality and design.
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              **Quality**: We source the finest materials to ensure our products
              last.
            </li>
            <li>
              **Integrity**: We are honest and transparent in all our dealings.
            </li>
            <li>
              **Customer Focus**: Our customers are at the heart of everything
              we do.
            </li>
            <li>
              **Innovation**: We constantly seek to improve and offer the latest
              trends.
            </li>
          </ul>
        </div>
      </div>

      {/* Call-to-Action / Footer Section */}
      <div className="text-center py-12 md:py-16 bg-blue-600 text-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Thank you for being a part of our story. We are excited to grow with
          you.
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Explore Products
        </a>
      </div>
    </div>
  );
};

export default About;
