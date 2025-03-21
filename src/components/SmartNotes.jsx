// src/components/SmartNotes.jsx
import React, { useState } from "react";
import "./SmartNotes.css";

const SmartNotes = ({ content }) => {
  const [notes, setNotes] = useState("");

  const generateNotes = () => {
    const summarized = content.split(". ").slice(0, 3).join(". ") + "...";
    setNotes(summarized);
  };

  return (
    <div className="smart-notes-container">
      <h2>Smart Notes</h2>
      <button onClick={generateNotes}>Generate Notes</button>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Your notes..." />
    </div>
  );
};

export default SmartNotes;
