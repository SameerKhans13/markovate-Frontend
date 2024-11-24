"use client";

import "./footer.css"; // Importing external CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <img src="#" alt="#" draggable={false} className="footer-logo" />
      <div className="footer-info">&copy; Markovate -AI Powered Exams.</div>
      <div className="footer-quicklinks">
        <a href="/" className="footer-redirects">
          Home
        </a>
        <a href="/about" className="footer-redirects">
          About
        </a>
        <a href="/about#faqs" className="footer-redirects">
          FAQs
        </a>
        <a href="/contact" className="footer-redirects">
          Contact Us
        </a>
        <a href="/event" className="footer-redirects">
          Service
        </a>
        <a href="/sponsor" className="footer-redirects">
          Partners
        </a>
        
      </div>
      <div className="footer-social-links">
        <h6>Follow Us On</h6>
        <div className="footer-social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            🌐 Facebook
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            🎥 YouTube
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            🔗 LinkedIn
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            🐦 Twitter
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            📸 Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
