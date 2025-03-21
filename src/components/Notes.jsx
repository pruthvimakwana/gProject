// src/components/Notes.jsx
import React, { useState, useEffect } from "react";
import "./Notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("userNotes")) || [];
    setNotes(savedNotes);
  }, []);

  const handleAddNote = () => {
    if (newNote.trim() === "") return;
    const updatedNotes = [...notes, { id: Date.now(), text: newNote }];
    setNotes(updatedNotes);
    localStorage.setItem("userNotes", JSON.stringify(updatedNotes));
    setNewNote("");
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("userNotes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="notes-container">
      <header className="notes-header">
        <h1>My Notes</h1>
      </header>

      <section className="notes-box">
        <textarea
          placeholder="Write your notes here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        ></textarea>
        <button onClick={handleAddNote} className="add-note-button">Add Note</button>
      </section>

      <section className="notes-list">
        {notes.length === 0 ? (
          <p className="no-notes">No notes yet. Start writing!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <p>{note.text}</p>
              <button onClick={() => handleDeleteNote(note.id)} className="delete-note-button">Delete</button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Notes;
