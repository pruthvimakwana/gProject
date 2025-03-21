// src/components/Practice.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Practice.css";

const quizzes = {
  1: {
    title: "React Basics Quiz",
    questions: [
      { question: "What is JSX?", options: ["Java XML", "JavaScript XML", "JSON", "None"], answer: "JavaScript XML" },
      { question: "Which hook is used for state management?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: "useState" },
      { question: "What does React use to track changes in the UI?", options: ["Shadow DOM", "Virtual DOM", "Real DOM", "None"], answer: "Virtual DOM" },
    ],
  },
  2: {
    title: "Advanced CSS Quiz",
    questions: [
      { question: "What does 'flex-grow' control?", options: ["Height", "Width", "Expansion", "Position"], answer: "Expansion" },
      { question: "Which CSS property makes an element stick to the top while scrolling?", options: ["fixed", "sticky", "absolute", "relative"], answer: "sticky" },
      { question: "Which unit is relative to the parent element?", options: ["em", "px", "rem", "vh"], answer: "em" },
    ],
  },
};

const Practice = () => {
  const { courseId } = useParams();
  const quiz = quizzes[courseId];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!quiz) {
    return <div className="quiz-not-found">Quiz Not Available</div>;
  }

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>{quiz.title}</h1>
        <Link to="/dashboard" className="back-button">Back to Dashboard</Link>
      </header>

      {!showResult ? (
        <section className="quiz-box">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{quiz.questions[currentQuestion].question}</p>
          <div className="quiz-options">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button key={index} className={`option-button ${selectedAnswer === option ? "selected" : ""}`} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          <button onClick={handleNextQuestion} className="next-button" disabled={!selectedAnswer}>
            {currentQuestion + 1 === quiz.questions.length ? "Finish Quiz" : "Next Question"}
          </button>
        </section>
      ) : (
        <section className="quiz-result">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {quiz.questions.length}</p>
          <Link to="/courses" className="retry-button">Try Another Quiz</Link>
        </section>
      )}
    </div>
  );
};

export default Practice;
