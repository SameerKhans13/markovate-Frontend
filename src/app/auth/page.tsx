"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, m } from "framer-motion";
import BGAnimation from "../../components/Backgroundanimation/Bganimation";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./page.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<string | null>(null); // Store "student" or "teacher"
  const [selectedTab, setSelectedTab] = useState<"login" | "signup" | null>(
    null
  ); // Store active tab for Login/Signup
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email1 , setEmail1] = useState("");
  const [password1 , setPassword1] = useState("");
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleTabSwitch = (tab: "login" | "signup") => {
    setSelectedTab(tab);
  };

  const handleLogin =async () => {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email1,
          password1,
          selectedRole
        }),
      };
      let data = await fetch("http://localhost:8787/auth/signin", options);
      let posts = await data.json();
      console.log(posts);
    // alert(
    //   `Sign-In Successful as a ${selectedRole}! (Send login data to backend)`
    // );
      router.push("../dashboard/"+selectedRole+"-dashboard");
  };

  const handleSignup = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    let data = await fetch("http://localhost:8787/auth/signup", options);
    let posts = await data.json();
    console.log(posts);
    setIsVerificationModalOpen(true);
  };

  const closeVerificationModal = async () => {
    const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  let data = await fetch("http://localhost:8787/auth/getverified", options);
  let posts = await data.json();
  console.log(posts);
    setIsVerificationModalOpen(false);
//     alert(`Data sent to the admin with role: ${selectedRole}`);
//   };

  const tabVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  return (
    <>
      <div className="login-page">
        <BGAnimation />
        <Header />
        <motion.div
          className="login-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Step 1: Role Selection */}
          <AnimatePresence>
            {!selectedRole && (
              <motion.div
                className="role-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3>Select Your Role</h3>
                <button
                  className="role-btn"
                  onClick={() => handleRoleSelect("student")}
                >
                  <i className="fas fa-user-graduate"></i> Student
                </button>
                <button
                  className="role-btn"
                  onClick={() => handleRoleSelect("teacher")}
                >
                  <i className="fas fa-chalkboard-teacher"></i> Teacher
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2: Login/Signup Tabs */}
          <AnimatePresence>
            {selectedRole && !selectedTab && (
              <motion.div
                className="tab-switcher"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3>{`Proceed as ${selectedRole}`}</h3>
                <button
                  className="tab-btn"
                  onClick={() => handleTabSwitch("login")}
                >
                  Login
                </button>
                <button
                  className="tab-btn"
                  onClick={() => handleTabSwitch("signup")}
                >
                  Signup
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Login/Signup Form */}
          <AnimatePresence>
            {selectedTab === "login" && (
              <motion.div
                key="login"
                className="form-container"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
              >
                <h3>SignIn / Login</h3>
                <div className="input-group">
                  <input type="email" placeholder="Email Address" onChange={(e) => setEmail1(e.target.value)}/>
                </div>
                <div className="input-group">
                  <input type="password" placeholder="Password" onChange={(e) => setPassword1(e.target.value)} />
                </div>
                <button className="form-btn" onClick={handleLogin}>
                  Login
                </button>
              </motion.div>
            )}

            {selectedTab === "signup" && (
              <motion.div
                key="signup"
                className="form-container"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
              >
                <h3>Signup</h3>

                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="form-btn" onClick={handleSignup}>
                  Signup
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Verification Modal */}
        <AnimatePresence>
          {isVerificationModalOpen && (
            <motion.div
              className="verification-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Welcome!</h2>
              <p>
                Thanks for signing up! We just need you to verify your email
                address to complete setting up your account.
              </p>
              <button className="modal-btn" onClick={closeVerificationModal}>
                Verify My Email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};
}

export default LoginPage;
