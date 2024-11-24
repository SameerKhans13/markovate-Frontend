"use client";
import { useRef, useState, useEffect } from "react";
import "./header.css";
const Header = () => {
  const [isAuthed, setIsAuthed] = useState<string>("");
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
  return (
    <>
      <header>
        <div className="progressbar"></div>
        <div className="head" ref={headRef}>
          <div className="empty"></div>
          <div className="navopt" onClick={() => "/about"}>
            About
          </div>
          <div className="navopt" onClick={() => "/contact"}>
            Contact Us
          </div>
          <div className="navopt" onClick={() => "/event"}>
            Services
          </div>
          <div className="navopt" onClick={() => "/sponser"}>
            Partners
          </div>
          <div
            className="navopt"
            onClick={() => {
              if (isAuthed === "Dashboard") {
                ("/dashboard");
              } else {
                ("/auth");
              }
            }}
          >
            {isAuthed}
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
