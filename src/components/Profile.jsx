// src/components/Profile.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePic, setProfilePic] = useState(() => {
    return user?.profilePic || localStorage.getItem("profilePic") || "/default-avatar.png";
  });
  const handleSave = () => {
    updateUserProfile({ name, email, bio, profilePic });
    alert("Profile updated successfully!");
  };
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        updateUserProfile({ profilePic: reader.result }); // ✅ Saves to local storage
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Your Profile</h1>
      </header>

      <section className="profile-card">
        <div className="profile-pic">
          <img src={profilePic} alt="Profile" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleProfilePicUpload(e)}
            />
        </div>

        <div className="profile-info">
          <div className="profile-item">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="profile-item">
            <label>Email:</label>
            <input type="email" value={email} disabled />
          </div>

          <div className="profile-item">
            <label>Bio:</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>

          <button onClick={handleSave} className="save-button">Save Changes</button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
