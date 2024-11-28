"use client";
import { useRef, useState, useEffect } from "react";
import "./header.css";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isAuthed, setIsAuthed] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    if (isAuthed === "#") {
      if (headRef.current) {
        headRef.current.style.opacity = "0";
      }
    } else {
      if (headRef.current) {
        headRef.current.style.opacity = "1";
      }
    }
  }, [isAuthed]);

  const getAuth = () => {
    const auth = JSON.parse(sessionStorage.getItem("auth") || "{}");
    if (auth.isAuthed) {
      setIsAuthed("Dashboard");
    } else {
      setIsAuthed("Register");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header>
        <div className="progressbar"></div>
        <div className="head" ref={headRef}>
          <div className="empty"></div>
          <div className="desktop-nav">
            <div className="empty"></div>
            <Link className="navopt" href={"/"}>
              Home
            </Link>
            <Link className="navopt" href={"/contact"}>
              Contact Us
            </Link>
            <Link className="navopt" href={"/partners"}>
              Partners
            </Link>
            <Link className="navopt" href={"/services"}>
              Services
            </Link>
            <Link className="navopt" href={"/auth"}>
              Sign In
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            <Link className="mobile-navopt" href={"/"} onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link className="mobile-navopt" href={"/contact"} onClick={toggleMobileMenu}>
              Contact Us
            </Link>
            <Link className="mobile-navopt" href={"/partners"} onClick={toggleMobileMenu}>
              Partners
            </Link>
            <Link className="mobile-navopt" href={"/services"} onClick={toggleMobileMenu}>
              Services
            </Link>
            <Link className="mobile-navopt" href={"/auth"} onClick={toggleMobileMenu}>
              Sign In
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;