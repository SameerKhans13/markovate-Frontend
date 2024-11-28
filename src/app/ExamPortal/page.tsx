"use client";
import React, { useState } from 'react';
import "./ExamPortal.css"

interface QuestionData {
  question: string;
  marks: string;
  keywords: string;
}

const TeacherExamPortal: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [formData, setFormData] = useState<QuestionData>({
    question: '',
    marks: '',
    keywords: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetFormData = () => {
    setFormData({ question: '', marks: '', keywords: '' });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof QuestionData].trim()) {
        newErrors[key] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setQuestions((prev) => [...prev, formData]);
    setSuccessMessage('Question added successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
    resetFormData();
  };

  return (
    <div className="teacher-exam-portal">
      <div className="form-container">
        <div className="header">
          <h1>Teacher Exam Portal</h1>
        </div>
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-field">
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              placeholder="Enter question"
              className={`input-textarea ${errors.question ? 'error' : ''}`}
            />
          </div>
          <div className="form-field">
            <textarea
              name="marks"
              value={formData.marks}
              onChange={handleInputChange}
              placeholder="Enter marks"
              className={`input-textarea ${errors.marks ? 'error' : ''}`}
            />
          </div>
          <div className="form-field">
            <textarea
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="Enter keywords"
              className={`input-textarea ${errors.keywords ? 'error' : ''}`}
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default TeacherExamPortal;
