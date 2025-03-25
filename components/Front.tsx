import { Link } from "react-router-dom";
import HeaderFront from "./HeaderFront";
import Footer from "./Footer";

const Front = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderFront />
      <main className="flex-grow flex flex-col justify-center items-center bg-white text-black">
        <h1 className="text-4xl font-bold mb-6">Welcome to LYNKS</h1>
        <p className="text-lg mb-7">
          Please <b>Log In</b> or <b>Register</b> to continue.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200"
          >
            Register
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Front;
