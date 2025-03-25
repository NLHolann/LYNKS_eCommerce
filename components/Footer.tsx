import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-white text-black py-3 border-t border-gray-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-700 text-sm mb-2 md:mb-0 text-left">
          © {new Date().getFullYear()}{" "}
          <Link
            to="/"
            className="text-sm hover:underline hover:text-purple-600 transition duration-200"
          >
            LYNKS
          </Link>
          . All Rights Reserved <br /> Your Link to Unparalleled Elegance
        </p>
        <div className="flex justify-center md:justify-end space-x-7">
          <Link
            to="/about"
            className="text-sm hover:underline hover:text-purple-600 transition duration-200"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-sm hover:underline hover:text-purple-600 transition duration-200"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            className="text-sm hover:underline hover:text-purple-600 transition duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-sm hover:underline hover:text-purple-600 transition duration-200"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
