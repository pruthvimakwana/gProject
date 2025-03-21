// src/components/ContentViewer.jsx
import React from "react";
import SmartNotes from "./SmartNotes";
import { useParams, Link } from "react-router-dom";
import "./ContentViewer.css";

const ContentViewer = () => {
  const { courseId } = useParams();

  // Sample course content
  const courseContent = {
    1: { title: "React Basics", type: "video", file: "react-basics.mp4" },
    2: { title: "Advanced CSS", type: "pdf", file: "advanced-css.pdf" },
    3: { title: "JavaScript Deep Dive", type: "video", file: "js-deep-dive.mp4" },
  };

  const content = courseContent[courseId];

  if (!content) {
    return <div className="content-not-found">Content Not Found</div>;
  }

  return (
    <div className="content-viewer">
      <header className="viewer-header">
        <h1>{content.title}</h1>
        <Link to="/dashboard" className="back-button">Back to Dashboard</Link>
      </header>

      <section className="content-display">
        {content.type === "video" ? (
          <video controls>
            <source src={`/src/assets/${content.file}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe src={`/src/assets/${content.file}`} title={content.title} width="100%" height="500px"></iframe>
        )}
      </section>
      <SmartNotes content={content.title} />
    </div>
  );
};

export default ContentViewer;
