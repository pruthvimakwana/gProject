// src/components/Feedback.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Feedback.css";

const Feedback = () => {
  const { courseId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const courses = {
    1: { title: "React Basics" },
    2: { title: "Advanced CSS" },
    3: { title: "JavaScript Deep Dive" },
  };

  const course = courses[courseId];

  if (!course) {
    return <div className="feedback-not-found">Course Not Found</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and a comment.");
      return;
    }

    setFeedbackSubmitted(true);
  };

  return (
    <div className="feedback-container">
      <header className="feedback-header">
        <h1>Give Feedback</h1>
        <Link to="/dashboard" className="back-button">Back to Dashboard</Link>
      </header>

      {!feedbackSubmitted ? (
        <section className="feedback-box">
          <h2>{course.title}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Rate this Course</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`star ${rating >= star ? "filled" : ""}`} onClick={() => setRating(star)}>★</span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Comments</label>
              <textarea placeholder="Write your feedback..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>

            <button type="submit" className="submit-button">Submit Feedback</button>
          </form>
        </section>
      ) : (
        <section className="feedback-success">
          <h2>Thank You! 🎉</h2>
          <p>Your feedback for {course.title} has been submitted.</p>
          <Link to="/courses" className="back-courses-button">Back to Courses</Link>
        </section>
      )}
    </div>
  );
};

export default Feedback;
