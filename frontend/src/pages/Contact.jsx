import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Contact Form Section */}
      <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          We'd love to hear from you! Please fill out the form below and we'll
          get back to you as soon as possible.
        </p>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="md:w-1/2 bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Details</h2>
        <div className="space-y-6 text-gray-700 mb-6">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-blue-500 text-xl" />
            <span>No.5, Yaw Min Gyi Street, Yangon, Myanmar</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhone className="text-blue-500 text-xl" />
            <span>+95 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-blue-500 text-xl" />
            <span>info@virtual-zoana.com</span>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-auto h-64 w-full bg-gray-300 rounded-lg overflow-hidden">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1018.1145052084293!2d96.15771565627033!3d16.783082558454854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1edc84007e50f%3A0x2ca106b6ab0c4bc4!2sPearl%20Business%20Center!5e1!3m2!1sen!2smm!4v1758276994049!5m2!1sen!2smm"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
