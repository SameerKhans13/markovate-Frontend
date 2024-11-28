"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Exammakercomp/examCard';
import Input from '../../components/Exammakercomp/ExamInput';
import Label from '../../components/Exammakercomp/ExamLabel';
import Button from '../../components/Exammakercomp/Button2';
import "./ExamForm.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const CreateTestForm = () => {
  const [testTitle, setTestTitle] = useState('');
  const [testTime, setTestTime] = useState('');
  const [maxMarks, setMaxMarks] = useState('');
  const [loading, setLoading] = useState(false);

  const createTest = async () => {
    if (testTitle && testTime && maxMarks) {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/tests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: testTitle,
            maxTime: parseInt(testTime, 10),
            maxMarks: parseInt(maxMarks, 10),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setTestTitle('');
          setTestTime('');
          setMaxMarks('');
          alert(`Test Created Successfully!\nTest ID: ${data.test._id}`);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill out all fields!');
    }
  };

  return (
    <div className="create-test-form">
      <Card className="form-card">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create a Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="form-content">
            <div>
              <Label htmlFor="testTitle">Test Title</Label>
              <Input
                id="testTitle"
                placeholder="Enter test title"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="testTime">Maximum Time (in minutes)</Label>
              <Input
                id="testTime"
                type="number"
                placeholder="Enter time limit"
                value={testTime}
                onChange={(e) => setTestTime(e.target.value.replace('e', ''))}
                min={1}
                required
              />
            </div>
            <div>
              <Label htmlFor="maxMarks">Maximum Marks</Label>
              <Input
                id="maxMarks"
                type="number"
                placeholder="Enter maximum marks"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                min={1}
                required
              />
            </div>
            <Button onClick={createTest} className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Create Test'}
            </Button>
          </div>
          <p className="footer-text">Powered by Markovate</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTestForm;
