import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";

const RegisterComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || { username: "User" };
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/login");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Register Completed!</h1>
        <p className="text-lg mb-6">
          Welcome to <b>LYNKS</b>,{" "}
          <span className="font-semibold text-purple-800">{username}</span>.
          Please log in to our website.
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Redirecting to the Login Page in {countdown} seconds.
        </p>
        <p className="text-sm text-gray-600">
          Not redirected?{" "}
          <Link
            to="/login"
            className="text-purple-700 hover:underline transition duration-200"
          >
            Click here
          </Link>{" "}
          to redirect you to Log In.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterComplete;
