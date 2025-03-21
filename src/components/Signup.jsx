// src/components/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "", role: "student" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      setError("All fields are required.");
      return;
    }

    signup(userInfo);
    navigate("/dashboard");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create an Account</h2>
        <p>Join and start learning today!</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={userInfo.name} onChange={handleChange} placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={userInfo.email} onChange={handleChange} placeholder="Enter your email" required />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} name="password" value={userInfo.password} onChange={handleChange} placeholder="Enter your password" required />
              <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={userInfo.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button type="submit" className="signup-button">Sign Up</button>

          <div className="auth-links">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
