"use client";

import React from 'react';
import './footer.css';

export default function PremiumFooter() {
  return (
    <footer className="premium-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column company-info">
            <img 
              src="/logo.png" 
              alt="Company Logo" 
              className="footer-logo" 
            />
            <p className="company-description">
              Markovate: Pioneering AI-Powered Solutions for Modern Challenges
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>202 Velankani Drive,Electroni City, Banglore 577501</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>support@markovate.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 12345 67890</span>
              </div>
            </div>
          </div>

          <div className="footer-column quick-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/solutions">Solutions</a></li>
            </ul>
          </div>

          <div className="footer-column resources">
            <h4>Resources</h4>
            <ul>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
              <li><a href="/white-papers">White Papers</a></li>
              <li><a href="/webinars">Webinars</a></li>
              <li><a href="/downloads">Downloads</a></li>
            </ul>
          </div>

          <div className="footer-column legal">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/compliance">Compliance</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-links">
            <a href="#" className="social-icon">Facebook</a>
            <a href="#" className="social-icon">LinkedIn</a>
            <a href="#" className="social-icon">Twitter</a>
            <a href="#" className="social-icon">Instagram</a>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Markovate. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}