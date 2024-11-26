"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BGAnimation from "../../components/Backgroundanimation/Bganimation";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./page.css";

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const resetView = () => {
    setSelectedRole(null);
  };

  const backgroundVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 70 },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const formVariants = {
    initial: { opacity: 0, x: selectedRole === "student" ? -50 : 50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
    exit: {
      opacity: 0,
      x: selectedRole === "student" ? -50 : 50,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
    <div className="login-page">
      <BGAnimation />
      <Header />
      <motion.div
        className="login-container"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          Welcome Back!
        </motion.h1>

        {/* Role Selection Buttons */}
        <AnimatePresence>
          {!selectedRole && (
            <motion.div
              className="role-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <motion.button
                key="student-btn"
                className="role-btn"
                onClick={() => handleRoleSelect("student")}
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <i className="fas fa-user-graduate"></i> Student
              </motion.button>

              <motion.button
                key="teacher-btn"
                className="role-btn"
                onClick={() => handleRoleSelect("teacher")}
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <i className="fas fa-chalkboard-teacher"></i> Teacher
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Role-specific Content */}
        <AnimatePresence>
          {selectedRole && (
            <motion.div
              key={selectedRole}
              className="sign-in-box"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {selectedRole === "student" ? "Student Login" : "Teacher Login"}
              </motion.h3>

              <motion.div
                className="input-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <i className="fas fa-id-card"></i>
                <input
                  type="text"
                  placeholder={`${
                    selectedRole === "student" ? "Student" : "Teacher"
                  } ID`}
                />
              </motion.div>

              <motion.div
                className="input-group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </motion.div>

              <motion.div
                className="remember-me"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor={`remember-${selectedRole}`}>Remember me</label>
                <input type="checkbox" id={`remember-${selectedRole}`} />
              </motion.div>

              <motion.div
                className="forgot-password"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href="#">Forgot password?</a>
              </motion.div>

              <motion.button
                className="sign-in-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Sign In
              </motion.button>

  
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
      <Footer />
    </>
  );
};

export default LoginPage;
