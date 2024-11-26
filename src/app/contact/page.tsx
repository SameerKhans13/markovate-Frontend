"use client";

import React from "react";
import "./Contact.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BGAnimation from "../../components/Backgroundanimation/Bganimation"; // Importing BGAnimation

const ContactUs: React.FC = () => {
  return (
    <>
      {/* Adding Header */}
      <Header />

      {/* Background Animation */}
      <BGAnimation />

      <div className="contact-page">
        <div className="contact-container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
          </p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Type your message here"
                required
              />
            </div>
            <button type="submit" className="contact-button">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Adding Footer */}
      <Footer />
    </>
  );
};

export default ContactUs;
