import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSearch,
  faUserCircle,
  faSignOutAlt,
  faGear,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import LYNKSLogo from "./assets/LYNKS_H.svg";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [notifications] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState<{ username: string } | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isDropdownOpen
      ) {
        setIsDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node) &&
        isProfileDropdownOpen
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target as Node) &&
        isNotificationDropdownOpen
      ) {
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen, isProfileDropdownOpen, isNotificationDropdownOpen]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    setLoggedInUser(user);
  }, []);

  return (
    <header className="sticky top-0 bg-white text-black shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/home">
          <img src={LYNKSLogo} alt="LYNKS Logo" className="h-10 invert" />
        </Link>

        <div className="flex items-center w-1/3 relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search LYNKS"
            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-purple-700 focus:ring-1 focus:ring-purple-700 bg-white text-black"
          />
        </div>

        <nav className="flex items-center space-x-6">
          <Link
            to="/home"
            className="text-black hover:text-purple-700 transition duration-200 cursor-pointer"
          >
            <FontAwesomeIcon icon={faHouse} className="text-2xl" />
          </Link>

          <div className="relative" ref={notificationDropdownRef}>
            <button
              onClick={toggleNotificationDropdown}
              className="text-black hover:text-purple-700 transition duration-200 cursor-pointer"
            >
              <FontAwesomeIcon icon={faBell} className="text-2xl" />
            </button>
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                {notifications.length}
              </span>
            )}
            {isNotificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-black hover:bg-purple-800 hover:text-white transition duration-200 cursor-pointer"
                    >
                      {notification}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No new notifications.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={toggleProfileDropdown}
              className="text-black hover:text-purple-700 transition duration-200 cursor-pointer"
            >
              <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg">
                <Link
                  to={`/profile/${loggedInUser?.username.toLowerCase()}`}
                  className="block px-4 py-2 text-black hover:bg-purple-800 hover:text-white transition duration-200 cursor-pointer"
                >
                  View Profile
                </Link>
                <Link
                  to={`/profile/${loggedInUser?.username.toLowerCase()}/edit`}
                  className="block px-4 py-2 text-black hover:bg-purple-800 hover:text-white transition duration-200 cursor-pointer"
                >
                  Edit Profile
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-black hover:text-purple-700 transition duration-200 cursor-pointer"
            >
              <FontAwesomeIcon icon={faGear} className="text-2xl" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer w-full text-left px-4 py-2 text-black hover:bg-purple-800 hover:text-white transition duration-200"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
