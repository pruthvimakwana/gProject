// src/components/TeacherDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const { user, addCourse } = useAuth();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    format: "text",
    content: "",
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData({ ...courseData, content: URL.createObjectURL(file) });
    }
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseData.title || !courseData.description || !courseData.price) {
      alert("Please fill all fields!");
      return;
    }
    addCourse(courseData);
    setCourseData({ title: "", description: "", price: "", format: "text", content: "" });
    alert("Course added successfully!");
  };

  if (!user || user.role !== "teacher") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="teacher-dashboard-container">
      <h1>Welcome, {user.name}! (Teacher)</h1>

      <section className="add-course-form">
        <h2>Add a New Course</h2>
        <form onSubmit={handleAddCourse}>
          <input type="text" name="title" placeholder="Course Title" value={courseData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Course Description" value={courseData.description} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price ($)" value={courseData.price} onChange={handleChange} required />

          <label>Course Format:</label>
          <select name="format" value={courseData.format} onChange={handleChange}>
            <option value="text">Text</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
          </select>

          {courseData.format !== "text" && (
            <input type="file" accept={courseData.format === "video" ? "video/*" : "application/pdf"} onChange={handleFileUpload} />
          )}

          <button type="submit" className="add-course-button">Add Course</button>
        </form>
      </section>
    </div>
  );
};

export default TeacherDashboard;
