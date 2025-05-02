import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/gau_logo.png";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../utils/Auth";

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    logoutUser(); // Clear from localStorage
    onLogout(); // Inform App to redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo image */}
        <div className="navbar-logo">
          <img src={logo} alt="Gau World Logo" className="logo-img" />
        </div>

        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={toggleMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/donate" onClick={toggleMenu}>
              Donate
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" onClick={toggleMenu}>
              History
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={toggleMenu}>
              Contact
            </NavLink>
          </li>{" "}
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>

        <div className="menu-toggle" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
