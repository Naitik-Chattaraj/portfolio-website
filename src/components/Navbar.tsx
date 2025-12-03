import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import "../App.css";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="liquid-glass navbar-container">
        
        <nav className="navbar">
          <NavLink to="/" end className="nav-item">Home</NavLink>
          <NavLink to="/about" className="nav-item">About Me</NavLink>
          <NavLink to="/portfolio" className="nav-item">Projects</NavLink>
          <NavLink to="/announcements" className="nav-item">Skills</NavLink>
        </nav>

        <div className="liquidGlass-effect"></div>
        <div className="liquidGlass-tint"></div>
        <div className="liquidGlass-shine"></div>
        <div className="liquidGlass-text"></div>

      </div>
    </div>
  );
};

export default Navbar;
