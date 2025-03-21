// src/components/Home.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 600,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, 600);
    document.getElementById("three-d-canvas").appendChild(renderer.domElement);

    // 3D Sphere with premium look
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x007bff,
      metalness: 0.8,
      roughness: 0.2,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting for smooth effect
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(2, 2, 5);
    scene.add(light);

    camera.position.z = 4;

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, 600);
      camera.aspect = window.innerWidth / 600;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to <span className="highlight-text">Next-Gen LMS</span></h1>
        <p>Transform your learning experience with interactive 3D content.</p>
        <Link to="/courses" className="cta-button">Explore Courses</Link>
      </header>

      {/* 3D Animation */}
      <section className="three-d-section">
        <div id="three-d-canvas"></div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature-item">
            <h3>🚀 Interactive Learning</h3>
            <p>Engage with 3D models, quizzes, and live discussions.</p>
          </div>
          <div className="feature-item">
            <h3>👨‍🏫 Expert Instructors</h3>
            <p>Learn from top professionals with real-world experience.</p>
          </div>
          <div className="feature-item">
            <h3>📊 Personalized Dashboard</h3>
            <p>Track your progress with advanced analytics.</p>
          </div>
        </div>
      </section>

      {/* Personalized Greeting */}
      {user && (
        <section className="user-greeting">
          <h2>Hello, {user.name}!</h2>
          <p>
            Ready to start your journey as a {user.role}?{" "}
            <Link
              to={
                user.role === "student"
                  ? "/dashboard"
                  : user.role === "teacher"
                  ? "/teacher-dashboard"
                  : "/admin-panel"
              }
            >
              Go to Your {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Hub
            </Link>
          </p>
        </section>
      )}
    </div>
  );
};

export default Home;
