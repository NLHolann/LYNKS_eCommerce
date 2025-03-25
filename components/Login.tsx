import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGoogle,
  faApple,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Login = () => {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const savedCredentials = JSON.parse(
      localStorage.getItem("rememberedCredentials") || "null"
    );
    if (savedCredentials) {
      setIdentifier(savedCredentials.identifier);
      setPassword(savedCredentials.password);
      setRememberPassword(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      setError("Both fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    type User = {
      email: string;
      username: string;
      password: string;
    };

    const user = users.find(
      (user: User) =>
        (user.email.toLowerCase() === identifier.toLowerCase() ||
          user.username.toLowerCase() === identifier.toLowerCase()) &&
        user.password === password
    );

    if (!user) {
      setError("Invalid Email/Username or Password");
      return;
    }

    if (rememberPassword) {
      localStorage.setItem(
        "rememberedCredentials",
        JSON.stringify({ identifier, password })
      );
    } else {
      localStorage.removeItem("rememberedCredentials");
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 bg-gray-50 text-black"
                placeholder="Email or Username"
              />
            </div>
            <div className="mb-6 relative">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faKey}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 bg-gray-50 text-black"
                  placeholder="Password"
                />
                {password && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-600"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      size="sm"
                    />
                  </button>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center transition duration-100">
                  {error}
                </p>
              )}
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberPassword"
                className="mr-2 cursor-pointer"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
              />
              <label
                htmlFor="rememberPassword"
                className="text-sm text-gray-600"
              >
                Remember Password
              </label>
            </div>
            <button
              type="submit"
              className="cursor-pointer select-none w-full py-2 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition duration-200"
            >
              Log In
            </button>

            <div className="mt-4 text-center">
              <a href="#" className="text-purple-700 text-sm hover:underline">
                Forgot Account?
              </a>
              <p className="mt-2 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-purple-700 text-sm hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-4 text-sm">
              Or log in with:
            </p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="cursor-pointer w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </button>
              <button
                type="button"
                className="cursor-pointer w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200"
              >
                <FontAwesomeIcon icon={faGoogle} size="lg" />
              </button>
              <button
                type="button"
                className="cursor-pointer w-12 h-12 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition duration-200"
              >
                <FontAwesomeIcon icon={faApple} className="text-2xl mb-0.5" />
              </button>
              <button
                type="button"
                className="cursor-pointer w-12 h-12 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition duration-200"
              >
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
