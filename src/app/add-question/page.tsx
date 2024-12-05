'use client';

import { useState } from 'react';
import { QuestionType } from '@prisma/client';

interface AddQuestionFormData {
  text: string;
  type: QuestionType;
  marks: number;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const DEFAULT_TEST_ID = 1;

export default function AddQuestionPage() {
  const [formData, setFormData] = useState<AddQuestionFormData>({
    text: '',
    type: 'MULTIPLE_CHOICE' as QuestionType,
    marks: 1,
    options: ['', ''],
    correctAnswer: '',
    explanation: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleTypeChange = (newType: string) => {
    let newOptions = formData.options;
    if (newType === 'TRUE_FALSE') {
      newOptions = ['True', 'False'];
    } else if (newType === 'MULTIPLE_CHOICE') {
      newOptions = ['', ''];
    } else {
      newOptions = [];
    }

    setFormData({
      ...formData,
      type: newType as QuestionType,
      options: newOptions,
      correctAnswer: '',
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ''] });
  };

  const removeOption = (index: number) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const teacherId = 2; // Using our seeded teacher (John Smith)

      const response = await fetch(`/api/tests/test/${DEFAULT_TEST_ID}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          teacherId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add question');
      }

      setSuccess('Question added successfully!');
      // Reset form
      setFormData({
        text: '',
        type: 'MULTIPLE_CHOICE' as QuestionType,
        marks: 1,
        options: ['', ''],
        correctAnswer: '',
        explanation: '',
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Question to Test</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Question Text</label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Enter your question here..."
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Question Type</label>
          <select
            value={formData.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="MULTIPLE_CHOICE">MULTIPLE CHOICE</option>
            <option value="TRUE_FALSE">TRUE FALSE</option>
            <option value="SHORT_ANSWER">SHORT ANSWER</option>
            <option value="LONG_ANSWER">LONG ANSWER</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Marks</label>
          <input
            type="number"
            min="1"
            value={formData.marks}
            onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value) })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {(formData.type === 'MULTIPLE_CHOICE' || formData.type === 'TRUE_FALSE') && (
          <div>
            <label className="block mb-2 font-medium">Options</label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Option ${index + 1}`}
                  required
                  disabled={formData.type === 'TRUE_FALSE'}
                />
                {formData.type === 'MULTIPLE_CHOICE' && formData.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {formData.type === 'MULTIPLE_CHOICE' && (
              <button
                type="button"
                onClick={addOption}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mt-2"
              >
                Add Option
              </button>
            )}
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium">Correct Answer</label>
          {(formData.type === 'MULTIPLE_CHOICE' || formData.type === 'TRUE_FALSE') ? (
            <select
              value={formData.correctAnswer}
              onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select correct answer</option>
              {formData.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={formData.correctAnswer}
              onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Explanation (Optional)</label>
          <textarea
            value={formData.explanation}
            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Explain the correct answer..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors font-medium"
        >
          Add Question
        </button>
      </form>
    </div>
  );
} 