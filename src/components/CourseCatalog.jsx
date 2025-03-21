// src/components/CourseCatalog.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./CourseCatalog.css";

const CourseCatalog = () => {
  const { user, enrolledCourses, enrollCourse, courses } = useAuth();
  const navigate = useNavigate();

  if (!courses || courses.length === 0) {
    return <div className="loading-message">Loading Courses...</div>;
  }

  const handleEnroll = (courseId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!enrolledCourses.some((c) => c.id === courseId)) {
      enrollCourse(courseId);
      localStorage.setItem("enrolledCourses", JSON.stringify([...enrolledCourses, courses.find(c => c.id === courseId)]));
    }
  };

  return (
    <div className="course-catalog-container">
      <header className="catalog-header">
        <h1>Explore Our Courses</h1>
        <p>Find the best courses to boost your skills.</p>
      </header>

      <section className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p className="price">{course.price === 0 ? "Free" : `$${course.price}`}</p>
            <div className="course-actions">
              <Link to={`/course/${course.id}`} className="details-button">Details</Link>
              {enrolledCourses.some((c) => c.id === course.id) ? (
                <span className="enrolled">Enrolled</span>
              ) : (
                <button onClick={() => handleEnroll(course.id)} className="enroll-button">
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CourseCatalog;
