"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "./studash.css"; 

interface NotificationItem {
  icon: string;
  title: string;
  message: string;
}

const StudentDashboard: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [loadingStates, setLoadingStates] = useState<{ test: boolean; results: boolean }>({
    test: false,
    results: false,
  });
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const notifications: NotificationItem[] = [
    { icon: "pencil-alt", title: "New Test Scheduled", message: "Math test tomorrow" },
    { icon: "chart-bar", title: "Results Published", message: "Physics test results available" },
    { icon: "user", title: "Profile Updated", message: "Profile updated successfully" },
  ];

  const handleActionClick = (action: "test" | "results") => {
    setLoadingStates((prev) => ({ ...prev, [action]: true }));
    setTimeout(() => {
      router.push(action === "test" ? "/attend-test" : "/view-results");
    }, 800);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
      setIsNotificationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-title">Student Dashboard</h1>
          <div className="navbar-actions">
            {/* Notifications */}
            <div className="notifications" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationOpen((prev) => !prev)}
                aria-label="Notifications"
                className="notifications-button"
              >
                <i className="fa-solid fa-bell"></i>
                <span className="notification-count">{notifications.length}</span>
              </button>
              {isNotificationOpen && (
                <div className="notification-dropdown">
                  {notifications.map((item, idx) => (
                    <div key={idx} className="notification-item">
                      <i className={`fa-solid fa-${item.icon} notification-icon`}></i>
                      <div>
                        <h4 className="notification-title">{item.title}</h4>
                        <p className="notification-message">{item.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="profile">
              <span className="profile-text">Welcome, John Doe</span>
              <div className="profile-avatar">J</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="main-heading">Dashboard Overview</h2>
        <div className="cards-grid">
          {[
            {
              icon: "pencil-alt",
              title: "Attend the Test",
              description: "Take your scheduled tests here.",
              action: "test",
              buttonText: "Start Test",
            },
            {
              icon: "chart-bar",
              title: "Results",
              description: "View your test results.",
              action: "results",
              buttonText: "View Results",
            },
          ].map((card, idx) => (
            <div key={idx} className="card">
              <div className="card-icon">
                <i className={`fa-solid fa-${card.icon}`}></i>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <button
                onClick={() => handleActionClick(card.action as "test" | "results")}
                disabled={loadingStates[card.action as "test" | "results"]}
                className="card-button"
              >
                {loadingStates[card.action as "test" | "results"] ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    Loading...
                  </>
                ) : (
                  card.buttonText
                )}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
