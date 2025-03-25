import { Link } from "react-router-dom";
import LYNKSLogo from "./assets/LYNKS_H.svg";

const HeaderFront = () => {
  return (
    <header className="w-full pl-10 px-4 py-2 sticky top-0 bg-white text-black shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/">
          <img src={LYNKSLogo} alt="LYNKS Logo" className="h-10 invert" />
        </Link>
        <nav className="flex items-center space-x-6">
          <div className="relative">
            <div className="mt-2 text-center">
              <p className="text-sm text-black">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-800 hover:underline transition duration-200"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderFront;
