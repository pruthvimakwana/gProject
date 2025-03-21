// src/components/Dashboard.jsx
import React, { useEffect, useRef } from "react";
import Leaderboard from "./Leaderboard";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as THREE from "three";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, enrolledCourses, progress, setEnrolledCourses } = useAuth();
  const navigate = useNavigate();
  const graphRef = useRef(null);

  // Redirect non-logged-in users
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Load enrolled courses from local storage
  useEffect(() => {
    if (enrolledCourses.length === 0) {
      const storedCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
      setEnrolledCourses(storedCourses);
    }
  }, [setEnrolledCourses]);

  // Handle course deletion
  const handleDeleteCourse = (courseId) => {
    const updatedCourses = enrolledCourses.filter((course) => course.id !== courseId);
    setEnrolledCourses(updatedCourses);
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses)); // ✅ Fix: Updates local storage
  };

  // 3D Progress Graph with Three.js (Fixing Render Issues)
  useEffect(() => {
    if (!graphRef.current) return; // ✅ Prevent multiple renders
    graphRef.current.innerHTML = ""; // ✅ Clear previous canvas before rendering

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, 400);
    graphRef.current.appendChild(renderer.domElement);

    const bars = [];
    enrolledCourses.forEach((course, index) => {
      const geometry = new THREE.BoxGeometry(0.5, progress[course.id] / 50 || 0.1, 0.5);
      const material = new THREE.MeshStandardMaterial({ color: 0x007bff, metalness: 0.7, roughness: 0.3 });
      const bar = new THREE.Mesh(geometry, material);
      bar.position.x = index * 1 - (enrolledCourses.length - 1) / 2;
      bar.position.y = (progress[course.id] / 50 || 0.1) / 2;
      scene.add(bar);
      bars.push(bar);
    });

    const light = new THREE.PointLight(0xffffff, 1, 10);
    light.position.set(2, 2, 5);
    scene.add(light);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      bars.forEach((bar) => {
        bar.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose(); // ✅ Fix: Prevents memory leaks
    };
  }, [enrolledCourses, progress]);

  // Redirect if user is not a student
  if (!user || user.role !== "student") {
    navigate("/login");
    return null;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <p>Your Student Dashboard</p>
      </header>

      {/* 3D Progress Graph */}
      <section className="progress-section">
        <h2>Your Progress</h2>
        {enrolledCourses.length > 0 ? (
          <div ref={graphRef}></div>
        ) : (
          <p>No courses enrolled yet. <Link to="/courses">Explore Courses</Link></p>
        )}
        <div className="progress-legend">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="legend-item">
              <span className="legend-color"></span>
              <span>{course.title}: {progress[course.id] || 0}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Enrolled Courses */}
      <section className="courses-section">
        <h2>Your Enrolled Courses</h2>
        
        {enrolledCourses.length > 0 ? (
          <div className="course-list">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-actions">
                  <Link to={`/course/${course.id}/view`} className="view-button">View</Link>
                  <Link to={`/course/${course.id}/quiz`} className="quiz-button">Quiz</Link>
                  <button onClick={() => handleDeleteCourse(course.id)} className="delete-button">Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven’t enrolled in any courses yet.</p>
        )}
         <Leaderboard />
      </section>
    </div>
  );
};

export default Dashboard;
