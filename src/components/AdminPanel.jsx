// src/components/AdminPanel.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AdminPanel.css";

const AdminPanel = () => {
  const { user, users, courses, addCourse, deleteCourse, deleteUser } = useAuth();
  const [newCourse, setNewCourse] = useState({ title: "", description: "", price: 0 });

  if (!user || user.role !== "admin") {
    return <div className="access-denied">Access Denied</div>;
  }

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.description) {
      alert("Title and description are required.");
      return;
    }
    addCourse(newCourse);
    setNewCourse({ title: "", description: "", price: 0 });
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users and courses effectively</p>
      </header>

      {/* User Management */}
      <section className="admin-section">
        <h2>Users</h2>
        <div className="admin-list">
          {users.map((u) => (
            <div key={u.id} className="admin-card">
              <p><strong>{u.name}</strong> ({u.role})</p>
              <button onClick={() => deleteUser(u.id)} className="delete-button">Remove</button>
            </div>
          ))}
        </div>
      </section>

      {/* Course Management */}
      <section className="admin-section">
        <h2>Courses</h2>
        <div className="admin-list">
          {courses.map((course) => (
            <div key={course.id} className="admin-card">
              <p><strong>{course.title}</strong></p>
              <button onClick={() => deleteCourse(course.id)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </section>

      {/* Add Course */}
      <section className="admin-section">
        <h2>Add New Course</h2>
        <div className="add-course">
          <input type="text" placeholder="Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
          <textarea placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}></textarea>
          <input type="number" placeholder="Price" value={newCourse.price} onChange={(e) => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) })} />
          <button onClick={handleAddCourse} className="add-button">Add Course</button>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
