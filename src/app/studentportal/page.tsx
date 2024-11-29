"use client";

import React, { useState, ChangeEvent } from "react";
import "./stuportal.css";

// Define interfaces for type safety
interface Question {
  id: number;
  question: string;
}

interface Answer {
  text?: string;
  file?: File;
}

interface AnswerState {
  [key: number]: Answer;
}

// Example questions (can be fetched from an API in a real-world application)
const questions: Question[] = [
  { id: 1, question: "What is the capital of France?" },
  { id: 2, question: "Describe the process of photosynthesis." },
  { id: 3, question: "Explain the theory of relativity." },
];

const ExamPortal: React.FC = () => {
  const [answers, setAnswers] = useState<AnswerState>({});

  // Handle text input changes
  const handleTextChange = (id: number, text: string): void => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: { ...prevAnswers[id], text },
    }));
  };

  // Handle file input changes
  const handleFileChange = (
    id: number,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [id]: { ...prevAnswers[id], file },
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (): void => {
    const allAnswered = questions.every(
      (q) => answers[q.id]?.text?.trim() || answers[q.id]?.file
    );

    if (allAnswered) {
      alert("Exam Submitted Successfully!");
      console.log("Submitted answers:", answers);
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  return (
    <div className="exam-container">
      <h1 className="exam-title">Student Exam Portal</h1>

      <div className="question-list">
        {questions.map((q) => (
          <div key={q.id} className="question-card">
            <div className="question-header">
              <h3>{q.question}</h3>
            </div>

            <div className="answer-section">
              <label htmlFor={`text-${q.id}`}>Written Response:</label>
              <textarea
                id={`text-${q.id}`}
                value={answers[q.id]?.text || ""}
                onChange={(e) => handleTextChange(q.id, e.target.value)}
                placeholder="Type your answer here..."
                rows={4}
                aria-label={`Answer for question ${q.id}`}
              />
            </div>

            <div className="file-section">
              <label htmlFor={`file-${q.id}`}>
                Upload Supporting Document:
              </label>
              <div className="file-upload-container">
                <input
                  type="file"
                  id={`file-${q.id}`}
                  onChange={(e) => handleFileChange(q.id, e)}
                  accept="image/*,.pdf,.doc,.docx"
                  className="file-input"
                />
                <span className="file-name">
                  {answers[q.id]?.file?.name || "No file selected"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        aria-label="Submit exam"
      >
        Submit Exam
      </button>
    </div>
  );
};

export default ExamPortal;
