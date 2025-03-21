// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [notifications, setNotifications] = useState([]); // ✅ Added notifications

  // Load user data from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const storedEnrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    const storedProgress = JSON.parse(localStorage.getItem("progress")) || {};

    if (storedUser) setUser(storedUser);
    setUsers(storedUsers);
    setCourses(storedCourses);
    setEnrolledCourses(storedEnrolled);
    setProgress(storedProgress);
  }, []);

  // Save user data to local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("courses", JSON.stringify(courses));
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [user, users, courses, enrolledCourses, progress]);

  // ✅ Fix Dark Mode (Now applies to the entire UI)
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // ✅ Notifications System
  const addNotification = (message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  // ✅ User Authentication
  const login = (userData) => {
    setUser(userData);
    addNotification("Logged in successfully! ✅");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    addNotification("Logged out successfully! 🔐");
  };

  const signup = (userData) => {
    const updatedUsers = [...users, userData];
    setUsers(updatedUsers);
    setUser(userData);
    addNotification("Account created successfully! 🎉");
  };

  // ✅ Profile & Settings
  const updateUserProfile = (updatedProfile) => {
    const updatedUser = { ...user, ...updatedProfile };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Store profile pic in local storage
  };
  

  const updateUserSettings = (settings) => {
    setUser((prevUser) => ({ ...prevUser, settings }));
  };

  // ✅ Admin Functions
  const addCourse = (course) => {
    const newCourse = { id: Date.now(), ...course };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
  
    // ✅ Save to local storage
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };
  

  const deleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
    setEnrolledCourses(enrolledCourses.filter((course) => course.id !== courseId));
    addNotification("Course deleted successfully!");
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    addNotification("User removed successfully!");
  };

  // ✅ Enrollment & Progress (Now saves to local storage)
  const enrollCourse = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      const updatedEnrolledCourses = [...enrolledCourses, course];
      setEnrolledCourses(updatedEnrolledCourses);
      setProgress({ ...progress, [courseId]: 0 });

      // ✅ Save to local storage
      localStorage.setItem("enrolledCourses", JSON.stringify(updatedEnrolledCourses));
      localStorage.setItem("progress", JSON.stringify({ ...progress, [courseId]: 0 }));

      addNotification(`Enrolled in "${course.title}" 🎓`);
    }
  };

  const updateProgress = (courseId, value) => {
    setProgress((prevProgress) => ({ ...prevProgress, [courseId]: value }));

    // ✅ Save progress to local storage
    localStorage.setItem("progress", JSON.stringify({ ...progress, [courseId]: value }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        courses,
        enrolledCourses,
        progress,
        login,
        logout,
        signup,
        updateUserProfile,
        updateUserSettings,
        addCourse,
        deleteCourse,
        deleteUser,
        enrollCourse,
        updateProgress,
        setEnrolledCourses,
        darkMode,
        toggleDarkMode,
        notifications,
        addNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
