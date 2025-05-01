import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/gau_logo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
