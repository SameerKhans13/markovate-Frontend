"use client";

import React, { useState, useEffect } from "react";
import "./ExamPortal.css";

interface Question {
  id: number;
  text: string;
  marks: number;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER" | "LONG_ANSWER";
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

interface Test {
  id: number;
  title: string;
  description?: string;
  subject: string;
  duration: number;
  totalMarks: number;
  createdAt: string;
  questions: Question[];
  createdBy: {
    firstName: string;
    lastName: string;
  };
}

const TeacherExamPortal: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Partial<Question>[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch("/api/tests");
      const data = await response.json();
      if (data.success) {
        setTests(data.tests);
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length,
        text: "",
        marks: 0,
        type: "SHORT_ANSWER",
        correctAnswer: "",
      },
    ]);
  };

  const handleInputChange = (
    id: number,
    field: keyof Question,
    value: string | number
  ) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
    if (value.toString().trim()) {
      setErrors((prev) => ({ ...prev, [`${field}-${id}`]: false }));
    }
  };

  const validateQuestion = (question: Partial<Question>): boolean => {
    const newErrors: { [key: string]: boolean } = {};
    let isValid = true;

    ["text", "marks", "correctAnswer"].forEach((field) => {
      if (!question[field as keyof Question]?.toString().trim()) {
        newErrors[`${field}-${question.id}`] = true;
        isValid = false;
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTest) {
      alert("Please select a test first");
      return;
    }

    const isValid = questions.every(validateQuestion);

    if (isValid) {
      try {
        const response = await fetch(`/api/tests/${selectedTest.id}/questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questions }),
        });

        if (response.ok) {
          alert("Questions added successfully!");
          setQuestions([]);
          setErrors({});
          fetchTests(); // Refresh the tests list
        } else {
          alert("Failed to add questions");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="portal-container">
      <div className="content-container">
        <h1 className="portal-title">Teacher Exam Portal</h1>

        {/* Tests List */}
        <div className="tests-list">
          <h2>Available Tests</h2>
          <div className="tests-grid">
            {tests.map((test) => (
              <div
                key={test.id}
                className={`test-card ${selectedTest?.id === test.id ? 'selected' : ''}`}
                onClick={() => setSelectedTest(test)}
              >
                <h3>{test.title}</h3>
                <p>Subject: {test.subject}</p>
                <p>Duration: {test.duration} minutes</p>
                <p>Total Marks: {test.totalMarks}</p>
                <p>Questions: {test.questions.length}</p>
                <p className="created-by">
                  Created by: {test.createdBy.firstName} {test.createdBy.lastName}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Question Creation Form */}
        {selectedTest && (
          <div className="questions-section">
            <h2>Add Questions to: {selectedTest.title}</h2>
            <div className="questions-container">
              {questions.map((q, index) => (
                <div key={q.id} className="question-card">
                  <h3 className="question-number">Question {index + 1}</h3>
                  <div className="input-group">
                    <label className="input-label">Question Text</label>
                    <textarea
                      className={`input-field ${errors[`text-${q.id}`] ? "error" : ""}`}
                      rows={4}
                      value={q.text}
                      onChange={(e) => handleInputChange(q.id, "text", e.target.value)}
                      placeholder="Enter question text"
                    />
                    {errors[`text-${q.id}`] && (
                      <div className="error-message">Question text is required</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Marks</label>
                    <input
                      type="number"
                      className={`input-field ${errors[`marks-${q.id}`] ? "error" : ""}`}
                      value={q.marks}
                      onChange={(e) => handleInputChange(q.id, "marks", parseInt(e.target.value) || 0)}
                      min="0"
                    />
                    {errors[`marks-${q.id}`] && (
                      <div className="error-message">Marks are required</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Correct Answer</label>
                    <textarea
                      className={`input-field ${errors[`correctAnswer-${q.id}`] ? "error" : ""}`}
                      rows={3}
                      value={q.correctAnswer}
                      onChange={(e) => handleInputChange(q.id, "correctAnswer", e.target.value)}
                      placeholder="Enter correct answer"
                    />
                    {errors[`correctAnswer-${q.id}`] && (
                      <div className="error-message">Correct answer is required</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="button-container">
              <button onClick={addQuestion} className="button secondary">
                + Add Question
              </button>
              <button onClick={handleSubmit} className="button primary">
                Save Questions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherExamPortal;
