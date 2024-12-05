"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Exammakercomp/examCard";
import Input from "../../components/Exammakercomp/ExamInput";
import Label from "../../components/Exammakercomp/ExamLabel";
import Button from "../../components/Exammakercomp/Button2";
import "./ExamForm.css";

const Page = () => {
  const router = useRouter();
  const [testTitle, setTestTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const createTest = async () => {
    if (testTitle && duration && totalMarks && subject) {
      setLoading(true);
      try {
        const response = await fetch("/api/tests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: testTitle,
            duration: parseInt(duration, 10),
            totalMarks: parseInt(totalMarks, 10),
            subject,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setTestTitle("");
          setDuration("");
          setTotalMarks("");
          setSubject("");
          alert("Test Created Successfully!");
          router.refresh();
          router.push("/ExamPortal");
        } else {
          alert(data.error || "Something went wrong");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill out all fields!");
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
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter subject name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (in minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value.replace(/[eE]/g, ""))}
                min={1}
                required
              />
            </div>
            <div>
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                placeholder="Enter total marks"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value.replace(/[eE]/g, ""))}
                min={1}
                required
              />
            </div>
            <Button onClick={createTest} className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Test"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
