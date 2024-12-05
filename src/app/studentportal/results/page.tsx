'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Result {
  id: number;
  score: number;
  feedback: string;
  answer: {
    text: string;
    marks: number;
    question: {
      text: string;
      correctAnswer: string;
      marks: number;
    };
  };
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalPossible, setTotalPossible] = useState(0);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const testId = searchParams.get('testId');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/results?testId=${testId}`);
        const data = await response.json();
        setResults(data.results);
        setTotalScore(data.totalScore);
        setTotalPossible(data.totalPossible);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (testId) {
      fetchResults();
    }
  }, [testId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Results</h1>
            
            {/* Overall Score Card */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Overall Score</h2>
                  <p className="text-gray-600">Your performance summary</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-blue-600">
                    {totalScore}/{totalPossible}
                  </p>
                  <p className="text-gray-600">
                    {((totalScore / totalPossible) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Individual Questions */}
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={result.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Question {index + 1}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {result.score}/{result.answer.question.marks} points
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600 font-medium">Question:</p>
                      <p className="text-gray-800">{result.answer.question.text}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 font-medium">Your Answer:</p>
                      <p className="text-gray-800">{result.answer.text}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 font-medium">Correct Answer:</p>
                      <p className="text-gray-800">{result.answer.question.correctAnswer}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 font-medium">Feedback:</p>
                      <p className="text-gray-800">{result.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 