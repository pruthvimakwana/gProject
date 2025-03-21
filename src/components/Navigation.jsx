// src/components/Navigation.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as THREE from "three";
import "./Navigation.css";

const Navigation = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 3D Hamburger Animation
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 50 / 50, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(50, 50);
    document.getElementById("hamburger-canvas")?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(0.5, 0.1, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0x007bff, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.05;
      cube.rotation.y += 0.05;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.domElement.remove();
    };
  }, []);

  const getMenuItems = () => {
    if (!user) {
      return [
        { path: "/", label: "Home" },
        { path: "/courses", label: "Courses" },
        { path: "/login", label: "Login" },
        { path: "/signup", label: "Signup" },
      ];
    }
    const baseItems = [
      { path: "/", label: "Home" },
      { path: "/courses", label: "Courses" },
      { path: "/profile", label: "Profile" },
      { path: "/settings", label: "Settings" },
    ];
    if (user.role === "student") {
      baseItems.push({ path: "/dashboard", label: "Dashboard" });
    } else if (user.role === "teacher") {
      baseItems.push({ path: "/teacher-dashboard", label: "Teacher Dashboard" });
    } else if (user.role === "admin") {
      baseItems.push({ path: "/admin-panel", label: "Admin Panel" });
    }
    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" className="brand-logo">LMS Next</Link>
      </div>

      {/* Desktop Menu */}
      <ul className="nav-menu">
        {menuItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link to={item.path} className="nav-link">{item.label}</Link>
          </li>
        ))}
        {user && (
          <li className="nav-item">
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={toggleMenu}>
        <div id="hamburger-canvas"></div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="mobile-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="mobile-nav-item">
              <Link to={item.path} className="mobile-nav-link" onClick={toggleMenu}>
                {item.label}
              </Link>
            </li>
          ))}
          {user && (
            <li className="mobile-nav-item">
              <button onClick={() => { handleLogout(); toggleMenu(); }} className="mobile-logout-button">
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
