// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>LMS Next</h2>
          <p>Your go-to platform for interactive and engaging learning.</p>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">💼</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LMS Next | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
