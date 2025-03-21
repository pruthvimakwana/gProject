// src/components/CourseDetails.jsx
import React, { useEffect } from "react";
import AutoQuiz from "./AutoQuiz";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as THREE from "three";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { enrolledCourses, enrollCourse } = useAuth();

  const courses = [
    { id: 1, title: "React Basics", description: "Learn React fundamentals", price: 0, content: "react-basics.mp4" },
    { id: 2, title: "Advanced CSS", description: "Master CSS techniques", price: 100, content: "advanced-css.pdf" },
    { id: 3, title: "JavaScript Deep Dive", description: "Advanced JS concepts", price: 150, content: "js-deep-dive.mp4" },
  ];

  const course = courses.find((c) => c.id === parseInt(courseId)) || {};

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, 400);
    document.getElementById("three-d-canvas").appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x007bff, metalness: 0.7, roughness: 0.3 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    const light = new THREE.PointLight(0xffffff, 1, 10);
    light.position.set(2, 2, 5);
    scene.add(light);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  const handleEnroll = () => {
    enrollCourse(course.id);
  };

  const isEnrolled = enrolledCourses.some((c) => c.id === course.id);

  return (
    <div className="course-details-container">
      <header className="course-header">
        <h1>{course.title}</h1>
        <p>{course.description}</p>

        <AutoQuiz content={course.description} />
        <p className="price">{course.price === 0 ? "Free" : `$${course.price}`}</p>
      </header>

      {/* 3D Animation */}
      <section className="three-d-section">
        <div id="three-d-canvas"></div>
      </section>

      {/* Course Content */}
      <section className="course-content">
        <h2>Course Preview</h2>
        <div className="content-preview">
          {course.content.endsWith(".mp4") ? (
            <video controls width="100%">
              <source src={`/src/assets/${course.content}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe src={`/src/assets/${course.content}`} title="Course PDF" width="100%" height="400px"></iframe>
          )}
        </div>
      </section>

      {/* Actions */}
      <section className="course-actions">
        {isEnrolled ? (
          <>
            <Link to={`/course/${course.id}/view`} className="view-button">View Content</Link>
            <Link to={`/course/${course.id}/quiz`} className="quiz-button">Take Quiz</Link>
            <Link to={`/course/${course.id}/feedback`} className="feedback-button">Give Feedback</Link>
          </>
        ) : course.price === 0 ? (
          <button onClick={handleEnroll} className="enroll-button">Enroll Now</button>
        ) : (
          <Link to={`/course/${course.id}/payment`} className="payment-button">Buy Now</Link>
        )}
      </section>
    </div>
  );
};

export default CourseDetails;
