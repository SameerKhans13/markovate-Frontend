"use client"; // Required for client-side interactivity in Next.js 13+

import React, { useState } from "react";
import "./ExamPortal.css";

interface Question {
  id: number;
  question: string;
  marks: string;
  keywords: string;
}

const TeacherExamPortal: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length, question: "", marks: "", keywords: "" },
    ]);
  };

  const handleInputChange = (
    id: number,
    field: keyof Question,
    value: string
  ) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [`${field}-${id}`]: false }));
    }
  };

  const validateQuestion = (question: Question): boolean => {
    const newErrors: { [key: string]: boolean } = {};
    let isValid = true;

    ["question", "marks", "keywords"].forEach((field) => {
      if (!question[field as keyof Question].toString().trim()) {
        newErrors[`${field}-${question.id}`] = true;
        isValid = false;
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = questions.every(validateQuestion);

    if (isValid) {
      console.log("Submitted questions:", questions);
      setQuestions([]);
      setErrors({});
    }
  };

  return (
    <div className="portal-container">

      <div className="content-container">
        <h1 className="portal-title">Teacher Exam Portal</h1>

        <div className="questions-container">
          {questions.map((q, index) => (
            <div key={q.id} className="question-card">
              <h3 className="question-number">Question {index + 1}</h3>

              {(["question", "marks", "keywords"] as const).map((field) => (
                <div key={field} className="input-group">
                  <label className="input-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <textarea
                    className={`input-field ${
                      errors[`${field}-${q.id}`] ? "error" : ""
                    }`}
                    rows={field === "question" ? 4 : 3}
                    value={q[field]}
                    onChange={(e) =>
                      handleInputChange(q.id, field, e.target.value)
                    }
                    placeholder={`Enter ${field} here`}
                  />
                  {errors[`${field}-${q.id}`] && (
                    <div className="error-message">
                      {field.charAt(0).toUpperCase() + field.slice(1)} is
                      required
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="button-container">
          <button onClick={addQuestion} className="button secondary">
            + Add Question
          </button>
          <button onClick={handleSubmit} className="button primary">
            Post Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherExamPortal;
