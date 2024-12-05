"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import "./stuportal.css";

interface Question {
  id: number;
  text: string;
  marks: number;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER" | "LONG_ANSWER";
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

interface Answer {
  questionId: number;
  text: string;
}

const StudentPortal = () => {
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (!selectedTest) return;

    const unansweredQuestions = selectedTest.questions.filter(
      q => !answers[q.id]?.trim()
    );

    if (unansweredQuestions.length > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, text]) => ({
        questionId: parseInt(questionId),
        text
      }));

      const submitResponse = await fetch(`/api/tests/${selectedTest.id}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      if (!submitResponse.ok) {
        throw new Error('Failed to submit answers');
      }

      const { answers: submittedAnswers } = await submitResponse.json();

      for (const answer of submittedAnswers) {
        await fetch('/api/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answerId: answer.id }),
        });
      }

      router.push(`/studentportal/results?testId=${selectedTest.id}`);
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="student-portal">
      <h1 className="portal-title">Student Portal</h1>

      {!selectedTest ? (
        <div className="tests-list">
          <h2>Available Tests</h2>
          <div className="tests-grid">
            {tests.map((test) => (
              <div
                key={test.id}
                className="test-card"
                onClick={() => setSelectedTest(test)}
              >
                <h3>{test.title}</h3>
                <p>Subject: {test.subject}</p>
                <p>Duration: {test.duration} minutes</p>
                <p>Total Marks: {test.totalMarks}</p>
                <p>Questions: {test.questions.length}</p>
                <button className="start-test-btn">Start Test</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="test-section">
          <div className="test-header">
            <h2>{selectedTest.title}</h2>
            <p>Duration: {selectedTest.duration} minutes</p>
            <p>Total Marks: {selectedTest.totalMarks}</p>
          </div>

          <div className="questions-list">
            {selectedTest.questions.map((question, index) => (
              <div key={question.id} className="question-card">
                <div className="question-header">
                  <h3>Question {index + 1}</h3>
                  <span className="marks">({question.marks} marks)</span>
                </div>
                <p className="question-text">{question.text}</p>
                <div className="answer-section">
                  <textarea
                    className="answer-input"
                    placeholder="Type your answer here..."
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="button-container">
            <button 
              className="back-btn"
              onClick={() => {
                if (confirm("Are you sure you want to exit? Your answers will be lost.")) {
                  setSelectedTest(null);
                  setAnswers({});
                }
              }}
            >
              Back to Tests
            </button>
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Answers"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
