import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Add this line to import the CSS file
import logo from "../assets/icon-left-font-monochrome-white.png";  // Import the logo image

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Replace text logo with image */}
        <Link className="navbar-brand" to="/">
          <img src= {logo} alt="9Gang Logo" className="logo" />
        </Link>

        {/* Navigation links */}
        <div className={`navbar-nav ${isMenuOpen ? "active" : ""}`}>
          <Link className="nav-link" to="/signup">Signup</Link>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/profile">Profile</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {/* Hamburger icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
