// src/components/Leaderboard.jsx
import React, { useState } from "react";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [students, setStudents] = useState([
    { name: "Alice", xp: 150 },
    { name: "Bob", xp: 200 },
    { name: "Charlie", xp: 100 }
  ]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      {students.sort((a, b) => b.xp - a.xp).map((s, i) => (
        <p key={i}>{i + 1}. {s.name} - {s.xp} XP</p>
      ))}
    </div>
  );
};

export default Leaderboard;
