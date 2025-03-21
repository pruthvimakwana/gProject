import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Notifications.css";

const Notifications = () => {
  const { notifications } = useAuth();

  return (
    <div className="notifications-container">
      {notifications.map((n) => (
        <div key={n.id} className="notification">{n.message}</div>
      ))}
    </div>
  );
};

export default Notifications;
