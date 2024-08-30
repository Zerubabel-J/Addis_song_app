import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Music App</h1>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/" className="header__nav-link">
              Songs
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/statistics" className="header__nav-link">
              Statistics
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
