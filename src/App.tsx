import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Front from "../components/Front";
import Login from "../components/Login";
import Register from "../components/Register";
import RegisterComplete from "../components/RegisterComplete";
import Home from "../components/Home";
import ViewProfile from "../components/profile/ViewProfile";
import EditProfile from "../components/profile/EditProfile";
import About from "../components/footer/About"; // Import About component
import Contact from "../components/footer/Contact"; // Import Contact component
import Privacy from "../components/footer/Privacy"; // Import Privacy component
import Terms from "../components/footer/Terms"; // Import Terms component

const App = () => {
  const isLoggedIn = !!localStorage.getItem("loggedInUser");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Front />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/register/complete"
          element={isLoggedIn ? <Navigate to="/home" /> : <RegisterComplete />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/profile/:username" element={<ViewProfile />} />
        <Route path="/profile/:username/edit" element={<EditProfile />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
