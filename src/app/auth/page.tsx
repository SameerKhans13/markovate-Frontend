"use client";
import type { Metadata } from "next";
import { useState, useEffect } from "react";
import "./page.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

const RoleSelector = () => {
  const [selectedRole, setSelectedRole] = useState<null | string>(null);
  const [showContent, setShowContent] = useState(false);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    // Use setTimeout to match the original timing
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  const resetView = () => {
    setSelectedRole(null);
    setShowContent(false);
  };

  return (
    <div>
      <div
        className={`flex transition-all duration-500 ${
          selectedRole === "student"
            ? "justify-start"
            : selectedRole === "teacher"
            ? "justify-end"
            : "justify-between"
        }`}
      >
        <button
          className={`flex items-center transition-all duration-500 ${
            selectedRole === "student" ? "expanded" : ""
          }`}
          onClick={() => handleRoleSelect("student")}
          style={{ display: selectedRole === "teacher" ? "none" : "flex" }}
        >
          Student
        </button>

        <button
          className={`flex items-center transition-all duration-500 ${
            selectedRole === "teacher" ? "expanded" : ""
          }`}
          onClick={() => handleRoleSelect("teacher")}
          style={{ display: selectedRole === "student" ? "none" : "flex" }}
        >
          Teacher
        </button>
      </div>

      {showContent && selectedRole === "student" && (
        <div className="block">
          Student Content Box
          <button onClick={resetView}>Go Back</button>
        </div>
      )}

      {showContent && selectedRole === "teacher" && (
        <div className="block">
          Teacher Content Box
          <button onClick={resetView}>Go Back</button>
        </div>
      )}
    </div>
  );
};

// export default RoleSelector;

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<null | any>(null);
  const [showContent, setShowContent] = useState(false);

  // CSS variables
  const styles = {
    ":root": {
      "--primary-color": "#2563eb",
      "--secondary-color": "#0284c7",
      "--accent-color": "#3b82f6",
      "--background-start": "#dbeafe",
      "--background-end": "#bfdbfe",
      "--text-primary": "#1e293b",
      "--text-secondary": "#475569",
      "--white": "#ffffff",
      "--error": "#ef4444",
      "--success": "#22c55e",
    },
  };

  const handleRoleSelect = (role: any) => {
    setSelectedRole(role);
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  const resetView = () => {
    setSelectedRole(null);
    setShowContent(false);
  };
  return (
    <>
      <div className="login-container">
        <h1>Welcome Back!</h1>
        <div
          className="role-buttons"
          style={{
            justifyContent:
              selectedRole === "student"
                ? "flex-start"
                : selectedRole === "teacher"
                ? "flex-end"
                : "space-between",
          }}
        >
          <button
            className={`role-btn ${
              selectedRole === "student" ? "expanded" : ""
            }`}
            onClick={() => handleRoleSelect("student")}
            style={{ display: selectedRole === "teacher" ? "none" : "flex" }}
          >
            <i className="fas fa-user-graduate"></i>
            Student
          </button>
          <button
            className={`role-btn ${
              selectedRole === "teacher" ? "expanded" : ""
            }`}
            onClick={() => handleRoleSelect("teacher")}
            style={{ display: selectedRole === "student" ? "none" : "flex" }}
          >
            <i className="fas fa-chalkboard-teacher"></i>
            Teacher
          </button>
        </div>

        <div
          className="sign-in-box"
          style={{
            display:
              showContent && selectedRole === "student" ? "block" : "none",
          }}
        >
          <h3>Student Login</h3>
          <div className="input-group">
            <i className="fas fa-id-card"></i>
            <input type="text" placeholder="Student ID" />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember-student" />
            <label htmlFor="remember-student">Remember me</label>
          </div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button className="sign-in-btn">Sign In</button>
          <button className="go-back-btn" onClick={resetView}>
            Go Back
          </button>
        </div>

        <div
          className="sign-in-box"
          style={{
            display:
              showContent && selectedRole === "teacher" ? "block" : "none",
          }}
        >
          <h3>Teacher Login</h3>
          <div className="input-group">
            <i className="fas fa-id-card"></i>
            <input type="text" placeholder="Teacher ID" />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember-teacher" />
            <label htmlFor="remember-teacher">Remember me</label>
          </div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button className="sign-in-btn">Sign In</button>
          <button className="go-back-btn" onClick={resetView}>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
