// src/components/AutoQuiz.jsx
import React, { useState } from "react";
import "./AutoQuiz.css";

const AutoQuiz = ({ content }) => {
  const [quiz, setQuiz] = useState([]);

  const generateQuiz = () => {
    const words = content.split(" ");
    const questions = words.slice(0, 3).map((word, i) => ({
      question: `What does "${word}" mean?`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      answer: "Option 1"
    }));
    setQuiz(questions);
  };

  return (
    <div className="auto-quiz-container">
      <h2>Auto-Generated Quiz</h2>
      <button onClick={generateQuiz}>Generate Quiz</button>
      {quiz.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          {q.options.map((opt, j) => <button key={j}>{opt}</button>)}
        </div>
      ))}
    </div>
  );
};

export default AutoQuiz;
