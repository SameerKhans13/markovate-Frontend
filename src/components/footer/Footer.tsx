"use client";

import React from "react";
import Image from "next/image";
import "./footer.css";
import Link from "next/link";

export default function PremiumFooter() {
  return (
    <footer className="premium-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column company-info">
            <Image
              src="/logo.png"
              alt="Company Logo"
              className="footer-logo"
              width={100}
              height={100}
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
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/solutions">Solutions</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column resources">
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/case-studies">Case Studies</Link>
              </li>
              <li>
                <Link href="/white-papers">White Papers</Link>
              </li>
              <li>
                <Link href="/webinars">Webinars</Link>
              </li>
              <li>
                <Link href="/downloads">Downloads</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column legal">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/compliance">Compliance</Link>
              </li>
              <li>
                <Link href="/cookies">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-links">
            <Link href="#" className="social-icon">
              Facebook
            </Link>
            <Link href="#" className="social-icon">
              LinkedIn
            </Link>
            <Link href="#" className="social-icon">
              Twitter
            </Link>
            <Link href="#" className="social-icon">
              Instagram
            </Link>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Markovate. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
