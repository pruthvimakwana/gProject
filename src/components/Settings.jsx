// src/components/Settings.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Settings.css";

const Settings = () => {
  const { user, updateUserSettings, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  const handleSaveSettings = () => {
    updateUserSettings({ darkMode, notifications, language });
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>Settings</h1>
        <p>Customize your LMS experience</p>
      </header>

      {/* Settings Form */}
      <section className="settings-options">
        <div className="setting-item">
          <label>Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <div className="setting-item">
          <label>Email Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        <div className="setting-item">
          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        <button onClick={handleSaveSettings} className="save-button">
          Save Changes
        </button>

        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </section>
    </div>
  );
};

export default Settings;
