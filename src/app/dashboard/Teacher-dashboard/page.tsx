"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/teachdashcomp/Card-teach";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/teachdashcomp/Avatar";
import { Button } from "../../../components/teachdashcomp/Button1";
import { FileText, LineChart, Bell } from "lucide-react";
import "./teacdash.css";

interface DashboardOption {
  title: string;
  description: string;
  icon: JSX.Element;
  stats: string;
  onClick: () => void;
}

const TeacherDashboard: React.FC = () => {
  const [notifications, setNotifications] = React.useState<number>(3);
  const [teacherName, setTeacherName] = React.useState<string>("Mrs. Smith");

  const dashboardOptions: DashboardOption[] = [
    {
      title: "Create Test",
      description: "Design new tests for your students with ease",
      icon: <FileText className="w-6 h-6" />,
      stats: "5 drafts saved",
      onClick: () => console.log("Navigate to test creation"),
    },
    {
      title: "View Results",
      description: "Track student progress and analyze performance",
      icon: <LineChart className="w-6 h-6" />,
      stats: "28 recent submissions",
      onClick: () => console.log("Navigate to results"),
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-title">Teacher's Dashboard</h1>
          <div className="navbar-actions">
            <button className="notification-button">
              <Bell className="notification-icon" />
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </button>
            <div className="profile">
              <div className="profile-text">
                <span>Welcome,</span>
                <span>{teacherName}</span>
              </div>
              <Avatar src={"/window.svg"} alt={"image"}>
                <AvatarImage src="/api/placeholder/40/40" alt={teacherName} />
                <AvatarFallback>{teacherName[0]}</AvatarFallback>``
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <h2 className="content-title">Dashboard Overview</h2>
        </header>

        <section className="dashboard-options">
          {dashboardOptions.map((option, index) => (
            <Card key={index} className="dashboard-card">
              <CardHeader>
                <div className="card-header">
                  <div className="card-icon">{option.icon}</div>
                  <div>
                    <CardTitle>{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="card-content">
                  <span className="card-stats">{option.stats}</span>
                  <Button onClick={option.onClick}>Get Started</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
