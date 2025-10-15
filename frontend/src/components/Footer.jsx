import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10 bottom-0 left-0 right-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MyStore. All rights reserved.
          </p>
        </div>

        <nav>
          <ul className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm font-medium">
            <li>
              <Link
                to="/privacy"
                className="hover:text-teal-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-teal-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
