// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import CourseCatalog from "./components/CourseCatalog";
import CourseDetails from "./components/CourseDetails";
import ContentViewer from "./components/ContentViewer";
import Practice from "./components/Practice";
import Notes from "./components/Notes";
import Feedback from "./components/Feedback";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminPanel from "./components/AdminPanel";
import Payment from "./components/Payment";
import Notifications from "./components/Notifications";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <Notifications />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/course/:courseId" element={<CourseDetails />} />
            <Route path="/course/:courseId/content" element={<ContentViewer />} />
            <Route path="/course/:courseId/practice" element={<Practice />} />
            <Route path="/course/:courseId/notes" element={<Notes />} />
            <Route path="/course/:courseId/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/course/:courseId/payment" element={<Payment />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
